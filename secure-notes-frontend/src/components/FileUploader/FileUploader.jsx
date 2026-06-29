import { useState } from "react";
import attachmentService from "../../services/attachmentService";

function FileUploader({ noteId, refresh }) {

    const [file, setFile] = useState(null);

    const upload = async () => {

        if (!file) return;

        try {

            await attachmentService.uploadFile(noteId, file);

            alert("File Uploaded");

            setFile(null);

            refresh();

        } catch (e) {

            alert("Upload Failed");

        }

    };

    return (

        <div>

            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <button onClick={upload}>
                Upload
            </button>

        </div>

    );

}

export default FileUploader;