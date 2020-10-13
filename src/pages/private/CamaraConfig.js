import React from "react";
import { Typography, Fade } from "@material-ui/core";
import styled from "styled-components";

const ProfileContainer = styled.div`
  padding: 1rem;
`;

const ProfileConfig = ({ user }) => {
  return (
    <Fade in={true}>
      <ProfileContainer>
        <Typography
          variant="h6"
          style={{ marginBottom: "2rem" }}
          color="textSecondary"
        >
          Configurações
        </Typography>
      </ProfileContainer>
    </Fade>
  );
};

export default ProfileConfig;
