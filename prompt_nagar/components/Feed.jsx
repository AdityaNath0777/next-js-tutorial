"use client";

import {useState, useEffect, useCallback} from 'react'
import PromptCard from './PromptCard';
import Image from 'next/image';

const PromptCardList = ({ data, handleTagClick}) => {
  return (
    <div className="prompt_layout mt-16">
      {data.map((post) => (
        <PromptCard 
          key = {post._id}
          post = {post}
          handleTagClick = {handleTagClick}
         />
      ))}
    </div>
  )
}
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [shouldFetch, setShouldFetch] = useState(true)
  const [posts, setPosts] = useState([])
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  // to get all the posts
  const fetchPost = useCallback(async () => {
    console.log("fetching..");
    try {
      const response = await fetch("/api/prompt")
      
      const data = await response.json();

      setPosts(data);

      console.log("All the posts has been fetched");
    } catch (error) {
      console.log(`ERROR :: Unable to fetch posts :: ${error}`);
    }

    setShouldFetch((prev) => !prev);
  }, [] )

  useEffect(()=>{
    if(shouldFetch) fetchPost();
  }, [shouldFetch])
  return (
    <section className='feed'>
    <form className='relative flex-center w-full'>
      <input
       type="text"
       placeholder='Search prompt, tag or username'
       required
       value={searchText}
       onChange={handleSearchChange}
       className='search_input peer'
       />
    </form>
    
      {
        shouldFetch && (

    <p className='w-full flex flex-1 justify-end'>
      <span>
        <Image
          src={"/assets/icons/loader.svg"}
          alt='loading'
          width={20}
          height={20}
          className='object-contain rounded-lg'
         />
      </span>
    </p>
        )
      }

    <PromptCardList
     data = {posts}
     handleTagClick = {() => {}}
     />
    </section>
  )
}

export default Feed