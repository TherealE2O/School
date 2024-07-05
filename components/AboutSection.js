import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  aboutSection: {
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

const AboutSection = () => {
  const classes = useStyles();

  return (
    <Container className={classes.aboutSection}>
      <Typography variant="h4" className={classes.title}>
        About Our School
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6">History</Typography>
              <Typography variant="body2">
                Our school was established in 1990 with a vision to provide quality education.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6">Mission</Typography>
              <Typography variant="body2">
                To nurture and inspire every student to achieve their full potential.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6">Vision</Typography>
              <Typography variant="body2">
                To be a leading institution recognized for excellence in education and character building.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutSection;

