package com.anish.secure_notes_api.controller;

import com.anish.secure_notes_api.entity.Note;
import com.anish.secure_notes_api.entity.User;
import com.anish.secure_notes_api.repository.NoteRepository;
import com.anish.secure_notes_api.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;

    public NoteController(NoteRepository noteRepository,
                          UserRepository userRepository) {
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
    }

    // Get all notes of logged-in user
    @GetMapping
    public ResponseEntity<?> getMyNotes(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(noteRepository.findByOwner(user));
    }
    // Create a new note
    @PostMapping
    public Note createNote(@Valid @RequestBody Note note,
                           Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        note.setOwner(user);

        return noteRepository.save(note);
    }

    // Update a note
    @PutMapping("/{id}")
    public ResponseEntity<?> updateNote(@PathVariable Long id,
                                        @Valid @RequestBody Note updatedNote,
                                        Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return noteRepository.findById(id)
                .map(note -> {

                    if (!note.getOwner().getId().equals(user.getId())) {
                        return ResponseEntity.status(403)
                                .body("You cannot update another user's note.");
                    }

                    note.setTitle(updatedNote.getTitle());
                    note.setContent(updatedNote.getContent());

                    return ResponseEntity.ok(noteRepository.save(note));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete a note
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable Long id,
                                        Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return noteRepository.findById(id)
                .map(note -> {

                    if (!note.getOwner().getId().equals(user.getId())) {
                        return ResponseEntity.status(403)
                                .body("You cannot delete another user's note.");
                    }

                    noteRepository.delete(note);

                    return ResponseEntity.ok("Note deleted successfully");
                })
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/search")
    public ResponseEntity<?> searchNotes(
            @RequestParam String keyword,
            Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(
                noteRepository.findByOwnerAndTitleContainingIgnoreCaseOrOwnerAndContentContainingIgnoreCase(
                        user,
                        keyword,
                        user,
                        keyword
                )
        );
    }
}