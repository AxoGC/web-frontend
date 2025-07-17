<template>
  <div class="responsive-table">
    <!-- 宽屏下的表格头部 -->
    <div class="hidden lg:grid grid-cols-12 gap-2 p-4 bg-gray-100 border-b font-semibold">
      <div v-for="column in columns" :key="column.key" :class="column.colClass">
        {{ column.label }}
      </div>
    </div>

    <!-- 数据行 -->
    <div class="grid grid-cols-12 gap-2">
      <template v-for="(item, index) in data" :key="index">
        <!-- 宽屏下：一行一个对象 -->
        <template v-for="column in columns" :key="column.key">
          <div :class="['p-4 border-b', column.colClass, 'hidden lg:block']">
            <!-- 头像特殊处理 -->
            <img
              v-if="column.type === 'avatar'"
              :src="item[column.key]"
              :alt="column.label"
              class="w-12 h-12 rounded-full object-cover"
            >
            <!-- 状态标签 -->
            <span
              v-else-if="column.type === 'status'"
              :class="[
                'px-2 py-1 rounded-full text-xs font-medium',
                getStatusClass(item[column.key])
              ]"
            >
              {{ item[column.key] }}
            </span>
            <!-- 普通文本 -->
            <span v-else>{{ item[column.key] }}</span>
          </div>
        </template>

        <!-- 窄屏下：多行一个对象 -->
        <div class="col-span-12 lg:hidden border-b pb-4 mb-4">
          <div class="grid grid-cols-12 gap-2">
            <!-- 头像占用更多空间 -->
            <div class="col-span-4 sm:col-span-3 md:col-span-2">
              <img
                v-if="avatarColumn"
                :src="item[avatarColumn.key]"
                :alt="avatarColumn.label"
                class="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mx-auto"
              >
            </div>

            <!-- 其他字段 -->
            <div class="col-span-8 sm:col-span-9 md:col-span-10">
              <div class="grid grid-cols-12 gap-2">
                <template v-for="column in nonAvatarColumns" :key="column.key">
                  <div :class="column.mobileColClass">
                    <div class="text-sm font-medium text-gray-600 mb-1">
                      {{ column.label }}
                    </div>
                    <div class="text-sm">
                      <!-- 状态标签 -->
                      <span
                        v-if="column.type === 'status'"
                        :class="[
                          'px-2 py-1 rounded-full text-xs font-medium',
                          getStatusClass(item[column.key])
                        ]"
                      >
                        {{ item[column.key] }}
                      </span>
                      <!-- 普通文本 -->
                      <span v-else>{{ item[column.key] }}</span>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 定义列的类型
interface Column {
  key: string
  label: string
  type?: 'text' | 'avatar' | 'status'
  colClass: string // 宽屏下的列宽类
  mobileColClass: string // 窄屏下的列宽类
}

// 定义数据项的类型
interface DataItem {
  [key: string]: any
}

// 定义 props
interface Props {
  data: DataItem[]
  columns: Column[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  columns: () => []
})

// 计算头像列
const avatarColumn = computed(() => {
  return props.columns.find(col => col.type === 'avatar')
})

// 计算非头像列
const nonAvatarColumns = computed(() => {
  return props.columns.filter(col => col.type !== 'avatar')
})

// 状态样式
const getStatusClass = (status: string) => {
  const statusClasses: { [key: string]: string } = {
    'active': 'bg-green-100 text-green-800',
    'inactive': 'bg-red-100 text-red-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'completed': 'bg-blue-100 text-blue-800'
  }
  return statusClasses[status.toLowerCase()] || 'bg-gray-100 text-gray-800'
}
</script>

<style scoped>
.responsive-table {
  @apply w-full max-w-full overflow-hidden;
}
</style>
