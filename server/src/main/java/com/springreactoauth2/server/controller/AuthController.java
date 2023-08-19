package com.springreactoauth2.server.controller;

import com.google.common.net.HttpHeaders;
import com.springreactoauth2.server.dto.IdTokenRequestDto;
import com.springreactoauth2.server.service.UserService;
import com.springreactoauth2.server.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.security.Principal;

import static com.springreactoauth2.server.dto.UserDto.convertToDto;

@RestController
@RequestMapping("/oauth2")
public class AuthController {

    @Autowired
    UserService userService;

    //handles google authentication callback
    @PostMapping("/login")
    public ResponseEntity LoginWithGoogleOauth2(@RequestBody IdTokenRequestDto requestBody, HttpServletResponse response) {
        String authToken = userService.loginOAuthGoogle(requestBody);
        final ResponseCookie cookie = ResponseCookie.from("AUTH-TOKEN", authToken)
                .httpOnly(true)
                .maxAge(7 * 24 * 3600)
                .path("/")
                .secure(false)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/info")
    public ResponseEntity getUserInfo(Principal principal) {
        User user = userService.getUser(Long.valueOf(principal.getName()));
        return ResponseEntity.ok().body(convertToDto(user));
    }
}
