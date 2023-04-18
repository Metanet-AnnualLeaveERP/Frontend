<template>
  <div class="h-screen w-screen flex justify-center items-center">
    <div class="app-error">
      <div class="flex items-center mb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-32 w-32 mr-2 text-danger"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        <div class="text-center">
          <h1 class="text-8xl font-bold">404</h1>
          <p class="text-2xl font-bold">Page Not Found</p>
        </div>
      </div>
      <div class="flex justify-center">
        <BaseBtn
          @click="backBtn"
          class="mr-2 rounded bg-light py-1 text-primary font-bold flex justify-center px-3 items-center transition duration-300 ease-in-out hover:bg-primary hover:text-white"
          >돌아가기
        </BaseBtn>
        <BaseBtn
          class="rounded bg-red-200 py-1 text-red-500 font-bold flex justify-center px-3 items-center transition duration-300 ease-in-out hover:bg-danger hover:text-white"
          >Report the problem
        </BaseBtn>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router/index.js'
export default {
  setup() {
    const backBtn = () => {
      router.go(-1)
    }
    return {
      backBtn,
    }
  },
}
</script>
