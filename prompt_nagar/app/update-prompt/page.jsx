// use client directive page
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Form } from "@components";

const EditPrompt = () => {
  const router = useRouter();
  const promptId = useSearchParams().get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      console.log(data);
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    
    fetchPost();
  }, [promptId]);
  // event handle to create a prompt
  const editPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if(!promptId) return alert("Prompt Not Found!!!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        // go to home page
        router.push("/");
      }
    } catch (error) {
      console.log(`Error :: prompt updation failed :: ${error}`);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}
    />
  );
};

export default EditPrompt;
