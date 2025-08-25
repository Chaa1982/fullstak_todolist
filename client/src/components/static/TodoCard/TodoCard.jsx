import { Bin } from "../../../shared/Bin/Bin";
import './TodoCard.css';
import {useState} from "react";

export const TodoCard = ({
                             task,
                             isEditing,
                             onToggle,
                             onDelete,
                             onEdit,
                             onStartEditing,
                             onCancelEditing
                         }) => {
    const [editText, setEditText] = useState(task.task);

    const handleSubmit = () => {
        onEdit(task.id, editText);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSubmit();
        if (e.key === 'Escape') onCancelEditing();
    };

    return (
        <div className={'todo-card'}>
            <div className={'inner-wrapper'}>
                <input
                    className={'input-checkbox'}
                    type={"checkbox"}
                    checked={task.isDone}
                    onChange={() => onToggle(task.id)}
                    disabled={isEditing}
                />

                {isEditing ? (
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={handleSubmit}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        className="edit-input"
                    />
                ) : (
                    <p
                        className={`task-text ${task.isDone ? 'completed' : ''}`}
                        onDoubleClick={onStartEditing}
                    >
                        {task.task}
                    </p>
                )}
            </div>

            <div
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(task.id);
                }}
                className="bin-wrapper"
            >
                <Bin />
            </div>
        </div>
    );
};