package com.aurelia.resort.controller;

import com.aurelia.resort.dto.ApiResponse;
import com.aurelia.resort.dto.AuthRequest;
import com.aurelia.resort.dto.AuthResponse;
import com.aurelia.resort.dto.RegisterRequest;
import com.aurelia.resort.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody AuthRequest authRequest) {
        AuthResponse response = authService.login(authRequest);
        return ResponseEntity.ok(ApiResponse.success("Welcome back to Aurelia Retreat.", response));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest registerRequest) {
        AuthResponse response = authService.register(registerRequest);
        return ResponseEntity.ok(ApiResponse.success("Membership successfully created. Welcome to Aurelia.", response));
    }
}
