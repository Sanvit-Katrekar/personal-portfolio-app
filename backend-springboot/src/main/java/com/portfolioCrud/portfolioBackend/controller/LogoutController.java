package com.portfolioCrud.portfolioBackend.controller;

import jakarta.servlet.http.Cookie;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;

class Password {

}
@RestController
@CrossOrigin
@RequestMapping("/api/logout")
public class LogoutController {
    @CrossOrigin
    @GetMapping
    public ResponseEntity<String> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("auth", null);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0); // Invalidate the cookie
        response.addCookie(cookie);
        System.out.println("Finally logged out lesss go");
        return ResponseEntity.ok("Logged out");
    }
}
