import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';
import logo from '../assets/logo.png';
import { useAuthStore } from '../stores/authStore';
import { useUIStore } from '../stores/uiStore';
import { useLogout } from '../hooks/useAuth';
import { useConversations, useInvalidateConversations } from '../hooks/useMessages';
import { useSignalR } from '../hooks/useSignalR';
import type { Message } from '../types';

const navItems: { to: string; label: string; roles?: Array<'Admin' | 'Agent' | 'Client'> }[] = [
  { to: '/', label: 'Tableau de bord' },
  { to: '/properties', label: 'Biens' },
  { to: '/agencies', label: 'Agences', roles: ['Admin'] },
  { to: '/messages', label: 'Messages' },
];

export function Layout() {
  const { user, isAuthenticated } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const logout = useLogout();
  const { data: conversations } = useConversations();
  const { connection } = useSignalR();
  const invalidateConversations = useInvalidateConversations();

  const unreadCount = (conversations ?? []).reduce((sum, conv) => sum + conv.unreadCount, 0);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    function handleReceive(message: Message) {
      invalidateConversations();
      if (message.senderId !== user!.id) {
        toast(`${message.senderName} : ${message.content}`, { icon: '💬' });
      }
    }

    connection.on('ReceiveMessage', handleReceive);
    return () => {
      connection.off('ReceiveMessage', handleReceive);
    };
  }, [connection, isAuthenticated, user, invalidateConversations]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-0'} overflow-hidden bg-white border-r border-gray-200 transition-all duration-200`}
      >
        <div className="flex items-center gap-2 p-4">
          <img src={logo} alt="Corgimmobilier" className="h-8 w-8" />
          <span className="text-lg font-semibold text-gray-800">Corgimmobilier</span>
        </div>
        <nav className="flex flex-col gap-1 px-2">
          {navItems
            .filter((item) => !item.roles || (user && item.roles.includes(user.role)))
            .map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded px-3 py-2 text-sm font-medium ${
                    isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
          <button
            type="button"
            onClick={toggleSidebar}
            className="rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
          >
            ☰
          </button>

          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <>
                <NavLink to="/messages" className="relative rounded p-2 text-gray-600 hover:bg-gray-100" aria-label="Messages">
                  ✉️
                  {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-semibold text-white">
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                  )}
                </NavLink>
                <span className="text-sm text-gray-700">
                  {user.firstName} {user.lastName} · {user.role}
                </span>
                <button
                  type="button"
                  onClick={() => logout.mutate()}
                  className="rounded bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="rounded bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                Connexion
              </NavLink>
            )}
          </div>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
