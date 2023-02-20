import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NavBar } from '../components/NavBar';

describe('NavBar', () => {
  it('renders a h1 element with text "Podcaster"', () => {
    const { getByText } = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    expect(getByText('Podcaster')).toBeInTheDocument();
  });
});