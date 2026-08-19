"use client";

import { useCallback } from "react";
import { useSyncExternalStore } from "react";
import {
  createProperty as createPropertyRecord,
  deleteProperty as deletePropertyRecord,
  getPropertiesServerSnapshot,
  getPropertiesSnapshot,
  subscribeProperties,
  updateProperty as updatePropertyRecord,
} from "@/lib/admin/data/properties";
import { useHasHydrated } from "@/lib/admin/hydration";

export default function useAdminProperties() {
  const properties = useSyncExternalStore(
    subscribeProperties,
    getPropertiesSnapshot,
    getPropertiesServerSnapshot,
  );
  const isReady = useHasHydrated();

  const createProperty = useCallback(
    (payload) => createPropertyRecord(payload),
    [],
  );
  const updateProperty = useCallback(
    (id, payload) => updatePropertyRecord(id, payload),
    [],
  );
  const deleteProperty = useCallback((id) => {
    deletePropertyRecord(id);
  }, []);

  return {
    properties: isReady ? properties : [],
    isReady,
    createProperty,
    updateProperty,
    deleteProperty,
  };
}
