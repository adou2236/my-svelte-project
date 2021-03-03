<PaginationNav
        forwardText="下一页"
        backwardText="上一页"
        page={currentPage-1}
        total={total}
        on:change={handleChange}

/>
<script>
    import {PaginationNav} from 'carbon-components-svelte'
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let currentPage = 1
    export let totalItems = 0
    export let pageSize = 10
    $: total = Math.floor(totalItems/pageSize)

    function handleChange(e) {
        dispatch('turnPage', {
            page: e.detail.page+1
        });
    }
</script>
