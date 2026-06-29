package com.anish.secure_notes_api.service;

import com.anish.secure_notes_api.dto.ChatRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatService {

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.api.url}")
    private String apiUrl;

    private final WebClient webClient;

    public ChatService(WebClient.Builder builder) {
        this.webClient = builder.build();
    }

    public String chat(ChatRequest request) {

        System.out.println("=== CHAT SERVICE ===");
        System.out.println("Messages count: " + request.getMessages().size());
        System.out.println("Notes context length: " + request.getNotesContext().length());

        List<Map<String, String>> messages = new ArrayList<>();

        messages.add(Map.of(
                "role", "system",
                "content", """
                You are a helpful assistant for a secure notes app.
                The user has the following notes:
                
                %s
                
                Answer questions based only on these notes.
                If the answer isn't in the notes, say so clearly.
                Be concise and helpful.
                """.formatted(request.getNotesContext())
        ));

        for (ChatRequest.Message msg : request.getMessages()) {
            String role = msg.getRole().equals("assistant") ? "assistant" : "user";
            String content = msg.getContent();
            if (content != null && !content.isBlank()) {
                messages.add(Map.of("role", role, "content", content));
            }
        }

        boolean hasUserMessage = messages.stream()
                .anyMatch(m -> m.get("role").equals("user"));

        if (!hasUserMessage) {
            return "Please ask me a question about your notes.";
        }

        System.out.println("Sending " + messages.size() + " messages to Groq");

        Map<String, Object> body = new HashMap<>();
        body.put("model", "llama-3.3-70b-versatile");  // ← replace llama3-8b-8192 with this
        body.put("messages", messages);
        body.put("max_tokens", 1000);
        body.put("temperature", 0.7);

        try {
            Map response = webClient.post()
                    .uri(apiUrl)
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + apiKey)
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            System.out.println("Groq response received: " + response);

            List<Map> choices = (List<Map>) response.get("choices");
            Map message = (Map) choices.get(0).get("message");
            return (String) message.get("content");

        } catch (WebClientResponseException e) {
            System.out.println("=== GROQ ERROR ===");
            System.out.println("Status: " + e.getStatusCode());
            System.out.println("Response body: " + e.getResponseBodyAsString());
            e.printStackTrace();
            return "Sorry, I couldn't process your request. Please try again.";
        } catch (Exception e) {
            System.out.println("=== GENERAL ERROR ===");
            System.out.println("Message: " + e.getMessage());
            e.printStackTrace();
            return "Sorry, I couldn't process your request. Please try again.";
        }
    }
}