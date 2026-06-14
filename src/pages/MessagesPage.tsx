import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useConversations } from '../hooks/useMessages';
import { ChatWindow } from '../components/messages/ChatWindow';
import type { ConversationSummary } from '../types';

const dateFormatter = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short' });

export default function MessagesPage() {
  const { user } = useAuthStore();
  const { data: conversations, isLoading } = useConversations();
  const [selected, setSelected] = useState<ConversationSummary | null>(null);

  return (
    <div className="flex h-[calc(100vh-7rem)] overflow-hidden rounded-lg border border-navy-100 bg-white shadow-sm">
      <aside
        className={`w-full flex-shrink-0 overflow-y-auto border-r border-navy-100 sm:block sm:w-72 ${
          selected ? 'hidden' : 'block'
        }`}
      >
        <div className="border-b border-navy-100 p-3">
          <h1 className="text-sm font-semibold text-navy-900">Messages</h1>
        </div>

        {isLoading ? (
          <p className="p-4 text-sm text-navy-400">Chargement...</p>
        ) : !conversations || conversations.length === 0 ? (
          <p className="p-4 text-sm text-navy-400">Aucune conversation.</p>
        ) : (
          <ul>
            {conversations.map((conversation) => (
              <li key={conversation.userId}>
                <button
                  type="button"
                  onClick={() => setSelected(conversation)}
                  className={`flex w-full items-center justify-between gap-2 border-b border-navy-50 p-3 text-left hover:bg-navy-50 ${
                    selected?.userId === conversation.userId ? 'bg-navy-50' : ''
                  }`}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-navy-900">{conversation.userName}</p>
                    <p className="truncate text-xs text-navy-400">{conversation.lastMessage}</p>
                  </div>
                  <div className="flex flex-shrink-0 flex-col items-end gap-1">
                    <span className="text-[10px] text-navy-400">{dateFormatter.format(new Date(conversation.lastMessageAt))}</span>
                    {conversation.unreadCount > 0 && (
                      <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>

      <div className={`min-w-0 flex-1 ${selected ? 'block' : 'hidden sm:block'}`}>
        {selected && user ? (
          <ChatWindow
            currentUserId={user.id}
            otherUserId={selected.userId}
            otherUserName={selected.userName}
            onBack={() => setSelected(null)}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-navy-400">
            Sélectionnez une conversation pour commencer.
          </div>
        )}
      </div>
    </div>
  );
}
