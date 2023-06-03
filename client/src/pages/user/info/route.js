import { lazy } from "react";

export default {
  path: "/user/info",
  exac: true,
  public: true,
  component: lazy(() => import(".")),
};
