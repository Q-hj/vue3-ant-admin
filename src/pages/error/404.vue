<script setup lang="ts">
import { useRouter } from "vue-router";
const { back } = useRouter();
</script>
<template>
  <div class="p-t-20% flex-center pb-10vh">
    <p class="text-24px">你访问的页面不存在！</p>
    <!-- <a-result status="404" subtitle="你访问的页面不存在！">
      <template #extra>
        <a-space>
          <a-button @click="back()" type="primary">返回</a-button>
        </a-space>
      </template>
    </a-result> -->
  </div>
</template>
