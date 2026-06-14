import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout';
import { PrivateRoute } from './components/PrivateRoute';

const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/auth/ResetPasswordPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const BienListPage = lazy(() => import('./pages/BienListPage'));
const BienDetailPage = lazy(() => import('./pages/BienDetailPage'));
const AgenciesPage = lazy(() => import('./pages/AgenciesPage'));
const AgencyDetailPage = lazy(() => import('./pages/AgencyDetailPage'));
const MessagesPage = lazy(() => import('./pages/MessagesPage'));
const UnauthorizedPage = lazy(() => import('./pages/UnauthorizedPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function PageFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <span className="text-sm text-gray-500">Chargement...</span>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route path="/properties" element={<BienListPage />} />
            <Route path="/properties/:id" element={<BienDetailPage />} />
            <Route
              path="/agencies"
              element={
                <PrivateRoute roles={['Admin']}>
                  <AgenciesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/agencies/:id"
              element={
                <PrivateRoute roles={['Admin']}>
                  <AgencyDetailPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <PrivateRoute>
                  <MessagesPage />
                </PrivateRoute>
              }
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}
