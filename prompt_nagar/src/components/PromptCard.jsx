"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleDelete, handleEdit }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();

  const handleCopy = () => {
    setCopied(post?.prompt);
    navigator.clipboard.writeText(post?.prompt);

    // resetting the copied content
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between gap-5 items-start">
        <div className="relative flex-1 flex justify-start cursor-pointer gap-3 items-center ">
          <Image
            src={post?.creator?.avatar || "/globe.svg"}
            alt={`user avatar`}
            width={40}
            height={40}
            className={`rounded-full object-contain`}
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-800">
              @{post?.creator?.username}
            </h3>
          </div>
          <div className="copy_btn" onClick={() => handleCopy()}>
            <Image
              src={
                copied === post?.prompt
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              width={20}
              alt={"copy button"}
              height={20}
            />
          </div>
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700 ">{post?.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post?.tag)}
      >
        #{post?.tag}
      </p>

      {session?.user.id === post?.creator?._id && pathName === "/profile" && (
        <div className="flex justify-end gap-5 ">
          <button
            className="font-inter border-2 rounded px-3 py-1 border-green-400 text-sm green_gradient cursor_pointer"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="font-inter border-2 rounded px-3 py-1 border-orange-400 text-sm orange_gradient cursor_pointer"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
