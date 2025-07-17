<script setup lang="ts">
import {useRouteParams} from '@vueuse/router';


const type = useRouteParams('type')
const slug = useRouteParams('slug')
</script>

<template>
  {{type}} {{slug}}
</template>
