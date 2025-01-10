export interface BlogProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
}: BlogProps) => {
  return (
    <>
      <div className="flex flex-col p-4 border-b border-slate-200">
        <div className="flex items-center text-sm">
          <div className="h-7 w-7">
            <Avatar authorName={authorName} />
          </div>
          <p className="font-extralight ml-2">{authorName}</p>
          <div className="border-2 ml-2 border-black rounded-full"></div>
          <p className="font-thin ml-2 text-gray-400">{publishedDate}</p>
        </div>
        <div className="font-bold text-2xl mt-3">
          <p>{title}</p>
        </div>
        <div className="text-gray-400 font-light mt-1">
          <p>{content.slice(0, 100)}...</p>
        </div>
        <div>
          <p className="text-xs font-thin mt-3 text-gray-400">
            {Math.ceil(content.length / 300)} minute(s) read
          </p>
        </div>
      </div>
    </>
  );
};

export const Avatar = ({ authorName }: { authorName: string }) => {
  return (
    <div className="relative inline-flex items-center justify-center w-full h-full overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {authorName[0].toUpperCase()}
      </span>
    </div>
  );
};
