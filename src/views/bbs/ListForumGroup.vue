<script setup lang="ts">
import type {ForumGroup, Post} from '@/utils/tables';
import {ref, watchEffect} from 'vue';
import {api} from '@/utils/axios';
import usePersistedStore from '@/stores/persisted';
import {useI18n} from 'vue-i18n';
import {use} from 'echarts/core';
import {TitleComponent, TooltipComponent} from 'echarts/components';
import {PieChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';
import {computed} from 'vue';
import type {EChartsOption} from 'echarts';
import VChart from 'vue-echarts';
import {Setting} from '@element-plus/icons-vue';
import dayjs from 'dayjs';

const forumGroups = ref<ForumGroup[]>([])
const persisted = usePersistedStore()
api.get<any, ForumGroup[]>('/forum-groups').then(res => {
  forumGroups.value = res
}).catch(() => {})

const { t } = useI18n({ messages: {
  zh: {
    editForumGroup: '编辑文档组',
    addForumGroup: '添加论坛组',
    addForum: '添加论坛',
    forumList: '论坛列表',

    forumPostCount: '发帖量分布 TOP5',

    recommend: '推荐内容',
    popular: '热门',
    latest: '最新',

  },
} })

const recommendOption = ref('popular')
const recommends = ref<Post[]>([])

watchEffect(async () => {
  recommends.value = await api.get<any, Post[]>(`/recommends?option=${recommendOption.value}`)
})

const recommendOptions = [
  { label: t('popular'), value: 'popular' },
  { label: t('latest'), value: 'latest' },
]

use([TitleComponent, PieChart, CanvasRenderer, TooltipComponent])

const postCountChartOption = computed<EChartsOption>(() => {
  const topForums = forumGroups.value.flatMap(group => group.forums).sort((a, b) => b.postCount - a.postCount).slice(0, 5)
  return {
    title: {
      text: t('forumPostCount'),
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} ({d}%)',
    },
    xAxis: {
      type: 'category',
      data: topForums.map(forum => forum.title),
    },
    yAxis: {
      type: 'value',
    },
    series: [{
      top: '30px',
      data: topForums.map(({ title, postCount }) => ({ name: title, value: postCount })),
      roseType: 'radius',
      type: 'pie',
    }],
  }
})
</script>

<template>
  <div class="p-4 flex flex-col md:flex-row gap-4">
    <div v-if="forumGroups" class="grow-[10] space-y-4">
      <div
        v-for="forumGroup in forumGroups"
        :key="forumGroup.id"
        class="card"
      >
        <div class="flex justify-between items-center">
          <div class="text-lg ms-4">{{ forumGroup.label }}</div>
          <el-dropdown>
            <el-button :icon="Setting" circle></el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="$router.push(`/forum-groups/${forumGroup.slug}/edit`)">
                  {{t('editForumGroup')}}
                </el-dropdown-item>
                <el-dropdown-item @click="$router.push(`/forum-groups/${forumGroup.slug}/new`)">
                  {{t('addForum')}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="mt-4 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
          <div v-for="forum in forumGroup.forums" :key="forum.title"
            class="card h-48 hover:scale-[1.02] group bg-cover bg-center relative duration-300"
            :style="{backgroundImage: `url(${persisted.fileAddr}/forum-covers/${forum.slug})`}"
            @click="$router.push(`/forums/${forum.slug}`)"
          >
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-30">
            </div>
            <div class="absolute bottom-5 inset-x-5 text-white">
              <h3 class="text-xl font-bold mb-2">{{forum.title}}</h3>
              <div class="flex items-center">
                <p class="line-clamp-2 truncate">{{forum.subTitle}}</p>
                <p class="ms-auto text-nowrap">{{forum.postCount}} 帖</p>
                <el-icon :size="20" class="transition-transform group-hover:translate-x-1">
                  <ArrowRightBold />
                </el-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-empty v-else :description="$t('bbs.home.empty')" />

    <div class="grow space-y-4">

      <div class="card h-64">
        <v-chart :option="postCountChartOption" autoresize />
      </div>

      <div class="card mt-4">
        <div class="flex justify-between items-center">
          <div>{{t('recommend')}}</div>
          <el-segmented v-model="recommendOption" :options="recommendOptions">
          </el-segmented>
        </div>
        <div class="mt-4">
          <div
            v-for="recommend in recommends"
            :key="recommend.id"
            class="even:bg-slate-50 hover:bg-slate-100 rounded-2xl p-2 duration-300"
          >
            <div>{{recommend.title}}</div>
            <div class="text-slate-600 text-sm flex">
              <div>{{recommend.user.name}}</div>
              <div class="ms-2">{{recommend.reviewCount}} {{t('review')}}</div>
              <div class="ms-auto">{{dayjs(recommend.updatedAt).format('MM月DD日 HH:mm')}}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
