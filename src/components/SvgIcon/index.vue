<template>
  <svg :style="iconStyle" aria-hidden="true">
    <use :xlink:href="symbolId" fill="currentColor" />
  </svg>
</template>

<script setup lang="ts" name="SvgIcon">
import { computed } from "vue";
import type { CSSProperties } from "vue";

export interface PropsType {
  name: string; // 图标的名称 ==> 必传
  prefix?: string; // 图标的前缀 ==> 非必传（默认为"icon"）
  iconStyle?: CSSProperties; // 图标的样式 ==> 非必传
}
// 接收父组件参数并设置默认值
const props = withDefaults(defineProps<PropsType>(), {
  prefix: "icon",
  iconStyle: () => ({ width: "50px", height: "50px" }),
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>
