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
} from "@material-ui/core";
import styled from "styled-components";
import AutorenewIcon from "@material-ui/icons/Autorenew";

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

const ProfileMain = ({ user }) => {
  console.log("user", user);
  return (
    <React.Fragment>
      <ProfileContainer>
        <Typography
          variant="h6"
          style={{ marginBottom: "2rem" }}
          color="textSecondary"
        >
          Detalhes da conta
        </Typography>
        <Grid container spacing={5} style={{ marginBottom: "1rem" }}>
          <Grid item sm={6}>
            <TextField
              id="fullname"
              variant="outlined"
              label="Nome completo"
              InputLabelProps={{ shrink: true }}
              defaultValue={user.fullname}
              size="small"
              disabled
              fullWidth
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              id="cpf"
              variant="outlined"
              label="CPF"
              InputLabelProps={{ shrink: true }}
              defaultValue={user.cpf}
              size="small"
              disabled
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={5} style={{ marginBottom: "1rem" }}>
          <Grid item sm={6}>
            <TextField
              id="sex"
              variant="outlined"
              label="Sexo"
              select
              InputLabelProps={{ shrink: true }}
              defaultValue={user.sex}
              size="small"
              disabled
              fullWidth
            >
              <MenuItem value="feminino">Feminino</MenuItem>
              <MenuItem value="masculino">Masculino</MenuItem>
            </TextField>
          </Grid>
          <Grid item sm={6}>
            <TextField
              id="born"
              variant="outlined"
              label="Data de nascimento"
              type="date"
              InputLabelProps={{ shrink: true }}
              defaultValue={user.born}
              size="small"
              disabled
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={5} style={{ marginBottom: "1rem" }}>
          <Grid item sm={6}>
            <TextField
              id="certification"
              variant="outlined"
              label="Certificação"
              select
              InputLabelProps={{ shrink: true }}
              defaultValue={user.certification}
              size="small"
              disabled
              fullWidth
            >
              <MenuItem value="certificado">Certificado</MenuItem>
              <MenuItem value="em_formacao">Em formação</MenuItem>
            </TextField>
          </Grid>
          <Grid item sm={6}>
            <TextField
              id="average_value"
              variant="outlined"
              label="Valor médio"
              select
              InputLabelProps={{ shrink: true }}
              defaultValue={user.average_value}
              size="small"
              disabled
              fullWidth
            >
              <MenuItem value="voluntario">Voluntário</MenuItem>
              <MenuItem value="$">Patamar Básico</MenuItem>
              <MenuItem value="$$">Patamar Intermediário</MenuItem>
              <MenuItem value="$$$">Patamar Avançado</MenuItem>
              <MenuItem value="$$$$">Patamar Extraordinário</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Grid container spacing={5} style={{ marginBottom: "1rem" }}>
          <Grid item sm={6}>
            <Grid container>
              <Grid item sm={12} style={{ marginBottom: "2rem" }}>
                <TextField
                  id="lattes"
                  variant="outlined"
                  label="currículo lattes"
                  InputLabelProps={{ shrink: true }}
                  defaultValue={user.lattes}
                  size="small"
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item sm={12}>
                <FormGroup>
                  <FormControl>
                    <FormLabel component="legend">Especialidades</FormLabel>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="civel"
                          color="primary"
                          size="small"
                          disabled
                        />
                      }
                      label="Cível"
                      checked={user.specialization.includes("civel")}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="familia"
                          color="primary"
                          size="small"
                          disabled
                        />
                      }
                      label="Família"
                      checked={user.specialization.includes("familia")}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="empresarial"
                          color="primary"
                          size="small"
                          disabled
                        />
                      }
                      label="Empresarial"
                      checked={user.specialization.includes("empresarial")}
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6}>
            <TextField
              id="mini-curriculo"
              variant="outlined"
              label="Mini-currículo"
              type="text"
              multiline
              InputLabelProps={{ shrink: true }}
              defaultValue={user.resume}
              size="small"
              disabled
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={5} style={{ marginBottom: "1rem" }}>
          <Grid item sm={6}>
            <FormLabel component="legend">Unidades de atuação</FormLabel>
            {user.actuation_units.length > 0 && (
              <ChipPaper component="ul" elevation={0}>
                {user.actuation_units.map((court) => (
                  <li key={court}>
                    <Chip label={court} style={{ margin: ".1rem .3rem" }} />
                  </li>
                ))}
              </ChipPaper>
            )}
          </Grid>
          <Grid item sm={6}>
            <FormLabel component="legend">Cidades de atuação</FormLabel>
            {user.actuation_cities.length > 0 && (
              <ChipPaper component="ul" elevation={0}>
                {user.actuation_cities.map((court) => (
                  <li key={court}>
                    <Chip label={court} style={{ margin: ".1rem .3rem" }} />
                  </li>
                ))}
              </ChipPaper>
            )}
          </Grid>
        </Grid>

        <Grid container spacing={5} style={{ marginBottom: "1rem" }}>
          <Grid item sm={6}>
            <TextField
              id="email"
              variant="outlined"
              label="E-mail"
              InputLabelProps={{ shrink: true }}
              defaultValue={user.email}
              size="small"
              disabled
              fullWidth
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              id="alternative_email"
              variant="outlined"
              label="E-mail alternativo"
              InputLabelProps={{ shrink: true }}
              defaultValue={user.alternative_email}
              size="small"
              disabled
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={5} style={{ marginBottom: "1rem" }}>
          <Grid item sm={6}>
            <TextField
              id="phone"
              variant="outlined"
              label="Telefone"
              InputLabelProps={{ shrink: true }}
              defaultValue={user.phone}
              size="small"
              disabled
              fullWidth
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              id="cellphone"
              variant="outlined"
              label="Telefone celular"
              InputLabelProps={{ shrink: true }}
              defaultValue={user.cellphone}
              size="small"
              disabled
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item sm={6}>
            <TextField
              id="password"
              variant="outlined"
              label="Senha"
              type="password"
              InputLabelProps={{ shrink: true }}
              defaultValue="senha_demo"
              size="small"
              disabled
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container style={{ margin: "3rem 0 2rem 0" }} justify="flex-end">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AutorenewIcon />}
          >
            Atualizar
          </Button>
        </Grid>
      </ProfileContainer>
    </React.Fragment>
  );
};

export default ProfileMain;
