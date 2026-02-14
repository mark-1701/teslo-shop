import { Suspense } from 'react';
import LoginForm from './ui/LoginForm';

const AuthPage = () => {
  return (
    <div className="flex min-h-screen flex-col pt-32 sm:pt-52">
      <Suspense fallback={<div>Cargando...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default AuthPage;