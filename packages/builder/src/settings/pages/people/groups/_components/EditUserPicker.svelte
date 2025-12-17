<script>
  import { Button, Popover, notifications } from "@budibase/bbui"
  import { createPaginationStore } from "@/helpers/pagination"
  import { users } from "@/stores/portal/users"

  let popoverAnchor
  let popover
  let searchTerm = ""
  let prevSearch = undefined
  let pageInfo = createPaginationStore()

  $: page = $pageInfo.page
  $: searchUsers(page, searchTerm)

  async function searchUsers(page, search) {
    if ($pageInfo.loading) {
      return
    }
    // need to remove the page if they've started searching
    if (search && !prevSearch) {
      pageInfo.reset()
      page = undefined
    }
    prevSearch = search
    try {
      pageInfo.loading()
      await users.search({
        bookmark: page,
        query: { string: { email: search } },
      })
      pageInfo.fetched($users.hasNextPage, $users.nextPage)
    } catch (error) {
      notifications.error("Error getting user list")
    }
  }
</script>

<div bind:this={popoverAnchor}>
  <Button on:click={popover.show()} cta>Add user</Button>
</div>
<Popover align="left" bind:this={popover} anchor={popoverAnchor}></Popover>
