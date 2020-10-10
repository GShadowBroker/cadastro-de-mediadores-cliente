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
  Divider,
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
  return (
    <Fade in={true}>
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
              id="nome_fantasia"
              variant="outlined"
              label="Nome fantasia"
              InputLabelProps={{ shrink: true }}
              defaultValue={user.nome_fantasia}
              size="small"
              disabled
              fullWidth
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              id="razao_social"
              variant="outlined"
              label="Razão social"
              InputLabelProps={{ shrink: true }}
              defaultValue={user.razao_social}
              size="small"
              disabled
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={5} style={{ marginBottom: "1rem" }}>
          <Grid item sm={6}>
            <TextField
              id="cnpj"
              variant="outlined"
              label="CNPJ"
              InputLabelProps={{ shrink: true }}
              defaultValue={user.cnpj}
              size="small"
              disabled
              fullWidth
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              id="cpf_responsavel"
              variant="outlined"
              label="CPF do responsável"
              InputLabelProps={{ shrink: true }}
              defaultValue={user.cpf_responsavel}
              size="small"
              disabled
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={5} style={{ marginBottom: "1rem" }}>
          <Grid item sm={6}>
            <TextField
              id="site"
              variant="outlined"
              label="Website"
              InputLabelProps={{ shrink: true }}
              defaultValue={user.site}
              size="small"
              disabled
              fullWidth
            />
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
              <MenuItem value="$">Patamar Básico</MenuItem>
              <MenuItem value="$$">Patamar Intermediário</MenuItem>
              <MenuItem value="$$$">Patamar Avançado</MenuItem>
              <MenuItem value="$$$$">Patamar Extraordinário</MenuItem>
            </TextField>
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
              id="cep"
              variant="outlined"
              label="CEP"
              InputLabelProps={{ shrink: true }}
              defaultValue={user.cep}
              size="small"
              disabled
              fullWidth
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              id="address"
              variant="outlined"
              label="Endereço"
              InputLabelProps={{ shrink: true }}
              defaultValue={user.address}
              size="small"
              disabled
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={5} style={{ marginBottom: "1rem" }}>
          <Grid item sm={6}>
            <TextField
              id="complement"
              variant="outlined"
              label="Complemento"
              InputLabelProps={{ shrink: true }}
              defaultValue={user.complement}
              size="small"
              disabled
              fullWidth
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              id="number"
              variant="outlined"
              label="Número"
              InputLabelProps={{ shrink: true }}
              defaultValue={user.number}
              size="small"
              disabled
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={5} style={{ marginBottom: "1rem" }}>
          <Grid item sm={6}>
            <TextField
              id="district"
              variant="outlined"
              label="Bairro"
              InputLabelProps={{ shrink: true }}
              defaultValue={user.district}
              size="small"
              disabled
              fullWidth
            />
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
    </Fade>
  );
};

export default ProfileMain;
