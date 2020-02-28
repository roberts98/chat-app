import React from 'react';
import { createGlobalStyle } from 'styled-components';

import TTMedium from '../assets/fonts/TTNorms-Medium.otf';

export function GlobalStyles() {
  return <Styles />;
}

const Styles = createGlobalStyle`
  @font-face {
    font-family: "TTMedium";
    src: url(${TTMedium});
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
  }

  body {
    font-family: "TTMedium", sans-serif;
    background: rgb(243,243,251);
    background: linear-gradient(183deg, rgba(243,243,251,1) 0%, rgba(253,251,253,1) 100%) no-repeat;
    min-width: 100vw;
    min-height: 100vh;
  }

  #root {
    display: flex;
  }
`;
