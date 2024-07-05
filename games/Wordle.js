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

const Wordle = () => {
  const classes = useStyles();

  return (
    <Container className={classes.gameSection}>
      <Typography variant="h4" className={classes.title}>
        Wordle
      </Typography>
      <div className={classes.gameContainer}>
        {/* Implement the wordle game logic here or embed a wordle game */}
        <Typography variant="body1">
          Wordle game will be implemented here.
        </Typography>
      </div>
    </Container>
  );
};

export default Wordle;

