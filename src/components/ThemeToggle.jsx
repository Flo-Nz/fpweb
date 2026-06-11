import { useTheme } from "@heroui/use-theme";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="cursor-pointer rounded-lg p-2 text-foreground/60 transition-colors hover:bg-content2"
      aria-label={`Passer en mode ${theme === "dark" ? "clair" : "sombre"}`}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
};

export default ThemeToggle;
