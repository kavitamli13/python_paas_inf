package com.tcs.paas.fission.dto;

import com.fasterxml.jackson.annotation.JsonInclude;


import java.util.HashMap;
import java.util.Map;
import java.sql.Timestamp;

@JsonInclude(JsonInclude.Include.NON_DEFAULT)
//@JsonInclude(JsonInclude.Include.NON_NULL)
public class Function {
   
    //Create function parameters
    private String functionName;
    private String functionImage;
    private String projectName;
    private Timestamp createdTime;
    private String  handlerFileContent;
    private String dependencyFileContent;
    private String handlerFileName;
    private String dependencyFileName;
    private FunctionStatus functionStatus;
    private String runtime;
    //Response
    private String message;
    //Deploy Function parameters
    private String triggerType;
    private Map<String,String> environmentVariables = new HashMap<>();
    private Map<String,String> labels = new HashMap<>();
    private Map<String,String> annotations = new HashMap<>();
    private String[] secrets;
    private Map<String,String> limits = new HashMap<>();
    //FunctionLog Parameters
    private String timestamp,text;
    //description parameters
    private Object invocationCount;
    private String functionUrl;
    private int availableReplicas;


    public Function(){}
    public Function(String message) {
        this.message = message;
    }


    public Object getInvocationCount() {
        return invocationCount;
    }

    public void setInvocationCount(Object invocationCount) {
        this.invocationCount = invocationCount;
    }

        public int getAvailableReplicas() {
        return availableReplicas;
    }

    public void setAvailableReplicas(int availableReplicas) {
        this.availableReplicas = availableReplicas;
    }

    public String getFunctionUrl() {
        return functionUrl;
    }

    public void setFunctionUrl(String functionUrl) {
        this.functionUrl = functionUrl;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }




    public Map<String, String> getEnvironmentVariables() {
        return environmentVariables;
    }

    public void setEnvironmentVariables(Map<String, String> environmentVariables) {
        this.environmentVariables = environmentVariables;
    }

    public Map<String, String> getLabels() {
        return labels;
    }

    public void setLabels(Map<String, String> labels) {
        this.labels = labels;
    }

    public Map<String, String> getAnnotations() {
        return annotations;
    }

    public void setAnnotations(Map<String, String> annotations) {
        this.annotations = annotations;
    }

    public String[] getSecrets() {
        return secrets;
    }

    public void setSecrets(String[] secrets) {
        this.secrets = secrets;
    }

    public Map<String, String> getLimits() {
        return limits;
    }

    public void setLimits(Map<String, String> limits) {
        this.limits = limits;
    }

    public Map<String, String> getRequests() {
        return requests;
    }

    public void setRequests(Map<String, String> requests) {
        this.requests = requests;
    }

    private Map<String,String> requests;



    public String getMessage() {
        return message;
    }


    public void setMessage(String message) {
        this.message = message;
    }

    public String getHandlerFileContent() {
        return handlerFileContent;
    }

    public void setHandlerFileContent(String handlerFileContent) {
        this.handlerFileContent = handlerFileContent;
    }

    public String getDependencyFileContent() {
        return dependencyFileContent;
    }

    public void setDependencyFileContent(String dependencyFileContent) {
        this.dependencyFileContent = dependencyFileContent;
    }

    public FunctionStatus getFunctionStatus() {
        return functionStatus;
    }

    public void setFunctionStatus(FunctionStatus functionStatus) {
        this.functionStatus = functionStatus;
    }
/*public Function(String functionName, String projectName, Date createdTime,String  handlerFileContent,String  dependencyFileContent, String runtime, String trigger){
        super();
        this.functionName = functionName;
        this.projectName = projectName;
        this.createdTime = createdTime;
        this.runtime = runtime;
        this.trigger = trigger;
    }*/

    public String getFunctionName(){
        return  functionName;
    }

    public void setFunctionName(String functionName) {
        this.functionName = functionName;
    }

    public String getFunctionImage(){
        return  functionImage;
    }

    public void setFunctionImage(String functionImage) {
        this.functionImage = functionImage;
    }

    public String getProjectName(){
        return  projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public Timestamp getCreatedTime(){
        return  createdTime;
    }

    public void setCreatedTime(Timestamp createdTime) {
        this.createdTime = createdTime;
    }


    public String getRuntime(){
        return runtime;
    }

    public void setRuntime(String runtime) {
        this.runtime = runtime;
    }

    public String getTriggerType(){
        return  triggerType;
    }

    public void setTriggerType(String triggerType) {
        this.triggerType = triggerType;
    }


    public String getHandlerFileName() {
        return handlerFileName;
    }

    public void setHandlerFileName(String handlerFileName) {
        this.handlerFileName = handlerFileName;
    }

    public String getDependencyFileName() {
        return dependencyFileName;
    }

    public void setDependencyFileName(String dependencyFileName) {
        this.dependencyFileName = dependencyFileName;
    }
}
