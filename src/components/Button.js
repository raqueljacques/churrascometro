const Button = ({ onClick, label }) => {
    return (
        <button className="default-button" onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;
