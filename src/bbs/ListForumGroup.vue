<script setup lang="ts">
import type {ForumGroup} from '@/utils/tables';
import {ref} from 'vue';
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
import RecommendedContent from './RecommendedContent.vue';
import {Setting} from '@element-plus/icons-vue';

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
    <div v-if="forumGroups" class="grow flex flex-col gap-4">
      <el-card
        header-class="flex justify-between items-center"
        v-for="forumGroup in forumGroups"
        :key="forumGroup.id"
        shadow="hover"
      >
        <template #header>
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
        </template>
        <div class="mt-2 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2">
          <el-card v-for="forum in forumGroup.forums" :key="forum.title"
            class="hover:translate-x-1 group"
            body-class="aspect-video bg-cover bg-center flex flex-col justify-end text-white relative"
            :body-style="{backgroundImage: `url(${persisted.fileAddr}/forum-covers/${forum.slug})`}"
            shadow="hover"
            @click="$router.push(`/forums/${forum.slug}`)"
          >
            <div class="z-10">
              <h3 class="text-xl font-bold mb-2">{{forum.title}}</h3>
              <div class="flex items-center">
                <p class="line-clamp-2 truncate">{{forum.subTitle}}</p>
                <p class="ms-auto text-nowrap">{{forum.postCount}} 帖</p>
                <el-icon :size="20" class="transition-transform group-hover:translate-x-1">
                  <ArrowRightBold />
                </el-icon>
              </div>
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-30" />
          </el-card>
        </div>
      </el-card>
    </div>
    <el-empty v-else :description="$t('bbs.home.empty')" />

    <div class="flex flex-col gap-4">

      <el-card class="h-64" shadow="hover" body-class="h-full">
        <v-chart :option="postCountChartOption" autoresize />
      </el-card>

      <recommended-content>
      </recommended-content>

    </div>
  </div>
</template>

<style>
.recommend-option {
  --el-border-radius-base: 16px;
}
</style>
