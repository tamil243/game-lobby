import React from 'react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import '@/styles/globals.css';

const AnimatedBackground = dynamic(() => import('@/components/AnimatedBackground'), {
  ssr: false,
});

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AnimatedBackground />
      <Component {...pageProps} />
    </>
  );
}

export default App;
