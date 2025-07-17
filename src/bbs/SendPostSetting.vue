<script setup lang="ts">
const form = defineModel<{
  markdown: boolean,
  vote: boolean,
  preview: boolean,
}>({required: true})
</script>

<template>
  <el-form>

    <!-- 启用Markdown语法 -->
    <el-form-item :label="$t('bbs.send.markdown')">
      <el-switch v-model="form.markdown" />
    </el-form-item>

    <!-- 启用投票模式 -->
    <el-form-item :label="$t('bbs.send.vote')">
      <el-switch v-model="form.vote" />
    </el-form-item>

    <!-- 预览内容 -->
    <el-form-item :label="$t('bbs.send.preview')">
      <el-switch v-model="form.preview" />
    </el-form-item>

  </el-form>
</template>
