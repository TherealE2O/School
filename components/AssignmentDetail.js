import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useParams } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const useStyles = makeStyles((theme) => ({
  detailSection: {
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
  embeddedFrame: {
    width: '100%',
    height: '400px',
    border: 'none',
    marginTop: '1rem',
  },
}));

const AssignmentDetail = () => {
  const classes = useStyles();
  const { assignmentId } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [responseData, setResponseData] = useState({
    responseText: '',
    responseFile: null,
  });

  const handleQuillChange = (value) => {
    setResponseData((prevState) => ({
      ...prevState,
      responseText: value,
    }));
  };

  const handleFileChange = (e) => {
    setResponseData((prevState) => ({
      ...prevState,
      responseFile: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    const storage = getStorage();

    let responseFileURL = '';

    if (responseData.responseFile) {
      const responseFileRef = ref(storage, `responses/${responseData.responseFile.name}`);
      const uploadTask = uploadBytesResumable(responseFileRef, responseData.responseFile);

      await new Promise((resolve, reject) => {
        uploadTask.on('state_changed', () => {}, reject, async () => {
          responseFileURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve();
        });
      });
    }

    if (user) {
      const responseRef = doc(db, 'responses', `response-${Date.now()}`);
      await setDoc(responseRef, {
        assignmentId: assignmentId,
        responseText: responseData.responseText,
        responseFileURL,
        submittedBy: user.uid,
        submittedAt: serverTimestamp(),
      });
      // Redirect or give feedback to user
    }
  };

  useEffect(() => {
    const fetchAssignment = async () => {
      const db = getFirestore();
      const docRef = doc(db, 'assignments', assignmentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setAssignment(docSnap.data());
      }
    };

    fetchAssignment();
  }, [assignmentId]);

  if (!assignment) {
    return <div>Loading...</div>;
  }

  return (
    <Container className={classes.detailSection}>
      <Typography variant="h4" className={classes.title}>
        {assignment.title}
      </Typography>
      <Typography variant="body1" className={classes.formControl}>
        {assignment.description}
      </Typography>
      <div className={classes.formControl}>
        <ReactQuill value={assignment.question} readOnly={true} theme="bubble" />
      </div>
      {assignment.embeddedURL && (
        <iframe
          src={assignment.embeddedURL}
          title="Embedded Content"
          className={classes.embeddedFrame}
        ></iframe>
      )}
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" className={classes.formControl}>
          Submit Your Response
        </Typography>
        <ReactQuill
          value={responseData.responseText}
          onChange={handleQuillChange}
          className={classes.quill}
        />
        <input
          type="file"
          name="responseFile"
          onChange={handleFileChange}
          className={classes.formControl}
        />
        <Button type="submit" variant="contained" fullWidth className={classes.button}>
          Submit Response
        </Button>
      </form>
    </Container>
  );
};

export default AssignmentDetail;

