import { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { useAuthStore } from '../stores/authStore';

let connection: signalR.HubConnection | null = null;
let startPromise: Promise<void> | null = null;

function getConnection(): signalR.HubConnection {
  if (!connection) {
    connection = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_API_URL}/hubs/chat`, {
        accessTokenFactory: () => useAuthStore.getState().accessToken ?? '',
      })
      .withAutomaticReconnect()
      .build();
  }
  return connection;
}

function ensureStarted(): Promise<void> {
  const conn = getConnection();
  if (conn.state === signalR.HubConnectionState.Connected) {
    return Promise.resolve();
  }
  if (!startPromise) {
    startPromise = conn.start().catch((err) => {
      startPromise = null;
      throw err;
    });
  }
  return startPromise;
}

/**
 * Shared SignalR connection to the chat hub. The underlying connection is a
 * module-level singleton so the Layout badge and MessagesPage stay in sync.
 */
export function useSignalR() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      if (connection) {
        connection.stop();
        connection = null;
        startPromise = null;
      }
      setConnected(false);
      return;
    }

    const conn = getConnection();

    ensureStarted()
      .then(() => setConnected(true))
      .catch(() => setConnected(false));

    const handleReconnected = () => setConnected(true);
    const handleClose = () => setConnected(false);

    conn.onreconnected(handleReconnected);
    conn.onclose(handleClose);

    return () => {
      conn.off('reconnected', handleReconnected);
    };
  }, [accessToken]);

  return {
    connection: getConnection(),
    connected,
    joinConversation: (otherUserId: number) =>
      ensureStarted().then(() => getConnection().invoke('JoinConversation', otherUserId)),
    sendMessage: (recipientId: number, content: string) =>
      ensureStarted().then(() => getConnection().invoke('SendMessage', recipientId, content)),
    markAsRead: (otherUserId: number) =>
      ensureStarted().then(() => getConnection().invoke('MarkAsRead', otherUserId)),
    typing: (recipientId: number) =>
      ensureStarted().then(() => getConnection().invoke('Typing', recipientId)),
  };
}
