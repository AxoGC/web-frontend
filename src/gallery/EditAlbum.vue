<script setup lang="ts">
import {api} from '@/utils/axios';
import type {Album} from '@/utils/tables';
import {useRouteParams} from '@vueuse/router';
import {reactive} from 'vue';
import {useI18n} from 'vue-i18n';

const slug = useRouteParams<string|undefined>('album')

const { t } = useI18n({ messages: {
  zh: {
    createAlbum: '创建相册',
    editAlbum: '编辑相册',
    userManage: '个人管理',
    guildManage: '公会管理',
  },
} })

const form = reactive({
  slug: '',
  label: '',
  profile: '',
  guild: false,
})

if (slug.value) {
  api.get<any, Album>(`/albums/${slug.value}`).then(({ slug, label, profile, guildId }) => {
    form.slug = slug
    form.label = label
    form.profile = profile
    form.guild = guildId ? true : false
  })
}
</script>

<template>
  <div class="max-w-5xl mx-auto p-4">
    <el-card
      shadow="hover"
      header-class="flex justify-between items-center"
    >

    <template #header>
      <el-page-header @back="$router.back">
        <template #content>
          {{slug ? `${t('editAlbum')}: ${slug}`: t('createAlbum')}}
        </template>
      </el-page-header>
    </template>

      <el-form>
        <el-form-item :label="t('slug')">
          <el-input class="w-48" v-model="form.slug"></el-input>
        </el-form-item>
        <el-form-item :label="t('label')">
          <el-input class="w-48" v-model="form.label"></el-input>
        </el-form-item>
        <el-form-item :label="t('profile')">
          <el-input type="textarea" v-model="form.profile"></el-input>
        </el-form-item>
        <el-form-item>
          <el-switch
            :inactive-text="t('userManage')"
            :active-text="t('guildManage')"
            v-model="form.guild"
          ></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">
            {{t('confirm')}}
          </el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>
