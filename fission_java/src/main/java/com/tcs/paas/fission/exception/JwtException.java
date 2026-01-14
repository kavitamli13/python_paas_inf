package com.tcs.paas.fission.exception;

public class JwtException extends RuntimeException {
    public JwtException(String message) {
        super(message);
    }
}
