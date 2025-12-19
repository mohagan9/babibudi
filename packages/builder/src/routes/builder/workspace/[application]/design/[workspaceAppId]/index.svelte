<script>
  import { goto } from "@roxi/routify"
  import { workspaceAppStore } from "@/stores/builder"

  $goto

  $goto(`./${$workspaceAppStore.selectedWorkspaceApp}`)
</script>
