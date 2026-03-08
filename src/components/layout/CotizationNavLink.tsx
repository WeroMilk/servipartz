"use client";

import { useEffect } from "react";
import { useQuoteStore } from "@/store/quoteStore";

export function CotizationNavLink() {
  const quoteCount = useQuoteStore((s) => s.items.length);

  useEffect(() => {
    useQuoteStore.persist?.rehydrate();
  }, []);

  if (quoteCount > 0) return <>Cotización ({quoteCount})</>;
  return <>Cotización</>;
}
