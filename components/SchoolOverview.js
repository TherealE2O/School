import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  overviewSection: {
    padding: '2rem',
    backgroundColor: '#f9f9f9',
  },
  title: {
    color: '#6a1b9a',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
  },
  card: {
    marginBottom: '1rem',
  },
}));

const SchoolOverview = () => {
  const classes = useStyles();

  return (
    <Container className={classes.overviewSection}>
      <Typography variant="h4" className={classes.title}>
        School Overview
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6">Academics</Typography>
              <Typography variant="body2">
                We offer a comprehensive curriculum that prepares students for success in higher education and beyond.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6">Extracurricular Activities</Typography>
              <Typography variant="body2">
                Our school provides a variety of extracurricular activities to support the holistic development of students.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6">Facilities</Typography>
              <Typography variant="body2">
                We have state-of-the-art facilities to support teaching and learning.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SchoolOverview;

