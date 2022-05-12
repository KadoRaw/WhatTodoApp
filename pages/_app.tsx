import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';

import { httpGet } from '@/utils/helpers/httpHelper';
import store from '@/store/store';
import { login } from '@/store/reducers/Auth/authSlice';
import { setdark } from '@/store/reducers/Theme/themeSlice';

import '../src/styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      const response = (await httpGet(
        '/api/auth/checkuserindex'
      )) as AxiosResponse;

      const { isLogged: isLogin, username } = response.data;
      if (isLogin) {
        let isDark;
        const isDarkCookie = document.cookie.split(';');

        isDarkCookie.forEach((x) => {
          if (x.includes('isDark')) {
            isDark = x.split('=')[1];
          }
        });

        if (isDark === 'true') {
          store.dispatch(setdark());
        }
      } else {
        const isDark = document.cookie.split('=')[1];
        if (isDark === 'true') {
          store.dispatch(setdark());
        }
      }

      store.dispatch(login({ isLogin, username }));
      setLoading(true);
    })();
  }, []);

  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Provider store={store}>
        {Loading && <Component {...pageProps} />}
      </Provider>
    </>
  );
}

export default MyApp;
