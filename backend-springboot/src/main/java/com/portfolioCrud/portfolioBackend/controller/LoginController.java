package com.portfolioCrud.portfolioBackend.controller;

import jakarta.servlet.http.Cookie;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;

class Password {

}
@RestController
@CrossOrigin
@RequestMapping("/api/login")
public class LoginController {
    @Value("${admin.password}")
    private String adminPassword;

    @CrossOrigin
    @PostMapping
    public ResponseEntity<String> login(@RequestBody Map<String, String> passwordMap, HttpServletResponse response) {
        String password = passwordMap.get("password");
        if (adminPassword.equals(password)) {
            System.out.println("Correct password!");
            Cookie cookie = new Cookie("auth", "authenticated");
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            response.addCookie(cookie);
            return ResponseEntity.ok("Authenticated");
        } else {
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }
}
