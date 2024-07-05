import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  heroSection: {
    backgroundColor: '#6a1b9a',
    color: '#fff',
    padding: '4rem 2rem',
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
  },
  button: {
    backgroundColor: '#fff',
    color: '#6a1b9a',
    '&:hover': {
      backgroundColor: '#f3e6ff',
    },
    margin: '0.5rem',
  },
}));

const HeroSection = () => {
  const classes = useStyles();

  return (
    <div className={classes.heroSection}>
      <Container>
        <Typography variant="h2" className={classes.title}>
          Welcome to Our School
        </Typography>
        <Typography variant="h5" className={classes.subtitle}>
          Providing Quality Education Since 1990
        </Typography>
        <Grid container justifyContent="center">
          <Button variant="contained" className={classes.button} component={Link} to="/student-portal">
            Student Portal
          </Button>
          <Button variant="contained" className={classes.button} component={Link} to="/staff-portal">
            Staff Portal
          </Button>
        </Grid>
      </Container>
    </div>
  );
};

export default HeroSection;

