package com.tcs.paas.fission.service.impl;


import com.tcs.paas.fission.dao.FunctionDao;
import com.tcs.paas.fission.dto.Function;
import com.tcs.paas.fission.dto.FunctionStatus;
import com.tcs.paas.fission.dto.FunctionTask;
import com.tcs.paas.fission.exception.*;
import com.tcs.paas.fission.service.FunctionsService;
import com.tcs.paas.fission.util.FunctionUtil;
import com.tcs.paas.fission.util.OpenFaasGatewayUtil;
import com.tcs.paas.fission.util.ProjectServiceFileHandling;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;

import java.io.File;
import java.util.*;

@Service
public class FunctionsServiceImpl implements FunctionsService {

    @Autowired
    FunctionDao functionDao;

    @Autowired
    FunctionUtil functionUtil;

    @Autowired
    ProjectServiceFileHandling fileHandling;

    @Autowired
    RestTemplate restTemplate;

    @Value("${docker.repo.host}")
    private  String dockerHost;

    @Value("${docker.repo.namespace}")
    private  String dockerNamespace;

    @Value("${fission.host}")
    private String fissionHost;

    @Value("${docker.repo.username}")
    private  String dockerUserName;

    @Value("${docker.repo.password}")
    private  String dockerPassword;

    @Value("${fission.projects.path}")
    private  String fissionProjectsPath;



    @Override
    public void createFunction(Function function) throws FunctionAlreadyExistsException, CommandExecutionException, OverwriteFileException, FunctionCreationException {
        System.out.println(function.getFunctionStatus());
        FunctionStatus status = functionDao.getFunctionStatus(function.getProjectName(),function.getFunctionName());
        if (status!=null && status != FunctionStatus.ERROR)
            throw new FunctionAlreadyExistsException("Function name already exists");
        else {
            if(status == null){                     //create function  with status 'CREATING'
               java.sql.Timestamp sqlTime = new java.sql.Timestamp(new java.util.Date().getTime());
               System.out.println("Status is null:::"+FunctionStatus.CREATING.name());
               functionUtil.createDirectoryTemplateForNewFunction(function);
               functionDao.createFunction(function.getFunctionName(),function.getProjectName(), sqlTime, function.getRuntime(), FunctionStatus.CREATING.name());
             }
            if(status == FunctionStatus.ERROR){  //update function  with status 'CREATING'
                System.out.println("Status is Error:::"+FunctionStatus.CREATING.name());
                functionDao.updateFunction(function.getFunctionName(), function.getProjectName(),FunctionStatus.CREATING.name());
            }
            try {
                System.out.println("Inside try for creation:::");
                List<FunctionTask> tasksList = FunctionUtil.getTasksListToCreateFunction(fissionProjectsPath, function, status);
                functionUtil.executeFunctionTasks(tasksList);
                functionDao.updateFunction(function.getFunctionName(), function.getProjectName(), FunctionStatus.CREATED.name(), "");
            }catch(Exception e){
                //update function and project runtime with status 'ERROR'
                 functionDao.updateFunction(function.getFunctionName(), function.getProjectName(),FunctionStatus.ERROR.name());
                throw new FunctionCreationException(e.getMessage());
            }
        }
    }

    @Override
    public int deployFunction(Function function) throws FunctionDeploymentException{
        try{
            //"limits":{"memory":"128M","cpu":"0.1"}
            //System.out.println(function.getLimits());
           // System.out.println(function.getEnvironmentVariables());

            String functionImageName = functionDao.getFunctionImage(function.getProjectName(),function.getFunctionName());
            String serviceName = function.getProjectName()+"-"+function.getFunctionName()+"-service";
            String reqJson = OpenFaasGatewayUtil.getJsonObjectForDeployFunction(function,serviceName,functionImageName);            //3.Call openfaas rest api to deploy the function and save Back-end function name to database
            System.out.println("Getting Request Body and Response");
            System.out.println(functionImageName+" --> "+serviceName+" --> "+reqJson);
//            System.out.println("openfaas credentials:::"+openfaasCredentials);
//            HttpEntity<String> requestBody = new HttpEntity<String>(reqJson, OpenFaasGatewayUtil.getGatewayAuthHeaders(openfaasCredentials));
//            System.out.println("requestBody::"+requestBody);
//            ResponseEntity<Void> response = restTemplate.postForEntity(openfaasHost+"/system/functions", requestBody, Void.class);
//            System.out.println("Response:::"+response);
            System.out.println("Function status::"+FunctionStatus.DEPLOYED.name());
            int result = functionDao.deployFunction(function.getProjectName(),function.getFunctionName(),function.getTriggerType(),serviceName,FunctionStatus.DEPLOYED.name(),function.getLimits(),function.getEnvironmentVariables());
            return result;
           }
        catch(Exception e){
            System.out.println(e.getMessage());
            //e.printStackTrace();
           throw new FunctionDeploymentException(e.getMessage());
        }
    }

    @Override
    public int deployFunctionCLI(Function function) throws FunctionDeploymentException{
        try{
            int result = 0;
            try {
                System.out.println("Inside try for Deploy:::");
                List<FunctionTask> tasksList = FunctionUtil.getTasksListToDeployFunction(fissionProjectsPath, function);
                functionUtil.executeFunctionTasks(tasksList);
                System.out.println("Deploy command is completed");
                result = functionDao.updateFunction(function.getFunctionName(), function.getProjectName(), FunctionStatus.DEPLOYED.name(), "");
            }catch(Exception e){
                //update function and project runtime with status 'ERROR'
                functionDao.updateFunction(function.getFunctionName(), function.getProjectName(),FunctionStatus.ERROR.name());
                throw new FunctionCreationException(e.getMessage());
            }

//            int result = functionDao.deployFunction(function.getProjectName(),function.getFunctionName(),function.getTriggerType(),"",FunctionStatus.DEPLOYED.name(),function.getLimits(),function.getEnvironmentVariables());
            return result;
        }
        catch(Exception e){
            System.out.println(e.getMessage());
            //e.printStackTrace();
            throw new FunctionDeploymentException(e.getMessage());
        }
    }

    @Override
    public List<Function> listFunctions(String projectName) {
        List<Function> functionsList = functionDao.listFunctions(projectName);
        return functionsList;
    }
    
    @Override
     public String getFunctionBuildLog(String projectName,String functionName) throws UnsupportedEncodingException{
         
         String functionBuildLogContent = FunctionUtil.getFileContent(fissionProjectsPath + "/" + projectName + "/" + functionName + ".log");
         return  Base64.getEncoder().encodeToString(functionBuildLogContent.getBytes("utf-8"));
         
     }

    @Override
    public List<Function> getFunctionLogs(String projectName, String functionName, String since, int tail) throws FunctionLogException {
        try {
//            String serviceName = functionDao.getServiceName(projectName, functionName);
//            String url = openfaasHost + "/system/logs?name=" + serviceName + "&since=" + since + "&tail=" + tail;
//            System.out.println("Url = " + url);
//            HttpEntity request = new HttpEntity(OpenFaasGatewayUtil.getGatewayAuthHeaders(openfaasCredentials));
//            ResponseEntity<String> functionLogsResponse = restTemplate.exchange(url, HttpMethod.GET, request, String.class);
//            //System.out.println("functionLogsResponse = " + functionLogsResponse);
//            String functionLogs = functionLogsResponse.getBody();
//            //System.out.println("functionLogs = " + functionLogs);
//            if(functionLogs!=null)
//            {
//                functionLogs = functionLogs.substring(0,functionLogs.length()-1);
//            String jsonArrayLogs = "[" + functionLogs.replaceAll("\n", ",") + "]";
//            ObjectMapper mapper = new ObjectMapper();
//            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//            List<Function> functionLogsList = mapper.readValue(jsonArrayLogs, new TypeReference<List<Function>>() {
//            });
//            return functionLogsList;
//            }
            return null;
            
        }
        catch(Exception e){
            throw new FunctionLogException(e.getMessage());
        }
    }

    @Override
    public boolean deleteFunction(Function function) throws FunctionDeletionException{
        if(functionDao.checkFunctionExists(function.getFunctionName(),function.getProjectName()) > 0) {
            try {
                FunctionStatus status = functionDao.getFunctionStatus(function.getProjectName(),function.getFunctionName());
                if (status == FunctionStatus.DEPLOYED) {
                    //  Delete only if Function is deployed

                    List<FunctionTask> tasksList = FunctionUtil.getTasksListToDeleteFunction(fissionProjectsPath, function);
                    functionUtil.executeFunctionTasks(tasksList);
                    System.out.println("Delete command is completed");

                    FunctionUtil.deleteFolder(new File(fissionProjectsPath + "/" + function.getProjectName() + "/" + function.getFunctionName()));
                }

                functionDao.deleteFunction(function.getProjectName(), function.getFunctionName());
                return true;
            }
            catch (Exception e){
                throw new FunctionDeletionException(e.getMessage());
            }
        }
        else{
           throw new FunctionDeletionException("Function doesn't exist");
        }

    }


    @Override
    public Function getFunctionDescription(String projectName, String functionName) throws FunctionDescriptionException {
        try {
            FunctionStatus status = functionDao.getFunctionStatus(projectName, functionName);
            String runtime = functionDao.getFunctionRuntime(projectName,functionName);
            Function functionDescription = new Function();
            functionDescription.setProjectName(projectName);
            functionDescription.setFunctionName(functionName);
            functionDescription.setFunctionStatus(status);
            functionDescription.setRuntime(runtime);
            functionDescription.setEnvironmentVariables(functionDao.getEnvironmentVariables(projectName, functionName));
            functionDescription.setLimits(functionDao.getLimits(projectName, functionName));
            Map<String,String> filePaths = FunctionUtil.getHandlerAndDependencyFilePaths(runtime,projectName,functionName, fissionProjectsPath);
            
            
             String handlerFileContent = Base64.getEncoder().encodeToString(FunctionUtil.getFileContent(filePaths.get("handlerFilePath")).getBytes("utf-8"));
             System.out.println("Handler file path:"+filePaths.get("handlerFilePath"));
             System.out.println("Handler file content:"+handlerFileContent);
             String dependencyFileContent = Base64.getEncoder().encodeToString(FunctionUtil.getFileContent(filePaths.get("dependencyFilePath")).getBytes("utf-8"));
             System.out.println("Dependency file path: "+filePaths.get("dependencyFilePath"));
             System.out.println("Dependency file content: "+dependencyFileContent);
            functionDescription.setHandlerFileContent(handlerFileContent);
            functionDescription.setDependencyFileContent(dependencyFileContent);
            if (status == FunctionStatus.CREATED || status == FunctionStatus.ERROR || status == FunctionStatus.CREATING)
                return functionDescription;
            else {  //status == FunctionStatus.DEPLOYED  // add some more to functionDescription
                String backendFunctionName = functionDao.getServiceName(projectName, functionName);
                System.out.println("before invocation function::");
                functionDescription.setInvocationCount(0);//(int) responseJson.get("invocationCount"));

//                functionDescription.setAvailableReplicas((int)responseJson.get("availableReplicas"));
//                functionDescription.setLabels(new ObjectMapper().readValue(responseJson.get("labels").toString(), Map.class));
//                functionDescription.setAnnotations(new ObjectMapper().readValue(responseJson.get("annotations").toString(), Map.class));
                functionDescription.setFunctionUrl(fissionHost + "/" + functionName);
                functionDescription.setTriggerType((String) functionDao.getTriggerType(projectName, functionName));
                return functionDescription;
            }
        }catch (Exception e){
            throw new FunctionDescriptionException(e.getMessage());
        }
    }

    @Override
    public int updateFunction(Function function) throws FunctionUpdateException {
        try {
            //1. Get serviceName, imageName form database using projectName & functionName.
            String serviceName = functionDao.getServiceName(function.getProjectName(), function.getFunctionName());
            String functionImageName = functionDao.getFunctionImage(function.getProjectName(), function.getFunctionName());

            //2.Get the new triggerType,new labels and new annotations from UI
            String reqJson = OpenFaasGatewayUtil.getJsonObjectForUpdateFunction(function, serviceName, functionImageName);
            System.out.println("Update parameters:" + reqJson);
//            HttpEntity<String> requestBody = new HttpEntity<String>(reqJson, OpenFaasGatewayUtil.getGatewayAuthHeaders(openfaasCredentials));
//            ResponseEntity<Void> response = restTemplate.exchange(openfaasHost + "/system/functions", HttpMethod.PUT, requestBody, Void.class);
//            System.out.println("Response: "+response.getStatusCode());

            //3.Update the Database with new triggerType
            System.out.println("Update the database");
            int res = functionDao.updateTriggerType(function.getProjectName(), function.getFunctionName(), function.getTriggerType());
            return res;
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            throw new FunctionUpdateException(e.getMessage());
        }
    }
    @Override
    public Object getInvocationCountForFunction(String functionName)
    {
        //int invocationCount=0;
//        HttpEntity request = new HttpEntity(OpenFaasGatewayUtil.getGatewayAuthHeaders(openfaasCredentials));
//        ResponseEntity<String> response = restTemplate.exchange(openfaasHost + "/system/functions", HttpMethod.GET, request, String.class);
//        //Response is a JSON ARRAY
//        System.out.println("response:::"+response.getBody());
//        JSONArray jsonArray = new JSONArray(response.getBody());
//        //Search for function name
//        for(int i = 0; i < jsonArray.length(); i++)
//        {
//            JSONObject object = jsonArray.getJSONObject(i);
//            System.out.println("eachObject:::"+object);
//            if(object.getString("name").equals(functionName))
//            {
//                return (object.keySet().contains("invocationCount")) ? object.getInt("invocationCount"): 0;
//            }
//        }
//        return response.getBody();
        return null;
    }
}