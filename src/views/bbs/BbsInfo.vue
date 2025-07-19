<script setup lang="ts">
import {reactive} from 'vue';

const data = reactive({
  bbses: 0,
  forums: 0,
  posts: 0,
  users: 0,
})

</script>

<template>
  <el-descriptions :column="1">
    <el-descriptions-item :label="$t('bbs.bbsinfo.bbses')">
      {{data.bbses}}
    </el-descriptions-item>
    <el-descriptions-item :label="$t('bbs.bbsinfo.forums')">
      {{data.forums}}
    </el-descriptions-item>
    <el-descriptions-item :label="$t('bbs.bbsinfo.posts')">
      {{data.posts}}
    </el-descriptions-item>
    <el-descriptions-item :label="$t('bbs.bbsinfo.users')">
      {{data.users}}
    </el-descriptions-item>
  </el-descriptions>
</template>
