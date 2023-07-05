import { lazy } from "react";

export default {
  path: '/dashboard',
  exac: true,
  public: true,
  component: lazy(() => import('.')),
};
