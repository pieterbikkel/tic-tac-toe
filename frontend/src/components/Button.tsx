interface ButtonProps {
    buttonText: string;
    onClick: () => void;
}

function Button({ buttonText, onClick }: ButtonProps) {
    return (
        <div className="button" onClick={onClick}>
            {buttonText}
        </div>
    );
}

export default Button;