import { lazy } from "react";

export default {
  path: "/category",
  exac: true,
  public: true,
  component: lazy(() => import(".")),
};
