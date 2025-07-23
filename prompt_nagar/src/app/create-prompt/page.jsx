// use client directive page
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Form } from "@/components";

const initialPostData = {
  prompt: "",
  tag: ""
}

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState(initialPostData);

  // event handle to create a prompt
  const createPrompt = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user.id,
        }),
      });

      if (response.ok) {
        // go to home page
        // router.push("/");
        setPost(initialPostData);
      }
    } catch (error) {
      console.log(`Error :: prompt creation failed :: ${error}`);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
