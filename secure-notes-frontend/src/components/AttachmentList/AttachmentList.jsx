import { useEffect, useState } from "react";
import attachmentService from "../../services/attachmentService";

function AttachmentList({ noteId }) {

    const [files, setFiles] = useState([]);

    useEffect(() => {

        loadFiles();

    }, []);

    const loadFiles = async () => {

        const response =
            await attachmentService.getAttachments(noteId);

        setFiles(response.data);

    };

    const download = async (id, name) => {

        const response =
            await attachmentService.downloadAttachment(id);

        const url =
            window.URL.createObjectURL(new Blob([response.data]));

        const link =
            document.createElement("a");

        link.href = url;

        link.download = name;

        link.click();

    };

    const remove = async (id) => {

        await attachmentService.deleteAttachment(id);

        loadFiles();

    };

    return (

        <div>

            {

                files.map(file => (

                    <div key={file.id}>

                        📎 {file.fileName}

                        <button
                            onClick={() =>
                                download(file.id, file.fileName)
                            }
                        >
                            Download
                        </button>

                        <button
                            onClick={() =>
                                remove(file.id)
                            }
                        >
                            Delete
                        </button>

                    </div>

                ))

            }

        </div>

    );

}

export default AttachmentList;