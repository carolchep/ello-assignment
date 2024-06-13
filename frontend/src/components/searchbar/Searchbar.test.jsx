import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from './index';

describe('SearchBar', () => {
  it('renders without crashing', () => {
    const books = [
      { title: 'Harry Potter', author: 'J.K. Rowling', coverPhotoURL: 'harry_potter.jpg' },
      { title: 'The Hobbit', author: 'J.R.R. Tolkien', coverPhotoURL: 'the_hobbit.jpg' },
    ];
    render(<SearchBar books={books} />);
  });

  it('displays search results when searchTerm is not empty', () => {
    const books = [
      { title: 'Harry Potter', author: 'J.K. Rowling', coverPhotoURL: 'harry_potter.jpg' },
      { title: 'The Hobbit', author: 'J.R.R. Tolkien', coverPhotoURL: 'the_hobbit.jpg' },
    ];

    const { getByLabelText, getByText } = render(<SearchBar books={books} />);
    const searchInput = getByLabelText('Search Books');

    fireEvent.change(searchInput, { target: { value: 'Harry Potter' } });
    expect(getByText('Harry Potter')).toBeInTheDocument();
    expect(getByText('J.K. Rowling')).toBeInTheDocument(); 
  });

});
