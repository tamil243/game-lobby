import React from 'react';
import Head from 'next/head';
import GameLobby from '@/components/GameLobby';

export default function Home() {
  return (
    <>
      <Head>
        <title>Game Lobby - Interactive Gaming Experience</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <meta name="apple-mobile-web-app-capable" content="true" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>

      <div className="w-screen h-screen overflow-hidden">
        <GameLobby />
      </div>
    </>
  );
}
