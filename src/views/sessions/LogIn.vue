<template>
  <div
      class="auth-layout-wrap flex justify-center min-h-screen flex-col bg-cover items-center bg-gray-800"
  >
    <div class="container-session-v1 w-full max-w-sm">
      <BaseCard>
        <div class="">
          <img
              class="fill-current text-primary mx-auto"
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              src="/landing-page/app.png"
          />
          <div class="text-center mb-3">
            <p class="text-primary font-semibold text-xl">Vacation ERP</p>
            <p class="text-gray-600 font-semibold">로그인을 해 주세요.</p>
          </div>
          <form action="">
            <div class="mb-3">
              <input
                  class="w-full px-4 py-1 focus:outline-none border rounded"
                  type="text"
                  placeholder="사번"
                  v-model="user.empNum"
              />
            </div>
            <div class="mb-3">
              <input
                  class="w-full px-4 py-1 focus:outline-none border rounded"
                  type="password"
                  placeholder="비밀번호"
                  v-model="user.pwd"
              />
            </div>
            <div class="mb-3">
              <label class="inline-flex items-center mt-3">
                <input
                    class="form-checkbox h-5 w-5 border border-gray-900 text-primary"
                    type="checkbox"
                    checked=""
                /><span class="ml-2 text-gray-700">로그인 유지</span>
              </label>
            </div>
            <div class="mb-4">
              <BaseBtn
                  block
                  class="bg-primary text-white"
                  @click="onClickLoginBtn"
              >로그인
              </BaseBtn
              >
            </div>
            <div class="flex justify-center">
              <a class="text-primary font-bold hover:text-primary-700" href="#"
              >비밀번호를 잊으셨나요?</a
              >
            </div>
          </form>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import router from '@/router/index.js'
import {ref} from 'vue';
import store from '@/store/index.js'
import { login } from '@/api/user.js';
const user = ref({
  empNum: '',
  pwd: ''
})
const onClickLoginBtn = () => {
  // 아래 주석 처리 해놓은 것처럼
  // 로그인 시 필요 정보 vuex state에 저장
  // 권한 별로 페이지 다르게 이동하도록 추가
  login(user.value).then((res) => {
    // 권한을 vuex state 에 저장
    store.commit('setRole', res.headers.role)
    store.commit('setEmpNum', res.headers.empNum)
    movePage(res.headers.role)
  })

  // router.push({
  //   name: '일정관리',
  // })
}

// 임시
const movePage = (role) => {
  switch (role) {
    case 'ROLE_ADMIN':
      router.push({name: '일정관리'})
      break
    case 'ROLE_MGR':
      router.push({name: '일정관리'})
      break
    case 'ROLE_EMP':
      router.push({name: '일정관리'})
      break
  }
}

</script>
