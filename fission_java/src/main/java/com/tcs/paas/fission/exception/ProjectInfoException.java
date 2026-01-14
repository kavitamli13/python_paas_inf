package com.tcs.paas.fission.exception;

public class ProjectInfoException extends Exception {
    public ProjectInfoException(String message) {

        super(message);
    }

    public ProjectInfoException(String message, Throwable cause) {
        super(message, cause);
    }
}
