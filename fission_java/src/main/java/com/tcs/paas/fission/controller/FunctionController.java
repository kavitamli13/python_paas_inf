package com.tcs.paas.fission.controller;


import com.tcs.paas.fission.dto.Function;
import com.tcs.paas.fission.exception.*;
import com.tcs.paas.fission.service.FunctionsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.UnsupportedEncodingException;
import org.springframework.http.HttpHeaders;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class FunctionController {

    @Autowired
    private FunctionsService functionsService;

    Logger logger = LoggerFactory.getLogger(FunctionController.class);

    @PostMapping(value = {"/function/create", MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Function> createFunction(@RequestBody Function function) throws FunctionAlreadyExistsException, CommandExecutionException, OverwriteFileException, FunctionCreationException {
        functionsService.createFunction(function);
        logger.info("Create Function : Successfully created Function " + function.getFunctionName() + ".Sending Response");
        return ResponseEntity.status(HttpStatus.OK).body(new Function("Success"));
    }

    @PostMapping(value = {"/function/deploy", MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Function> deployFunction(@RequestBody Function function) throws FunctionDeploymentException {
//        int  result = functionsService.deployFunction(function);
        int result = functionsService.deployFunctionCLI(function);
        logger.info("deploy Function : Request handling at controller for deploying " + function.getFunctionName());

        logger.info("deploy Function : Successfully deployed Function " + function.getFunctionName() + ".Sending Response");
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Function("Success"));
    }


    @GetMapping(value = {"/function/list"})
    public ResponseEntity<List<Function>> listFunctions(@RequestParam String projectName) {
        List<Function> functionsList = functionsService.listFunctions(projectName);
        return ResponseEntity.status(HttpStatus.OK).body(functionsList);
    }

    @GetMapping(value = {"/function/buildlog"})
    public ResponseEntity<String> getFunctionBuildLog(@RequestParam String projectName, @RequestParam String functionName) throws UnsupportedEncodingException {
        String functionBuildLog = "\"" + functionsService.getFunctionBuildLog(projectName, functionName) + "\"";

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setContentType(org.springframework.http.MediaType.TEXT_PLAIN);
        return new ResponseEntity<String>(functionBuildLog, responseHeaders, HttpStatus.OK);
    }

    @GetMapping(value = {"/function/logs"})
    public ResponseEntity<List<Function>> getFunctionLogs(@RequestParam String projectName, @RequestParam String functionName, @RequestParam String since, @RequestParam int tail) throws FunctionLogException {
        List<Function> functionLogs = functionsService.getFunctionLogs(projectName, functionName, since, tail);
        return ResponseEntity.status(HttpStatus.OK).body(functionLogs);
    }


    @DeleteMapping(value = {"/function/delete"})
    public ResponseEntity<Function> deleteFunction(@RequestBody Function function) throws FunctionDeletionException {
        boolean res = functionsService.deleteFunction(function);
        return ResponseEntity.ok(new Function("Success"));
    }

    @GetMapping(value = {"/function/describe"})
    public ResponseEntity<Function> getFunctionDescription(@RequestParam String projectName, @RequestParam String functionName) throws FunctionDescriptionException {
        System.out.println("Project & Function: " + projectName + " " + functionName);
        Function functionDescription = functionsService.getFunctionDescription(projectName, functionName);
        return ResponseEntity.ok(functionDescription);
    }

    @PutMapping(value = {"/function/update"})
    public ResponseEntity<Function> updateFunction(Function function) throws FunctionUpdateException {
        int res = functionsService.updateFunction(function);
        return ResponseEntity.ok(new Function("Success"));
    }

}
