package com.example.errorhub.entity;


import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.validation.constraints.NotBlank;


@Entity
public class ErrorLog {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // エラー名
    @NotBlank(message = "エラー名は必須です")
    private String errorName;


    // 実際のエラーメッセージ
    @NotBlank(message = "エラーメッセージは必須です")
    private String errorMessage;


    // スタックトレース
    private String stackTrace;


    // 発生原因
    private String cause;


    // 解決方法
    @NotBlank(message = "解決方法は必須です")
    private String solution;


    // 再発防止策
    private String prevention;


    // 使用言語
    @NotBlank(message = "使用言語は必須です")
    private String language;


    // フレームワーク
    private String framework;


    // 登録日時
    private LocalDateTime createdAt;



    @PrePersist
    public void prePersist(){

        this.createdAt = LocalDateTime.now();

    }



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


    public LocalDateTime getCreatedAt() {
        return createdAt;
    }


    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

}