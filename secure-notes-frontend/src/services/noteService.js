import api from "./api";

const noteService = {
  getNotes: () => api.get("/notes"),

  createNote: (note) => api.post("/notes", note),

  updateNote: (id, note) => api.put(`/notes/${id}`, note),

  deleteNote: (id) => api.delete(`/notes/${id}`),

  searchNotes: (keyword) =>
    api.get(`/notes/search?keyword=${keyword}`),
};

export default noteService;