<script setup lang="ts" name="Line">
import { ref, nextTick, onBeforeUnmount } from "vue";
import { ECharts, init } from "echarts";
import { useDebounceFn } from "@vueuse/core";
// import { useEcharts } from "@/hooks/useEcharts";

interface Props {
  height?: number;
  option: any;
}

const props = defineProps<Props>();

const chartHeight = props.height ? props.height + "px" : "300px";

let myChart: ECharts;

const echartRef = ref<HTMLElement>();

nextTick(() => initChart());

const initChart = () => {
  if (!myChart) myChart = init(echartRef.value!);
  myChart.setOption(props.option);
};

const echartsResize = useDebounceFn(() => {
  myChart && myChart.resize();
}, 100);

window.addEventListener("resize", echartsResize);

onBeforeUnmount(() => {
  window.removeEventListener("resize", echartsResize);
});
defineExpose({
  initChart,
});
</script>

<template>
  <div class="echartDom" ref="echartRef"></div>
</template>

<style lang="less" scoped>
div {
  width: 100%;
  height: v-bind(chartHeight);
}
</style>
