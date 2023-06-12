import { lazy } from "react";

export default {
  path: "/account",
  exac: true,
  public: true,
  component: lazy(() => import(".")),
};
