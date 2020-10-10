import React from "react";
import {
  Grid,
  TextField,
  Typography,
  MenuItem,
  FormGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  Chip,
  Paper,
  Button,
  Fade,
} from "@material-ui/core";
import styled from "styled-components";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { TrafficOutlined } from "@material-ui/icons";

const ProfileContainer = styled.div`
  padding: 1rem;
`;

const ChipPaper = styled(Paper)`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  list-style: none;
  padding: 5px;
  margin: 0.5rem 0;
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
