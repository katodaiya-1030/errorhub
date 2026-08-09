package com.example.errorhub.controller;

import java.net.URI;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import com.example.errorhub.dto.ErrorLogCreateRequestDto;
import com.example.errorhub.dto.ErrorLogUpdateRequestDto;
import com.example.errorhub.dto.ErrorLogResponseDto;
import com.example.errorhub.service.ErrorService;

@RestController
@RequestMapping("/api/errors")
public class ErrorController {

    private final ErrorService errorService;

    public ErrorController(ErrorService errorService) {
        this.errorService = errorService;
    }

    // キーワード検索（ページング対応）
    @GetMapping("/search")
    public ResponseEntity<Page<ErrorLogResponseDto>> searchErrors(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page) {
        Page<ErrorLogResponseDto> results = errorService.searchByKeyword(keyword, page);
        return ResponseEntity.ok(results);
    }

    // エラー情報登録
    @PostMapping
    public ResponseEntity<ErrorLogResponseDto> createError(
            @Valid @RequestBody ErrorLogCreateRequestDto requestDto) {
        ErrorLogResponseDto responseDto = errorService.saveError(requestDto);
        return ResponseEntity
                .created(URI.create("/api/errors/" + responseDto.getId()))
                .body(responseDto);
    }

    // エラー情報一覧取得（ページング対応）
    @GetMapping
    public ResponseEntity<Page<ErrorLogResponseDto>> getErrors(
            @RequestParam(defaultValue = "0") int page) {
        Page<ErrorLogResponseDto> logs = errorService.getAllErrors(page);
        return ResponseEntity.ok(logs);
    }

    // エラー情報詳細取得
    @GetMapping("/{id}")
    public ResponseEntity<ErrorLogResponseDto> getErrorById(
            @PathVariable Long id) {
        ErrorLogResponseDto log = errorService.getErrorById(id);
        return ResponseEntity.ok(log);
    }

    // エラー情報更新
    @PutMapping("/{id}")
    public ResponseEntity<ErrorLogResponseDto> updateError(
            @PathVariable Long id,
            @Valid @RequestBody ErrorLogUpdateRequestDto requestDto) {
        ErrorLogResponseDto responseDto = errorService.updateError(id, requestDto);
        return ResponseEntity.ok(responseDto);
    }

    // エラー情報削除
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteError(
            @PathVariable Long id) {
        errorService.deleteError(id);
        return ResponseEntity.noContent().build();
    }
}