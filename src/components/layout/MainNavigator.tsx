import React from 'react';
import Router from 'next/router';
import { LogoutIcon, UserIcon } from '@heroicons/react/solid';
import styles from './MainNavigator.module.css';
import { register } from '../../store/reducers/Auth/authSlice';
import store from '../../store/store';
import { httpGet } from '../../utils/helpers/httpHelper';

const MainNavigator = () => {
  const logOutClickHandler = () => {
    httpGet('/api/Auth/logout');

    store.dispatch(register({ isRegistered: false, username: '' }));
    Router.push('/');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.profile}>
          <UserIcon className={styles.icon} />
          Profile
        </div>
        <div className={styles.logout} onClick={logOutClickHandler}>
          <LogoutIcon className={styles.icon} />
          Logout
        </div>
      </nav>
      <div className={styles.logo}>WhatTodo</div>
    </header>
  );
};

export default MainNavigator;