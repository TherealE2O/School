import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CSVReader } from 'react-papaparse';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import DataGrid from 'react-data-grid';

const useStyles = makeStyles((theme) => ({
  editorSection: {
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
}));

const ResultsEditor = () => {
  const classes = useStyles();
  const [subject, setSubject] = useState('');
  const [results, setResults] = useState([]);
  const auth = getAuth();
  const db = getFirestore();

  const handleCSVLoad = (data) => {
    const parsedResults = data.map((row) => ({
      studentId: row.data.studentId,
      score: row.data.score,
      position: row.data.position,
      percentage: row.data.percentage,
      attendance: row.data.attendance,
    }));
    setResults(parsedResults);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResults((prevState) =>
      prevState.map((result) =>
        result.studentId === name ? { ...result, score: value } : result
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const result of results) {
      const studentRef = doc(db, 'students', result.studentId);
      await updateDoc(studentRef, {
        [`results.${subject}`]: {
          score: result.score,
          position: result.position,
          percentage: result.percentage,
          attendance: result.attendance,
          approved: false,
        },
      });
    }
    // Provide feedback to the user
  };

  return (
    <Container className={classes.editorSection}>
      <Typography variant="h4" className={classes.title}>
        Edit Results
      </Typography>
      <TextField
        fullWidth
        label="Subject"
        name="subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className={classes.formControl}
      />
      <CSVReader onFileLoad={handleCSVLoad}>
        <span>Upload CSV</span>
      </CSVReader>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {results.map((result) => (
            <Grid item xs={12} key={result.studentId}>
              <TextField
                fullWidth
                label={`Score for Student ID: ${result.studentId}`}
                name={result.studentId}
                value={result.score}
                onChange={handleChange}
                className={classes.formControl}
              />
            </Grid>
          ))}
        </Grid>
        <Button type="submit" variant="contained" fullWidth className={classes.button}>
          Submit Results
        </Button>
      </form>
    </Container>
  );
};

export default ResultsEditor;

