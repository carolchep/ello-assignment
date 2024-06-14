import React from 'react';
import { render } from '@testing-library/react';
import ReadingList from './index';

const mockBooks = [
  {
    title: 'Book 1',
    author: 'Author 1',
    coverPhotoURL: 'https://example.com/book1.jpg',
  },
  {
    title: 'Book 2',
    author: 'Author 2',
    coverPhotoURL: 'https://example.com/book2.jpg',
  },
]

describe('ReadingList', () => {
  it('renders with no books', () => {
    const { getByText, getByAltText } = render(<ReadingList books={[]} />);
    expect(getByText(/oops! there are no books/i)).toBeInTheDocument();
    expect(getByAltText('No books image')).toBeInTheDocument();
  });

  it('renders with books', () => {
    const { getByText, getByAltText } = render(<ReadingList books={mockBooks} />);
    expect(getByText('Book 1')).toBeInTheDocument();
    expect(getByText('Book 2')).toBeInTheDocument();
    expect(getByAltText('Book 1')).toBeInTheDocument();
    expect(getByAltText('Book 2')).toBeInTheDocument();
  })
})
