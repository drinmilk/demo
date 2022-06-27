package com.example.demo.utils;

public class Response {
    private boolean hasError;

    public boolean isHasError() {
        return hasError;
    }

    public void setHasError(boolean hasError) {
        this.hasError = hasError;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    private String message;

    public Response(boolean hasError, String message) {
        this.hasError = hasError;
        this.message = message;
    }
}
