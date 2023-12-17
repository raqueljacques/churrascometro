const Button = ({ onClick, label, isLoading }) => {
    return (
        <button className="default-button" onClick={onClick}>
            {isLoading ? "Carregando..." : label}
        </button>
    );
};

export default Button;
