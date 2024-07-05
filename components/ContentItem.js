import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: '1rem',
  },
}));

const ContentItem = ({ title, description, type, content }) => {
  const classes = useStyles();

  const renderContent = () => {
    switch (type) {
      case 'text':
        return <Typography variant="body2">{content}</Typography>;
      case 'image':
        return <img src={content} alt={title} style={{ width: '100%' }} />;
      case 'video':
        return (
          <video controls style={{ width: '100%' }}>
            <source src={content} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case 'svg':
        return <img src={content} alt={title} style={{ width: '100%' }} />;
      default:
        return null;
    }
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default ContentItem;

