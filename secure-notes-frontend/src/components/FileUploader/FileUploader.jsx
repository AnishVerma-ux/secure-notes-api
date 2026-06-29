import { useState } from "react";
import attachmentService from "../../services/attachmentService";
import "./FileUploader.css";

function FileUploader({ noteId, refresh }) {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const upload = async () => {

        if (!file) return;

        try {

            setLoading(true);

            await attachmentService.uploadFile(noteId, file);

            alert("File uploaded successfully");

            setFile(null);

            refresh();

        } catch (e) {

            alert("Upload failed");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="uploader">

            <label className="file-label">

                📎 Choose File

                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />

            </label>

            {file && (
                <p className="selected-file">
                    {file.name}
                </p>
            )}

            <button
                className="upload-btn"
                disabled={!file || loading}
                onClick={upload}
            >
                {loading ? "Uploading..." : "Upload"}
            </button>

        </div>

    );

}

export default FileUploader;