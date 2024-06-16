import React, { useState, useEffect, ChangeEvent } from 'react';
import { TextField, CardMedia, Typography, Paper, MenuItem, ClickAwayListener, Button, Grid } from '@mui/material';

interface Book {
  title: string;
  author: string;
  readingLevel: string;
  coverPhotoURL: string;
}

interface SearchBarProps {
  addBookToReadingList: (book: Book) => void;
  books: Book[];
}

const SearchBar: React.FC<SearchBarProps> = ({ addBookToReadingList, books }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    setFilteredBooks(
      books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [books, searchTerm]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowResults(true);
  };

  const handleResultClick = (book: Book) => {
    addBookToReadingList(book);
    setShowResults(false);
    setSearchTerm('');
  };

  const handleClickAway = () => {
    setShowResults(false);
  };

  return (
    <div>
      <TextField
        label="Search Books"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{ endAdornment: !filteredBooks.length && <Typography variant="caption" color="error">We don't have the book at the moment</Typography> }}
      />
      {showResults && searchTerm && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper
            sx={{
              position: 'absolute',
              zIndex: 1,
              width: '30%',
              maxHeight: '300px',
              overflowY: 'auto'
            }}
          >
            {filteredBooks.map((book, index) => (
              <MenuItem key={index} onClick={() => handleResultClick(book)}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <CardMedia
                      component="img"
                      image={book.coverPhotoURL}
                      alt={book.title}
                      sx={{ width: 50, height: 75 }}
                    />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="subtitle1">{book.title}</Typography>
                    <Typography variant="body2" color="textSecondary">{book.author}</Typography>
                  </Grid>
                  <Grid item>
                    <Button color="info" variant="contained" size="small" onClick={() => addBookToReadingList(book)}>
                      <Typography variant="button" color="white" fontWeight="bold">Add</Typography>
                    </Button>
                  </Grid>
                </Grid>
              </MenuItem>
            ))}
          </Paper>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default SearchBar;
