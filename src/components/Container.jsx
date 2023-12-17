import { useEffect, useState } from "react";

export default function Container(props) {
    const [themeName, setThemeName] = useState("dark-theme");

    useEffect(() => {
        const isDarkTheme = localStorage.getItem("isDarkTheme");
        setThemeName(isDarkTheme === "true" ? "dark-theme" : "light-theme");
    }, []);

    return <div className={`${themeName} container`}>{props.children}</div>;
}
