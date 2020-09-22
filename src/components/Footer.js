import React from "react";
import styled from "styled-components";
import colors from "../constants/colors";

const FooterContainer = styled.div`
  height: 80px;
  width: 100%;

  display: flex;
  flex-direction: column;
`;
const FooterMenu = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: ${colors.light.secondary.main};

  li {
    display: inline;
    font-size: 0.9em;

    a {
      color: inherit;
      text-decoration: none;
    }

    &:hover {
      opacity: 0.8;
    }
  }
  li:not(:first-of-type) {
    margin-left: 2rem;
  }

  @media only screen and (max-width: 550px) {
    flex-direction: column;
    li:not(:first-of-type) {
      margin-left: 0;
    }
    li {
      margin: 0.2rem 0;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterMenu>
        <li>
          <a href="/">Página Inicial</a>
        </li>
        <li>
          <a href="/">Sobre Nós</a>
        </li>
        <li>
          <a href="/">Termos e Condições</a>
        </li>
        <li>
          <a href="/">Política de Privacidade</a>
        </li>
      </FooterMenu>
    </FooterContainer>
  );
};

export default Footer;
