import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    boardColor: string;
    boardBgColor: string;
    cardColor: string;
  }
}
