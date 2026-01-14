package com.tcs.paas.fission.util;

import com.tcs.paas.fission.dto.Function;
import com.tcs.paas.fission.dto.FunctionStatus;
import com.tcs.paas.fission.dto.FunctionTask;
import com.tcs.paas.fission.exception.CommandExecutionException;
import com.tcs.paas.fission.exception.OverwriteFileException;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@Component
public class FunctionUtil {

    @Value("${fission.projects.path}")
    private  String fissionProjectsPath;


    @Value("${fission.host}")
    private static String fissionHost;

    @Autowired
    ProjectServiceFileHandling fileHandling;

    public static void deleteFolder(File file){
        for (File subFile : file.listFiles()) {
            if(subFile.isDirectory()){
                deleteFolder(subFile);
            }    
            else{
                subFile.delete();
            }    
        }
        file.delete();
    }
    
    public static void deleteFile(File file){
        file.delete();
    }


    public static void overwriteFile(String fileName, String content) throws OverwriteFileException{
        try{
            File file = new File(fileName);
            FileWriter fileWriter = new FileWriter(file.getAbsoluteFile());
            BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);
            bufferedWriter.write(content);
            bufferedWriter.close();
        }catch(IOException e){
                throw new OverwriteFileException("Error overwriting contents to file");
        }
    }

    public static void createNewFile(String filePath, String fileName){
        try{
            File file = new File(filePath + "/" + fileName);
        }catch(Exception e){
            System.out.println(e.getMessage());
        }

    }
    
    public static String getFileContent(String fileName){
        try{
            BufferedReader reader = new BufferedReader(new FileReader(fileName));
            StringBuilder stringBuilder = new StringBuilder();
            String line = null;
            String ls = System.getProperty("line.separator");
            while ((line = reader.readLine()) != null) {
            	stringBuilder.append(line);
            	stringBuilder.append(ls);
            }
            // delete the last new line separator
//            if(stringBuilder.length() > 0) {
//                stringBuilder.deleteCharAt(stringBuilder.length() - 1);
//            }
            reader.close();
            return stringBuilder.toString();
        }
        catch(IOException e){
            System.out.println("Unable to read file content");
            return "";
        }
    }

    public static int  executeCommand(String command) throws CommandExecutionException{
        System.out.println("execute command method::: "+command);
        String[] commands = {"/bin/bash","-c",command};
        try{
	        System.out.println(commands);
            Process p = Runtime.getRuntime().exec(commands);
            BufferedReader br = new BufferedReader(new InputStreamReader(p.getInputStream()));
            String s;
            while ((s = br.readLine()) != null)
                System.out.println("line: " + s);
            p.waitFor();
            p.destroy();
	        System.out.println("exc command::"+p.exitValue());
            return  p.exitValue();
        }
        catch(IOException | InterruptedException e){
            System.out.printf("execute command::");
            e.printStackTrace();
            throw new CommandExecutionException(e.getMessage());
        }
    }

    public static Map<String,String> getHandlerAndDependencyFilePaths(String runtime,String projectName,String functionName,String fissionProjectsPath){

         String handlerFilePath="";
         String dependencyFilePath="";
         String workingDirectory =  fissionProjectsPath +"/"+projectName+"/"+functionName;

         switch(runtime) {
             case "java":
                  handlerFilePath = workingDirectory+"/src/main/java/com/fission/function/Handler.java";
                  dependencyFilePath = workingDirectory+"/build.gradle";
                  break;
             case "go":
                 handlerFilePath = workingDirectory+"/Handler.go";
                 dependencyFilePath = workingDirectory+"/main.mod";
                 break;
             case "python":
                  handlerFilePath = workingDirectory+"/handler.py";
                  dependencyFilePath = workingDirectory+"/requirements.txt";
                  break;
             case "nodejs":
                  handlerFilePath = workingDirectory+"/handler.js";
                  dependencyFilePath = workingDirectory+"/package.json";
             default:
                 System.out.println("no match");
         }
         Map<String,String> filePaths = new HashMap<String,String>();
         filePaths.put("handlerFilePath", handlerFilePath);
         filePaths.put("dependencyFilePath", dependencyFilePath);
         return filePaths;
    }

    public static List<FunctionTask> getTasksListToCreateFunction(String fissionProjectsPath, Function function, FunctionStatus status) throws IOException {

         List<FunctionTask> tasksList = new ArrayList<FunctionTask>();
         System.out.println("Inside get task list method::"+ fissionProjectsPath);
         /*
            >> rm -rf /home/vboxuser/Fission/functions/testfunction*
            >> cd /home/vboxuser/Fission/functions/testfunction/ && fission function create --name testfunction --env python --code testfunctionpy.py > /home/vboxuser/Fission/testfunction.log
         */
         // Linux Commands to create a function
         String removeOldFilesCommand = "rm -rf "+ fissionProjectsPath + "/" + function.getProjectName() + "/" + function.getFunctionName() + "*";
         String functionCreateCommand = "cd "+ fissionProjectsPath + "/" + function.getProjectName() + "/" + function.getFunctionName() + " && fission function create --name " + function.getFunctionName()
                 + " --env "+function.getRuntime()+" --code " + function.getHandlerFileName() + "   > "+ fissionProjectsPath + "/" +function.getProjectName() + "/" + function.getFunctionName() + ".log";

         // For overwriting file content after function creation
         System.out.println("Linux commands:remove:"+removeOldFilesCommand+"::create command::" + functionCreateCommand);
         Map<String,String> props = new HashMap<String,String>();
         props.put("runtime",function.getRuntime());
         props.put("projectName",function.getProjectName());
         props.put("functionName",function.getFunctionName());
         props.put("handlerFileContent", new String(Base64.getDecoder().decode(function.getHandlerFileContent())));
         props.put("dependencyFileContent",new String(Base64.getDecoder().decode(function.getDependencyFileContent())));

         tasksList.add(new FunctionTask("Overwrite",props));
//         tasksList.add(new FunctionTask("CMD",removeOldFilesCommand));
         tasksList.add(new FunctionTask("CMD",functionCreateCommand));


         return tasksList;
    }

    public static List<FunctionTask> getTasksListToDeployFunction(String fissionProjectsPath, Function function) throws FileNotFoundException {
         List<FunctionTask> tasksList = new ArrayList<FunctionTask>();
         System.out.println("Inside get task list method::"+ fissionProjectsPath);
         /*
            >> cd /home/vboxuser/Fission && fission route create --method GET --url /testfunction --function testfunction > /home/vboxuser/Fission/testfunction.log
         */

         String functionDeployCommand = "cd " + fissionProjectsPath + "/" + function.getProjectName() + " && " +
                 " fission route create --method GET --url /" + function.getFunctionName() + " --function " + function.getFunctionName() + " > " + fissionProjectsPath + "/" + function.getProjectName() + "/" + function.getFunctionName() + ".log";

         tasksList.add(new FunctionTask("CMD",functionDeployCommand));
         return tasksList;
    }

    public static List<FunctionTask> getTasksListToDeleteFunction(String fissionProjectsPath, Function function) throws FileNotFoundException {
        List<FunctionTask> tasksList = new ArrayList<FunctionTask>();
        System.out.println("Inside get task list method::"+ fissionProjectsPath);
         /*
            >> cd /home/vboxuser/Fission && fission function delete --name testfunction > /home/vboxuser/Fission/testfunction.log
         */

        String functionDeployCommand = "cd " + fissionProjectsPath + "/" + function.getProjectName() + " && " +
                " fission function delete --name " + function.getFunctionName() + " > " + fissionProjectsPath + "/" + function.getProjectName() + "/" + function.getFunctionName() + ".log";

        tasksList.add(new FunctionTask("CMD",functionDeployCommand));
        return tasksList;
    }

    public static void replaceFileContent(String filePath, String oldContent, String newContent) throws FileNotFoundException {
        try {
            // 1. Read the file content
            List<String> lines = Files.readAllLines(Paths.get(filePath));

            // 2. Modify the content
            List<String> modifiedLines = new ArrayList<>();
            for (String line : lines) {
                String modifiedLine = line.replace(oldContent, newContent);
                modifiedLines.add(modifiedLine);
                System.out.println(line);
            }

            // 3. Write back to the file
            Files.write(Paths.get(filePath), modifiedLines);

            System.out.println("File content modified successfully.");
        } catch (IOException e) {
            System.err.println("Error modifying file: " + e.getMessage());
        }
    }

     public static String retrieveStringFromFile(String folderPath, String key, String fileName) throws IOException {
        File file = new File(folderPath+"/"+fileName);
        String fileData = new String(FileUtils.readFileToByteArray(file));
        Gson gson = new GsonBuilder().disableHtmlEscaping().create();
        Map<String, String> fileMap = gson.fromJson(fileData, Map.class);

        return fileMap.get(key);
     }

    public void executeFunctionTasks(List<FunctionTask> tasksList) throws CommandExecutionException, OverwriteFileException {
        for (FunctionTask task : tasksList) {
            System.out.println(task);
            if (task.getExecutionType().equals("CMD")) {
		        System.out.println("Before Execute::"+task.getCommand());
                int res = FunctionUtil.executeCommand(task.getCommand());
		        System.out.println("After Execution::"+task.getCommand());
                if (res != 0)    // 0- Normal Termination
                    throw new CommandExecutionException("Unable to create function");
            }else if(task.getExecutionType().equals("Overwrite")){
                Map<String,String> props = task.getProperties();
                Map<String,String> filePaths = FunctionUtil.getHandlerAndDependencyFilePaths(props.get("runtime"),props.get("projectName"),props.get("functionName"),fissionProjectsPath);
                System.out.println(filePaths);
                overwriteFile(filePaths.get("handlerFilePath"),props.get("handlerFileContent"));
                overwriteFile(filePaths.get("dependencyFilePath"),props.get("dependencyFileContent"));
		        System.out.println("After Overwrite::"+task.getCommand());
            }
        }
    }

    public void createDirectoryTemplateForNewFunction(Function function) throws OverwriteFileException {
        try{
            //Create folder with the function name inside Project directory
            fileHandling.createDirectory(new File(fissionProjectsPath + "/" + function.getProjectName() + "/" + function.getFunctionName()));

            //Create Handler and dependency file templates
            getHandlerAndDependencyFilePaths(function.getRuntime(), function.getProjectName(),
                    function.getFunctionName(), fissionProjectsPath);
            createNewFile(fissionProjectsPath + "/" + function.getProjectName() + "/" + function.getFunctionName() , function.getHandlerFileName());
            createNewFile(fissionProjectsPath + "/" + function.getProjectName() + "/" + function.getFunctionName() , function.getDependencyFileName());

            System.out.println("Created Directory Template for Function: " + function.getFunctionName());
        }catch(Exception e){
            System.out.println(e.getMessage());
//            e.printStackTrace();
        }
    }
}

