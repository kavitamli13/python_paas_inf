package com.tcs.paas.fission.dao;

import com.tcs.paas.fission.dto.Function;
import com.tcs.paas.fission.dto.FunctionStatus;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@Repository
public interface FunctionDao {
    // Before Creating function
    public int createFunction(String functionName, String projectName, Timestamp createdTime, String runtime, String functionStatus);
    //After function BUILT
    public int updateFunction(String functionName, String projectName,String functionStatus,String functionImage);
    // After function ERROR
    public int updateFunction(String functionName, String projectName,String functionStatus);
    
    public int checkFunctionExists(String functionName,String projectName);
    public String getFunctionImage(String projectName,String functionName);
    public Function getFunctionDetails(String projectName, String functionName);
    public  int deployFunction(String projectName,String functionName,String triggerType,String backendFunction,String functionStatus,Map<String,String> limits,Map<String,String> envVariables);
    public List<Function> listFunctions(String projectName);
    public String getServiceName(String projectName,String functionName);
    public int  deleteFunction(String projectName,String functionName);
    public FunctionStatus getFunctionStatus(String projectName,String functionName);
    public String getFunctionRuntime(String projectName, String functionName);
    public String getTriggerType(String projectName,String functionName);
    public int updateTriggerType(String projectName,String functionName,String newTriggerType);
    public Map<String,String> getEnvironmentVariables(String projectName,String functionName);
    public Map<String,String> getLimits(String projectName,String functionName);

}
