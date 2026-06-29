import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/NoteCard/NoteCard";
import NoteModal from "../../components/NoteModal/NoteModal";
import NoteViewModal from "../../components/NoteViewModal/NoteViewModal";
import ChatBot from "../../components/ChatBot/ChatBot";

// add before closing </div> of the dashboard

import noteService from "../../services/noteService";

import "./Dashboard.css";

function Dashboard() {

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const [viewingNote, setViewingNote] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const response = await noteService.getNotes();
            setNotes(response.data);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    toast.error("Please login again.");
                } else if (error.response.status === 403) {
                    toast.error("Access denied.");
                } else {
                    toast.error("Server error.");
                }
            } else {
                toast.error("Cannot connect to server.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSaveNote = async (noteData) => {
        try {
            if (editingNote) {
                await noteService.updateNote(editingNote.id, noteData);
                toast.success("Note updated");
            } else {
                await noteService.createNote(noteData);
                toast.success("Note created");
            }
            setShowModal(false);
            setEditingNote(null);
            fetchNotes();
        } catch (error) {
            console.error(error);
            toast.error("Operation failed");
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Delete this note?");
        if (!confirmDelete) return;
        try {
            await noteService.deleteNote(id);
            toast.success("Note deleted");
            fetchNotes();
        } catch (error) {
            console.error(error);
            toast.error("Unable to delete note");
        }
    };

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="dashboard">

            <Sidebar />

            <div className="dashboard-main">

                <Navbar
                    search={search}
                    setSearch={setSearch}
                    openModal={() => {
                        setEditingNote(null);
                        setShowModal(true);
                    }}
                />

                <div className="dashboard-stats">
    <div className="stat-card">
        <div className="stat-icon" style={{ background: "#eff6ff" }}>📝</div>
        <div>
            <p className="stat-label">Total notes</p>
            <p className="stat-value">{notes.length}</p>
        </div>
    </div>
    <div className="stat-card">
        <div className="stat-icon" style={{ background: "#f0fdf4" }}>🕐</div>
        <div>
            <p className="stat-label">Last updated</p>
            <p className="stat-value stat-value-sm">
                {notes.length > 0 ? "Today" : "—"}
            </p>
        </div>
    </div>
    <div className="stat-card">
        <div className="stat-icon" style={{ background: "#fefce8" }}>🔍</div>
        <div>
            <p className="stat-label">Search results</p>
            <p className="stat-value">{filteredNotes.length}</p>
        </div>
    </div>
</div>

                <div className="dashboard-content">
                    {loading ? (
                        <div className="loading-state">
                            <p>Loading your notes...</p>
                        </div>
                    ) : filteredNotes.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">📝</div>
                            <h2>No notes yet</h2>
                            <p>Click "Add note" to create your first note.</p>
                        </div>
                    ) : (
                        <div className="notes-grid">
                            {filteredNotes.map(note => (
                                <NoteCard
                                    key={note.id}
                                    note={note}
                                    onView={(note) => setViewingNote(note)}
                                    onEdit={(note) => {
                                        setEditingNote(note);
                                        setShowModal(true);
                                    }}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    )}
                </div>

            </div>

            {showModal && (
                <NoteModal
                    note={editingNote}
                    onClose={() => {
                        setShowModal(false);
                        setEditingNote(null);
                    }}
                    onSave={handleSaveNote}
                />
            )}

            {viewingNote && (
                <NoteViewModal
                    note={viewingNote}
                    onClose={() => setViewingNote(null)}
                />
            )}
<ChatBot />
        </div>
    );
}

export default Dashboard;