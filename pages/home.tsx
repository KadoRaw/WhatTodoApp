import Head from 'next/head';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';

import MainNavigator from '@/components/layout/MainNavigator';
import NewNote from '@/components/NewNote/NewNote';
import Notes from '@/components/Notes/Notes';
import { fetchNotes } from '@/store/reducers/Notes/noteSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

const Home = () => {
  const { isLogin, username } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [creating, setCreating] = useState(false);
  useEffect(() => {
    if (!isLogin) {
      Router.push('/welcome');
      return;
    }

    dispatch(fetchNotes(username));
  }, [isLogin, dispatch, username]);

  const createNoteHandler = () => {
    setCreating(!creating);
  };

  return (
    <>
      {isLogin && (
        <>
          <Head>
            <title>WhatTodo</title>
            <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
            <meta httpEquiv='Content-Language' content='en' />
          </Head>
          {creating && <NewNote exitHandler={createNoteHandler} />}

          <MainNavigator />
          <Notes createNoteHandler={createNoteHandler} />
        </>
      )}
    </>
  );
};

export default Home;
