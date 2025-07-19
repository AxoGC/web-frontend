<script setup lang="ts">
import {reactive, ref} from 'vue';
import SendPostSetting from './SendPostSetting.vue';
import {Promotion, Setting} from '@element-plus/icons-vue';
import {useRoute} from 'vue-router';
import md from '@/utils/markdown';
import {api} from '@/utils/axios';

const path = useRoute().params.forum as string
const drawerStatus = ref(false)

const form = reactive({
  title: '',
  content: '',
})

const setting = reactive({
  markdown: false,
  vote: false,
  preview: false,
})

async function sendPost() {
  const res = await api.post('/post', {
    form,
    useMd: setting.markdown,
    useVote: setting.vote,
    forum: path,
  })
}
</script>

<template>
  <div class="full-screen p-4 flex gap-3">

    <!-- 左侧编辑菜单 -->
    <el-card shadow="hover" class="grow">

      <template #header>
        <el-page-header @back="$router.back">

          <!-- 编辑标题 -->
          <template #content>
            <div class="flex gap-2 items-center">
              <div class="shrink-0">
                {{$t('bbs.send.title')}}:
              </div>
              <el-input class="grow" v-model="form.title" />
            </div>
          </template>

          <!-- 发送帖子/打开设置 -->
          <template #extra>
            <el-button :icon="Promotion" circle @click="sendPost" type="primary" />
            <el-button class="sm:hidden" :icon="Setting" circle @click="drawerStatus=true" />
          </template>
        </el-page-header>
      </template>

      <!-- 编辑内容/预览 -->
      <div v-if="setting.preview">
        <div v-if="setting.markdown" v-html="md.render(form.content)" />
        <div class="whitespace-pre-line" v-else>{{form.content}}</div>
      </div>
      <el-input v-else type="textarea" :rows="10" v-model="form.content" />
    </el-card>

    <!-- 右侧设置菜单 -->
    <el-card shadow="hover" class="shrink-0 max-sm:hidden">
      <send-post-setting v-model="setting" />
    </el-card>

    <!-- 移动端设置抽屉 -->
    <el-drawer v-model="drawerStatus" size="50%">
      <send-post-setting v-model="setting" />
    </el-drawer>
  </div>
</template>
