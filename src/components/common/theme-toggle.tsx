"use client";

export function ThemeToggle() {
    function toggleTheme(){
        document.documentElement.classList.toggle("dark");
    }
    return (
        <button onClick={toggleTheme}>
            toggle beast mode
        </button>
    );
}