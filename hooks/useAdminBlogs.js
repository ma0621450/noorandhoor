"use client";

import { useCallback, useEffect, useState } from "react";
import { useSyncExternalStore } from "react";
import {
  createBlog as createBlogRecord,
  deleteBlog as deleteBlogRecord,
  getBlogsServerSnapshot,
  getBlogsSnapshot,
  loadBlogs,
  subscribeBlogs,
  updateBlog as updateBlogRecord,
} from "@/lib/admin/data/blogs";

export default function useAdminBlogs() {
  const blogs = useSyncExternalStore(
    subscribeBlogs,
    getBlogsSnapshot,
    getBlogsServerSnapshot,
  );
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadBlogs()
      .catch(() => [])
      .finally(() => {
        if (!cancelled) setIsReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const createBlog = useCallback((payload) => createBlogRecord(payload), []);
  const updateBlog = useCallback(
    (id, payload) => updateBlogRecord(id, payload),
    [],
  );
  const deleteBlog = useCallback((id) => deleteBlogRecord(id), []);

  return {
    blogs: isReady ? blogs : [],
    isReady,
    createBlog,
    updateBlog,
    deleteBlog,
  };
}
