<script setup lang="ts">
import {reactive, ref} from 'vue';
import {Promotion, Setting} from '@element-plus/icons-vue';
import {useRoute} from 'vue-router';
import md from '@/utils/markdown';
import {api} from '@/utils/axios';
import {useI18n} from 'vue-i18n';

const { t } = useI18n({ messages: {
  zh: {
    markdown: '使用Markdown语法',
    preview: '预览',
  },
} })

const path = useRoute().params.forum as string
const drawerStatus = ref(false)

const form = reactive({
  title: '',
  content: '',
  useMd: false,
})

const preview = ref(false)

async function sendPost() {
  const res = await api.post('/post', {
    form,
    forum: path,
  })
}
</script>

<template>
  <div class="p-4 flex flex-col md:flex-row gap-4">

    <!-- 左侧编辑菜单 -->
    <div class="grow card space-y-4">

      <el-page-header @back="$router.back">

        <!-- 编辑标题 -->
        <template #content>
          <div class="flex gap-2 items-center">
            <div class="shrink-0">
              {{t('title')}}:
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

      <!-- 编辑内容/预览 -->
      <div v-if="preview">
        <div v-if="form.useMd" v-html="md.render(form.content)" />
        <div class="whitespace-pre-line" v-else>{{form.content}}</div>
      </div>
      <el-input v-else type="textarea" :rows="10" v-model="form.content" />
    </div>

    <!-- 右侧设置菜单 -->
    <div class="card shrink-0 max-sm:hidden">
      <el-form>

        <el-form-item :label="t('markdown')">
          <el-switch v-model="form.useMd" />
        </el-form-item>

        <el-form-item :label="t('preview')">
          <el-switch v-model="preview" />
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>
