import './Input.css';

export const Input = ({ inputText, setInputText, onKeyDown, disabled }) => {
    return (
        <div className="input">
            <input
                className="input"
                placeholder="Type here to add a task..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={onKeyDown}
                disabled={disabled}
            />
        </div>
    );
};