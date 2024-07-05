import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import ContentItem from './ContentItem';

const useStyles = makeStyles((theme) => ({
  contentSection: {
    padding: '2rem',
    backgroundColor: '#f9f9f9',
  },
  title: {
    color: '#6a1b9a',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
  },
}));

const StudentContent = () => {
  const classes = useStyles();
  const [content, setContent] = useState([]);
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      onSnapshot(userRef, (snapshot) => {
        const userData = snapshot.data();
        const userClass = userData.class;

        const q = query(
          collection(db, 'content'),
          where('class', 'in', ['all', userClass])
        );

        onSnapshot(q, (querySnapshot) => {
          const contentList = [];
          querySnapshot.forEach((doc) => {
            contentList.push({ id: doc.id, ...doc.data() });
          });
          setContent(contentList);
        });
      });
    }
  }, [user, db]);

  return (
    <Container className={classes.contentSection}>
      <Typography variant="h4" className={classes.title}>
        Educational Content
      </Typography>
      <Grid container spacing={2}>
        {content.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <ContentItem
              title={item.title}
              description={item.description}
              type={item.type}
              content={item.content}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StudentContent;

