package com.tcs.paas.fission.util;

import com.tcs.paas.fission.dto.Function;
import org.json.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.util.Base64;

public class OpenFaasGatewayUtil {



    public static HttpHeaders getGatewayAuthHeaders(String openfaasCredentials){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        System.out.println("before auth headers:::");
        headers.add("Authorization", "Basic " + Base64.getEncoder() .encodeToString(openfaasCredentials.getBytes()));
        System.out.println("openfaasss:::"+ Base64.getEncoder() .encodeToString(openfaasCredentials.getBytes()));
        return headers;
    }
    public static String getJsonObjectForDeployFunction(Function function,String serviceName,String functionImageName){
        
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("service",serviceName);
        jsonObject.put("network", "func_functions");
        jsonObject.put("image",functionImageName);
        jsonObject.put("envVars",function.getEnvironmentVariables());
        jsonObject.put("labels",function.getLabels());
        jsonObject.put("annotations",function.getAnnotations());
        jsonObject.put("secrets",function.getSecrets());
        jsonObject.put("limits",function.getLimits());
        return jsonObject.toString();
    }

    public static String getJsonObjectForDeleteFunction(String backendFunctionName){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("functionname",backendFunctionName);
        return jsonObject.toString();
    }

    public static String getJsonObjectForUpdateFunction(Function function,String serviceName,String functionImageName){

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("service",serviceName);
        jsonObject.put("image",functionImageName);
        jsonObject.put("network", "func_functions");
        jsonObject.put("labels",function.getLabels());
        jsonObject.put("annotations",function.getAnnotations());
        return jsonObject.toString();
    }



}
