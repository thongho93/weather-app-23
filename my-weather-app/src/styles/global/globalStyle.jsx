import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
    --primary-color: #2a1d49ff;
    --secondary-color: #0F0118;
    --tertiary-color:#B2AEFF;
    --neutral-color: #FAFAFA;
}
body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    background-color: var(--secondary-color);
    color: var(--neutral-color);
}
button {
    cursor: pointer;
    background-color: var(--primary-color);
    color: var(--neutral-color);
    border: none;
    padding: 13px 18px;
    border-radius: 25px;
    font-size: 1rem;
    transition: background-color 0.3s ease;
}
button:hover {
    background-color: var(--tertiary-color);
    color: var(--secondary-color);
}
`;

export default GlobalStyle;
