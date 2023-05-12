<script lang="ts" setup name="protable">
import { reactive, h } from "vue";
import { message, Modal } from "ant-design-vue";
import { get, post } from "@/api/http";

export interface Column {
  label: string;
  prop: string;
  width?: number;
  format?: (T: string | number) => string | number;
}

interface Operates {
  编辑?: (T: any) => void;
  详情?: (T: any) => void;
  删除?: string | ((T: any) => void);
}

export interface Props {
  columns: Column[];
  data: any[];
  operate: Operates;
  extraBtns?: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{ afterOperate: any }>();

const operateLabels = Object.keys(props.operate);

const delLoading: boolean = false;

const isFn = (val: unknown) => toString.call(val) === `[object Function]`;
const onDelete = () => {
  const delFnOrPath = props.operate["删除"];
  if (isFn(delFnOrPath)) {
    delFnOrPath();
    return;
  }
  // 可以传入删除接口名称 来完成删除逻辑
  post(delFnOrPath, {}, "删除", delLoading).then(() => {
    emit("afterOperate");
  });
};
const handleDelete = (row: any) => {
  Modal.warning({
    title: "提示",
    onOk: onDelete,
    centered: true,
    closable: true,
    content: () =>
      h("div", { class: "m-t-20px text-center" }, [
        h("span", { class: "tracking-1px" }, `确认删除${row.title}吗？`),
      ]),
  });
};

const rowClass = (_record: any, index: number) =>
  index % 2 ? "bg-gray-100" : null;

const pagination = {
  showTotal: (total: number, range: number) => `共 ${total} 条  `,
  showQuickJumper: true,
  showSizeChanger: true,
  defaultPageSize: 4,
  pageSizeOptions: [5, 10, 20, 50],
};
</script>

<template>
  <a-table
    class="w-full"
    :dataSource="props.data"
    :row-class-name="rowClass"
    :pagination="pagination"
    header-cell-class-name="bg-blue-500"
    :row-selection="{ type: 'checkbox', showCheckedAll: false }"
    :bordered="{ cell: false }"
    stripe
  >
    <a-table-column
      v-for="(item, i) in props.columns"
      :key="item.prop + i"
      :title="item.label"
      :data-index="item.prop"
      :width="item.width"
      ellipsis
      customHeaderCell
      align="center"
      tooltip
    >
      <template #default="{ record }">
        <!-- 格式化内容 -->
        <template v-if="item.prop == 'sex'">
          <span>{{ record["sex"] ? "男" : "女" }}</span>
        </template>
        <template v-else-if="item.prop == 'level'">
          <!-- <span>{{ record["sex"] ? "男" : "女" }}</span> -->
          <div class="flex-center w-full">
            <div
              v-for="(item, i) in ['#4BD173', '#D9D449', '#D6AF42', '#D95C48']"
              :key="item"
            >
              <span>25%</span>
              <div
                class="w-50px h-25px flex-center text-white"
                :style="{ background: item }"
              >
                {{ i + 1 }}
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="item.prop == 'img'">
          <!-- <img
            class="cursor-pointer transform transition transition-200 hover:scale-125"
            src="../../assets/images/server.jfif"
            width="100"
            alt=""
          /> -->
        </template>
        <template v-else>
          <span>{{
            item.format ? item.format(record[item.prop]) : record[item.prop]
          }}</span>
        </template>
      </template>
    </a-table-column>
    <a-table-column
      :width="20 + (operateLabels.length + (props.extraBtns ?? 0)) * 70"
      :title="'操作'"
      align="center"
    >
      <template #default="{ record }">
        <div class="flex-x-around">
          <slot :record="record"></slot>

          <ProButton
            text="编辑"
            icon="formOutlined"
            type="primary"
            v-if="operateLabels.includes('编辑')"
            @click="props.operate['编辑']!(record)"
          />

          <ProButton
            text="详情"
            icon="infoCircleOutlined"
            type="primary"
            v-if="operateLabels.includes('详情')"
            @click="props.operate['详情']!(record)"
          />

          <ProButton
            text="删除"
            icon="deleteOutlined"
            type="primary"
            danger
            v-if="operateLabels.includes('删除')"
            @click="handleDelete(record)"
          />
        </div>
      </template>
    </a-table-column>
  </a-table>
</template>

<style lang="less" scoped>
.ant-table {
  .ant-table-thead > tr > th {
    background: blue;
  }
}
</style>
