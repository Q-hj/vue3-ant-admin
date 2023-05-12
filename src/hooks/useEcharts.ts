import {
  onBeforeUnmount,
  onActivated,
  onDeactivated,
  getCurrentInstance,
} from "vue";
import { useDebounceFn } from "@vueuse/core";
import { ECharts, EChartsCoreOption } from "echarts";

/**
 * @description 使用Echarts(只是为了添加图表响应式)
 * @param {Element} myChart Echarts实例(必传)
 * @param {Object} options 绘制Echarts的参数(必传)
 * @return void
 * */
export const useEcharts = (myChart: ECharts, options: EChartsCoreOption) => {
  if (options && typeof options === "object") {
    myChart.setOption(options);
  }
  const echartsResize = useDebounceFn(() => {
    myChart && myChart.resize();
  }, 50);

  window.addEventListener("resize", echartsResize);

  onBeforeUnmount(() => {
    window.removeEventListener("resize", echartsResize);
  });

  //   onActivated(() => {
  //     window.addEventListener("resize", echartsResize);
  //   });

  //   onDeactivated(() => {
  //     window.removeEventListener("resize", echartsResize);
  //   });
};
