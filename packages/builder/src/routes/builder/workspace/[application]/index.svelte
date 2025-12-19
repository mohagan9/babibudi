<script>
  import { goto, params } from "@roxi/routify"
  import { screenStore, appStore } from "@/stores/builder"
  import { onMount } from "svelte"

  $goto
  $params

  onMount(() => {
    const { screens } = $screenStore
    //const { appId } = $appStore
    // TODO - why is appId not loaded into the store?
    const appId = $params.application
    console.log("INDEX MOUNTED ??")
    if (!appId) return
    if (screens && screens.length > 0) {
      $goto("../design")
    } else {
      $goto("../data")
    }
  })
</script>
