/* eslint-disable import/named */
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import {
  DASHBOARD,
  ENTERTAINMENT,
  HEALTH,
  HOME,
  NEWS,
  SCIENCE,
  SPORTS,
  TECHNOLOGY,
} from "./path";
import AppLayout from "../app/AppLayout";
import { Loadable } from "../loadable/Loadable";

const Dashboard = Loadable(lazy(() => import("../pages/dashboard")));
const NewsFeed = Loadable(lazy(() => import("../pages/news")));
const NewsHome = Loadable(
  lazy(() => import("../pages/news/components/NewsHome"))
);
const NewsCategories = Loadable(
  lazy(() => import("../pages/news/components/NewsCategories"))
);
const appRoutes = {
  path: "/",
  element: <AppLayout />,
  children: [
    {
      path: DASHBOARD,
      element: <Dashboard />,
    },
    {
      path: NEWS,
      element: <NewsFeed />,
      children: [
        {
          index: true,
          path: HOME,
          element: <NewsHome />,
        },
        {
          path: ENTERTAINMENT,
          element: <NewsCategories />,
        },
        {
          path: TECHNOLOGY,
          element: <NewsCategories />,
        },
        {
          path: SPORTS,
          element: <NewsCategories />,
        },
        {
          path: SCIENCE,
          element: <NewsCategories />,
        },
        {
          path: HEALTH,
          element: <NewsCategories />,
        },
      ],
    },
  ],
};
const routes = [{ path: "/", element: <Navigate to={DASHBOARD} /> }, appRoutes];

export default routes;
