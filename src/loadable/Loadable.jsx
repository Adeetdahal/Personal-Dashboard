/* eslint-disable react/display-name */
import { Suspense } from "react";

export const Loadable = (Component) => (props) =>
  (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );
