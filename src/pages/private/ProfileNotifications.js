import React from "react";
import { Typography, Fade } from "@material-ui/core";
import styled from "styled-components";
import { TrafficOutlined } from "@material-ui/icons";

const ProfileContainer = styled.div`
  padding: 1rem;
`;

const ProfileNotifications = ({ user }) => {
  return (
    <Fade in={TrafficOutlined}>
      <ProfileContainer>
        <Typography
          variant="h6"
          style={{ marginBottom: "2rem" }}
          color="textSecondary"
        >
          Notificações
        </Typography>
      </ProfileContainer>
    </Fade>
  );
};

export default ProfileNotifications;
