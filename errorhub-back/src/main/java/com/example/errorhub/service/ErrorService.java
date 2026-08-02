package com.example.errorhub.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.errorhub.dto.ErrorLogCreateRequestDto;
import com.example.errorhub.dto.ErrorLogUpdateRequestDto;
import com.example.errorhub.dto.ErrorLogResponseDto;
import com.example.errorhub.entity.ErrorLog;
import com.example.errorhub.exception.ErrorNotFoundException;
import com.example.errorhub.repository.ErrorLogRepository;

@Service
public class ErrorService {

    private final ErrorLogRepository errorLogRepository;
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS");

    public ErrorService(ErrorLogRepository errorLogRepository) {
        this.errorLogRepository = errorLogRepository;
    }

    // エラー情報登録（DTO を受け取る）
    public ErrorLogResponseDto saveError(ErrorLogCreateRequestDto requestDto) {
        ErrorLog errorLog = new ErrorLog();
        errorLog.setErrorName(requestDto.getErrorName());
        errorLog.setErrorMessage(requestDto.getErrorMessage());
        errorLog.setStackTrace(requestDto.getStackTrace());
        errorLog.setCause(requestDto.getCause());
        errorLog.setSolution(requestDto.getSolution());
        errorLog.setPrevention(requestDto.getPrevention());
        errorLog.setLanguage(requestDto.getLanguage());
        errorLog.setFramework(requestDto.getFramework());

        ErrorLog saved = errorLogRepository.save(errorLog);
        return convertToResponseDto(saved);
    }

    // エラー情報一覧取得
    public List<ErrorLogResponseDto> getAllErrors() {
        return errorLogRepository.findAll()
                .stream()
                .map(this::convertToResponseDto)
                .toList();
    }

    // エラー情報詳細取得
    public ErrorLogResponseDto getErrorById(Long id) {
        ErrorLog errorLog = errorLogRepository.findById(id)
                .orElseThrow(() ->
                    new ErrorNotFoundException("指定されたエラー情報が存在しません")
                );
        return convertToResponseDto(errorLog);
    }

    // エラー情報更新
    public ErrorLogResponseDto updateError(Long id, ErrorLogUpdateRequestDto requestDto) {
        ErrorLog existingError = errorLogRepository.findById(id)
                .orElseThrow(() ->
                    new ErrorNotFoundException("指定されたエラー情報が存在しません")
                );

        existingError.setErrorName(requestDto.getErrorName());
        existingError.setErrorMessage(requestDto.getErrorMessage());
        existingError.setStackTrace(requestDto.getStackTrace());
        existingError.setCause(requestDto.getCause());
        existingError.setSolution(requestDto.getSolution());
        existingError.setPrevention(requestDto.getPrevention());
        existingError.setLanguage(requestDto.getLanguage());
        existingError.setFramework(requestDto.getFramework());

        ErrorLog updated = errorLogRepository.save(existingError);
        return convertToResponseDto(updated);
    }

    // エラー情報削除
    public void deleteError(Long id) {
        ErrorLog errorLog = errorLogRepository.findById(id)
                .orElseThrow(() ->
                    new ErrorNotFoundException("指定されたエラー情報が存在しません")
                );
        errorLogRepository.delete(errorLog);
    }

    // キーワード検索
    public List<ErrorLogResponseDto> searchByKeyword(String keyword) {
        return errorLogRepository.searchByKeyword(keyword)
                .stream()
                .map(this::convertToResponseDto)
                .toList();
    }

    // エンティティ → DTO 変換
    private ErrorLogResponseDto convertToResponseDto(ErrorLog errorLog) {
        String createdAtStr = errorLog.getCreatedAt() != null
                ? errorLog.getCreatedAt().format(DATE_FORMATTER)
                : null;

        return new ErrorLogResponseDto(
                errorLog.getId(),
                errorLog.getErrorName(),
                errorLog.getErrorMessage(),
                errorLog.getStackTrace(),
                errorLog.getCause(),
                errorLog.getSolution(),
                errorLog.getPrevention(),
                errorLog.getLanguage(),
                errorLog.getFramework(),
                createdAtStr
        );
    }
}