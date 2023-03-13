import React from 'react';
import { AppShell } from '@mantine/core';
import Header from './components/common/Header';
import MainPage from './components/pages/MainPage';

const MainContainer = () => {
  return (
    <AppShell padding="md" navbarOffsetBreakpoint="sm" asideOffsetBreakpoint="sm" header={<Header />}>
      <MainPage />
    </AppShell>
  );
};

export default MainContainer;
