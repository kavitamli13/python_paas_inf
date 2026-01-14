package com.tcs.paas.fission.exception;

public class UserAlreadyExistsException extends Exception {
    public UserAlreadyExistsException(String msg){
        super(msg);
    }
}
