package com.tcs.paas.fission.exception;

public class ProjectCreationException extends Exception {
    public ProjectCreationException(String message) {
        super(message);
    }

    public ProjectCreationException(String message, Throwable cause) {
        super(message, cause);
    }
}
