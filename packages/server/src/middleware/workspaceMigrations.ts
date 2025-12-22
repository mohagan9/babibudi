import { UserCtx } from "@budibase/types"
import type { Middleware, Next } from "koa"
import env from "../environment"
import { checkMissingMigrations } from "../workspaceMigrations"

export const workspaceMigrations = (async (ctx: UserCtx, next: Next) => {
  const { appId } = ctx

  // migrations can be disabled via environment variable if you
  // need to completely disable migrations, e.g. for testing
  if (env.DISABLE_WORKSPACE_MIGRATIONS) {
    return next()
  }

  if (!appId) {
    return next()
  }

  return checkMissingMigrations(ctx, next, appId)
}) as Middleware
