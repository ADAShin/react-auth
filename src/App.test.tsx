import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithProviders } from './utils/test-utils';
import { setupStore } from './redux/store';
import App from './App';
import { UserInfo } from './service/api/type';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const dummyUser: UserInfo = {
  id: 1,
  first_name: 'taro',
  last_name: 'test',
  email: 'test_taro@example.com',
};

let consoleErrorSpy: jest.SpyInstance;
let consoleDebugSpy: jest.SpyInstance;

const server = setupServer(
  rest.get(`${API_BASE_URL}user`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(dummyUser))
  ),
  rest.post(`${API_BASE_URL}refresh`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ token: 'foo' }))
  )
);

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  consoleErrorSpy = jest.spyOn(console, 'error');
  consoleErrorSpy.mockImplementation(() => void 0);
  consoleDebugSpy = jest.spyOn(console, 'debug');
  consoleDebugSpy.mockImplementation(() => void 0);
});

afterEach(() => {
  server.resetHandlers();
  consoleErrorSpy.mockRestore();
  consoleDebugSpy.mockRestore();
});

afterAll(() => server.close());

describe('アプリケーションのテスト', () => {
  describe('ホーム画面のテスト', () => {
    it('未ログイン時にHome画面を表示すると「You are not authenticated」が表示される', async () => {
      const store = setupStore({ auth: { value: false } });
      renderWithProviders(<App />, { store });
      expect(await screen.findByTestId('not-auth')).toHaveTextContent(
        'You are not authenticated'
      );
    });
    it('ログイン後にAPIからユーザー情報の取得に成功すると正しく情報が表示される', async () => {
      const store = setupStore({ auth: { value: true } });
      renderWithProviders(<App />, { store });
      expect(await screen.findByTestId('auth-user')).toHaveTextContent(
        'Hi taro test'
      );
    });
    it('ログイン後にAPI認証は成功するがユーザー情報の取得に失敗（500エラー）するとErrorが表示される', async () => {
      server.use(
        rest.get(`${API_BASE_URL}user`, (req, res, ctx) => {
          return res(ctx.status(500));
        })
      );
      const store = setupStore({ auth: { value: true } });
      renderWithProviders(<App />, { store });
      expect(await screen.findByText('Error')).toBeInTheDocument();
    });
    it('ログイン後にユーザー取得APIで401エラーが返され、リフレッシュトークンによりトークンを再取得したのち再度ユーザー取得して成功すると正常に表示される', async () => {
      let getuserApiCallCount = 0;
      server.use(
        rest.get(`${API_BASE_URL}user`, (req, res, ctx) => {
          getuserApiCallCount++;
          if (getuserApiCallCount <= 1) {
            return res(ctx.status(401));
          }
          return res(ctx.status(200), ctx.json(dummyUser));
        })
      );
      const store = setupStore({ auth: { value: true } });
      renderWithProviders(<App />, { store });
      expect(await screen.findByTestId('auth-user')).toHaveTextContent(
        'Hi taro test'
      );
    });
    it('ログイン後にユーザー取得APIで401エラーが返され、リフレッシュトークンによるトークン再取得でも401となるとログイン画面にリダイレクトされる', async () => {
      server.use(
        rest.get(`${API_BASE_URL}user`, (req, res, ctx) => {
          return res(ctx.status(401));
        }),
        rest.post(`${API_BASE_URL}refresh`, (req, res, ctx) =>
          res(ctx.status(401))
        )
      );
      const store = setupStore({ auth: { value: true } });
      renderWithProviders(<App />, { store });
      expect(
        await screen.findByRole('heading', { name: 'Please sign in' })
      ).toBeInTheDocument();
    });
  });
});
