import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
    --primary-color: #2a1d49ff;
    --secondary-color: #0F0118;
    --tertiary-color:#B2AEFF;
    --neutral-color: #FAFAFA;
    overflow-x: hidden;

}
body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    background-color: var(--secondary-color);
    color: var(--neutral-color);
    overflow-x: hidden;

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
H1 {
    font-size: 2rem;
    margin: 0;
}
H2 {
    font-size: 1.5rem;
    margin: 0;
}
H3 {
    font-size: 1.2rem;
    margin: 0;
}
H4 {
    font-size: 1rem;
    margin: 0;
}
H5 {
    font-size: 0.5rem;
    margin: 0;
}
`;

export default GlobalStyle;
