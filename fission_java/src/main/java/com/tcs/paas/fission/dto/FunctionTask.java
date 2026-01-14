package com.tcs.paas.fission.dto;

import java.util.Map;

public class FunctionTask {
    String executionType;
    String command;
    Map<String,String> properties;

    @Override
    public String toString(){
        return "Execution type:-"+executionType+"::Command:-"+command+"::Properties:"+properties;
    }
    public FunctionTask(String executionType, String command) {
        this.executionType = executionType;
        this.command = command;
    }

    public FunctionTask(String executionType, Map<String, String> properties) {
        this.executionType = executionType;
        this.properties = properties;
    }

    public String getExecutionType() {
        return executionType;
    }

    public void setExecutionType(String executionType) {
        this.executionType = executionType;
    }

    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        this.command = command;
    }

    public Map<String, String> getProperties() {
        return properties;
    }

    public void setProperties(Map<String, String> properties) {
        this.properties = properties;
    }


}
