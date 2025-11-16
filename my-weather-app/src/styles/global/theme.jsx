import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "var(--color-primary)",
    secondary: "var(--color-secondary)",
    tertiary: "var(--color-tertiary)",
    neutral: "var(--color-neutral)",
  },
};

const Theme = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

export default Theme;
