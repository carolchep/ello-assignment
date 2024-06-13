import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
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

  useEffect(() => {
    if (data && data.books) {
      setBooks(data.books);
    }
  }, [data]);

  useEffect(() => {
    const savedReadingList = JSON.parse(localStorage.getItem('readingList')) || [];
    setReadingList(savedReadingList);
  }, []);

  useEffect(() => {
    localStorage.setItem('readingList', JSON.stringify(readingList));
  }, [readingList]);

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

  const removeBookFromReadingList = (title) => {
    setReadingList(readingList.filter(book => book.title !== title));
  };

  return (
    <Box padding={20} display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" gutterBottom>
        <span style={{ fontWeight: 'bold', color: 'turquoise' }}>Book</span>
        <span style={{ fontWeight: 'bold', color: 'error' }}>Assignment View</span>
      </Typography>
      {message && (
        <Alert severity={message.includes('already') ? 'error' : 'success'} onClose={() => setMessage('')}>
          {message}
        </Alert>
      )}
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error :(</p>
          ) : (
            <>
              <SearchBar addBookToReadingList={addBookToReadingList} books={books} />
              <ReadingList books={readingList} removeBookFromReadingList={removeBookFromReadingList} />
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
