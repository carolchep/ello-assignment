import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import { CardMedia } from '@mui/material';
import SearchBar from './components/searchbar';
import ReadingList from './components/readinglist';
import { useQuery, gql } from '@apollo/client';
import Alert from '@mui/material/Alert';

const GET_BOOKS = gql`
  query Books {
    books {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [books, setBooks] = useState([]);
  const [readingList, setReadingList] = useState([]);
  const [message, setMessage] = useState('');
  // Effect to update books state when data changes

  useEffect(() => {
    if (data && data.books) {
      setBooks(data.books);
    }
  }, [data]);
  // Effect to load reading list from local storage

  useEffect(() => {
    const savedReadingList = JSON.parse(localStorage.getItem('readingList')) || [];
    setReadingList(savedReadingList);
  }, []);
  // Effect to save reading list to local storage

  useEffect(() => {
    localStorage.setItem('readingList', JSON.stringify(readingList));
  }, [readingList]);

  // Function to add a book to reading list
  const addBookToReadingList = (book) => {
    const isAlreadyAdded = readingList.map(item => item.title).includes(book.title);

    if (!isAlreadyAdded) {
      setReadingList([...readingList, book]);
      setBooks(prevBooks => prevBooks.filter(b => b.title !== book.title));
      setMessage(`You've added ${book.title} to your reading list.`);
    } else {
      setMessage(`You've already added ${book.title} to your reading list.`);
    }
  };
  // Function to remove a book from reading list

  const removeBookFromReadingList = (title) => {
    setReadingList(readingList.filter(book => book.title !== title));
  };

  return (
    <Container>
      <Box padding={4} display="flex" flexDirection="column" pt={10}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Typography variant="h4" fontWeight="bold" color="secondary">
              Book
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4" fontWeight="bold" color="error">
              Assignment View
            </Typography>
          </Grid>
        </Grid>
        {message && (
          <Alert severity={message.includes('already') ? 'error' : 'success'} onClose={() => setMessage('')}>
            {message}
          </Alert>
        )}
        <>
          {loading ? (
            <Typography variant="body1">Loading...</Typography>
          ) : error ? (
            <Box display="flex" flexDirection="column" alignItems="center">
              <CardMedia
                component="img"
                image="https://cdn.prod.website-files.com/652e0352ad50feae8734edac/652e0352ad50feae8734f43c_404%20Image%20-enlarged.png"
                alt="Error Image"
                style={{ width: '50%', height: 'auto', marginBottom: '10px' }}
              />
              <Typography variant="h6" color="error" fontWeight="bold">
                Error 😞
              </Typography>
              <Typography variant="h6" color="error" fontWeight="bold">
                Oops! Something went wrong. Please try again later.
              </Typography>
            </Box>
          ) : (
            <>
              <SearchBar addBookToReadingList={addBookToReadingList} books={books} />
              <ReadingList books={readingList} removeBookFromReadingList={removeBookFromReadingList} />
            </>
          )}
        </>
      </Box>
    </Container>
  );
};

export default App;
