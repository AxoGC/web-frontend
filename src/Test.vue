<template>
  <div class="max-w-5xl mx-auto">
    <div class="grid grid-cols-12">
      <template v-for="user in users">
        <img :src="user.avatar" class="rounded-2xl" alt="">
        <div class="col-span-12 h-px bg-slate-600 my-2"></div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ResponsiveTable from './ResponsiveTable.vue'

// 定义用户数据类型
interface User {
  id: number
  avatar: string
  name: string
  email: string
  role: string
  status: string
  department: string
  joinDate: string
}

// 示例数据
const users = ref<User[]>([
  {
    id: 1,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    name: '张三',
    email: 'zhangsan@example.com',
    role: '产品经理',
    status: 'active',
    department: '产品部',
    joinDate: '2023-01-15'
  },
  {
    id: 3,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    name: '王五',
    email: 'wangwu@example.com',
    role: '后端开发',
    status: 'inactive',
    department: '技术部',
    joinDate: '2023-03-10'
  },
  {
    id: 4,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    name: '赵六',
    email: 'zhaoliu@example.com',
    role: 'UI设计师',
    status: 'pending',
    department: '设计部',
    joinDate: '2023-04-05'
  },
  {
    id: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    name: '钱七',
    email: 'qianqi@example.com',
    role: '测试工程师',
    status: 'completed',
    department: '质量部',
    joinDate: '2023-05-12'
  }
])

// 定义表格列配置
const columns = ref([
  {
    key: 'avatar',
    label: '头像',
    type: 'avatar',
    colClass: 'col-span-1',
    mobileColClass: 'col-span-12'
  },
  {
    key: 'name',
    label: '姓名',
    type: 'text',
    colClass: 'col-span-2',
    mobileColClass: 'col-span-6'
  },
  {
    key: 'email',
    label: '邮箱',
    type: 'text',
    colClass: 'col-span-3',
    mobileColClass: 'col-span-6'
  },
  {
    key: 'role',
    label: '职位',
    type: 'text',
    colClass: 'col-span-2',
    mobileColClass: 'col-span-4'
  },
  {
    key: 'status',
    label: '状态',
    type: 'status',
    colClass: 'col-span-1',
    mobileColClass: 'col-span-4'
  },
  {
    key: 'department',
    label: '部门',
    type: 'text',
    colClass: 'col-span-2',
    mobileColClass: 'col-span-4'
  },
  {
    key: 'joinDate',
    label: '入职日期',
    type: 'text',
    colClass: 'col-span-1',
    mobileColClass: 'col-span-12'
  }
])
</script>

<style scoped>
/* 自定义样式 */
</style>
