import "./NoteCard.css";

import AttachmentList from "../AttachmentList/AttachmentList";
import FileUploader from "../FileUploader/FileUploader";

function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="note-card">

      <h2 className="note-title">
        {note.title}
      </h2>

      <p className="note-content">
        {note.content}
      </p>

      <hr />

      <h4>Attachments</h4>

      <AttachmentList noteId={note.id} />

      <FileUploader
        noteId={note.id}
        refresh={() => window.location.reload()}
      />

      <div className="note-actions">

        <button
          className="edit-btn"
          onClick={() => onEdit(note)}
        >
          ✏ Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(note.id)}
        >
          🗑 Delete
        </button>

      </div>

    </div>
  );
}

export default NoteCard;