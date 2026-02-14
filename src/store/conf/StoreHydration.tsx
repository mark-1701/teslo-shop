'use client';

import { useEffect } from 'react';
import { useAddressStore, useCartStore } from '@/src/store';

export function StoreHydration() {
  useEffect(() => {
    useCartStore.persist.rehydrate();
    useAddressStore.persist.rehydrate();
  }, []);

  return null;
}
