<script lang="ts" setup name="home">
import { ref, reactive, onMounted, nextTick } from "vue";
import ProForm from "@/components/ProFrom";
import ProTable from "@/components/ProTable";
import Chart from "@/components/Charts/Chart.vue";
import { queryFormMap } from "./config/form";
import {
  lineOption,
  barOption,
  lineOption1,
  barOption2,
} from "./config/charts";
import { get } from "@/api/http";
import { useRouter } from "vue-router";

const router = useRouter();
router.push("/cockpit_1");
</script>

<template>
  <div class="full flex-center">
    <img
      class="w-70%"
      src="https://admin.spicyboy.cn/assets/png/welcome-65a50eaa.png"
    />
  </div>
</template>

<style lang="less" scoped>
img {
  object-fit: contain;
}
</style>
