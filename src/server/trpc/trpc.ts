// src/server/trpc/trpc.ts
import { initTRPC, TRPCError } from "@trpc/server";
import type { Context } from "./context";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

// 🔥 privateProcedure => hanya untuk user yang login
export const privateProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Login required",
    });
  }

  return next({
    // pastikan downstream punya ctx.user yang pasti tidak null
    ctx: {
      user: ctx.user,
    },
  });
});
