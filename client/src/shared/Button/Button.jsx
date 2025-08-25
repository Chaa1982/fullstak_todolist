import './Button.css';

export const Button = ( {onClick} ) => {
    return (
        <button className={'button'} onClick={onClick}>+ Add</button>
    )
}