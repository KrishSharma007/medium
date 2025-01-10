import { formatDate } from "../common";
import { Post } from "../hooks";
export const BlogArea = ({ blog }: { blog: Post }) => {
  return (
    <>
      <div className="p-4 flex flex-col justify-center">
        <p className="text-5xl font-black">{blog.title}</p>
        <div className="text-lg mt-2 font-extralight text-gray-400">
          Posted on {formatDate(blog.updatedAt)}
        </div>
        <p className="mt-4 text-gray-600 text-lg font-light">{blog.content}</p>
      </div>
    </>
  );
};
