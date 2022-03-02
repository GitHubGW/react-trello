import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  body{
    background-color: ${(props) => props.theme.bgColor};
  }
`;

export default GlobalStyle;
