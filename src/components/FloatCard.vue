<template>
    <div>
        <div class="float-card-out">
            <div v-if="hasHeaderSlot || hasTitle" class="float-card-header">
                <slot :title="title" name="header">
                    <div>{{ title }}</div>
                </slot>
            </div>
            <slot></slot>
        </div>
    </div>
</template>
  
<script setup>
import { useSlots, computed } from 'vue'

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
})

// console.log('FloatCard props:', props)

// 获取插槽
const slots = useSlots()

// 判断是否传入了 header 插槽
const hasHeaderSlot = computed(() => !!slots.header)

// 判断是否传入了 title
const hasTitle = computed(() => !!props.title)
</script>
  
<style scoped>
.float-card-out{
    padding: 8px 16px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 2px 4px 12px #00000014;
    transition: all .3s cubic-bezier(0,0,.5,1);
    &:hover{
        box-shadow: 2px 4px 16px #00000029;
        transform: scale3d(1.01, 1.01, 1.01);
    }
}

.float-card-header{
    font-weight: 600;
    font-size: 16px;
    padding: 6px 0px;
}
</style>