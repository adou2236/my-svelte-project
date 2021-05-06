<Header
        persistentHamburgerMenu={false}
        bind:isSideNavOpen>
    <div slot="skip-to-content">
        <SkipToContent />
    </div>
    <HeaderUtilities>
        <HeaderAction>
            <label>
                <Select size="sm"
                        inline
                        hideLabel
                        labelText="Carbon theme"
                        bind:selected={theme}>
                    <SelectItem value="white" text="White" />
                    <SelectItem value="g10" text="Gray 10" />
                    <SelectItem value="g90" text="Gray 90" />
                    <SelectItem value="g100" text="Gray 100" />
                </Select>
            </label>
        </HeaderAction>
        <HeaderSearch
                bind:ref
                bind:active
                bind:value
                bind:selectedResultIndex
                placeholder="Search services"
                {results}
                on:active={() => {events = [...events, { type: 'active' }];}}
                on:inactive={() => {events = [...events, { type: 'inactive' }];}}
                on:clear={() => {events = [...events, { type: 'clear' }];}}
                on:select={(e) => {events = [...events, { type: 'select', ...e.detail }];}}
        />
    </HeaderUtilities>
</Header>
<div class="body">
    <LeftNav class="left-nav" isSideNavOpen={isSideNavOpen}/>
    <Content class="inner-content">
        <Grid>
            <Row>
                <Column>
                    <Router {routes}/>
                </Column>
            </Row>
        </Grid>
        <MiniPlayer class="mini-player"/>
    </Content>
</div>

<script>
    import {
        Header,
        HeaderUtilities,
        HeaderSearch,
        SkipToContent,
        Content,
        Grid,
        Row,
        Column,
        Select,
        SelectItem,
        HeaderAction,
    } from "carbon-components-svelte";
    import LeftNav from './components/LeftNav.svelte'
    import Router from 'svelte-spa-router'
    import {routes} from './router'
    import MiniPlayer from "./components/MiniPlayer.svelte";


    let isSideNavOpen = false;

    export let params = {}


    const data = [
        {
            href: "/",
            text: "Kubernetes Service",
            description:
                "Deploy secure, highly available apps in a native Kubernetes experience. IBM Cloud Kubernetes Service creates a cluster of compute hosts and deploys highly available containers.",
        },
        {
            href: "/",
            text: "Red Hat OpenShift on IBM Cloud",
            description:
                "Deploy and secure enterprise workloads on native OpenShift with developer focused tools to run highly available apps. OpenShift clusters build on Kubernetes container orchestration that offers consistency and flexibility in operations.",
        },
        {
            href: "/",
            text: "Container Registry",
            description:
                "Securely store container images and monitor their vulnerabilities in a private registry.",
        },
        {
            href: "/",
            text: "Code Engine",
            description:
                "Run your application, job, or container on a managed serverless platform.",
        },
    ];

    let ref = null;
    let active = false;
    let value = "";
    let selectedResultIndex = 0;
    let events = [];
    $: lowerCaseValue = value.toLowerCase();
    $: results = value.length > 0 ? data.filter((item) => {
        return (
            item.text.toLowerCase().includes(lowerCaseValue) ||
            item.description.includes(lowerCaseValue)
        );
    }) : [];

    /** @type {"white" | "g10" | "g90" | "g100"} */
    let theme = "g100";

    $: document.documentElement.setAttribute("theme", theme)


</script>


<style lang="scss" itemscope>
    .header-tools{
        display: flex;
        align-items: center;
    }
    .body{
        padding-bottom: 80px;
        /deep/ .inner-content{
            background: transparent;
            padding-top: 80px;
        }
    }
    .mini-player{
        position: absolute;
        left: 50%;
        bottom: 0;
    }
</style>
