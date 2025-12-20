<script lang="ts">
  import { goto, params } from "@roxi/routify"
  import {
    screenStore,
    selectedScreen,
    workspaceAppStore,
  } from "@/stores/builder"
  import { onMount } from "svelte"

  $goto
  $params

  const validate = (id: string) =>
    $workspaceAppStore.workspaceApps.some(app => app._id === id)

  const fallback = () => {
    const workspaceAppScreens = $screenStore.screens.filter(
      s => s.workspaceAppId === $params.workspaceAppId
    )
    // Fall back to the first screen if one exists
    if (workspaceAppScreens.length && workspaceAppScreens[0]._id) {
      //$goto(`./[screenId]`, { screenId: workspaceAppScreens[0]._id ?? "" })
      screenStore.select(workspaceAppScreens[0]._id)
      return
    }

    $goto("../new")
    return
  }

  if ($selectedScreen?._id) {
    $goto("../[screenId]", {
      screenId: $selectedScreen._id,
    })
  } else {
    fallback()
  }

  onMount(() => {
    const id = $params.workspaceAppId
    if (validate(id)) {
      workspaceAppStore.select(id)
    } else {
      $goto("../../design")
    }
  })
</script>
