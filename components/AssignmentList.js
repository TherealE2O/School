import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  assignmentSection: {
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

const AssignmentList = () => {
  const classes = useStyles();
  const [assignments, setAssignments] = useState([]);
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      onSnapshot(userRef, (snapshot) => {
        const userData = snapshot.data();
        const userClass = userData.class; // Assume user data includes the class information

        const q = query(
          collection(db, 'assignments'),
          where('class', 'in', ['all', userClass])
        );

        onSnapshot(q, (querySnapshot) => {
          const assignmentList = [];
          querySnapshot.forEach((doc) => {
            assignmentList.push({ id: doc.id, ...doc.data() });
          });
          setAssignments(assignmentList);
        });
      });
    }
  }, [user, db]);

  return (
    <Container className={classes.assignmentSection}>
      <Typography variant="h4" className={classes.title}>
        Assignments
      </Typography>
      <Grid container spacing={2}>
        {assignments.map((assignment) => (
          <Grid item xs={12} key={assignment.id}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6">{assignment.title}</Typography>
                <Typography variant="body2">{assignment.description}</Typography>
                <Button
                  variant="contained"
                  className={classes.button}
                  component={Link}
                  to={`/assignments/${assignment.id}`}
                >
                  View Assignment
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AssignmentList;

