import React from 'react';
import {Paper, Tooltip, Typography, useTheme} from "@mui/material";

const BookCard = ({book, sx = []}) => {
  const theme = useTheme()

  return (
    <Paper elevation={4} sx={[
      {
        p: 1.5,
        maxWidth: '220px',
        cursor: 'pointer',
        "&:hover .bookCover": {
          opacity: 0.85
        }
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}>
      <Tooltip title={book.title}>
        <Typography fontWeight={'bold'} noWrap>{book.title}</Typography>
      </Tooltip>
      <Typography color={'text.secondary'} variant={'body2'} noWrap>{book.author}</Typography>
      <img
        src={`data:image/png;base64,${book.cover}`}
        alt={""}
        style={{
          marginTop: theme.spacing(1),
          width: '100%',
          transition: theme.transitions.create(["opacity"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shortest,
          }),
          boxShadow: theme.shadows[2]
        }}
        className={"bookCover"}/>
    </Paper>
  );
};

export default BookCard;