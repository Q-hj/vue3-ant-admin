<script lang="ts" setup name="login">
import { reactive, ref, watchEffect } from "vue";
import { notification } from "ant-design-vue";
import type { Route } from "@/router/interface";
import useStorage from "@/hooks/storage";
import { login, getMenu } from "@/api/modules/login";
import { useRouter } from "vue-router";
import { get, post } from "@/api/http";
import { getTimeState } from "@/utils/date";
import { useAuthStore } from "@/stores/";
const authStore = useAuthStore();

const title = import.meta.env.VITE_APP_TITLE;

// const getMenu = get("/local/menu", { id: 1 });

const router = useRouter();

const storage = useStorage("local");

const form = reactive(
  storage.get("loginForm") || {
    name: "",
    password: "",
    role: "",
    isSave: false,
  }
);
const formRef = ref<any>();
const loading = ref(false);

const onFinish = () => console.log(231);

const onSubmit = async () => {
  formRef.value
    ?.validate()
    .then((formValue: any) => {
      // console.log(formValue);
      login(form).then(() => {
        loading.value = true;
        authStore.setUserInfo(form);

        getMenu().then((list: Route[]) => {
          authStore.setMenu(list);
          router.push("/layout");
        });

        notification.success({
          message: getTimeState(),
          description: "欢迎登录" + title,
        });

        if (form.isSave) storage.set("loginForm", form);
      });
    })
    .catch(({ errorFields }: any) => {
      // console.warn(errorFields);
    });
};
</script>

<template>
  <div id="login" class="full-v flex-center bg">
    <div class="w-500px shadow-2xl bg-light-50 p-x-60px p-y-80px transition">
      <p class="text-center translate-y--20px text-28px font-bold text-#315ef9">
        {{ title }}
      </p>
      <!-- 登录 -->
      <a-form ref="formRef" @submit="onFinish" :model="form" layout="vertical">
        <a-form-item
          name="name"
          label="用户名"
          :rules="[
            {
              required: true,
              message: '该项为必填项',
              trigger: ['change', 'blur'],
            },
            {
              min: 3,
              message: '长度不能小于3',
              trigger: ['change', 'blur'],
            },
          ]"
        >
          <a-input v-model:value="form.name" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item
          name="password"
          label="密码"
          :rules="[
            {
              required: true,
              message: '该项为必填项',
              trigger: ['change', 'blur'],
            },
            // {
            //   // validator: validatePassCheck,
            //   pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
            //   message:
            //     '密码必须包含1个大写字母，1个小写字母和1个数字，且长度为8~16',
            //   trigger: ['change', 'blur'],
            // },
          ]"
        >
          <a-input-password
            v-model:value="form.password"
            placeholder="请输入密码"
            @keyup.enter="onSubmit"
          />
        </a-form-item>

        <!-- <a-form-item name="isSave">
          <a-checkbox v-model="form.isSave">记住我</a-checkbox>
        </a-form-item> -->

        <a-form-item>
          <a-button
            class="w-100% m-t-20px"
            @click="onSubmit()"
            type="primary"
            :loading="loading"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.bg {
  // background: linear-gradient(135deg, #ee7752, #fab2ff, #23a6d5, #23d5ab);
  // background-size: 200% 200%;
  // animation: gradientBG 8s ease infinite;
  background-color: #eff6ff;
  background-image: url("@/assets/images/login-bg.png");
  background-size: 100% 100%;
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 50% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
