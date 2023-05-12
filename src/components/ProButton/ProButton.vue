<script lang="ts" setup name="ProButton">
//  支持通过属性来添加图标
export interface Props {
  icon?: string;
  text?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <a-button>
    <template #icon v-if="props.icon">
      <component :is="props.icon" />
    </template>
    <span v-if="props.text">{{ props.text }}</span>
    <slot />
  </a-button>
</template>

<style lang="less" scoped></style>
