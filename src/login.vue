<template>
    <div>
        <h2>这是登录组件，由.vue文件定义 ---------- {{msg}}</h2>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg:'123'
            }
        },
        methods: {
            show(){
                console.log("调用了login.vue中的show方法");
            }
        }
    };

    export let str1='Jinshuo is cool.';
    export let str2='I love you.';
    
</script>

<style>

</style>