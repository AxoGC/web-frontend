<script setup lang="ts">
import {ChatLineRound, House, Menu, Picture, Setting, User} from '@element-plus/icons-vue';


const bbsMenuItems = ([
  ['/guild', 'guild.layout.guild.home', Menu],
  ['/guild/forum', 'guild.layout.guild.forum', ChatLineRound],
  ['/guild/members', 'guild.layout.guild.members', User],
  ['/guild/album', 'guild.layout.guild.album', Picture],
  ['/guild/ware', 'guild.layout.guild.ware', House],
  ['/guild/setting', 'guild.layout.guild.setting', Setting],
] as [string, string, object][]).map(([path, name, icon]) => ({path, name, icon}))
</script>

<template>
  <el-menu class="flex-col" router :default-active="$route.path">
    <el-menu-item v-for="item in bbsMenuItems" :key="item.name" :index="item.path">
      <el-icon>
        <component :is="item.icon" />
      </el-icon>
      {{ $t(item.name) }}
    </el-menu-item>
  </el-menu>
</template>
