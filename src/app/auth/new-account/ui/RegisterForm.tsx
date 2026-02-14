'use client';

import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { login, registerUser } from '@/src/actions';

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async data => {
    const { name, email, password } = data;
    // Server Action
    const resp = await registerUser(name, email, password);
    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }

    // ? Inicia sesión y redirecciona al profile
    await login(email.toLowerCase(), password, '/profile');
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Nombre Completo</label>
      <input
        className={clsx('mb-5 rounded border bg-gray-200 px-5 py-2', {
          'border-red-500 focus:outline-red-300': !!errors.name,
          'border-gray-300': !errors.name
        })}
        type="text"
        autoFocus
        {...register('name', { required: true })}
      />

      <label htmlFor="email">Correo electrónico</label>
      <input
        className={clsx('mb-5 rounded border bg-gray-200 px-5 py-2', {
          'border-red-500 focus:outline-red-300': !!errors.email,
          'border-gray-300': !errors.email
        })}
        type="email"
        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
      />

      <label htmlFor="password">Contraseña</label>
      <input
        className={clsx('mb-5 rounded border bg-gray-200 px-5 py-2', {
          'border-red-500 focus:outline-red-300': !!errors.password,
          'border-gray-300': !errors.password
        })}
        type="password"
        {...register('password', { required: true, minLength: 8 })} // Corregido el paréntesis aquí
      />

      {/* Error en el servidor */}
      <span className="mb-4 text-red-500">{errorMessage}</span>

      <button className="btn-primary">Crear cuenta</button>

      {/* divisor l ine */}
      <div className="my-5 flex items-center">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ingresar
      </Link>
    </form>
  );
};
