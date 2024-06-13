import React, { useState } from 'react';
import { Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, Pagination, Box } from '@mui/material';

const NoBooksImage = 'https://cdn.prod.website-files.com/652e0352ad50feae8734edac/652e0352ad50feae8734f43c_404%20Image%20-enlarged.png';

const ReadingList = ({ books, removeBookFromReadingList }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 8; 

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedBooks = books.slice(startIndex, startIndex + itemsPerPage);
  const isEmpty = books.length === 0;

  return (
    <div>
      <Grid container justifyContent="center" p={2}>
        <Typography variant="h5" gutterBottom color="teal" style={{ fontWeight: 'bold' }}>
          Reading List
        </Typography>
      </Grid>
      {isEmpty ? (
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <img src={NoBooksImage} alt="No books image" style={{ width: '300px', height: 'auto' }} />
          </Grid>
          <Grid item>
            <Typography variant="body"  color="error">
              Oops! There are no books in the reading list.
            </Typography>
            <Typography variant="body4" color="teal">
              Start adding some books to your list.
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <div>
          <Grid container spacing={4}>
            {paginatedBooks.map((book, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
                  <CardMedia
                    component="img"
                    image={book.coverPhotoURL}
                    alt={book.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {book.author}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained" color="error" onClick={() => removeBookFromReadingList(book.title)}>
                      Remove
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="center" marginTop="20px">
            <Pagination
              count={Math.ceil(books.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </div>
      )}
    </div>
  );
};

export default ReadingList;
