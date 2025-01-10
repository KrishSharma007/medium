interface Prop {
  text: string;
  author?: string;
  designation?: string;
}

export const Quote = ({ text, author, designation }: Prop) => {
  return (
    <div className="bg-slate-100 h-screen flex justify-center items-center">
      <div className="h-max p-24">
        <p className="font-bold text-4xl ">"{text}"</p>
        {author && <p className="mt-5 px-4 text-lg font-semibold">{author}</p>}
        {designation && (
          <p className="text-sm px-4 text-gray-500">{designation}</p>
        )}
      </div>
    </div>
  );
};
