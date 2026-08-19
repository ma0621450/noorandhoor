"use client";

import { useSyncExternalStore } from "react";

function emptySubscribe() {
  return () => {};
}

export function useHasHydrated() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}
