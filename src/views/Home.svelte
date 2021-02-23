<div>
    主页<strong>{params.id}</strong>
    <Button on:click={handleClick}>弹出</Button>

    <a href="/details" use:link>二次跳转</a>

</div>
<script>
    import {link} from 'svelte-spa-router'
    import {Button,InlineNotification} from 'carbon-components-svelte'

    export let params = {}

    function handleClick() {
        const app = new InlineNotification({
            target: document.body,
            props: {
                options: {
                    // Optionally set default options here
                    ...
                }
            }
        })


    }

</script>
