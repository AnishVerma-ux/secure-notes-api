package com.anish.secure_notes_api.dto;

import java.util.List;

public class ChatRequest {
    private List<Message> messages;
    private String notesContext;

    public static class Message {
        private String role;
        private String content;

        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
    }

    public List<Message> getMessages() { return messages; }
    public void setMessages(List<Message> messages) { this.messages = messages; }
    public String getNotesContext() { return notesContext; }
    public void setNotesContext(String notesContext) { this.notesContext = notesContext; }
}