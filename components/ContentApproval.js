import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getFirestore, collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const useStyles = makeStyles((theme) => ({
  approvalSection: {
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

const ContentApproval = () => {
  const classes = useStyles();
  const [pendingContent, setPendingContent] = useState([]);
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, 'content'),
        where('approved', '==', false)
      );

      onSnapshot(q, (querySnapshot) => {
        const contentList = [];
        querySnapshot.forEach((doc) => {
          contentList.push({ id: doc.id, ...doc.data() });
        });
        setPendingContent(contentList);
      });
    }
  }, [user, db]);

  const handleApprove = async (contentId) => {
    const contentRef = doc(db, 'content', contentId);
    await updateDoc(contentRef, {
      approved: true,
    });
  };

  return (
    <Container className={classes.approvalSection}>
      <Typography variant="h4" className={classes.title}>
        Pending Content Approval
      </Typography>
      <Grid container spacing={2}>
        {pendingContent.map((content) => (
          <Grid item xs={12} key={content.id}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6">{content.title}</Typography>
                <Typography variant="body2">{content.description}</Typography>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={() => handleApprove(content.id)}
                >
                  Approve
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ContentApproval;

