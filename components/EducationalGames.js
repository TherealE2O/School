import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  gamesSection: {
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
  button: {
    backgroundColor: '#6a1b9a',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#4a148c',
    },
  },
}));

const EducationalGames = () => {
  const classes = useStyles();

  const games = [
    { name: 'Crossword', path: '/games/crossword' },
    { name: 'Puzzle', path: '/games/puzzle' },
    { name: 'Sudoku', path: '/games/sudoku' },
    { name: 'Wordle', path: '/games/wordle' },
    { name: 'Chess', path: '/games/chess' },
    { name: 'Scrambled', path: '/games/scrambled' },
  ];

  return (
    <Container className={classes.gamesSection}>
      <Typography variant="h4" className={classes.title}>
        Educational Games
      </Typography>
      <Grid container spacing={2}>
        {games.map((game) => (
          <Grid item xs={12} sm={6} md={4} key={game.name}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6">{game.name}</Typography>
                <Button
                  variant="contained"
                  className={classes.button}
                  component={Link}
                  to={game.path}
                >
                  Play
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EducationalGames;

