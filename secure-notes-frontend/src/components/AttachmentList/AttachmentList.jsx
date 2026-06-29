import { useEffect, useState } from "react";
import attachmentService from "../../services/attachmentService";
import "./AttachmentList.css";

function AttachmentList({ noteId }) {
    const [files, setFiles] = useState([]);

    useEffect(() => { loadFiles(); }, []);

    const loadFiles = async () => {
        const response = await attachmentService.getAttachments(noteId);
        setFiles(response.data);
    };

    const download = async (id, name) => {
        const response = await attachmentService.downloadAttachment(id);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.download = name;
        link.click();
    };

    const remove = async (id) => {
        if (!window.confirm("Delete this attachment?")) return;
        await attachmentService.deleteAttachment(id);
        loadFiles();
    };

    if (files.length === 0) return null;

    return (
        <div className="attachment-list">
            {files.map(file => (
                <div key={file.id} className="attachment-item">
                    <span className="attachment-name">📎 {file.fileName}</span>
                    <div className="attachment-actions">
                        <button
                            className="att-btn download"
                            onClick={() => download(file.id, file.fileName)}
                        >
                            ⬇
                        </button>
                        <button
                            className="att-btn delete"
                            onClick={() => remove(file.id)}
                        >
                            🗑
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AttachmentList;