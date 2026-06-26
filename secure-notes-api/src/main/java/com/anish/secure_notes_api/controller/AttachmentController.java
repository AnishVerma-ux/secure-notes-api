package com.anish.secure_notes_api.controller;

import com.anish.secure_notes_api.entity.Attachment;
import com.anish.secure_notes_api.entity.Note;
import com.anish.secure_notes_api.entity.User;
import com.anish.secure_notes_api.repository.AttachmentRepository;
import com.anish.secure_notes_api.repository.NoteRepository;
import com.anish.secure_notes_api.repository.UserRepository;
import com.anish.secure_notes_api.service.FileStorageService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/attachments")
public class AttachmentController {

    private final AttachmentRepository attachmentRepository;
    private final NoteRepository noteRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    public AttachmentController(
            AttachmentRepository attachmentRepository,
            NoteRepository noteRepository,
            UserRepository userRepository,
            FileStorageService fileStorageService) {

        this.attachmentRepository = attachmentRepository;
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
        this.fileStorageService = fileStorageService;
    }

    // Upload attachment
    @PostMapping("/notes/{noteId}")
    public ResponseEntity<?> uploadAttachment(
            @PathVariable Long noteId,
            @RequestParam("file") MultipartFile file,
            Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        // Only owner can upload
        if (!note.getOwner().getId().equals(user.getId())) {
            return ResponseEntity.status(403)
                    .body("You cannot upload files to another user's note.");
        }

        String storedFileName = fileStorageService.storeFile(file);

        Attachment attachment = new Attachment();
        attachment.setFileName(file.getOriginalFilename());
        attachment.setFileType(file.getContentType());
        attachment.setFilePath(storedFileName);
        attachment.setNote(note);

        attachmentRepository.save(attachment);

        return ResponseEntity.ok(attachment);
    }

    // Download attachment
    @GetMapping("/{attachmentId}")
    public ResponseEntity<Resource> downloadAttachment(
            @PathVariable Long attachmentId,
            Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Attachment attachment = attachmentRepository.findById(attachmentId)
                .orElseThrow(() -> new RuntimeException("Attachment not found"));

        // Only owner can download
        if (!attachment.getNote().getOwner().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }

        Resource resource = fileStorageService.loadFile(attachment.getFilePath());

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(attachment.getFileType()))
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + attachment.getFileName() + "\""
                )
                .body(resource);
    }
    @DeleteMapping("/{attachmentId}")
    public ResponseEntity<?> deleteAttachment(
            @PathVariable Long attachmentId,
            Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Attachment attachment = attachmentRepository.findById(attachmentId)
                .orElseThrow(() -> new RuntimeException("Attachment not found"));

        // Only the owner of the note can delete the attachment
        if (!attachment.getNote().getOwner().getId().equals(user.getId())) {
            return ResponseEntity.status(403)
                    .body("You cannot delete another user's attachment.");
        }

        // Delete the physical file
        fileStorageService.deleteFile(attachment.getFilePath());

        // Delete the database record
        attachmentRepository.delete(attachment);

        return ResponseEntity.ok("Attachment deleted successfully");
    }
    @GetMapping("/note/{noteId}")
    public ResponseEntity<?> getAttachmentsByNote(
            @PathVariable Long noteId,
            Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found"));
        System.out.println("Logged-in user ID: " + user.getId());
        System.out.println("Note owner ID: " + note.getOwner().getId());
        if (!note.getOwner().getId().equals(user.getId())) {
            return ResponseEntity.status(403)
                    .body("You cannot view another user's attachments.");
        }

        List<Attachment> attachments = attachmentRepository.findByNote(note);

        return ResponseEntity.ok(attachments);
    }

}