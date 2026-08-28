"use client";

import { useCallback, useEffect, useState } from "react";
import { useSyncExternalStore } from "react";
import {
  createProperty as createPropertyRecord,
  deleteProperty as deletePropertyRecord,
  getPropertiesServerSnapshot,
  getPropertiesSnapshot,
  loadProperties,
  subscribeProperties,
  updateProperty as updatePropertyRecord,
} from "@/lib/admin/data/properties";

export default function useAdminProperties() {
  const properties = useSyncExternalStore(
    subscribeProperties,
    getPropertiesSnapshot,
    getPropertiesServerSnapshot,
  );
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadProperties()
      .catch(() => [])
      .finally(() => {
        if (!cancelled) setIsReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const createProperty = useCallback(
    (payload) => createPropertyRecord(payload),
    [],
  );
  const updateProperty = useCallback(
    (id, payload) => updatePropertyRecord(id, payload),
    [],
  );
  const deleteProperty = useCallback(
    (id) => deletePropertyRecord(id),
    [],
  );

  return {
    properties: isReady ? properties : [],
    isReady,
    createProperty,
    updateProperty,
    deleteProperty,
  };
}
