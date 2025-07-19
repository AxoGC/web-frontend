<script setup lang="ts">
</script>

<template>
  <el-menu router :default-active="$route.meta.nav?.index" class="space-y-2">
    <template v-for="route in $route.matched[0].children" :key="route.path">
      <el-menu-item v-if="route.meta?.nav" class="h-12 rounded-full" :index="route.meta?.nav?.index">
        <el-icon>
          <component :is="route.meta?.nav?.icon" />
        </el-icon>
        {{ route.meta?.nav?.label[$i18n.locale] }}
      </el-menu-item>

    </template>
  </el-menu>
</template>
