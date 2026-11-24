// The Worker's entry: TanStack Start's default handler, which renders and
// streams every request. Keep it as `main` in wrangler.jsonc.
import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";

export default { fetch: createStartHandler(defaultStreamHandler) };
