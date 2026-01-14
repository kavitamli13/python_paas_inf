package com.tcs.paas.fission.dao.impl;

import com.tcs.paas.fission.dao.FunctionDao;
import com.tcs.paas.fission.dto.Function;
import com.tcs.paas.fission.dto.FunctionStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.dao.EmptyResultDataAccessException;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Repository
public class FunctionDaoImpl implements FunctionDao {

    @Autowired
    JdbcTemplate jdbcTemplate;

    
    // Before Creating function
    @Override
    public int createFunction(String functionName, String projectName, Timestamp createdTime, String runtime, String functionStatus){
        String createQuery = "insert into functions(functionName,projectName,createdTime,runTime,status) values (?,?,?,?,?)";
        System.out.println("insert query::"+createQuery);
        return jdbcTemplate.update(createQuery, new Object[]{functionName, projectName, createdTime, runtime, functionStatus});
    }
    
    //After function BUILT
    @Override
    public int updateFunction(String functionName, String projectName,String functionStatus,String functionImage){
        String query = "update functions set status=? , functionImage=? where projectName=? and functionName=?";
        return jdbcTemplate.update(query,new Object[]{functionStatus,functionImage,projectName,functionName});
    }
    
    // After function ERROR
    public int updateFunction(String functionName, String projectName,String functionStatus){
        String query = "update functions set status=?  where projectName=? and functionName=?";
        return jdbcTemplate.update(query,new Object[]{functionStatus,projectName,functionName});
    }

    @Override
    public int checkFunctionExists(String functionName, String projectName) {
        String query = "select count(*) from functions where functionName=? and projectName=?";
        return jdbcTemplate.queryForObject(query,new Object[]{functionName,projectName},Integer.class);
    }

    @Override
    public String getFunctionImage(String projectName, String functionName) {
        String query = "select functionImage from functions where projectName=? and functionName=?";
        return jdbcTemplate.queryForObject(query,new Object[]{projectName,functionName},String.class);
    }

    @Override
    public int deployFunction(String projectName, String functionName, String triggerType, String backendFunction, String functionStatus,Map<String,String> limits,Map<String,String> envVariables) {
        System.out.println("Inside deploy function::");
//        System.out.println(limits.get("cpu"));
        String cpuLimit = (limits.isEmpty()) ? "" : limits.get("cpu");
        String memoryLimit = (limits.isEmpty()) ? "" : limits.get("memory");
        System.out.println("BEfore query exec:::");
        String query = "update functions set status=?, triggerType=?, backendFunction=?, cpu_limit=?,memory_limit=? where projectName=? and functionName=?";
        System.out.println("Query:::"+query);
        if(!envVariables.isEmpty())
        {
            int rows = saveEnvironmentVariables(projectName,functionName,envVariables);

        }
            return jdbcTemplate.update(query,new Object[]{functionStatus,triggerType,backendFunction,cpuLimit,memoryLimit,projectName,functionName});
        
    }

    @Override
    public List<Function> listFunctions(String projectName) {
        String query = "select functionName, functionImage, functionUrl, projectName,createdTime,runTime,status,triggerType from functions where projectName=?";
        return jdbcTemplate.query(query,new FunctionMapper(),new Object[]{projectName});
   }

    @Override
    public Function getFunctionDetails(String projectName, String functionName) {
        String query = "select functionName,projectName,createdTime,runTime,status,triggerType, functionImage, functionUrl " +
                "from functions where projectName=? and functionName=?";
        //functionName  | projectName | createdTime | runTime | functionImage | functionUrl
        List<Function> res = jdbcTemplate.query(query,new FunctionMapper(), new Object[]{projectName, functionName});
        return res.get(0);
    }



    @Override
    public String getServiceName(String projectName, String functionName) {
        String query = "select backendFunction from functions where projectName=? and functionName=?";
        return jdbcTemplate.queryForObject(query,new Object[]{projectName,functionName},String.class);
    }

    @Override
    public int deleteFunction(String projectName, String functionName) {
        String query = "delete from functions where projectName=? and functionName=?";
        if(!getEnvironmentVariables(projectName,functionName).isEmpty())
        {
            int deletedEnvironmentVariables = deleteEnvironmentVariables(projectName,functionName);
        }
        
        return jdbcTemplate.update(query,new Object[]{projectName,functionName});

    }

    @Override
    public FunctionStatus getFunctionStatus(String projectName, String functionName) {
        try {
            String query = "select status from functions where projectName=? and functionName=?";
            return jdbcTemplate.queryForObject(query,new Object[]{projectName,functionName},FunctionStatus.class);
        }catch(EmptyResultDataAccessException e){
            return null;
        }
    }

    @Override
    public String getFunctionRuntime(String projectName, String functionName) {
        String query = "select runtime from functions where projectName=? and functionName=?";
        return jdbcTemplate.queryForObject(query,new Object[]{projectName,functionName},String.class);
    }

    @Override
    public String getTriggerType(String projectName, String functionName) {
        String query = "select triggerType from functions where projectName=? and functionName=?";
        return jdbcTemplate.queryForObject(query,new Object[]{projectName,functionName},String.class);
    }
    
    
    @Override
    public Map<String,String> getEnvironmentVariables(String projectName,String functionName){

    Map<String,String> envVariables = new HashMap();
    
    jdbcTemplate.query("SELECT keyName, keyValue FROM functionEnvironmentVariables WHERE projectName=? and functionName=?",new Object[]{projectName,functionName},(ResultSet rs) -> 
    {
if(rs.getString("keyName")!=null &&  rs.getString("keyValue")!=null)
{
    envVariables.put(rs.getString("keyName"), rs.getString("keyValue"));
}

while(rs.next())
{
    envVariables.put(rs.getString("keyName"), rs.getString("keyValue"));
}
    });
       return envVariables;

}
    @Override
    public Map<String,String> getLimits(String projectName,String functionName)
    {
        Map<String,String> limits = new HashMap();

        String query = "select cpu_limit from functions where projectName=? and functionName=?";
        String cpu_limit = jdbcTemplate.queryForObject(query,new Object[]{projectName,functionName},String.class);

        query = "select memory_limit from functions where projectName=? and functionName=?";
        String memory_limit = jdbcTemplate.queryForObject(query,new Object[]{projectName,functionName},String.class);

        limits.put("cpu_limit",cpu_limit);
        limits.put("memory_limit",memory_limit);
        
        return limits;
    }


    @Override
    public int updateTriggerType(String projectName, String functionName,String newTriggerType) {
        String query = "update functions set triggerType = ? where projectName=? and functionName=?";
        return jdbcTemplate.update(query,new Object[]{newTriggerType,projectName,functionName});
    }
    
    
    
    
    public int saveEnvironmentVariables(String projectName, String functionName,Map<String,String> envVariables)
{
     String sql = "INSERT INTO functionEnvironmentVariables(projectName,functionName,keyName,keyValue) VALUES (?,?,?,?)";
     int rows = 0;
     for (final Map.Entry<String, String> entry : envVariables.entrySet()) {
        rows=rows+jdbcTemplate.update(sql,new Object[]{projectName,functionName,entry.getKey(),entry.getValue()});
     }


    // for (final Map.Entry<String, String> entry : envVariables.entrySet()) {
    // System.out.println(entry.getKey() + " = " + entry.getValue());
    
    //  rows = jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
    
    // @Override
    // public void setValues(final PreparedStatement ps, final int i) throws SQLException {
    //                    ps.setString(1, projectName);
    //                    ps.setString(2, functionName);
    //                    ps.setString(3,entry.getKey());
    //                    ps.setString(4,entry.getValue());
    // }
    
    // public int getBatchSize() {
    //                     return envVariables.size();
    //             }
    // });
    // }
    return rows;
}
    public int deleteEnvironmentVariables(String projectName, String functionName)
    {
        String query = "delete from functionEnvironmentVariables where projectName=? and functionName=?";
        return jdbcTemplate.update(query,new Object[]{projectName,functionName});
    }
}





class FunctionMapper implements RowMapper<Function> {
    public Function mapRow(ResultSet rs, int rowNum) throws SQLException {
        Function function = new Function();
        function.setFunctionName(rs.getString("functionName"));
        function.setProjectName(rs.getString("projectName"));
        function.setCreatedTime(rs.getTimestamp("createdTime"));
        function.setRuntime(rs.getString("runTime"));
        function.setFunctionStatus(FunctionStatus.valueOf(rs.getString("status")));
        function.setTriggerType(rs.getString("triggerType"));
        function.setFunctionImage(rs.getString("functionImage"));
        function.setFunctionUrl(rs.getString("functionUrl"));
        return function;
    }

}
