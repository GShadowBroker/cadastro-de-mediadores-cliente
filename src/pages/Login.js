import React from "react";
import styled from "styled-components";
import colors from "../constants/colors";
import LoginForm from "../components/authentication/LoginForm";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1000px;
  margin: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;

  color: ${colors.light.text};
`;

const LoginCard = styled.div`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 5px;
  height: 500px;
  width: 100%;
  display: flex;
`;

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
`;

const ImageContainer = styled.div`
  background: url(${(props) => props.source});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 50%;
  height: 100%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const Filter = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const FormContainer = styled.div`
  height: 100%;
  width: 50%;

  padding: 0 7rem;
  font-size: 0.9em;
`;

const Header = styled.h1`
  text-align: center;
`;

const SubHeader = styled.div`
  text-align: center;
  color: ${colors.light.textSecondary};
`;

const OrLine = styled.div`
  border-top: 1px solid ${colors.light.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  height: 0px;
  max-width: 75%;
  margin: auto;

  span {
    background: ${colors.light.background};
    padding: 0 1.5em;
  }
`;

const OutlinedButton = styled.button`
  cursor: pointer;
  border: 1px solid ${colors.light.button};
  background-color: #fff;
  color: black;
  font-weight: bold;

  height: 36px;
  width: 100%;
  margin-top: 1.5em;
  border-radius: 5px;
  transition: all 0.2s linear;

  &:hover {
    background-color: ${colors.light.button};
    color: #fff;
  }
`;

const Login = ({ handleLogin, loading }) => {
  return (
    <Wrapper>
      <Container>
        <LoginCard>
          <ImageContainer source={require("../assets/images/mediation.jpg")}>
            <Filter />
          </ImageContainer>
          <FormContainer>
            <Header>Login</Header>
            <SubHeader>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </SubHeader>
            <LoginForm handleLogin={handleLogin} loading={loading} />
            <OrLine>
              <span>ou</span>
            </OrLine>
            <OutlinedButton>CADASTRE-SE</OutlinedButton>
          </FormContainer>
        </LoginCard>

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
      </Container>
    </Wrapper>
  );
};

export default Login;
