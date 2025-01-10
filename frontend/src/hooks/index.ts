import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const useBlogMain = (id: string) => {
  const [blog, setBlog] = useState<Post>({
    id: " ",
    title: " ",
    content: " ",
    updatedAt: " ",
    author: {
      username: " ",
      name: " ",
    },
  });
  const [currentUser, setCurrentUser] = useState<string>("A");
  const [loading, setLoading] = useState<boolean>(true);
  const nav = useNavigate();
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBlog(res.data.blog);
        setCurrentUser(res.data.user);
      } catch (error) {
        nav("/signup");
        alert("Signup first");
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, []);

  return { blog, currentUser, loading };
};

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<string>("A");
  const [loading, setLoading] = useState<boolean>(true);
  const nav = useNavigate();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/blog/bulk`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBlogs(res.data.results);
        setCurrentUser(res.data.user);
      } catch (error) {
        nav("/signup");
        alert("Signup first");
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return { blogs, currentUser, loading };
};

// Interfaces
interface Author {
  username: string;
  name?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  author: Author;
}
