"use client";

import {useState, useEffect} from 'react'
import PromptCard from './PromptCard';

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
  useEffect(()=>{
    const fetchPost = async () => {
      try {
        const response = await fetch("/api/prompt")
        
        const data = await response.json();

        setPosts(data);
        
      } catch (error) {
        console.log(`ERROR :: Unable to fetch posts :: ${error}`);
      }

      setShouldFetch(false);
    } 

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

    <PromptCardList
     data = {posts}
     handleTagClick = {() => {}}
     />
    </section>
  )
}

export default Feed