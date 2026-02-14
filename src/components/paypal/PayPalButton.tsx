'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions
} from '@paypal/paypal-js';
import { paypalCheckPayment, setTransactionId } from '@/src/actions';

type PayPalButtonProps = {
  orderId: string;
  amount: number;
};

export const PayPalButton = ({ orderId, amount }: PayPalButtonProps) => {
  // ! Las cantidades solo pueden ser string y 4 decimales
  const rountedAmount = amount.toFixed(2).toString();

  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending)
    return (
      <div className="animate-pulse">
        <div className="h-11 rounded bg-gray-200" />
        <div className="mt-3 h-11 rounded bg-gray-200" />
      </div>
    );

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            value: rountedAmount,
            currency_code: 'USD'
          },
          invoice_id: orderId
        }
      ]
    });

    const { ok } = await setTransactionId(orderId, transactionId);
    if (!ok) throw new Error('No se pudo actualizar la orden');

    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();
    if (!details) return;
    await paypalCheckPayment(details.id!);
  };

  return (
    <div className="relative z-0">
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  );
};
