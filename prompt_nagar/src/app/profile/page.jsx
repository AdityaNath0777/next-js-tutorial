"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Profile } from "@/components";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  // to get all the posts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);

        const data = await response.json();

        setPosts(data);
        // console.log("data fetched successfully");
      } catch (error) {
        console.log(`ERROR :: Unable to fetch posts :: ${error}`);
      }
    };

    if (session?.user.id) fetchPost();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

    if(hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE"
        })

        if(response.ok) {
          console.log("Prompt deleted successfully!!!");
        }

        const filteredPosts = posts.filter((prev) => prev._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log("Error :: unable to delete the prompt :: ", error);
      }
    }
  };
  return (
    <Profile
      name={"My"}
      desc={"Welcome to your personalized profile page"}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
