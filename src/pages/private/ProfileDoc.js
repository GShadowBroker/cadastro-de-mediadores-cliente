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
import AttachmentIcon from "@material-ui/icons/Attachment";
import { getAttachment } from "../../services/mediatorsService";

const ProfileContainer = styled.div`
  padding: 1rem;
`;

const AttachmentContainer = styled(Paper)`
  width: 80px;
  height: 100px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const ProfileDoc = ({ user }) => {
  const handleAttClick = () => {
    getAttachment(user.id);
  };
  return (
    <Fade in={true}>
      <ProfileContainer>
        <Typography
          variant="h6"
          style={{ marginBottom: "2rem" }}
          color="textSecondary"
        >
          Documentos
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <AttachmentContainer elevation={5} onClick={handleAttClick}>
              <AttachmentIcon fontSize="large" color="secondary" />
              <Typography variant="subtitle2" color="textSecondary">
                ver anexo
              </Typography>
            </AttachmentContainer>
          </Grid>
        </Grid>

        <Grid container style={{ margin: "3rem 0 2rem 0" }} justify="flex-end">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AutorenewIcon />}
          >
            Atualizar anexo
          </Button>
        </Grid>
      </ProfileContainer>
    </Fade>
  );
};

export default ProfileDoc;
