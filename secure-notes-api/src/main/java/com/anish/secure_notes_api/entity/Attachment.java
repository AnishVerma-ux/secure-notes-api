package com.anish.secure_notes_api.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "attachments")
public class Attachment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    private String fileType;

    private String filePath;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "note_id")
    private Note note;

    public Attachment() {
    }

    public Attachment(String fileName,
                      String fileType,
                      String filePath,
                      Note note) {

        this.fileName = fileName;
        this.fileType = fileType;
        this.filePath = filePath;
        this.note = note;
    }

    public Long getId() {
        return id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public Note getNote() {
        return note;
    }

    public void setNote(Note note) {
        this.note = note;
    }
}