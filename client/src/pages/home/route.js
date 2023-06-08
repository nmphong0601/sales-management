import { lazy } from "react";

export default {
  path: "/home",
  exac: true,
  public: true,
  component: lazy(() => import(".")),
};
