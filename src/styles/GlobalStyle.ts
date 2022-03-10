import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  body{
    font-family: 'Stylish', sans-serif;
    background-image: radial-gradient(circle at 10% 10%, rgb(255, 156, 156) 0%, rgb(179, 201, 241) 80%);
  }
  input{
    font-family: 'Stylish', sans-serif;
  }
`;

export default GlobalStyle;
