package com.example.errorhub.dto;

public class ErrorLogResponseDto {

    private Long id;
    private String errorName;
    private String errorMessage;
    private String stackTrace;
    private String cause;
    private String solution;
    private String prevention;
    private String language;
    private String framework;
    private String createdAt;

    // Constructors
    public ErrorLogResponseDto() {}

    public ErrorLogResponseDto(Long id, String errorName, String errorMessage, String stackTrace,
                               String cause, String solution, String prevention, String language,
                               String framework, String createdAt) {
        this.id = id;
        this.errorName = errorName;
        this.errorMessage = errorMessage;
        this.stackTrace = stackTrace;
        this.cause = cause;
        this.solution = solution;
        this.prevention = prevention;
        this.language = language;
        this.framework = framework;
        this.createdAt = createdAt;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}