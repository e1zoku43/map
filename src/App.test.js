import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders the map container', () => {
    render(<App />);
    const mapContainer = screen.getByTestId('map-container');
    expect(mapContainer).toBeInTheDocument();
  });

  test('renders category select dropdown', () => {
    render(<App />);
    const categorySelect = screen.getByTestId('category-select');
    expect(categorySelect).toBeInTheDocument();
  });

  test('renders favorite places list', () => {
    render(<App />);
    const favoritesList = screen.getByTestId('favorites-list');
    expect(favoritesList).toBeInTheDocument();
  });

  test('allows user to select a category', () => {
    render(<App />);
    const categorySelect = screen.getByTestId('category-select');
    fireEvent.change(categorySelect, { target: { value: 'museums' } });
    expect(categorySelect.value).toBe('museums');
  });

  test('renders info window when a marker is clicked', () => {
    render(<App />);

    const marker = screen.getByTestId('marker-1');
    fireEvent.click(marker);
    const infoWindow = screen.getByTestId('info-window');
    expect(infoWindow).toBeInTheDocument();
  });

  test('adds a place to favorites', () => {
    render(<App />);

    const marker = screen.getByTestId('marker-1');
    fireEvent.click(marker);
    const favoriteButton = screen.getByTestId('favorite-button');
    fireEvent.click(favoriteButton);
    const favoriteItem = screen.getByTestId('favorite-item-1');
    expect(favoriteItem).toBeInTheDocument();
  });

  test('displays route to selected place', () => {
    render(<App />);

    const marker = screen.getByTestId('marker-1');
    fireEvent.click(marker);
    const routeButton = screen.getByTestId('route-button');
    fireEvent.click(routeButton);
    const routeInfo = screen.getByTestId('route-info');
    expect(routeInfo).toBeInTheDocument();
  });
});
