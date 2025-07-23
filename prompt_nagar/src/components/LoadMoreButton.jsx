"use client";

import { debounce } from "@/utils/utils";
import React from "react";

const LoadMoreButton = ({ onLoad, children }) => {
  const handleLoadMore = debounce(onLoad, 400);

  return (
    <button
      className="px-4 py-2 ring-1 ring-gray-600/70 hover:bg-black/10 active:translate-y-1 duration-200 rounded shadow-sm"
      onClick={handleLoadMore}
    >
      {children || "Load More"}
    </button>
  );
};

export default LoadMoreButton;
