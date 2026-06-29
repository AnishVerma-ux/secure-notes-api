import "./NoteViewModal.css";

function NoteViewModal({ note, onClose }) {
  if (!note) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric", year: "numeric"
    });
  };

  return (
    <div className="view-overlay" onClick={onClose}>
      <div className="view-modal" onClick={(e) => e.stopPropagation()}>
        <div className="view-modal-header">
          <div>
            <h2>{note.title}</h2>
            <p className="view-date">📅 {formatDate(note.createdAt)}</p>
          </div>
          <button className="view-close" onClick={onClose}>✕</button>
        </div>
        <div className="view-modal-body">
          <p>{note.content}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteViewModal;