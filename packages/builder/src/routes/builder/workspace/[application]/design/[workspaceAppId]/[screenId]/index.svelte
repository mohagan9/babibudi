<script>
  import { goto } from "@roxi/routify"
  import { screenStore } from "@/stores/builder"

  $goto

  $goto(`./${$screenStore.selectedScreenId}-screen`)
</script>
