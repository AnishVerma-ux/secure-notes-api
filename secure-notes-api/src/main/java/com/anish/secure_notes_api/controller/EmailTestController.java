package com.anish.secure_notes_api.controller;

import com.anish.secure_notes_api.service.EmailService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class EmailTestController {

    private final EmailService emailService;

    public EmailTestController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/email")
    public String sendTestEmail() {

        emailService.sendEmail(
                "anish631@gmail.com",
                "Secure Notes API Test",
                "Congratulations! Your Spring Boot email configuration is working."
        );

        return "Email Sent Successfully!";
    }
}