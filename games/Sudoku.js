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

const Sudoku = () => {
  const classes = useStyles();

  return (
    <Container className={classes.gameSection}>
      <Typography variant="h4" className={classes.title}>
        Sudoku
      </Typography>
      <div className={classes.gameContainer}>
        {/* Implement the sudoku game logic here or embed a sudoku game */}
        <Typography variant="body1">
          Sudoku game will be implemented here.
        </Typography>
      </div>
    </Container>
  );
};

export default Sudoku;

