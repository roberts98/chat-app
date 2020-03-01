import React from 'react';
import { createGlobalStyle } from 'styled-components';

import TTMedium from '../assets/fonts/TTNorms-Medium.otf';
import { Device } from './breakpoints';

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
    min-height: 100vh;
  }

  #root {
    @media ${Device.laptop} {
      display: flex;
    }
  }

  .ReactModal__Content {
    width: 90vw;
    height: 40vh;
    display: flex;
    justify-content: center;
    align-items: center;

    @media ${Device.tablet} {
      width: 50vw;
    }

    @media ${Device.laptop} {
      width: 30vw;
    }
  }
`;
