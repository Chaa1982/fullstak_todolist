import './InputSection.css';
import { Input } from "../../../shared/Input/Input";
import { Button } from "../../../shared/Button";
import {useState} from "react";
import {useTodos} from "../../../hooks/useTodos";

export const InputSection = () => {
    const [inputText, setInputText] = useState('');
    const { addTodo, isAdding } = useTodos();

    const handleAddTodo = () => {
        const currentInputText = inputText.trim();
        if (!currentInputText) {
            alert('Enter a text for new todo');
            return;
        }

        addTodo({
            task: currentInputText,
            isDone: false,
        });
        setInputText('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddTodo();
        }
    };


    return (
        <div className="input-section">
            <Input
                inputText={inputText}
                setInputText={setInputText}
                onKeyDown={handleKeyDown}
                disabled={isAdding}
            />
            <Button
                onClick={handleAddTodo}
                disabled={isAdding || !inputText.trim()}
                text={isAdding ? 'Adding...' : 'Add Todo'}
            />
        </div>
    )
}