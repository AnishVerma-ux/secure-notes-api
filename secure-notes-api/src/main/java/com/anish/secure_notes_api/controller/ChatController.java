package com.anish.secure_notes_api.controller;

import com.anish.secure_notes_api.dto.ChatRequest;
import com.anish.secure_notes_api.service.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ResponseEntity<?> chat(
            @RequestBody ChatRequest request,
            Authentication authentication) {

        if (authentication == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        String reply = chatService.chat(request);
        return ResponseEntity.ok(Map.of("reply", reply));
    }
}