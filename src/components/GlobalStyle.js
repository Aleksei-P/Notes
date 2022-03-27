import { createGlobalStyle } from "styled-components";
import normalize from 'normalize.css';

export default createGlobalStyle`
${normalize}
*, *:before, *:after {
    box-sizing: border-box;
}
body,
html {
    height: 100%;
    margin: 0;
}
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    font-style: normal;
    background-color: #F2F2F2;
    line-height: 1.4;

}

em {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    font-style: normal;
}
code,
pre {
    max-width: 100%;
    overflow: auto;
    margin: 0 auto;
}
`;