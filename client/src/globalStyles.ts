import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html,
  body {
    width: 100%;
    min-width: 320px;
    height: 100%;
    font-size: 16px;
    line-height: 1.5;
    background-color: #463f3a;
  }
  
  body, input, label, form {
    margin: 0;
    font-family: "Geist Mono", monospace;
  }

  button {
    font-family: inherit;
  }

  * {
    box-sizing: border-box;
  }

  #root {
    display: flex;
    min-width: 100%;
    min-height: 100%;

    & > div:first-of-type {
      display: flex;
      min-width: 100%;
    }
  }

  p,
  label {
    line-height: 1.5em;
  }

  .embed-container {
    position: relative;
    width: 100%;
    padding-bottom: 56.2% !important;
    overflow: hidden;

    iframe,embed,object{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  li {
    h2, h3, h4, h5 {
      margin: 3px;
      padding: 0 !important;
      font-size: 18px;
      line-height: 26px !important;
    }
  }

  a {
    color: #000;
    text-decoration: none;
  }

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track,
  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: gray;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: gray;
  }
`;

export default GlobalStyles;
