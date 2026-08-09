package com.example.errorhub.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ErrorLogCreateRequestDto {

    @NotBlank(message = "エラー名は必須です")
    @Size(max = 255, message = "エラー名は255文字以内で入力してください")
    private String errorName;

    @NotBlank(message = "エラーメッセージは必須です")
    @Size(max = 500, message = "メッセージは500文字以内で入力してください")
    private String errorMessage;

    @Size(max = 10000, message = "スタックトレースは10000文字以内で入力してください")
    private String stackTrace;

    @Size(max = 2000, message = "原因は2000文字以内で入力してください")
    private String cause;

    @NotBlank(message = "解決方法は必須です")
    @Size(max = 1000, message = "解決方法は1000文字以内で入力してください")
    private String solution;

    @Size(max = 2000, message = "再発防止策は2000文字以内で入力してください")
    private String prevention;

    @NotBlank(message = "使用言語は必須です")
    @Size(max = 100, message = "言語は100文字以内で入力してください")
    private String language;

    @Size(max = 100, message = "フレームワークは100文字以内で入力してください")
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