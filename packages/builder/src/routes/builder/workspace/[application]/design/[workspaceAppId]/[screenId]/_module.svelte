<script lang="ts">
  import { goto, params } from "@roxi/routify"
  import { screenStore } from "@/stores/builder"
  import { onMount } from "svelte"

  $goto
  $params

  const validate = (id: string) =>
    $screenStore.screens.some(screen => screen._id === id)

  onMount(() => {
    const screenId = $params.screenId
    if (validate(screenId)) {
      screenStore.select(screenId)
    }
  })
</script>

<slot />
