import api from "./api";

const attachmentService = {

    uploadFile: (noteId, file) => {

        const formData = new FormData();

        formData.append("file", file);

        return api.post(
            `/attachments/upload/${noteId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

    },

    getAttachments: (noteId) =>
        api.get(`/attachments/${noteId}`),

    downloadAttachment: (id) =>
        api.get(`/attachments/download/${id}`, {
            responseType: "blob"
        }),

    deleteAttachment: (id) =>
        api.delete(`/attachments/${id}`)

};

export default attachmentService;