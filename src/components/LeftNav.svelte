<SideNav bind:isOpen={isSideNavOpen}>
    <SideNavItems>
        {#each albumType.allType as { id, name, children }, i}
            <SideNavMenu expanded={children.some(item=>item.index == activeTab)} text={name}>
                {#each children as { index, name }, i}
                    <SideNavMenuItem isSelected={activeTab==index.toString()}
                                     style="cursor: pointer"
                                     on:click={()=>push('/'+index)} text={name}/>
                {/each}
            </SideNavMenu>
        {/each}
    </SideNavItems>
</SideNav>
<script>
    import {
        SideNav,
        SideNavItems,
        SideNavMenu,
        SideNavMenuItem,
    } from "carbon-components-svelte";
    import albumType from '../../public/static/json/albumType.json'
    import {location} from "svelte-spa-router";
    import {push} from 'svelte-spa-router'


    export let isSideNavOpen = false;

    $: activeTab = $location.slice($location.indexOf('/')+1)
</script>

<!--<style lang="scss" global>-->
<!--    .bx&#45;&#45;side-nav__navigation{-->
<!--        height:calc(100% - 128px)-->
<!--    }-->
<!--</style>-->
