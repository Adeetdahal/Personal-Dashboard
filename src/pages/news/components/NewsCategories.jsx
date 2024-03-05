import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useGetNewsDataByCategory } from "../handlers/getNewsData";
import Skeleton from "./Skeleton";

const NewsCategories = () => {
  const { pathname } = useLocation();
  const category = pathname?.split("/")?.[2];
  const { data, isLoading } = useGetNewsDataByCategory(category);
  return (
    <div className="flex flex-col p-8">
      <header>
        <h1 className="text-2xl font-bold">{category?.toUpperCase()}</h1>
      </header>
      <div className="flex gap-6 py-4 justify-center flex-wrap w-full">
        {isLoading && <Skeleton />}
        {data?.articles?.map(({ description, title, url, urlToImage }) => {
          return (
            <div
              className="flex flex-col h-max gap-2 p-4 rounded-lg max-w-[300px] shadow-xl ring-1 ring-gray-900/5"
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

export default NewsCategories;
