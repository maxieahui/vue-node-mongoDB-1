<template>
    <div>
        <div class="topbar bg-black py-2 px-3 d-flex ai-center">
            <img src="../assets/favicon.png" alt="王者荣耀" height="30">
            <div class="px-2">
                <div class="text-white fs-lg">王者荣耀</div>
                <div class="fs-xxs text-grey-1">团队成就更多</div>
            </div>
            <button class="btn bg-primary">立即下载</button>
        </div>
        <div class="nav">
            nav
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "Main"
    }
</script>

<style scoped>

</style>
