<script lang="ts">
  import { EnvDropdown, Modal, type EnvDropdownType } from "@budibase/bbui"
  import { environment } from "@/stores/portal"
  import CreateEditVariableModal from "./CreateEditVariableModal.svelte"
  import type { CreateEnvironmentVariableRequest } from "@budibase/types"

  export let label: string = ""
  export let type: EnvDropdownType = "text"
  export let value: string | undefined = undefined
  export let error: string | undefined = undefined
  export let placeholder: string | undefined = undefined

  let modal: Modal

  async function saveVariable(data: CreateEnvironmentVariableRequest) {
    await environment.createVariable(data)
    value = `{{ env.${data.name} }}`
    modal.hide()
  }
</script>

<EnvDropdown
  on:change
  on:blur
  bind:value
  {label}
  type={type === "port" ? "text" : type}
  {error}
  {placeholder}
  variables={$environment.variables}
  showModal={() => modal.show()}
/>

<Modal bind:this={modal}>
  <CreateEditVariableModal save={saveVariable} />
</Modal>
