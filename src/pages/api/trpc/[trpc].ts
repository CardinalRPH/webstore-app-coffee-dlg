import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/routers/app"; // ambil router backend yang asli

export type AppRouter = typeof appRouter;

export default createNextApiHandler({
  router: appRouter,
});
