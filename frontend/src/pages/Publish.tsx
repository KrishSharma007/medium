import axios from "axios";
import { Navbar } from "../components/Navbar";
import { useBlogs } from "../hooks";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { createBlogType } from "../zod";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const { currentUser } = useBlogs();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const handlePost = async () => {
    if (!title || !content) {
      alert("Please fill in both the title and the story.");
      return;
    }

    const body: createBlogType = {
      title: title,
      content: content,
    };

    try {
      const { data: res } = await axios.post(`${BACKEND_URL}/blog`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Blog created succesfully");
      navigate(`/blog/${res.res.id}`);
    } catch (error) {
      console.error("Error posting blog:", error);
      alert("An error occurred while posting the blog.");
    }
  };

  const resizeTextarea = (textarea: EventTarget & HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <>
      <Navbar authorName={currentUser} />
      <div className="px-14 py-8 grid grid-cols-1 lg:grid-cols-12">
        <div className="flex flex-col lg:col-span-10">
          <textarea
            className="resize-none w-full p-2 text-5xl outline-none font-black"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              resizeTextarea(e.target);
            }}
          />
          <textarea
            className="resize-none w-full p-2 text-2xl outline-none font-light overflow-hidden"
            placeholder="Tell your story..."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              resizeTextarea(e.target);
            }}
          />
        </div>
        <div className="flex justify-end mt-10 lg:mt-4 col-span-2">
          <div>
            <button
              type="button"
              className="text-green-400 hover:text-white border border-green-400 hover:bg-green-500 focus:ring-2 focus:outline-none focus:ring-green-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all"
              onClick={handlePost}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
