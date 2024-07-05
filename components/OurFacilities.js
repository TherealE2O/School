import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  facilitiesSection: {
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

const OurFacilities = () => {
  const classes = useStyles();

  return (
    <Container className={classes.facilitiesSection}>
      <Typography variant="h4" className={classes.title}>
        Our Facilities
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6">Library</Typography>
              <Typography variant="body2">
                Our library is stocked with a wide range of books and resources to aid learning.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6">Laboratories</Typography>
              <Typography variant="body2">
                We have well-equipped science laboratories for practical learning experiences.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6">Sports Complex</Typography>
              <Typography variant="body2">
                Our sports complex includes facilities for various sports and physical activities.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OurFacilities;

