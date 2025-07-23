"use client";

import { useState } from "react";
import PromptCardList from "./PromptCardList";
import LoadMoreButton from "./LoadMoreButton";
import SearchBar from "./SearchBar";

const Feed = ({ initialPosts, hasMore = true }) => {
  const [allPosts, setAllPosts] = useState(initialPosts || []);
  const [hasMorePosts, setHasMorePosts] = useState(hasMore);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
  });

  const loadMorePosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/prompt?page=${(pagination?.page || 1) + 1}&limit=${
          pagination?.limit || 5
        }`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch more posts, Status: ${response.status}`
        );
      }

      const newPosts = await response.json();

      const hasMore = newPosts.length === pagination.limit + 1;

      const postsToAdd = hasMore
        ? newPosts.slice(0, pagination.limit)
        : newPosts;

      setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
      setAllPosts((prev) => [...prev, ...postsToAdd]);

      setHasMorePosts(hasMore);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
      console.error(`Unable to load more posts`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="feed mb-10">
      <SearchBar />

      <PromptCardList data={allPosts} handleTagClick={() => {}} />

      {hasMorePosts && (
        <LoadMoreButton onLoad={loadMorePosts}>
          {isLoading ? "Loading..." : "Load More"}
        </LoadMoreButton>
      )}
    </section>
  );
};

export default Feed;
