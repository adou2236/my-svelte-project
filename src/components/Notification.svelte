<InlineNotification
        kind={variants}
        title={title}
        subtitle={subtitle}
        lowContrast={lowContrast}
        timeout={timeout}
/>
<script>
    import { InlineNotification ,ToastNotification } from "carbon-components-svelte";
    //事件情感枚举类型
    //[error,info,info-square,success,warning,warning-alt]
    export let variants = 'info'
    //对比度主体
    export let lowContrast = false
    export let timeout = 2000
    export let title = ''
    export let subtitle = ''

</script>
<style></style>
