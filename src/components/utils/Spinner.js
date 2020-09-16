import React from "react";
import { ImSpinner2 } from "react-icons/im";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  font-size: ${(props) => props.size}px;

  @keyframes rotateSpinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  animation-name: rotateSpinner;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

const Spinner = ({ size }) => {
  return (
    <Container size={size ? size : 16}>
      <ImSpinner2 />
    </Container>
  );
};

export default Spinner;
