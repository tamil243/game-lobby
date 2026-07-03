import { create } from 'zustand';

export interface GameLobbyStore {
  playerName: string;
  selectedGame: string | null;
  volume: number;
  isSoundEnabled: boolean;
  currentLobby: string | null;
  playersOnline: number;
  setPlayerName: (name: string) => void;
  setSelectedGame: (game: string | null) => void;
  setVolume: (volume: number) => void;
  toggleSound: () => void;
  setCurrentLobby: (lobby: string | null) => void;
  setPlayersOnline: (count: number) => void;
}

export const useGameStore = create<GameLobbyStore>((set) => ({
  playerName: 'Player_' + Math.floor(Math.random() * 10000),
  selectedGame: null,
  volume: 0.7,
  isSoundEnabled: true,
  currentLobby: null,
  playersOnline: 0,
  setPlayerName: (name) => set({ playerName: name }),
  setSelectedGame: (game) => set({ selectedGame: game }),
  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
  toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
  setCurrentLobby: (lobby) => set({ currentLobby: lobby }),
  setPlayersOnline: (count) => set({ playersOnline: count }),
}));
