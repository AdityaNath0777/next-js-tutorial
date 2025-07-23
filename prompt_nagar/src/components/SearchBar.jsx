"use client";

import { debounce } from "@utils/utils";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useCallback, useRef } from "react";

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("query") || "";

  const inputRef = useRef(null);

  const updateUrl = useCallback(
    debounce((term) => {
      const currentParams = new URLSearchParams(searchParams.toString());

      if (term) {
        currentParams.set("query", term);
      } else {
        currentParams.delete("query");
      }

      router.replace(`${pathname}?${currentParams.toString()}`);
    }, 300),
    [pathname, searchParams, router]
  );

  const handleInputChange = () => {
    const term = inputRef.current.value;
    updateUrl(term);
  };

  return (
    <div className="relative flex-center w-full">
      <input
        type="text"
        placeholder="Search prompts..."
        defaultValue={initialQuery}
        onChange={handleInputChange}
        ref={inputRef}
        className="search_input"
      />
    </div>
  );
};

export default SearchBar;
