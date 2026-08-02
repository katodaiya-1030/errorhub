package com.example.errorhub.dto;

import jakarta.validation.constraints.NotBlank;

public class ErrorLogCreateRequestDto {

    @NotBlank(message = "エラー名は必須です")
    private String errorName;

    @NotBlank(message = "エラーメッセージは必須です")
    private String errorMessage;

    private String stackTrace;

    private String cause;

    @NotBlank(message = "解決方法は必須です")
    private String solution;

    private String prevention;

    @NotBlank(message = "使用言語は必須です")
    private String language;

    private String framework;

    // Getters & Setters
    public String getErrorName() {
        return errorName;
    }

    public void setErrorName(String errorName) {
        this.errorName = errorName;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getStackTrace() {
        return stackTrace;
    }

    public void setStackTrace(String stackTrace) {
        this.stackTrace = stackTrace;
    }

    public String getCause() {
        return cause;
    }

    public void setCause(String cause) {
        this.cause = cause;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

    public String getPrevention() {
        return prevention;
    }

    public void setPrevention(String prevention) {
        this.prevention = prevention;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getFramework() {
        return framework;
    }

    public void setFramework(String framework) {
        this.framework = framework;
    }
}