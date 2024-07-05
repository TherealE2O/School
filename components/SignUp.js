import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const useStyles = makeStyles((theme) => ({
  signUpSection: {
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

const SignUp = () => {
  const classes = useStyles();
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    fullName: '',
    class: 'primary',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const db = getFirestore();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signUpData.email, signUpData.password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        fullName: signUpData.fullName,
        class: signUpData.class,
        email: signUpData.email,
        role: 'student', // Assuming this is a student sign-up form
      });
      // Redirect to the appropriate dashboard
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <Container className={classes.signUpSection}>
      <Typography variant="h4" className={classes.title}>
        Sign Up
      </Typography>
      <form onSubmit={handleSignUp}>
        <TextField
          fullWidth
          label="Full Name"
          name="fullName"
          value={signUpData.fullName}
          onChange={handleChange}
          className={classes.formControl}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={signUpData.email}
          onChange={handleChange}
          className={classes.formControl}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={signUpData.password}
          onChange={handleChange}
          className={classes.formControl}
        />
        <TextField
          fullWidth
          select
          label="Class"
          name="class"
          value={signUpData.class}
          onChange={handleChange}
          SelectProps={{
            native: true,
          }}
          className={classes.formControl}
        >
          <option value="primary">Primary School</option>
          <option value="junior_secondary">Junior Secondary School</option>
          <option value="senior_secondary">Senior Secondary School</option>
        </TextField>
        <Button type="submit" variant="contained" fullWidth className={classes.button}>
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default SignUp;

