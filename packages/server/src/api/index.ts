import { env as envCore, middleware } from "@budibase/backend-core"
import Router from "@koa/router"
import { getState } from "../startup"

export { shutdown } from "./routes/public"

export const router: Router = new Router()

router.get("/health", async ctx => {
  if (getState() !== "ready") {
    ctx.status = 503
    return
  }
  ctx.status = 200
})
router.get("/version", ctx => (ctx.body = envCore.VERSION))

router.use(middleware.errorHandling)
