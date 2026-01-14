package com.tcs.paas.fission.service;

import com.tcs.paas.fission.dto.Function;
import com.tcs.paas.fission.exception.*;

import java.io.UnsupportedEncodingException;

import java.util.List;

public interface FunctionsService {

    public void createFunction(Function function) throws FunctionAlreadyExistsException, CommandExecutionException, OverwriteFileException, FunctionCreationException;

    public int deployFunction(Function function)  throws FunctionDeploymentException;

    public int deployFunctionCLI(Function function)  throws FunctionDeploymentException;

    public List<Function> listFunctions(String projectName);
    
    public String getFunctionBuildLog(String projectName,String functionName) throws UnsupportedEncodingException;

    public List<Function> getFunctionLogs(String projectName,String functionName,String since,int tail) throws FunctionLogException;;

    public boolean deleteFunction(Function function) throws FunctionDeletionException;

    public Function getFunctionDescription(String projectName,String functionName) throws FunctionDescriptionException;

   public int updateFunction(Function function) throws FunctionUpdateException;
   public Object getInvocationCountForFunction(String functionName);

}
