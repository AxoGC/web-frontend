<script setup lang="ts">
import usePersistedStore from '@/stores/persisted'
import {api} from '@/utils/axios'
import type {Album, Image} from '@/utils/tables'
import {MoreFilled, Picture, Star} from '@element-plus/icons-vue'
import {useRouteQuery} from '@vueuse/router'
import type {EChartsOption} from 'echarts'
import {computed} from 'vue'
import { ref } from 'vue'
import {useI18n} from 'vue-i18n'
import VChart from 'vue-echarts'
import {use} from 'echarts/core'
import {LegendComponent, TitleComponent, ToolboxComponent, TooltipComponent} from 'echarts/components'
import {PieChart} from 'echarts/charts'
import {CanvasRenderer} from 'echarts/renderers'
import {LabelLayout} from 'echarts/features'

use([TitleComponent, ToolboxComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout])

interface Stats {
  albumCount: number,
  imageCount: number,
  reviewCount: number,
  likesCount: number,
}

interface AlbumLike {
  id: number,
  label: string,
  likes: number,
}

const persisted = usePersistedStore()
const albums = ref<Album[]>([])
const stats = ref<Stats|null>(null)
const carousels = ref<Image[]>([])
const albumLikes = ref<AlbumLike[]>([])

const page = useRouteQuery('page', 1, { transform: Number })
const pageSize = useRouteQuery('page_size', 10, { transform: Number })

api.get<any, Album[]>(`/albums?page=${page.value}&page_size=${pageSize.value}`).then(res => albums.value = res)
api.get<any, Stats>('/gallery/stats').then(res => stats.value = res)
api.get<any, Image[]>('/gallery/carousel').then(res => carousels.value = res)
api.get<any, AlbumLike[]>('/gallery/rank').then(res => albumLikes.value = res)

const { t } = useI18n({ messages: {
  zh: {
    albumCount: '总相册',
    imageCount: '总图片',
    reviewCount: '总评论',
    likesCount: '总点赞',

    createAlbum: '创建相册',

    popularAlbum: '最受欢迎相册',
  },
} })

const albumLikeOption = computed<EChartsOption>(() => ({
  title: {
    text: t('popularAlbum'),
  },
  legend: {
    top: 'bottom'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)'
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: albumLikes.value.map(({ label, likes}) => ({ value: likes, name: label })),
    }
  ]
}))
</script>

<template>
  <div class="mx-auto max-w-5xl p-4 space-y-4">

    <div class="card flex justify-between items-center">
      <div class="text-3xl font-bold">
        {{t('gallery')}}
      </div>
      <div class="flex items-center gap-4">
        <template v-if="stats">
          <el-statistic v-for="item, key in stats" :key="key" class="text-center" :title="t(key)" :value="item">
          </el-statistic>
        </template>
        <el-button round type="primary" @click="$router.push('/albums/new')">
          {{t('createAlbum')}}
        </el-button>
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-4">
      <el-carousel class="h-48 grow relative" height="100%" type="card">
        <el-carousel-item v-for="carousel, index in carousels" :key="carousel.id" class="rounded-2xl">
          <div class="absolute bottom-0 left-0 right-0 h-16 z-10 bg-gradient-to-t from-black/40
            to-transparent flex justify-between items-center p-4"
          >
            <div class="text-white">
              {{carousel.label}} by {{carousel.user.name}}
            </div>
            <el-button round :icon="Star">
              {{carousel.likes}}
            </el-button>
          </div>
          <el-image
            class="h-full"
            :src="`${persisted.imgAddr}/images/${carousel.filename}`"
            :preview-src-list="carousels.map(carousel=>`${persisted.imgAddr}/images/${carousel.filename}`)"
            preview-teleported
            :initial-index="index"
            fit="cover"
          >
          </el-image>
        </el-carousel-item>
      </el-carousel>
      <v-chart :option="albumLikeOption" class="h-48 md:w-72" autoresize>
      </v-chart>
    </div>

    <div class="mt-4 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
      <div
        v-for="album in albums" :key="album.id"
        class="card h-48 relative bg-cover bg-center hover:scale-[1.02] group"
        :style="{backgroundImage: `url(${persisted.imgAddr}/album-covers/${album.slug})`}"
        @click="$router.push(`/albums/${album.slug}`)"
      >
        <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-30">
        </div>
        <div class="absolute bottom-5 inset-x-5 text-white flex justify-between items-center">
          <span>{{album.label}}</span>
          <div>
            <el-button :icon="Picture" round>
              {{album.imageCount}}
            </el-button>
            <el-dropdown class="ms-2">
              <el-button circle :icon="MoreFilled" @click.stop>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="$router.push(`/albums/${album.slug}/edit`)">
                    {{t('edit')}}
                  </el-dropdown-item>
                  <el-dropdown-item>
                    {{t('report')}}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
