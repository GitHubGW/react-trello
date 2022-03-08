import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  body{
    background-image: radial-gradient(circle at 10% 10%, rgb(255, 156, 156) 0%, rgb(179, 201, 241) 80%);
  }
`;

export default GlobalStyle;
