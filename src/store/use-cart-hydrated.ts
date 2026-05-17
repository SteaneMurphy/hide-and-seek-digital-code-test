"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart-store";

// Returns true once the persisted cart has rehydrated on the client.
// Server and first client render both return false to avoid hydration mismatch.
export function useCartHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(useCartStore.persist.hasHydrated());
    const unsub = useCartStore.persist.onFinishHydration(() => setHydrated(true));
    return unsub;
  }, []);

  return hydrated;
}
