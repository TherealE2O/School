import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const useStyles = makeStyles((theme) => ({
  signInSection: {
    backgroundColor: '#f3e6ff',
    padding: '2rem',
    borderRadius: '8px',
    textAlign: 'center',
  },
  title: {
    color: '#6a1b9a',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
  },
  formControl: {
    marginBottom: '1rem',
  },
  button: {
    backgroundColor: '#6a1b9a',
    color: '#fff',
    marginTop: '2rem',
    '&:hover': {
      backgroundColor: '#4a148c',
    },
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to the appropriate dashboard
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Redirect to the appropriate dashboard
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <Container className={classes.signInSection}>
      <Typography variant="h4" className={classes.title}>
        Sign In
      </Typography>
      <form onSubmit={handleSignIn}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={classes.formControl}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={classes.formControl}
        />
        <Button type="submit" variant="contained" fullWidth className={classes.button}>
          Sign In
        </Button>
      </form>
      <Button variant="contained" fullWidth className={classes.button} onClick={handleGoogleSignIn}>
        Sign In with Google
      </Button>
    </Container>
  );
};

export default SignIn;

