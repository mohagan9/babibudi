<script>
  import { admin } from "@/stores/portal"
  import { onMount } from "svelte"
  import { goto } from "@roxi/routify"

  let loaded = false

  $: cloud = $admin.cloud
  $: useAccountPortal = cloud && !$admin.disableAccountPortal

  onMount(() => {
    if ($admin?.checklist?.adminUser?.checked || useAccountPortal) {
      $goto("../")
    } else {
      loaded = true
    }
  })
</script>

{#if loaded}
  <slot />
{/if}
