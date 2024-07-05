import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const useStyles = makeStyles((theme) => ({
  uploadSection: {
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

const ContentUploadForm = () => {
  const classes = useStyles();
  const [contentData, setContentData] = useState({
    title: '',
    description: '',
    type: 'text',
    content: '',
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleQuillChange = (value) => {
    setContentData((prevState) => ({
      ...prevState,
      content: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore();
    const storage = getStorage();

    let contentURL = contentData.content;

    if (file) {
      const fileRef = ref(storage, `content/${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file);

      await new Promise((resolve, reject) => {
        uploadTask.on('state_changed', () => {}, reject, async () => {
          contentURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve();
        });
      });
    }

    if (user) {
      const contentRef = doc(db, 'content', `content-${Date.now()}`);
      await setDoc(contentRef, {
        ...contentData,
        content: contentURL,
        submittedBy: user.uid,
        submittedAt: serverTimestamp(),
        approved: false,
      });
      // Redirect or give feedback to user
    }
  };

  return (
    <Container className={classes.uploadSection}>
      <Typography variant="h4" className={classes.title}>
        Upload Content
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={contentData.title}
              onChange={handleChange}
              className={classes.formControl}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={contentData.description}
              onChange={handleChange}
              multiline
              rows={2}
              className={classes.formControl}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Type"
              name="type"
              value={contentData.type}
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
              className={classes.formControl}
            >
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="svg">SVG</option>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            {contentData.type === 'text' && (
              <ReactQuill
                value={contentData.content}
                onChange={handleQuillChange}
                className={classes.quill}
              />
            )}
            {contentData.type !== 'text' && (
              <input
                type="file"
                onChange={handleFileChange}
                className={classes.formControl}
              />
            )}
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" fullWidth className={classes.button}>
          Upload
        </Button>
      </form>
    </Container>
  );
};

export default ContentUploadForm;

