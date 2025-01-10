import { useParams } from "react-router-dom";
import { BlogArea } from "../components/blogArea";
import { Navbar } from "../components/Navbar";
import { useBlogMain } from "../hooks";
import { Avatar } from "../components/BlogCard";
import Skeleton from "react-loading-skeleton";

export const BlogMain = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, blog, currentUser } = useBlogMain(id || "");

  if (loading) {
    return (
      <>
        <Navbar authorName={currentUser} />
        <div className="grid grid-cols-1 px-14 py-8 lg:grid-cols-12">
          <div className="col-span-8">
            <div className="flex flex-col justify-center">
              <p className="text-5xl">
                <Skeleton width="100%" height="100%" />
              </p>
              <div className="mt-2">
                <Skeleton width="100%" height="100%" />
              </div>
              <p className="mt-4">
                <Skeleton width="100%" height="100%" />
              </p>
            </div>
          </div>
          <div className=" col-span-4 px-4 mt-6 lg:mt-0">
            <p className="">
              <Skeleton width="100%" height="100%" />
            </p>
            <div className="flex items-center w-full mt-6">
              <div className="h-12 w-12">
                <Skeleton circle width="100%" height="100%" />
              </div>
              <div className="ml-4">
                <p>
                  <Skeleton width="100%" height="100%" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar authorName={currentUser} />
      <div className="grid grid-cols-1 lg:grid-cols-12 px-14 py-8">
        <div className="col-span-8 border-b-2">
          <BlogArea blog={blog} />
        </div>
        <div className=" col-span-4 px-4 mt-6 lg:mt-0">
          <p className="font-semibold text-xl">Author</p>
          <div className="flex items-center w-full mt-6">
            <div className="h-12 w-12">
              <Avatar authorName={blog.author.username} />
            </div>
            <div className="ml-4 font-bold text-2xl">
              <p>{blog.author.username}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
