package com.anish.secure_notes_api.controller;

import com.anish.secure_notes_api.entity.Attachment;
import com.anish.secure_notes_api.entity.Note;
import com.anish.secure_notes_api.entity.User;
import com.anish.secure_notes_api.repository.AttachmentRepository;
import com.anish.secure_notes_api.repository.NoteRepository;
import com.anish.secure_notes_api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/attachments")
public class AttachmentController {

    private final AttachmentRepository attachmentRepository;
    private final NoteRepository noteRepository;
    private final UserRepository userRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public AttachmentController(
            AttachmentRepository attachmentRepository,
            NoteRepository noteRepository,
            UserRepository userRepository
    ) {
        this.attachmentRepository = attachmentRepository;
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
    }

    // Upload File
    @PostMapping("/upload/{noteId}")
    public ResponseEntity<?> uploadFile(
            @PathVariable Long noteId,
            @RequestParam("file") MultipartFile file,
            Authentication authentication
    ) {

        try {

            User user = userRepository.findByEmail(authentication.getName())
                    .orElseThrow();

            Note note = noteRepository.findById(noteId)
                    .orElseThrow();

            if (!note.getOwner().getId().equals(user.getId())) {
                return ResponseEntity.status(403).body("Access Denied");
            }

            Path folder = Paths.get(uploadDir);

            if (!Files.exists(folder)) {
                Files.createDirectories(folder);
            }

            String storedName =
                    UUID.randomUUID() + "_" + file.getOriginalFilename();

            Path path = folder.resolve(storedName);

            Files.copy(file.getInputStream(), path);

            Attachment attachment = new Attachment();

            attachment.setFileName(file.getOriginalFilename());
            attachment.setStoredFileName(storedName);
            attachment.setFilePath(path.toString());
            attachment.setFileSize(file.getSize());
            attachment.setFileType(file.getContentType());
            attachment.setNote(note);

            attachmentRepository.save(attachment);

            return ResponseEntity.ok(attachment);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.internalServerError()
                    .body("Upload Failed");

        }
    }

    // Get Attachments
    @GetMapping("/{noteId}")
    public List<Attachment> getAttachments(
            @PathVariable Long noteId
    ) {

        return attachmentRepository.findByNoteId(noteId);

    }

    // Download
    @GetMapping("/download/{id}")
    public ResponseEntity<?> download(
            @PathVariable Long id
    ) {

        try {

            Attachment attachment =
                    attachmentRepository.findById(id).orElseThrow();

            Path path = Paths.get(attachment.getFilePath());

            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" +
                                    attachment.getFileName() + "\""
                    )
                    .body(Files.readAllBytes(path));

        } catch (Exception e) {

            return ResponseEntity.notFound().build();

        }

    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(
            @PathVariable Long id,
            Authentication authentication
    ) {

        try {

            User user = userRepository.findByEmail(authentication.getName())
                    .orElseThrow();

            Attachment attachment =
                    attachmentRepository.findById(id)
                            .orElseThrow();

            if (!attachment.getNote().getOwner().getId().equals(user.getId())) {

                return ResponseEntity.status(403)
                        .body("Access Denied");

            }

            Files.deleteIfExists(
                    Paths.get(attachment.getFilePath())
            );

            attachmentRepository.delete(attachment);

            return ResponseEntity.ok("Deleted");

        } catch (Exception e) {

            return ResponseEntity.internalServerError()
                    .body("Delete Failed");

        }

    }

}