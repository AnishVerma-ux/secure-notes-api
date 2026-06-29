import "./NoteCard.css";
import AttachmentList from "../AttachmentList/AttachmentList";
import FileUploader from "../FileUploader/FileUploader";

function NoteCard({ note, onEdit, onDelete }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric"
    });
  };

  return (
    <div className="note-card">
      <div className="note-header">
        <div>
          <h2 className="note-title">{note.title}</h2>
          <span className="note-date">🗓 {formatDate(note.createdAt)}</span>
        </div>
        <span className="note-badge">Personal</span>
      </div>

      <p className="note-content">{note.content}</p>

      <div className="note-attachments">
        <p className="attachments-label">Attachments</p>
        <AttachmentList noteId={note.id} />
        <FileUploader noteId={note.id} refresh={() => window.location.reload()} />
      </div>

      <div className="note-actions">
        <button className="edit-btn" onClick={() => onEdit(note)}>
          ✏ Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(note.id)}>
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;