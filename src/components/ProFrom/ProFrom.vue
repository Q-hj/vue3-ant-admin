<script lang="ts" setup name="proForm">
import { message, Modal } from "ant-design-vue";
import { ref, reactive, computed } from "vue";

export interface Mapping {
  label: string;
  prop: string;

  type: keyof typeof FormItemMap;

  options?: Option[] | string[];
  required?: boolean;
  rules?: any;

  col?: number;
  width?: string;
}

export interface Option {
  label: string;
  value: any;
}

export interface Props {
  modelValue: any;
  mapping: Mapping[];
  defaultCol?: number;
  disabled?: boolean;
}

// 组件渲染映射表
enum FormItemMap {
  "input" = "a-input",
  "select" = "a-select",
  "radio" = "a-radio-group",
  "checkbox" = "a-checkbox-group",
  "date" = "a-date-picker",
  "date-range" = "a-range-picker",
}

const props = defineProps<Props>();
// console.log(props);

// 非一次性渲染（数据会更新）的prop不通过解构来使用，例如 modelValue，使用 props.modelValue
const { mapping, defaultCol } = props;

const emit = defineEmits<{ "update:modelValue": any; submit: [] }>();

// 动态修改表单项大小占比
const screenWidth = document.body.clientWidth;
const dynamicCol = (col: number | undefined) => {
  if (!col) return 24; // 表单项span默认值24
  else return (col * (1920 / screenWidth)).toFixed();
};

const formRef = ref();

const verify = async () => {
  return new Promise<void>((resolve, reject) => {
    formRef.value
      ?.validate()
      .then((formValue: any) => {
        resolve(formValue);
      })
      .catch(({ errorFields }: any) => {
        reject(errorFields);
      });
  });
};
const reset = async () => {
  await formRef.value?.resetFields();
};

defineExpose({ verify, reset });

defineSlots<{
  default?: () => any;
  // item?: (props: { id: number }) => any;
}>();
</script>

<template>
  <a-form
    ref="formRef"
    class="pro-form"
    :model="props.modelValue"
    auto-label-width
    :disabled="props.disabled"
  >
    <a-row :gutter="[30, 15]" class="w-full">
      <a-col
        :span="dynamicCol(item.col || defaultCol)"
        v-for="(item, index) in mapping"
        :key="'pro_form_item_' + index"
      >
        <a-form-item
          :name="item.prop"
          :label="item.label"
          :rules="
            item.rules || [
              { required: item.required, message: item.label + '不能为空' },
            ]
          "
        >
          <!-- 表单项修改时触发搜索 -->
          <!--  @change="emit('submit')" -->

          <!-- 日期选择 -->
          <template v-if="item.type === 'date-range'">
            <a-range-picker
              @change="emit('submit')"
              v-model="props.modelValue[item.prop]"
              :placeholder="['请选择开始时间', '请选择结束时间']"
              style="width: 360px"
              show-time
              :time-picker-props="{ defaultValue: ['00:00:00', '00:00:00'] }"
              format="YYYY-MM-DD HH:mm:ss"
            />
          </template>

          <component
            v-else
            :is="FormItemMap[item.type]"
            v-model:value="props.modelValue[item.prop]"
            :placeholder="`请${
              ['input'].includes(item.type) ? '输入' : '选择'
            }${item.label}`"
            :bind="{}"
            :style="{ width: item.width || '100%' }"
          >
            <!-- 下拉选择项 -->
            <template v-if="item.type === 'select'">
              <a-select-option
                :value="option.value ?? option"
                v-for="(option, i) in item.options"
                :key="i"
              >
                {{ option.label ?? option }}
              </a-select-option>
            </template>

            <!-- 单选项 -->
            <template v-if="item.type === 'radio'">
              <a-radio
                :value="option.value ?? option"
                v-for="(option, i) in item.options"
                :key="i"
              >
                {{ option.label ?? option }}
              </a-radio>
            </template>

            <!-- 复选框 -->
            <template v-if="item.type === 'checkbox'">
              <a-checkbox
                :value="option.value ?? option"
                v-for="(option, i) in item.options"
                :key="i"
              >
                {{ option.label ?? option }}
              </a-checkbox>
            </template>
          </component>

          <!-- 常规表单项 -->
        </a-form-item>
      </a-col>
      <a-col class="flex-1 flex-x-end">
        <a-form-item>
          <slot></slot>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<style lang="less" scoped></style>
