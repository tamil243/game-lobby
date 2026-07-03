import React from 'react';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import AnimatedBackground from '@/components/AnimatedBackground';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AnimatedBackground />
      <Component {...pageProps} />
    </>
  );
}

export default App;
