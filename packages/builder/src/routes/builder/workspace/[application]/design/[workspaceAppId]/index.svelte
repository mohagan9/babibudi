<script>
  import { goto } from "@roxi/routify"
  import { workspaceAppStore } from "@/stores/builder"

  $goto

  $goto("./[workspaceAppId]", {
    application: $workspaceAppStore.selectedWorkspaceApp,
  })
  //TODO - fix this
</script>
