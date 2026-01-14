package com.tcs.paas.fission.filter;

import com.tcs.paas.fission.controller.UserController;
import com.tcs.paas.fission.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AuthenticationAndAuthorizationFilter extends OncePerRequestFilter {

    @Autowired
    UserController userController;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {


//        String uri = httpServletRequest.getRequestURI();
//        String roleType = "";
//        //System.out.println("URL "+uri);
//        try{
//            roleType = userController.getRoleType(uri);
//        }catch(Exception e){
//            httpServletResponse.sendError(HttpServletResponse.SC_NOT_FOUND);
//            return;
//        }
//        //System.out.println("Role type: "+roleType);
//
//        if(httpServletRequest.getMethod().equals("OPTIONS")){
//           filterChain.doFilter(httpServletRequest,httpServletResponse);
//           return;
//        }
//
//        if(!roleType.equals("PUBLIC")){
//                String token = httpServletRequest.getHeader("token");
//                String userId = httpServletRequest.getHeader("userId");
//                //System.out.println("token: "+token);
//                //System.out.println("userId: "+userId);
//
//                try{
//                   Boolean isAuthorized= jwtUtil.validateToken(token,userId);
//                   if(!isAuthorized) {
//                       httpServletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED);
//                       return;
//                   }
//                }
//                catch(ExpiredJwtException e){
//                    throw new JwtException("Session Expired");
//                }
//
//                //System.out.println("Token is valid");
//
//
//
//                if(roleType.equals("ORG")){
//                    if (!isAuthorized(uri, userId)) {
//                        httpServletResponse.sendError(HttpServletResponse.SC_FORBIDDEN);
//                        return;
//                    }
//                }
//                if(roleType.equals("PROJECT")){
//                    //System.out.println("Inside Project role");
//                    String projectName = httpServletRequest.getHeader("projectName"); //getProjectName(httpServletRequest);
//                    if (!isAuthorized(uri, userId, projectName)) {
//                        httpServletResponse.sendError(HttpServletResponse.SC_FORBIDDEN);
//                        return;
//                    }
//                }
//        }

        //System.out.println("Role validation is done, Next filterchain will do");


       filterChain.doFilter(httpServletRequest,httpServletResponse);

    }




    private boolean isAuthorized(String uri, String userId){        
        String userRoleId = userController.getUserRoleId(userId);  
        int rows = userController.checkPermissions(uri,userRoleId);
        
        if(rows > 0)
            return true;
        else
            return false;
    }

    private boolean isAuthorized(String uri, String userId, String projectName){       
        String projectRoleId = userController.getProjectRoleId(userId,projectName); 
        int rows = userController.checkPermissions(uri,projectRoleId);
        if(rows > 0)
            return true;
        else
            return false;
    }

}
