package com.anish.secure_notes_api.repository;

import com.anish.secure_notes_api.entity.Attachment;
import com.anish.secure_notes_api.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttachmentRepository extends JpaRepository<Attachment, Long> {

    List<Attachment> findByNote(Note note);

}