import React from "react";
import { useGetNewsData } from "../handlers/getNewsData";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";

const NewsHome = () => {
  const { data, isLoading } = useGetNewsData();
  return (
    <div className="flex flex-col w-full p-8">
      <header>
        <h1 className="text-2xl font-bold">Top Headlines</h1>
      </header>
      <div className="flex gap-6 py-4 flex-wrap justify-center w-full">
        {isLoading && <Skeleton />}
        {data?.articles?.map(({ description, title, url, urlToImage }) => {
          return (
            <div
              className="flex flex-col h-max gap-2 p-4 rounded-lg max-w-sm shadow-xl ring-1 ring-gray-900/5"
              key={title}
            >
              <span className="text-xl font-bold">{title}</span>
              {urlToImage && <img src={urlToImage} alt={title} />}
              <p>{description}</p>
              <Link to={url} className="flex justify-end">
                <button className="bg-indigo-500 py-3 px-6 text-white rounded-xl">
                  Read More
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewsHome;
