import { lazy } from "react";

export default {
  path: "/user",
  exac: true,
  public: true,
  component: lazy(() => import(".")),
};
