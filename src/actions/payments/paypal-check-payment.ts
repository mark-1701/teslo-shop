'use server';

import { PayPalOrderStatusResponse } from '@/src/interfaces';
import prisma from '@/src/lib/prisma';
import { revalidatePath } from 'next/cache';

type AccessTokenResponseType = {
  access_token: string;
};

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const authToken = await getPayPalBearerToken();

  if (!authToken)
    return {
      ok: false,
      message: 'No se pudo obtener token de verificación'
    };

  const resp = await verifyPayPalPayment(paypalTransactionId, authToken);

  if (!resp)
    return {
      ok: false,
      message: 'Error al verificar el pago'
    };

  const { status, purchase_units } = resp;
  const { invoice_id: orderId } = purchase_units[0];

  if (status !== 'COMPLETED')
    return {
      ok: false,
      message: 'Aun no se ha pagado en Paypal'
    };

  // Actualizacion en la base de datos
  try {
    await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        IsPaid: true,
        paidAt: new Date()
      }
    });

    // Revalidar Path
    revalidatePath(`/orders/${orderId}`);

    return {
      ok: true
    };
  } catch (error) {
    return {
      ok: false,
      message: 'El pago no se pudo realizar'
    };
  }
};

const getPayPalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? '';

  const base64token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64');

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  myHeaders.append('Authorization', `Basic ${base64token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append('grant_type', 'client_credentials');

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
    cache: 'no-store'
  };

  try {
    const result: AccessTokenResponseType = await fetch(
      oauth2Url,
      requestOptions
    ).then(response => response.json());
    return result.access_token;
  } catch (error) {
    return null;
  }
};

const verifyPayPalPayment = async (
  paypalTransactionId: string,
  bearerToken: string
): Promise<PayPalOrderStatusResponse | null> => {
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;

  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${bearerToken}`);

  const requestOptions: RequestInit = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
    cache: 'no-store'
  };

  try {
    return await fetch(paypalOrderUrl, requestOptions).then(response =>
      response.json()
    );
  } catch (error) {
    return null;
  }
};
