<template>
  <div>
    <div class=" flex justify-center min-h-screen w-full h-full bg-gray-800 items-center">
      <BaseCard class="">
        <div class="p-5 bx-2">
          <div class="flex flex-col gap-y-10 ">
            <div class="flex text-3xl font-bold font-sans text-center justify-center grid-cols">
              <img
                  src="/MetaVC-logo.png"
                  alt=""
              />
              <!--                <span class="bg-primary text-white rounded-2xl p-3">-->

              <!--                  MetaVC-->
              <!--                </span>-->
            </div>
            <h3 class="text-3xl font-bold font-sans text-center">
              비밀번호 찾기
            </h3>
            <div class="flex flex-col gap-3">
              <form action="">
                <div class="mb-3">
                  <input
                      class="w-full px-4 py-1 focus:outline-none border rounded"
                      type="text"
                      placeholder="사번"
                      v-model="empNum"
                  />
                </div>
                <div class="mb-3">
                  <input
                      class="w-full px-4 py-1 focus:outline-none border rounded"
                      type="email"
                      placeholder="개인이메일"
                      v-model="email"
                  />
                </div>
                <div class="mb-3">

                </div>
              </form>
              <BaseBtn class="items-end text-white text-4xl  bg-primary text-white"
                       @click="checkEmailBtn">
                <div class="text-lg">
                  이메일 인증
                </div>
              </BaseBtn
              >
              <BaseBtn class="mb-2 text-white text-4xl  bg-primary text-white">
                <div class="text-lg">
                  비밀번호 발송
                </div>
              </BaseBtn>
            </div>
          </div>
          <!--            <div class="bg-primary text-center align-middle rounded-full">-->

          <!--            </div>-->
          <div class="text-center mt-12">문의처 : 인사팀(tel: 02-333-283)
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>
<script setup>
import BaseBtn from "@/components/Base/BaseBtn.vue";
import {ref} from "vue";
import {checkEmail} from "@/api";


const check = ref(false);
const email = ref();
const empNum =ref();
const checkEmailBtn = () => {
  checkEmail(email.value).then((res)=>{
    console.log(res.data)
  })
}

//
// const info = ref({
//       empNum: '',
//       email: ''
//     }
// )
</script>
