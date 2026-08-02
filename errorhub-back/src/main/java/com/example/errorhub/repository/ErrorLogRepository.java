package com.example.errorhub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.errorhub.entity.ErrorLog;


public interface ErrorLogRepository 
        extends JpaRepository<ErrorLog, Long> {


    @Query("""
            SELECT e FROM ErrorLog e
            WHERE LOWER(e.errorName) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(e.errorMessage) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(e.solution) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(e.cause) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(e.stackTrace) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(e.language) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(e.framework) LIKE LOWER(CONCAT('%', :keyword, '%'))
            """)
    List<ErrorLog> searchByKeyword(
            @Param("keyword") String keyword);


}