<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import ProFrom from "@/components/ProFrom";
import ProTable from "@/components/ProTable";
import { message, Modal } from "ant-design-vue";
import { queryFormMap } from "./config/form";
import { columns } from "./config/table";
import { getTableData1 } from "@/api/modules/table";

const queryForm = reactive({});
const querying = ref<boolean>(false);
const queryFormRef = ref<InstanceType<typeof ProFrom>>();

const listData = ref<any[]>([]);

onMounted(() => handleQuery());

const handleQuery = () => {
  queryFormRef.value
    ?.verify()
    .then(async (res: any) => {
      // console.log(queryForm);
      console.log(res);
      querying.value = true;
      listData.value = await getTableData1();
      // console.log(listData.value);
      querying.value = false;
    })
    .catch((err: any) => {});
};

const handleEdit = (record: any) => {};
const handleDelete = () => {
  message.success("删除成功！");
};
</script>

<template>
  <section class="page">
    <header class="">
      <ProFrom
        layout="inline"
        ref="queryFormRef"
        :mapping="queryFormMap"
        :model-value="queryForm"
        :defaultCol="6"
        @submit="handleQuery()"
      >
        <ProButton
          @click="queryFormRef?.reset()"
          text="重置"
          icon="redoOutlined"
          class="mr-15px"
        />
        <ProButton
          @click="handleQuery"
          type="primary"
          text="查询"
          :loading="querying"
          icon="SearchOutlined"
        />
      </ProFrom>
    </header>
    <main>
      <nav>
        <ProButton
          @click="handleQuery"
          type="primary"
          text="新增"
          icon="plusOutlined"
        />

        <ProButton @click="handleQuery" text="刷新" icon="redoOutlined" />
      </nav>

      <ProTable
        :data="listData"
        :columns="columns"
        :extraBtns="2"
        :operate="{
          编辑: handleEdit,
          详情: handleEdit,
          删除: handleDelete || '/local/user',
        }"
        @afterOperate="handleQuery()"
      >
      </ProTable>
    </main>
  </section>
</template>

<style lang="less" scoped></style>
