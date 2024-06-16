import React, { useState } from 'react';
import { Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, Pagination, Box } from '@mui/material';

interface Book {
  title: string;
  author: string;
  coverPhotoURL: string;
}

interface ReadingListProps {
  books: Book[];
  removeBookFromReadingList: (title: string) => void;
}

const NoBooksImage = "https://cdn.prod.website-files.com/652e0352ad50feae8734edac/6549d92f5ce5bce22b5418ef_Child%20Image%201.png";

const ReadingList: React.FC<ReadingListProps> = ({ books, removeBookFromReadingList }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedBooks = books.slice(startIndex, startIndex + itemsPerPage);
  const isEmpty = books.length === 0;

  return (
    <div>
      {!isEmpty && (
        <Grid container justifyContent="center" p={2}>
          <Typography variant="h5" gutterBottom color="teal" fontWeight="bold">
            Reading List
          </Typography>
        </Grid>
      )}
      {isEmpty ? (
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
              <img src={NoBooksImage} alt="No books image" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </Box>
          </Grid>
          <Grid item>
            <Typography variant="h6" color="error" align="center" pt={2} fontWeight="bold">
              Oops! There are no books in the reading list.
            </Typography>
            <Typography variant="h6" color="teal" align="center" fontWeight="bold">
              Start adding some books to your list.
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <div>
          <Grid container spacing={4}>
            {paginatedBooks.map((book, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card elevation={3}>  
                  <CardMedia
                    component="img"
                    image={book.coverPhotoURL}
                    alt={book.title}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h7"
                    >
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
          <Box display="flex" justifyContent="center" mt="20px">
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
