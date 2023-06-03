import { lazy } from "react";

export default {
  path: "/",
  exac: true,
  public: true,
  component: lazy(() => import(".")),
};
