import { useEffect, useState } from "react";
import "./NoteModal.css";

function NoteModal({ note, onClose, onSave }) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {

        if (note) {

            setTitle(note.title);
            setContent(note.content);

        } else {

            setTitle("");
            setContent("");

        }

    }, [note]);

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            alert("Please fill all fields.");
            return;
        }

        onSave({
            title,
            content,
        });

    };

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>
                    {note ? "Edit Note" : "Create Note"}
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Note Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea
                        rows="8"
                        placeholder="Write your note..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <div className="modal-buttons">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-btn"
                        >
                            {note ? "Update" : "Save"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default NoteModal;