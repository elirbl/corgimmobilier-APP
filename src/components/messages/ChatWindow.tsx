import { useEffect, useRef, useState } from 'react';
import { useConversation, useInvalidateConversations } from '../../hooks/useMessages';
import { useSignalR } from '../../hooks/useSignalR';
import type { Message } from '../../types';

const timeFormatter = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' });
const TYPING_TIMEOUT_MS = 3000;

interface ChatWindowProps {
  currentUserId: number;
  otherUserId: number;
  otherUserName: string;
  onBack?: () => void;
}

export function ChatWindow({ currentUserId, otherUserId, otherUserName, onBack }: ChatWindowProps) {
  const { data } = useConversation(otherUserId, 1, 50);
  const { connection, joinConversation, sendMessage, markAsRead, typing } = useSignalR();
  const invalidateConversations = useInvalidateConversations();

  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [otherTyping, setOtherTyping] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (data) {
      setMessages([...data.items].reverse());
    }
  }, [data]);

  useEffect(() => {
    joinConversation(otherUserId);
    markAsRead(otherUserId);
    invalidateConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otherUserId]);

  useEffect(() => {
    function handleReceive(message: Message) {
      if (message.senderId === otherUserId || message.recipientId === otherUserId) {
        setMessages((prev) => [...prev, message]);
        if (message.senderId === otherUserId) {
          markAsRead(otherUserId);
        }
      }
      invalidateConversations();
    }

    function handleTyping(payload: { userId: number }) {
      if (payload.userId === otherUserId) {
        setOtherTyping(true);
        window.clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = window.setTimeout(() => setOtherTyping(false), TYPING_TIMEOUT_MS);
      }
    }

    connection.on('ReceiveMessage', handleReceive);
    connection.on('UserTyping', handleTyping);

    return () => {
      connection.off('ReceiveMessage', handleReceive);
      connection.off('UserTyping', handleTyping);
      window.clearTimeout(typingTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection, otherUserId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, otherTyping]);

  function handleSend() {
    const content = draft.trim();
    if (!content) return;
    sendMessage(otherUserId, content);
    setDraft('');
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setDraft(event.target.value);
    typing(otherUserId);
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-navy-100 bg-white p-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="rounded p-1 text-navy-400 hover:bg-navy-50 hover:text-navy-600 sm:hidden"
            aria-label="Retour"
          >
            ←
          </button>
        )}
        <h2 className="text-sm font-semibold text-navy-900">{otherUserName}</h2>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        {messages.map((message) => {
          const isMine = message.senderId === currentUserId;
          return (
            <div key={message.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                  isMine ? 'bg-brand-500 text-white' : 'bg-navy-100 text-navy-900'
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{message.content}</p>
                <p className={`mt-1 text-[10px] ${isMine ? 'text-brand-50' : 'text-navy-400'}`}>
                  {timeFormatter.format(new Date(message.sentAt))}
                </p>
              </div>
            </div>
          );
        })}

        {otherTyping && (
          <div className="flex justify-start">
            <div className="rounded-lg bg-navy-100 px-3 py-2 text-xs italic text-navy-400">
              {otherUserName} est en train d'écrire...
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="flex items-end gap-2 border-t border-navy-100 bg-white p-3">
        <textarea
          value={draft}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Écrivez un message..."
          className="flex-1 resize-none rounded border border-navy-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!draft.trim()}
          className="rounded bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600 disabled:opacity-50"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
