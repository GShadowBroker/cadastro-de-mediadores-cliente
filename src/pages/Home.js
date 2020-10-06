import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Paper,
  makeStyles,
  Tabs,
  Tab,
  Box,
  Fade,
} from "@material-ui/core";

import CamarasTable from "../components/CamarasTable";
import MediatorsTable from "../components/MediatorsTable";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    flexGrow: 1,
    margin: "1.5rem 0",
  },
});

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const Home = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fade in={true}>
      <Container maxWidth="md">
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="lista de mediadores"
            centered
          >
            <Tab label="Mediadores" {...a11yProps(0)} />
            <Tab label="Câmaras privadas" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <MediatorsTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CamarasTable />
          </TabPanel>
        </Paper>
      </Container>
    </Fade>
  );
};

export default Home;
