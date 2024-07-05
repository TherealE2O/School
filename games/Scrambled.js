import React from 'react';
import { Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  gameSection: {
    padding: '2rem',
    backgroundColor: '#f9f9f9',
  },
  title: {
    color: '#6a1b9a',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
  },
  gameContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

const Scrambled = () => {
  const classes = useStyles();

  return (
    <Container className={classes.gameSection}>
      <Typography variant="h4" className={classes.title}>
        Scrambled
      </Typography>
      <div className={classes.gameContainer}>
        {/* Implement the scrambled words game logic here or embed a scrambled words game */}
        <Typography variant="body1">
          Scrambled words game will be implemented here.
        </Typography>
      </div>
    </Container>
  );
};

export default Scrambled;

