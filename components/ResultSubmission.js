import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getFirestore, collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const useStyles = makeStyles((theme) => ({
  submissionSection: {
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

const ResultsSubmission = () => {
  const classes = useStyles();
  const [pendingResults, setPendingResults] = useState([]);
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, 'students'),
        where('formTeacherId', '==', user.uid)
      );

      onSnapshot(q, (querySnapshot) => {
        const results = [];
        querySnapshot.forEach((docSnap) => {
          const studentData = docSnap.data();
          for (const [subject, result] of Object.entries(studentData.results)) {
            if (!result.approved) {
              results.push({
                studentId: docSnap.id,
                subject,
                ...result,
              });
            }
          }
        });
        setPendingResults(results);
      });
    }
  }, [user, db]);

  const handleSubmit = async (result) => {
    const studentRef = doc(db, 'students', result.studentId);
    await updateDoc(studentRef, {
      [`results.${result.subject}.submitted`]: true,
    });
    // Provide feedback to the user
  };

  return (
    <Container className={classes.submissionSection}>
      <Typography variant="h4" className={classes.title}>
        Submit Pending Results
      </Typography>
      <Grid container spacing={2}>
        {pendingResults.map((result) => (
          <Grid item xs={12} key={result.studentId + result.subject}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6">{result.subject}</Typography>
                <Typography variant="body2">Student ID: {result.studentId}</Typography>
                <Typography variant="body2">Score: {result.score}</Typography>
                <Typography variant="body2">Position: {result.position}</Typography>
                <Typography variant="body2">Percentage: {result.percentage}%</Typography>
                <Typography variant="body2">Attendance: {result.attendance}</Typography>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={() => handleSubmit(result)}
                >
                  Submit
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ResultsSubmission;

