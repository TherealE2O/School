import React from 'react';
import { Container, Typography, Grid, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  portalSection: {
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  },
  title: {
    color: '#6a1b9a',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
  },
  button: {
    backgroundColor: '#6a1b9a',
    color: '#fff',
    marginTop: '1rem',
    '&:hover': {
      backgroundColor: '#4a148c',
    },
  },
}));

const StaffPortal = () => {
  const classes = useStyles();

  return (
    <Container className={classes.portalSection}>
      <Typography variant="h4" className={classes.title}>
        Staff Portal
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            fullWidth
            className={classes.button}
            component={Link}
            to="/upload-content"
          >
            Upload Content
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            fullWidth
            className={classes.button}
            component={Link}
            to="/approve-content"
          >
            Approve Content
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            fullWidth
            className={classes.button}
            component={Link}
            to="/create-assignment"
          >
            Create Assignment
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            fullWidth
            className={classes.button}
            component={Link}
            to="/edit-results"
          >
            Edit Results
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            fullWidth
            className={classes.button}
            component={Link}
            to="/submit-results"
          >
            Submit Results
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            fullWidth
            className={classes.button}
            component={Link}
            to="/approve-results"
          >
            Approve Results
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StaffPortal;

