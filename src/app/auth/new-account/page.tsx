import { titleFont } from '@/src/config/fonts';
import { RegisterForm } from './ui/RegisterForm';

const NewAccountPage = () => {
  return (
    <main className="flex min-h-screen flex-col pt-32 sm:pt-52">
      <h1 className={`${titleFont.className} mb-5 text-4xl`}>Nueva Cuenta</h1>
      <RegisterForm />
    </main>
  );
};

export default NewAccountPage;
