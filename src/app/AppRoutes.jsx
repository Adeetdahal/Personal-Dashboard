import React from "react";
import { useRoutes } from "react-router-dom";

import routes from "../routes/routes";

function AppRouter() {
  const Routes = useRoutes(routes);
  return (
    <React.Suspense>
      <div className="flex flex-col max-w-screen w-screen">{Routes}</div>
    </React.Suspense>
  );
}

export default AppRouter;
