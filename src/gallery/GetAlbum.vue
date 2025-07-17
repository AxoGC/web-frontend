<script setup lang="ts">
import type { Album } from '@/utils/tables'
import { reactive, ref, watch } from 'vue'
import {api} from '@/utils/axios'
import {useRouteParams, useRouteQuery} from '@vueuse/router'
import usePersistedStore from '@/stores/persisted'
import {useI18n} from 'vue-i18n'
import {EditPen, Setting, Star} from '@element-plus/icons-vue'

const { t } = useI18n({ messages: {
  zh: {
    reviewList: '评论列表',
    writeReview: '写评论',
    byTime: '按时间',
    byLikes: '按热度',
  },
} })

const persisted = usePersistedStore()
const album = ref<Album|null>(null)
const slug = useRouteParams<string>('album')
const page = useRouteQuery('page', 1, { transform: Number })
const pageSize = useRouteQuery('page_size', 10, {transform: Number })
const reviewPage = useRouteQuery('review_page', 1, { transform: Number })
const reviewPageSize = useRouteQuery('review_page_size', 10, { transform: Number })
const currentImageOption = ref('time')
const isDialogOpen = ref(false)
const imageOptions = [
  { label: t('byTime'), value: 'time' },
  { label: t('byLikes'), value: 'likes' },
]

const reviewForm = reactive({
  content: '',
  attitude: null,
})

watch(
  [slug, page, pageSize, reviewPage, reviewPageSize],
  async ([slug, page, pageSize, reviewPage, reviewPageSize]) => {
  album.value = await api.get<any, Album>(`/albums/${slug}`, {params: {
    page: page,
    page_size: pageSize,
    review_page: reviewPage,
    review_page_size: reviewPageSize,
  } })
}, { immediate: true })
</script>

<template>
  <div v-if="album" class="max-w-5xl mx-auto p-4 flex flex-col gap-4">

    <el-card
      shadow="hover"
      body-class="h-full flex flex-col text-white relative bg-cover bg-center"
      :body-style="{backgroundImage: `url(${persisted.imgAddr}/album-covers/${album.slug})`}"
    >
      <div class="absolute inset-0 bg-black/15"></div>
      <el-page-header @back="$router.back">
        <template #content>
          <div class="text-white flex">
            <span>{{album.label}}</span>
            <el-icon class="ms-4"><User /></el-icon>
            <span class="text-sm ms-2">{{album.user.name}}</span>
            <template v-if="album.guild">
              <el-icon class="ms-4"><House /></el-icon>
              <span class="text-sm ms-2">{{album.guild.name}}</span>
            </template>
          </div>
        </template>
        <template #extra>
          <el-button :icon="Setting" circle @click="isDialogOpen=true">
          </el-button>
        </template>
        <div class="mt-4 flex justify-between items-center">
          <div>{{album.profile}}</div>
          <el-segmented
            v-model="currentImageOption"
            :options="imageOptions"
            style="--el-border-radius-base: 16px;"
          >
          </el-segmented>
        </div>
      </el-page-header>
    </el-card>

    <!--
    <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2">
    -->

    <!--
    <div class="columns-1 sm:columns-2 md:columns-3 lg:columns-4 space-y-2 gap-2">
    -->
    <div class="columns-xs space-y-2 gap-2">
      <div v-for="image, index in album.images" :key="image.id" class="relative">
        <el-image
          :src="`${persisted.imgAddr}/images/${image.filename}`"
          :preview-src-list="album.images.map(image=>`${persisted.imgAddr}/images/${image.filename}`)"
          :initial-index="index"
          fit="cover"
          class="rounded-xl"
          show-progress
        >
          <template #toolbar="{ prev, next, setActiveItem, actions, reset }">
            <el-icon @click="prev"><Back /></el-icon>
            <el-icon @click="next"><Right /></el-icon>
            <el-icon @click="setActiveItem(album.images.length - 1)">
              <DArrowRight />
            </el-icon>
            <el-icon @click="actions('zoomOut')"><ZoomOut /></el-icon>
            <el-icon
              @click="actions('zoomIn', { enableTransition: false, zoomRate: 2 })"
            >
              <ZoomIn />
            </el-icon>
            <el-icon
              @click="
                actions('clockwise', { rotateDeg: 180, enableTransition: false })
              "
            >
              <RefreshRight />
            </el-icon>
            <el-icon @click="actions('anticlockwise')"><RefreshLeft /></el-icon>
            <el-icon @click="reset"><Refresh /></el-icon>
            <el-icon><CopyDocument /></el-icon>
            <el-icon><InfoFilled /></el-icon>
          </template>
        </el-image>
        <el-button :icon="Star" class="absolute bottom-3 right-3" round>
          {{image.likes}}
        </el-button>
      </div>
    </div>

    <el-card
      class="flex flex-col"
      header-class="flex justify-between items-center"
      body-class="grow"
      shadow="hover"
    >

      <template #header>
        <div>{{t('reviewList')}}</div>
        <el-button :icon="EditPen" round>{{t('writeReview')}}</el-button>
      </template>

      <template #footer>
        <el-pagination
          layout="sizes,prev,pager,next,total"
          v-model:current-page="reviewPage"
          v-model:page-size="reviewPageSize"
          :total="album.reviewCount"
        >
        </el-pagination>
      </template>

    </el-card>

  </div>

  <el-dialog v-model="isDialogOpen">

  </el-dialog>
</template>
