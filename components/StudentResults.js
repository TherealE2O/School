import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const useStyles = makeStyles((theme) => ({
  resultsSection: {
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

const StudentResults = () => {
  const classes = useStyles();
  const [results, setResults] = useState({});
  const [overallPercentage, setOverallPercentage] = useState(0);
  const [overallPosition, setOverallPosition] = useState(0);
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const studentRef = doc(db, 'students', user.uid);
      onSnapshot(studentRef, (snapshot) => {
        const data = snapshot.data();
        setResults(data.results);
        setOverallPercentage(data.overallPercentage);
        setOverallPosition(data.overallPosition);
      });
    }
  }, [user, db]);

  return (
    <Container className={classes.resultsSection}>
      <Typography variant="h4" className={classes.title}>
        Your Results
      </Typography>
      <Typography variant="h6">
        Overall Percentage: {overallPercentage}%
      </Typography>
      <Typography variant="h6">
        Overall Position: {overallPosition}
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(results).map(([subject, result]) => (
          <Grid item xs={12} sm={6} md={4} key={subject}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6">{subject}</Typography>
                <Typography variant="body2">Score: {result.score}</Typography>
                <Typography variant="body2">Position: {result.position}</Typography>
                <Typography variant="body2">Percentage: {result.percentage}%</Typography>
                <Typography variant="body2">Attendance: {result.attendance}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StudentResults;

