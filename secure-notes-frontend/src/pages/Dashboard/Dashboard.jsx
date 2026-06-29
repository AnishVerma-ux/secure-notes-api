import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/NoteCard/NoteCard";
import NoteModal from "../../components/NoteModal/NoteModal";

import noteService from "../../services/noteService";

import "./Dashboard.css";

function Dashboard() {

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [editingNote, setEditingNote] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {

        try {

            setLoading(true);

            const response = await noteService.getNotes();

            setNotes(response.data);

        } catch (error) {

    console.log("Status:", error.response?.status);
console.log("Data:", error.response?.data);
console.log("Headers:", error.response?.headers);
console.log("Full Error:", error);

    if (error.response) {

        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);

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

}

         finally {

            setLoading(false);

        }

    };

    const handleSaveNote = async (noteData) => {

        try {

            if (editingNote) {

                await noteService.updateNote(editingNote.id, noteData);

                toast.success("Note updated successfully");

            } else {

                await noteService.createNote(noteData);

                toast.success("Note created successfully");

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

    const filteredNotes = notes.filter(note => {

        return (

            note.title.toLowerCase().includes(search.toLowerCase()) ||

            note.content.toLowerCase().includes(search.toLowerCase())

        );

    });

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

                <div className="dashboard-content">

                    {

                        loading ?

                            <h2>Loading...</h2>

                            :

                            filteredNotes.length === 0 ?

                                <div className="empty-state">

                                    <h2>No Notes Yet</h2>

                                    <p>Click "Add Note" to create your first note.</p>

                                </div>

                                :

                                <div className="notes-grid">

                                    {

                                        filteredNotes.map(note => (

                                            <NoteCard

                                                key={note.id}

                                                note={note}

                                                onEdit={(note) => {

                                                    setEditingNote(note);

                                                    setShowModal(true);

                                                }}

                                                onDelete={handleDelete}

                                            />

                                        ))

                                    }

                                </div>

                    }

                </div>

            </div>

            {

                showModal &&

                <NoteModal

                    note={editingNote}

                    onClose={() => {

                        setShowModal(false);

                        setEditingNote(null);

                    }}

                    onSave={handleSaveNote}

                />

            }

        </div>

    );

}

export default Dashboard;