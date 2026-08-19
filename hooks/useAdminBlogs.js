"use client";

import { useCallback } from "react";
import { useSyncExternalStore } from "react";
import {
  createBlog as createBlogRecord,
  deleteBlog as deleteBlogRecord,
  getBlogsServerSnapshot,
  getBlogsSnapshot,
  subscribeBlogs,
  updateBlog as updateBlogRecord,
} from "@/lib/admin/data/blogs";
import { useHasHydrated } from "@/lib/admin/hydration";

export default function useAdminBlogs() {
  const blogs = useSyncExternalStore(
    subscribeBlogs,
    getBlogsSnapshot,
    getBlogsServerSnapshot,
  );
  const isReady = useHasHydrated();

  const createBlog = useCallback((payload) => createBlogRecord(payload), []);
  const updateBlog = useCallback(
    (id, payload) => updateBlogRecord(id, payload),
    [],
  );
  const deleteBlog = useCallback((id) => {
    deleteBlogRecord(id);
  }, []);

  return {
    blogs: isReady ? blogs : [],
    isReady,
    createBlog,
    updateBlog,
    deleteBlog,
  };
}
