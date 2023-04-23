<template>
  <div class="flex flex-col min-h-screen w-full bg-gray-800">
    <BaseCard class="grid m-auto align-middle justify-center w-1/3 center">
      <!--        <div class="p-5 bx-2">-->
      <div class="flex flex-col gap-y-10 ">
        <div class="flex text-3xl font-bold font-sans text-center justify-center grid-cols">
          <img src="/images/MetaVC-logo.png"
               class="fill-current text-primary mx-auto"
               width="150"
               height="150"
               viewBox="0 0 80 80"
               fill="none"
               alt=""/>
        </div>
        <h3 class="text-3xl font-bold font-sans text-center italic">
          비밀번호 찾기
        </h3>
        <div class="flex flex-col gap-3">
          <form action="">
            <div class="mb-3">
              <input
                  class="w-full px-4 py-1 focus:outline-none border rounded"
                  type="text"
                  placeholder="사번"
                  v-model="myInfo.empNum"
              />
            </div>
            <div class="mb-3">
              <input
                  class="w-full px-4 py-1 focus:outline-none border rounded"
                  type="email"
                  placeholder="개인이메일"
                  v-model="myInfo.email"
                  @focusout="checkEmail"
              />
              <div class="text-end text-red-500" v-show="!isValidEmail">유효한 이메일이 아닙니다.</div>
            </div>
            <div class="mb-3">

            </div>
          </form>
          <BaseBtn class="items-end text-white text-4xl  bg-primary text-white"
                   @click="sendEmailToPwd">
            <div class="text-lg">
              이메일 인증
            </div>
          </BaseBtn
          >
        </div>
      </div>
      <!--            <div class="bg-primary text-center align-middle rounded-full">-->

      <!--            </div>-->
      <div class="text-center mt-12">문의처 : 인사팀(tel: 02-333-283)
      </div>
      <!--        </div>-->
    </BaseCard>
  </div>
</template>
<script setup>
import BaseBtn from "@/components/Base/BaseBtn.vue";
import {ref} from "vue";
import {checkEmailAndPwd} from "@/api";
import {checkInfo, loadingAlert, warningAlert} from "@/sweetAlert";

const myInfo = ref({
  email: '',
  empNum: '',
});
const isValidEmail = ref(true);
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const checkEmail = () => {
  isValidEmail.value = emailRegex.test(myInfo.value.email);
}
const sendEmailToPwd = () => {
  if (isValidEmail.value && myInfo.value.email !== '' && myInfo.value.empNum !== '') {
    loadingAlert()
    checkEmailAndPwd(myInfo.value).then((res) => {
      const infoData = {
        icon: res.data === "사원번호와 이메일이 일치하지 않습니다." ? "warning" : "success",
        title: "비밀번호 찾기",
        text: res.data,
        cancelType: false,
        cancelText: null,
        confirmText: "확인",
        confirmColor: 'success'
      }
      loadingAlert().close()
      setTimeout(() => {
        checkInfo(infoData).then((a) => {
        })
      }, 300)

    })
  } else {
    if (!isValidEmail.value || myInfo.value.email === '') {
      if(myInfo.value.empNum ===''){
      warningAlert("사번과 이메일 형식이 맞지 않습니다.")
      }else{
      warningAlert("이메일 형식이 맞지 않습니다.")
      }
    } else {
      console.log(emailRegex.test(myInfo.value.email))
      warningAlert("사번을 입력해주세요.")

    }


  }
}
</script>
