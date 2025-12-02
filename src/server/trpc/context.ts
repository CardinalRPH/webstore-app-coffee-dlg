// src/server/trpc/context.ts
import type { NextApiRequest, NextApiResponse } from "next";

export async function createContext(opts: { req: NextApiRequest; res: NextApiResponse }) {
  const { req } = opts;

  // Contoh: ambil token dari header Authorization
  const token = req.headers.authorization?.replace("Bearer ", "");

  // Dummy: Jika token === "123", maka user dianggap login
  // Nanti bisa diganti cek JWT / Firebase / Session
  const user = token === "123" ? { id: 1, name: "Rayhan" } : null;

  return { user };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
