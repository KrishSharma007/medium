import { Link } from "react-router-dom";
import { BlogCard } from "../components/BlogCard";
import { Navbar } from "../components/Navbar";
import { useBlogs } from "../hooks";
import { formatDate } from "../common";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Blog = () => {
  const { loading, currentUser, blogs } = useBlogs();

  if (loading) {
    return (
      <>
        <Navbar authorName={currentUser} />
        <div className="flex justify-center">
          <div className="w-[700px] space-y-4">
            {Array(5)
              .fill(0)
              .map((_c, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-between w-full p-4 border-b border-slate-200"
                >
                  {/* Avatar Skeleton */}
                  <div className="flex items-center">
                    <div className="h-7 w-7">
                      <Skeleton circle width={28} height={28} />
                    </div>
                    <Skeleton width={100} height={10} className="ml-2" />
                    <Skeleton
                      width={60}
                      height={10}
                      className="ml-2 text-gray-400"
                    />
                  </div>

                  {/* Title Skeleton */}
                  <Skeleton
                    height={30}
                    width="70%"
                    className="font-bold mt-3"
                  />

                  {/* Content Skeleton */}
                  <Skeleton
                    height={20}
                    width="80%"
                    className="font-light mt-1 text-gray-400"
                  />

                  {/* Read Time Skeleton */}
                  <Skeleton
                    width={50}
                    height={10}
                    className="text-xs font-thin mt-3 text-gray-400"
                  />
                </div>
              ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar authorName={currentUser} />
      <div className="flex justify-center">
        <div className="max-w-2xl">
          {blogs.map((post) => {
            return (
              <Link key={post.id} to={`/blog/${post.id}`}>
                <div className="cursor-pointer mb-4">
                  <BlogCard
                    authorName={post.author.username}
                    title={post.title}
                    content={post.content}
                    publishedDate={formatDate(post.updatedAt)}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Blog;
