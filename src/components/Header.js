import React from "react";

const Header = ({ headerTitle }) => {
    return (
        <>
            {headerTitle.map((title, index) => (
                <React.Fragment key={index}>
                    <h3>{title}</h3>
                    <br />
                </React.Fragment>
            ))}
        </>
    );
};

export default Header;
