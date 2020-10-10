import React from "react";
import { LinearProgress, CircularProgress } from "@material-ui/core";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const SpinnerContainer = styled.div`
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingScreen = () => {
  return (
    <Container>
      <LinearProgress />
      <SpinnerContainer>
        <CircularProgress />
      </SpinnerContainer>
    </Container>
  );
};

export default LoadingScreen;
