import React from "react";
import { Container, Paper, Grid, Fade, Divider } from "@material-ui/core";
import styled from "styled-components";
import Skeleton from "@material-ui/lab/Skeleton";

const SPaper = styled(Paper)`
  padding: 1rem 0;
`;

const Header = styled.div`
  height: ${(props) => props.height}rem;
  width: 100%;
  margin: 1rem 0;
  padding: 0.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const ButtonsContainer = styled.div`
  padding: 1rem;
`;

const PublicProfileMediatorSkeleton = () => {
  return (
    <Fade in={true}>
      <React.Fragment>
        <Container maxWidth="md" style={{ minHeight: "73vh" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={3}>
              <SPaper>
                <Header height={12}>
                  <Skeleton variant="circle" width={40} height={40} />
                  <Skeleton
                    variant="text"
                    width={120}
                    style={{ marginTop: "1rem" }}
                  />
                  <Skeleton variant="text" width={100} />
                </Header>
                <Divider />
                <ContactContainer>
                  <Skeleton variant="text" style={{ margin: ".5rem 0" }} />
                  <Skeleton variant="text" style={{ margin: ".5rem 0" }} />
                  <Skeleton variant="text" style={{ margin: ".5rem 0" }} />
                </ContactContainer>
                <Divider />
                <ButtonsContainer>
                  <Skeleton variant="text" height={35} fullWidth />
                  <Skeleton variant="text" height={35} fullWidth />
                </ButtonsContainer>
              </SPaper>
            </Grid>

            <Grid item xs={12} sm={8} md={9}>
              <SPaper style={{ padding: "1rem" }}>
                <Grid
                  container
                  style={{ marginTop: "1rem", marginBottom: "2rem" }}
                >
                  <Grid item xs={12} sm={6}>
                    <Skeleton
                      variant="text"
                      width={120}
                      style={{ marginBottom: ".5rem" }}
                    />
                    <Skeleton
                      variant="text"
                      width={120}
                      style={{ marginLeft: "1rem" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Skeleton
                      variant="text"
                      width={120}
                      style={{ marginBottom: ".5rem" }}
                    />
                    <Skeleton
                      variant="text"
                      width={120}
                      style={{ marginLeft: "1rem" }}
                    />
                  </Grid>
                </Grid>

                <Grid container style={{ marginBottom: "2rem" }}>
                  <Grid item xs={12} sm={6}>
                    <Skeleton
                      variant="text"
                      width={120}
                      style={{ marginBottom: ".5rem" }}
                    />
                    <Skeleton
                      variant="text"
                      width={120}
                      style={{ marginLeft: "1rem" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Skeleton
                      variant="text"
                      width={120}
                      style={{ marginBottom: ".5rem" }}
                    />
                    <Skeleton
                      variant="text"
                      width={120}
                      style={{ marginLeft: "1rem" }}
                    />
                  </Grid>
                </Grid>
                <Grid container style={{ marginBottom: "2rem" }}>
                  <Grid item xs={12}>
                    <Skeleton
                      variant="text"
                      width={120}
                      style={{ marginBottom: ".5rem" }}
                    />
                    <Skeleton
                      variant="text"
                      width={120}
                      style={{ marginLeft: "1rem" }}
                    />
                  </Grid>
                </Grid>
                <Grid container style={{ marginBottom: "2rem" }}>
                  <Grid item xs={12}>
                    <Skeleton
                      variant="text"
                      width={120}
                      style={{ marginBottom: ".5rem" }}
                    />
                    <Skeleton
                      variant="rect"
                      fullWidth
                      height={100}
                      style={{ marginLeft: "1rem" }}
                    />
                  </Grid>
                </Grid>
              </SPaper>
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    </Fade>
  );
};

export default PublicProfileMediatorSkeleton;
