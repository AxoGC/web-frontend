<template>
  <div class="flex items-center gap-3 p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
    <!-- 用户头像 -->
    <img
      :src="avatar"
      alt="用户头像"
      class="w-12 h-12 rounded-full object-cover border border-gray-300"
    />

    <div class="flex-1 min-w-0">
      <!-- 角色标签 -->
      <div v-if="roles && roles.length" class="flex flex-wrap gap-1 mb-1">
        <span
          v-for="(role, index) in roles"
          :key="index"
          class="inline-block text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 font-medium"
        >
          {{ role }}
        </span>
      </div>

      <!-- 用户名 -->
      <div class="font-medium text-gray-800 truncate">
        {{ username }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props 接收头像、用户名和角色数组
defineProps<{
  avatar: string
  username: string
  roles?: string[]
}>()
</script>

<style scoped>
/* 如果不用 Tailwind，这里可以加纯 CSS 样式 */
</style>

