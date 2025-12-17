import { db, db as dbCore, users } from "@budibase/backend-core"
import { User, Workspace } from "@budibase/types"
import sdk from "../.."

export function filterAppList(user: User, apps: Workspace[]) {
  let appList: string[] = []
  const roleApps = Object.keys(user.roles)
  if (users.hasAppBuilderPermissions(user)) {
    appList = user.builder?.apps || []
    appList = appList.concat(roleApps)
  } else if (!users.isAdminOrBuilder(user)) {
    appList = roleApps
  } else {
    return apps
  }
  return apps.filter(app =>
    appList.includes(dbCore.getProdWorkspaceID(app.appId))
  )
}

export async function enrichWithDefaultWorkspaceAppUrl(apps: Workspace[]) {
  const result = []
  for (const app of apps) {
    const workspaceApps = await db.doWithDB(app.appId, db =>
      sdk.workspaceApps.fetch(db)
    )

    result.push({
      ...app,
      defaultWorkspaceAppUrl: workspaceApps[0]?.url || "",
    })
  }

  return result
}
