# Vue3 ant Admin

## ✨ 插件

- ant-design : 企业级 UI 组件库
- vue-router :官方路由
- pinia :新一代状态存储库
- axios :异步请求库
- ~~windicss :新颖的原子 css 库~~
- UnoCSS :具有高性能且极具灵活性的即时原子化 CSS 引擎。

## 🎨 开发插件

- typescript
- prettier
- eslint
- ~~husky~~

## 🏅 请求封装

```js
// 供调用函数
const bindObj = {
  method: "get",
  request: function (...args: [string, any?, string?, any?]) {
    // 请求实体函数
  return  handleRequest(this.method, ...args);
  },
};

export const get = bindObj.request.bind({ method: "get" });

// 使用
get(arg1，arg2，arg3)
```

详见 [src/api/http/index](./src/api/http/index.ts)。

---

## 🎊 超级表单

> 使用示例

- html:

```html
<ProForm
  ref="formRef"
  layout="vertical"
  :mapping="formMap"
  :model-value="modal.form"
  :defaultCol="24"
  @submit="handleSubmit()"
/>
<!-- 支持自定义插槽内容 -->
```

- ts:

```js
const handleSubmit = (done?: Function) => {
  if (formRef.value.verify()) return;
  Message.success("提交成功");
  done && done();
  return false;
};

// 配置项
const formMap: Mapping[] = [
  { label: "数据名称", type: "input", prop: "name" },
  {
    label: "数据格式",
    type: "select",
    prop: "format",
    options: ["矢量数据", "栅格数据", "原始/影像数据", "文档"],
  },
];
```

> 属性

- mapping：表单配置列表，以此来遍历生成表单项，其中：
  - label：标题
  - prop：该表单项所绑定的字段
  - type：该表单项要渲染的组件类型
  - options：多选/单选/下拉 选项
  - required：该表单项是否必填
  - rules：该表单项对应的校验规则
  - col：占据栅格的份数（总份数：24 | 默认份数：24）
  - width：宽度
- defaultCol：每个表单项栅格默认份数（优先级低于 mapping 中 col）

详情参考：组件实例地址 [src/components/ProFrom/ProFrom.vue](./src/components/ProFrom/ProFrom.vue)。

---

## 🎗️ 超级表格

- 使用示例

```html
<ProTable
  :data="table.data"
  :columns="columns"
  :scroll="scroll"
  :operate="{ 编辑: handleEdit, 删除: '/local/user' }"
  @update="handleQuery()"
>
</ProTable>
```

> 属性

data：后端返回的 list 数据

columns：配置表头与字段的对应关系

scroll：表格滚动范围

operate：操作栏按钮及对应的处理函数（当为删除等操作时，可直接传入接口地址，组件内会处理一系列 loading 和回调）

@update：表格内容需要更新时（修改、删除、切换分页等）所触发的函数

详情参考：组件实例地址 [src/components/ProTable/ProTable.vue](./src/components/ProTable/ProTable.vue)。

## 🏷️ 任务

- 权限校验

  - 按钮级别
