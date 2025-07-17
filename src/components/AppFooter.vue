<script setup lang="ts">

const rowGroups: {
  title: Record<string, string>,
  links: [string, string][],
}[] = [
  {
    title: {
      zh: '友情链接',
    },
    links: [
      ['苦力怕论坛', 'https://klpbbs.com'],
      ['MineBBS', 'https://www.minebbs.com'],
      ['TATyRealms', 'https://www.tatysmp.love'],
    ],
  },
  {
    title: {
      zh: '百科',
    },
    links: [
      ['我的世界Wiki', 'https://zh.minecraft.wiki'],
      ['饥荒Wiki', 'https://dontstarve.huijiwiki.com'],
      ['泰拉瑞亚Wiki', 'https://terraria.wiki.gg/zh'],
      ['星露谷物语Wiki', 'https://zh.stardewvalleywiki.com'],
    ],
  },
  {
    title: {
      zh: '资源中心',
    },
    links: [
      ['CurseForge', 'https://www.curseforge.com/minecraft'],
      ['Modrinth', 'https://modrinth.com'],
      ['MCPEDL', 'https://mcpedl.com'],
      ['MCMOD', 'https://www.mcmod.cn'],
    ],
  },
  {
    title: {
      zh: '联系我们',
    },
    links: [
      [
        'QQ群: 514928673',
        'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=U6L_LJSXXAA4GKbdA3C4dsWYi3L0iAPE&authKey=yWN2Vp2lymU9xrjU%2B4ajk78JZsW2Zh4nwiTga0DvXf7B4ISNhn5isSmd0Qajj%2B1E&noverify=0&group_code=514928673',
      ],
      ['哔哩哔哩', 'https://b23.tv/yMqpypq'],
      ['GitHub', 'https://github.com/McaxDev'],
    ],
  },
]

const groups = rowGroups.map(({ title, links }) => ({ title, links: links.map(([title, url]) => ({ title, url })) }))
</script>

<template>
  <div class="max-w-4xl mx-auto py-4">
    <div class="flex justify-between flex-wrap gap-5">
      <div class="flex flex-col items-start gap-1 p-2" v-for="(group, index) in groups" :key="index">
        <div class="text-primary font-bold text-lg">{{ group.title[$i18n.locale] }}</div>
        <el-link v-for="link in group.links" :key="link.title" :href="link.url">
          {{ link.title }}
        </el-link>
      </div>
    </div>

    <div class="text-center">
      <el-link class="beian" href="https://beian.miit.gov.cn/" target="_blank">
        备案号: 豫ICP备2023025148号
      </el-link>
    </div>
  </div>
</template>
