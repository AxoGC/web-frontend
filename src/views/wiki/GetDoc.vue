<script setup lang="ts">
import useSessionStore from '@/stores/session';
import {api} from '@/utils/axios';
import type {Doc} from '@/utils/tables';
import {Delete, Edit, EditPen} from '@element-plus/icons-vue';
import {useRouteParams, useRouteQuery} from '@vueuse/router';
import dayjs from 'dayjs';
import {ElMessageBox} from 'element-plus';
import {ref, watch} from 'vue';
import {useI18n} from 'vue-i18n';

const session = useSessionStore()

const doc = ref<Doc|null>(null)
const slug = useRouteParams('doc')
const page = useRouteQuery('page', 1, { transform: Number })
const pageSize = useRouteQuery('page_size', 10, { transform: Number })
watch([page, pageSize], async () => {
  doc.value = await api.get<any, Doc>(`/docs/${slug.value}`)
}, { immediate: true })

function onDelete() {
  ElMessageBox.confirm(
    t('onDeleteMessage'), t('onDeleteTitle'),
    { confirmButtonText: t('onDeleteConfirm'), cancelButtonText: t('onDeleteCancel'), type: 'warning' },
  )
}

const { t } = useI18n({ messages: {
  zh: {
    updatedAt: '编辑于',
    onDeleteMessage: '这将永久删除这个文档！（真的很久）',
    onDeleteTitle: '警告',
    onDeleteConfirm: '确定',
    onDeleteCancel: '取消',
    reviewList: '评论列表',
  },
} })

</script>

<template>
  <div v-if="doc" class="max-w-5xl mx-auto space-y-4 p-4">
    <div class="card space-y-4">

      <div>
        <el-page-header @back="$router.back">
          <template v-if="doc" #content>
            {{doc.user.name}} {{t('updatedAt')}} {{dayjs(doc.updatedAt).format('MM月DD日 HH:mm')}}
          </template>
          <template #extra>
            <el-button circle :icon="Edit" @click="$router.push(`/docs/${slug}/edit`)">
            </el-button>
            <el-button circle :icon="Delete" @click="onDelete">
            </el-button>
          </template>
        </el-page-header>
      </div>

      <div>
        <h1>
          {{doc.title}}
        </h1>
        <article v-html="session.md.render(doc.content)">
        </article>
      </div>
    </div>

    <div class="card space-y-4">

      <div class="flex justify-between items-center">
        <span>{{t('reviewList')}}</span>
        <el-button :icon="EditPen" round @click="$router.push(`/docs/${slug}/new-review`)">{{t('writeReview')}}</el-button>
      </div>

      <div>
        <el-pagination
          layout="sizes, prev, pager, next, total"
          v-model:current-page="page"
          v-model:page-size="pageSize"
          :total="doc.reviewCount"
        ></el-pagination>
      </div>

    </div>
  </div>
</template>
