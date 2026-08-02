package com.example.errorhub.exception;


import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;



@RestControllerAdvice
public class GlobalExceptionHandler {



    // バリデーションエラー（400）
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationException(
            MethodArgumentNotValidException ex) {


        Map<String, String> errors = new HashMap<>();


        ex.getBindingResult()
          .getFieldErrors()
          .forEach(error -> {

              errors.put(
                  error.getField(),
                  error.getDefaultMessage()
              );

          });



        Map<String, Object> response = new HashMap<>();

        response.put(
            "message",
            "入力内容に問題があります"
        );

        response.put(
            "errors",
            errors
        );


        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);

    }




    // データ未存在エラー（404）
    @ExceptionHandler(ErrorNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNotFoundException(
            ErrorNotFoundException ex) {


        Map<String, Object> response = new HashMap<>();


        response.put(
            "message",
            ex.getMessage()
        );


        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);

    }


}