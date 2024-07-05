import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const useStyles = makeStyles((theme) => ({
  formSection: {
    backgroundColor: '#f3e6ff',
    padding: '2rem',
    borderRadius: '8px',
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
  quill: {
    marginBottom: '1rem',
  },
}));

const AssignmentForm = () => {
  const classes = useStyles();
  const [assignmentData, setAssignmentData] = useState({
    title: '',
    description: '',
    question: '',
    embeddedURL: '',
    class: 'all',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignmentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleQuillChange = (value) => {
    setAssignmentData((prevState) => ({
      ...prevState,
      question: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();

    if (user) {
      const assignmentRef = doc(db, 'assignments', `assignment-${Date.now()}`);
      await setDoc(assignmentRef, {
        ...assignmentData,
        submittedBy: user.uid,
        submittedAt: serverTimestamp(),
      });
      // Redirect or give feedback to user
    }
  };

  return (
    <Container className={classes.formSection}>
      <Typography variant="h4" className={classes.title}>
        Create Assignment
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={assignmentData.title}
              onChange={handleChange}
              className={classes.formControl}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={assignmentData.description}
              onChange={handleChange}
              multiline
              rows={2}
              className={classes.formControl}
            />
          </Grid>
          <Grid item xs={12}>
            <ReactQuill
              value={assignmentData.question}
              onChange={handleQuillChange}
              className={classes.quill}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Embedded URL"
              name="embeddedURL"
              value={assignmentData.embeddedURL}
              onChange={handleChange}
              className={classes.formControl}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Class"
              name="class"
              value={assignmentData.class}
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
              className={classes.formControl}
            >
              <option value="all">All</option>
              <option value="primary">Primary School</option>
              <option value="junior_secondary">Junior Secondary School</option>
              <option value="senior_secondary">Senior Secondary School</option>
            </TextField>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" fullWidth className={classes.button}>
          Submit Assignment
        </Button>
      </form>
    </Container>
  );
};

export default AssignmentForm;

