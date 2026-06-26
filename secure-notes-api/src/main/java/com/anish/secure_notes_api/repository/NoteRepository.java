package com.anish.secure_notes_api.repository;

import com.anish.secure_notes_api.entity.Note;
import com.anish.secure_notes_api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {

    List<Note> findByOwner(User owner);

}