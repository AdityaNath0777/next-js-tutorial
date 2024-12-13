"use client";

export const dynamic = "force-static";
import { useState, useEffect, useCallback } from "react";
import PromptCard from "./PromptCard";
import RefreshButton from "./RefreshButton";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="prompt_layout mt-16">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // to get all the posts
  const fetchPost = useCallback(async () => {
    console.log("fetching..");
    try {
      const response = await fetch("/api/prompt", {
        cache: "no-cache",
      });
      console.log("response: ", response);
      const data = await response.json();

      console.log("Before: ", allPosts);
      setAllPosts(data);
      console.log("response data last value: ", data[data.length - 1]);

      console.log("All the posts has been fetched");
    } catch (error) {
      console.log(`ERROR :: Unable to fetch posts :: `, error);
    }
  }, []);

  useEffect(() => {
    if (allPosts?.length === 0) {
      fetchPost();
    }
  }, []);

  return (
    <section className="feed">
      {console.log(
        "last prompt After fetching/re-rendering: ",
        allPosts[allPosts?.length - 1]?.prompt
      )}
      <form className="relative flex-center w-full">
        <input
          type="text"
          placeholder="Search prompt, tag or username"
          required
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>

      <div className="w-full flex flex-1 justify-end">
        <RefreshButton onRefresh={fetchPost} />
      </div>

      <PromptCardList data={allPosts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
