<script setup lang="ts" name="Map">
import { ref, nextTick, onBeforeUnmount } from "vue";
import { ECharts, init, registerMap } from "echarts";
import { useDebounceFn } from "@vueuse/core";
import { get } from "@/api/http";
// import { useEcharts } from "@/hooks/useEcharts";

interface Props {
  height?: number;
  option: any;
}

const props = defineProps<Props>();

const chartHeight = props.height ? props.height + "px" : "300px";

let myChart: ECharts;

const echartRef = ref<HTMLElement>();

const baseUrl = "http://api.ppmark.cn/chart-assets/asset/get/s";

nextTick(() => initChart());

const initChart = () => {
  if (!myChart) myChart = init(echartRef.value!);

  get(baseUrl + "/data-1600245425326-WX1iJ9mRR.json").catch((geoJson) => {
    registerMap("hanzhou", geoJson);
    myChart.hideLoading();
    myChart.setOption(props.option);
    let index = -1;
    var timer = setInterval(function () {
      // 隐藏提示框
      myChart.dispatchAction({
        type: "hideTip",
        seriesIndex: 0,
        dataIndex: index,
      });
      // 显示提示框
      myChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: index + 1,
      });
      // 取消高亮指定的数据图形
      myChart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: index,
      });
      // 高亮指定的数据图形
      myChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: index + 1,
      });
      index++;
      if (index > 13) {
        index = -1;
      }
    }, 2000);
    myChart.on("mouseout", function (e) {
      clearInterval(timer);
      myChart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: e.dataIndex,
      }); //鼠标移出后先把上次的高亮取消
      timer = setInterval(function () {
        // 隐藏提示框
        myChart.dispatchAction({
          type: "hideTip",
          seriesIndex: 0,
          dataIndex: index,
        });
        // 显示提示框
        myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: index + 1,
        });
        // 取消高亮指定的数据图形
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: index,
        });
        // 高亮指定的数据图形
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: index + 1,
        });
        index++;
        if (index > 13) {
          index = -1;
        }
      }, 2000);
    });
  });
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
