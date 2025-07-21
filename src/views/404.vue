<template>
    <div class="not-found">
        <div style="width: 60vw;min-width: 300px;height: 40vh;">
            <h1>404</h1>
            <div>抱歉，您访问的页面不存在。</div>
            <RouterLink style="font-size: 14px;" to="/">点击返回主页</RouterLink>
        </div>
    </div>
    
</template>
  
<script setup>

</script>
  
<style scoped>
.not-found{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100vh - 48px);
}
</style>