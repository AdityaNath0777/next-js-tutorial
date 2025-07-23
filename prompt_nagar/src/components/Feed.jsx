"use client";

import { useState } from "react";
import Image from "next/image";
import PromptCardList from "./PromptCardList";
import LoadMoreButton from "./LoadMoreButton";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import SearchBar from "./SearchBar";

const Feed = ({ initialPosts }) => {
  // const router = useRouter();
  
  // const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState(initialPosts || []);

  // const handleSearchSubmit = (e) => {
  //   e.preventDefault();
  // };

  // const handleSearchChange = (e) => {
  //   setSearchText(e.target.value);

  // };

  return (
    <section className="feed mb-10">
      {/* <form className="relative flex-center w-full">
        <input
          type="text"
          placeholder="Search prompt, tag or username"
          required
          value={searchText}
          onChange={handleSearchChange}
          className="search_input"
        />
      </form> */}
      <SearchBar />

      <PromptCardList data={allPosts} handleTagClick={() => {}} />

      <LoadMoreButton onLoad={() => console.log("click on load more")} />
    </section>
  );
};

export default Feed;
