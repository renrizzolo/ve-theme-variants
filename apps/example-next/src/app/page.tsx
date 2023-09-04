"use client";
import { Button } from "../components/Button";
import { useThemeValue } from "../theme/ThemeProvider";
import { card, main } from "./page.css";

export default function Home() {
  const { mode, theme, setModeTheme } = useThemeValue();
  const otherTheme = theme === "light" ? "dark" : "light";
  const otherMode = mode === "system" ? "user" : "system";

  return (
    <main className={main}>
      <h1>Theme / mode toggle</h1>
      <div className={card}>
        <Button
          kind="primary"
          disabled={mode === "system"}
          onClick={() => setModeTheme(mode, otherTheme)}
        >
          {mode === "system"
            ? "Controlled by system"
            : `Enable ${otherTheme} theme`}
        </Button>

        <Button kind="secondary" onClick={() => setModeTheme(otherMode, theme)}>
          Enable {otherMode}
        </Button>
        <p style={{ width: "100%" }}>
          <code>
            current: {mode} ({theme})
          </code>
        </p>
      </div>
    </main>
  );
}
