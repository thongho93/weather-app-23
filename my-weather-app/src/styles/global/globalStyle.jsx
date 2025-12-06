import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
    --primary-color: #2a1d49ff;
    --secondary-color: #0F0118;
    --tertiary-color:#B2AEFF;
    --neutral-color: #FAFAFA;
    --neutral-dark-color: #b8b1b1ff;
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
    padding: 7px 25px;
    border-radius: 30px;
    font-size: 18px;
    transition: background-color 0.3s ease;
    letter-spacing: 0.3px;

}
button:hover {
    background-color: var(--tertiary-color);
    color: var(--secondary-color);
}
H1 {
    font-size: 30px;
    margin: 0;
}
H2 {
    font-size: 20px;
    margin: 0;
}
H3 {
    font-size: 18px;
    margin: 0;
}
H4 {
    font-size: 16px;
    margin: 0;
}
H5 {
    font-size: 14px;
    margin: 0;
}
p {
    font-size: 16px;
    margin: 0;
}
`;

export default GlobalStyle;
