import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { setupStore } from '../redux/store';
import { renderWithProviders } from '../utils/test-utils';
import Nav from './Nav';

describe('トップナビゲーションの表示', () => {
  describe('未ログイン', () => {
    it('「Login」と「Register」のリンクが表示されていること', () => {
      const store = setupStore({ auth: { value: false } });
      renderWithProviders(
        <BrowserRouter>
          <Nav />
        </BrowserRouter>,
        { store }
      );
      expect(screen.getByRole('link', { name: 'Login' })).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: 'Register' })
      ).toBeInTheDocument();
    });
    it('「Private1」と「Private2」のリンクが表示されていないこと', () => {
      const store = setupStore({ auth: { value: false } });
      renderWithProviders(
        <BrowserRouter>
          <Nav />
        </BrowserRouter>,
        { store }
      );
      expect(
        screen.queryByRole('link', { name: 'Private1' })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('link', { name: 'Private2' })
      ).not.toBeInTheDocument();
    });
    it('Logoutボタンが表示されていないこと', () => {
      const store = setupStore({ auth: { value: false } });
      renderWithProviders(
        <BrowserRouter>
          <Nav />
        </BrowserRouter>,
        { store }
      );
      expect(
        screen.queryByRole('button', { name: 'Logout' })
      ).not.toBeInTheDocument();
    });
  });
  describe('ログイン済み', () => {
    it('「Login」と「Register」のリンクが表示されていないこと', () => {
      const store = setupStore({ auth: { value: true } });
      renderWithProviders(
        <BrowserRouter>
          <Nav />
        </BrowserRouter>,
        { store }
      );
      expect(
        screen.queryByRole('link', { name: 'Login' })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('link', { name: 'Register' })
      ).not.toBeInTheDocument();
    });
    it('「Private1」と「Private2」のリンクが表示されていること', () => {
      const store = setupStore({ auth: { value: true } });
      renderWithProviders(
        <BrowserRouter>
          <Nav />
        </BrowserRouter>,
        { store }
      );
      expect(
        screen.getByRole('link', { name: 'Private1' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: 'Private2' })
      ).toBeInTheDocument();
    });
    it('Logoutボタンが表示されていること', () => {
      const store = setupStore({ auth: { value: true } });
      renderWithProviders(
        <BrowserRouter>
          <Nav />
        </BrowserRouter>,
        { store }
      );
      expect(
        screen.getByRole('button', { name: 'Logout' })
      ).toBeInTheDocument();
    });
  });
});
