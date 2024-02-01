/* eslint-disable react/prop-types */
import { MdDelete } from "react-icons/md";
function Note({ id, text, deleteNote }) {
    return (
        <div className="note">
            <div className="note__body">{text}</div>
            <div className="note__footer" style={{ justifyContent: "flex-end" }}>
                <MdDelete
                    className="note__delete"
                    onClick={() => deleteNote(id)}
                    aria-hidden="true"
                ></MdDelete>
            </div>
        </div>
    );
}

export default Note;