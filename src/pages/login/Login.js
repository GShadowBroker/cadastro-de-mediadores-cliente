import React from "react";
import styled from "styled-components";
import colors from "../../constants/colors";
import LoginForm from "../../components/authentication/LoginForm";
import { Link } from "react-router-dom";
import { Button, Fade } from "@material-ui/core";
import Footer from "../../components/Footer";

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

  color: ${colors.light.secondary.main};
`;

const LoginCard = styled.div`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 5px;
  height: 500px;
  width: 98%;
  display: flex;
  background: ${colors.light.background};

  @media only screen and (max-width: 1000px) {
    margin: auto;
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

  @media only screen and (max-width: 1000px) {
    display: none;
  }
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

  padding: 2rem 7rem 0 7rem;
  font-size: 0.9em;

  @media only screen and (max-width: 1000px) {
    width: 100%;
    padding: 2rem 10rem 0 10rem;
  }
  @media only screen and (max-width: 550px) {
    width: 100%;
    padding: 2rem 5rem 0 5rem;
  }
  @media only screen and (max-width: 400px) {
    width: 100%;
    padding: 2rem 1.5rem 0 1.5rem;
  }
`;

const Header = styled.h1`
  text-align: center;
`;

const SubHeader = styled.div`
  text-align: center;
  color: ${colors.light.secondary.light};
`;

const OrLine = styled.div`
  border-top: 1px solid ${colors.light.secondary.light};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  height: 0px;
  max-width: 75%;
  margin: auto;
  margin-bottom: 20px;

  span {
    background: ${colors.light.background};
    padding: 0 1.5em;
  }
`;

const Login = ({ handleLogin, loading, loginError }) => {
  return (
    <Fade in={true}>
      <Wrapper>
        <Container>
          <LoginCard>
            <ImageContainer
              source={require("../../assets/images/mediation.jpg")}
            >
              <Filter />
            </ImageContainer>
            <FormContainer>
              <Header>Login</Header>
              <SubHeader>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </SubHeader>
              <LoginForm
                handleLogin={handleLogin}
                loading={loading}
                loginError={loginError}
              />
              <OrLine>
                <span>ou</span>
              </OrLine>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                component={Link}
                to="/registro"
                style={{ color: colors.light.primary.main }}
              >
                CADASTRE-SE
              </Button>
            </FormContainer>
          </LoginCard>

          <Footer />
        </Container>
      </Wrapper>
    </Fade>
  );
};

export default Login;
