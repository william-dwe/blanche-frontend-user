import { ConfigProvider } from 'antd';
import React, { Suspense } from 'react';
import { router } from './helpers/route/routes';
import { RouterProvider } from 'react-router-dom';
import theme from './helpers/theme';
import { HelmetProvider } from 'react-helmet-async';
import { Loader } from './components';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <ConfigProvider theme={theme}>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      </ConfigProvider>
    </HelmetProvider>
  );
}

export default App;
