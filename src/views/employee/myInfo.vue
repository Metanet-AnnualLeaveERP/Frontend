<template>
  <div>
  <div class="flex flex-row justify-between my-10">
    <span class="text-4xl">사원정보 |</span>
    <span class="text-4xl mr-4">{{ detail.name }}님의 개인정보수정</span>
  </div>
    <hr class="my-10">
  <BaseCard>
    <div class="grid grid-cols-1 md:grid-cols-2 justify-items-center">
      <div class="w-full flex flex-col">
        <div class="m-4 gap-x-12   flex justify-start align-middle items-center">
          <span class="text-xl mr-4">사번</span>
          <input type="text" v-model="detail.userDto.empNum" :class="className.inputName" readonly disabled>
        </div>
        <div class="m-4 gap-x-12 flex justify-start align-middle items-center">
          <span class="text-xl mr-4">부서</span>
          <input type="text" v-model="detail.deptDto.deptName" :class="className.inputName" readonly disabled>
        </div>
        <div class="m-4 gap-x-12 flex justify-start align-middle items-center">
          <span class="text-xl mr-4">직책</span>
          <input type="text" v-model="detail.position" :class="className.inputName" readonly disabled>
        </div>
        <div class="m-4 flex gap-x-7 justify-between align-middle items-center">
          <span class="text-xl mr-4">입사일</span>
          <input type="text" v-model="detail.hireDate" :class="className.inputName" disabled>
        </div>
        <div class="flex flex-col">
          <div class="m-4 gap-x flex justify-between align-middle items-center">
            <span class=" text-xl mr-4">전화번호&nbsp;</span>
            <input type="text" v-model="detail.tel"
                   placeholder="010-xxxx-xxxx" @blur="checkPhoneNumber" :class="className.inputName" >
          </div>
          <div v-if="showMessageHp" class="text-red-500 text-end mr-4">{{ messageHp }}</div>
        </div>
      </div>
      <div class="w-full flex flex-col ">
        <div class="m-4 flex gap-x-12 justify-between align-middle items-center">
          <span class="text-xl mr-4">사내메일</span>
          <input type="text" v-model="detail.cEmail" :class="className.inputName" disabled>
        </div>
        <div class="flex flex-col">
          <div class="m-4 gap-x-12 flex justify-between align-middle items-center">
            <span class=" text-xl mr-4">개인메일</span>
            <input type="text" v-model="detail.pEmail"
                   placeholder="example@gmail.com" @blur="checkEmail" :class="className.inputName" >
          </div>
          <div v-if="showMessageEmail" class="text-red-500 text-end mr-4">{{ messageEmail }}</div>
        </div>
        <div class="flex flex-col">
          <div class="m-4 gap-x-12 flex justify-between align-middle items-center">
            <span class=" text-xl mr-4">비밀번호</span>
            <input type="password" v-model="detail.userDto.pwd"
                   placeholder="알파벳과 숫자를 포함한 10자리 이상을 입력하세요." @blur="checkPwd" :class="className.inputName" >
          </div>
          <div v-if="showMessagePwd" class="text-red-500 text-end mr-4">{{ messagePwd }}</div>
        </div>
        <div class="flex flex-col">
          <div class="m-4 gap-x-1 flex justify-between align-middle items-center">
            <span class=" text-xl mr-4">비밀번호 확인</span>
            <input type="password" v-model="pwdConfirm"
                    @keyup="checkPassword" :class="className.inputName" >
          </div>
          <div v-if="showMessagePwdCheck" class="text-red-500 text-end mr-4">{{ messagePwdCheck }}</div>
        </div>
      </div>
    </div>
  </BaseCard>
  <div class="flex mt-5 justify-end">
    <BaseBtn class="bg-primary text-white ml-5 hover:bg-blue-700" :md="true" @click="validate">수정하기</BaseBtn>
  </div>
</div>
</template>
<script setup>
import {onMounted, ref, watch} from "vue";
import router from '@/router/index.js'
import {modifyEmpInfo, getEmpInfo} from "@/api";
import BaseCard from "@/components/Base/BaseCard.vue";
import {failToast, returnInfoAlert} from '@/sweetAlert';
import store from "@/store";

const detail = ref({
  empId: "",
  name: "",
  hireDate: "",
  position: "",
  pEmail: "",
  cEmail: "",
  tel: "",
  deptDto: {
    deptName: "",
  },
  userDto: {
    empNum: "",
    pwd:""
  },
});

onMounted(async () => {
  await getEmpInfo(store.state.emp.empId).then((res) => {
    detail.value = res.data;
  });
});

const phoneNumberRegex = /^\d{3}-\d{3,4}-\d{4}$/;
const isValidPhoneNumber = ref(true);
const messageHp = ref('');
const showMessageHp = ref(false);

const checkPhoneNumber = () => {
  isValidPhoneNumber.value = phoneNumberRegex.test(detail.value.tel);
  showMessageHp.value = true;
  messageHp.value = isValidPhoneNumber.value ? '' : '유효한 번호가 아닙니다.';
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const isValidEmail = ref(true);
const messageEmail = ref('');
const showMessageEmail = ref(false);

const checkEmail = () => {
  isValidEmail.value = emailRegex.test(detail.value.pEmail);
  showMessageEmail.value = true;
  messageEmail.value = isValidEmail.value ? '' : '유효한 이메일이 아닙니다.';
}

const pwdRegex = /^(?=.*[a-zA-Z])(?=.*\d).{10,}$/;
const isValidPwd = ref(false);
const messagePwd = ref('');
const showMessagePwd = ref(false);
const checkPwd = () => {
  isValidPwd.value = pwdRegex.test(detail.value.userDto.pwd);
  showMessagePwd.value = true;
  messagePwd.value = isValidPwd.value ? '' : '유효한 비밀번호가 아닙니다.';
  checkPassword();
}

const pwdConfirm = ref('');
const isEqualPwd = ref(false);
const messagePwdCheck = ref('');
const showMessagePwdCheck = ref(false);
const checkPassword = () => {
    isEqualPwd.value = detail.value.userDto.pwd === pwdConfirm.value;
    showMessagePwdCheck.value = true;
    messagePwdCheck.value = isEqualPwd.value ? '' : '비밀번호가 일치하지 않습니다.';
}

const validate = () => {
  if (!isValidPhoneNumber.value) {
    failToast('전화번호를 확인하세요');
    return false;
  }
  if (!isValidEmail.value) {
    failToast('개인 메일을 확인하세요');
    return false;
  }
  if (!isValidPwd.value) {
    failToast('비밀번호를 확인하세요');
    return false;
  }
  if (!isEqualPwd.value) {
    failToast('비밀번호가 일치하지 않습니다.');
    return false;
  }
  modify();
}

const modify = async () => {
  await modifyEmpInfo({
    empDto : {
      empId : detail.value.empId,
      name : detail.value.name,
      hireDate : detail.value.hireDate,
      position : detail.value.position,
      pEmail : detail.value.pEmail,
      cEmail : detail.value.cEmail,
      tel : detail.value.tel,
      deptDto : {
        deptName: detail.value.deptDto.deptName
      }
    },
    userDto : {
      userId: store.state.userid,
      empNum : detail.value.userDto.empNum,
      pwd : detail.value.userDto.pwd
    }
  })
      .then((res) => {
        if (res.status === 200) {
          returnInfoAlert('정보 수정완료!');
          // router.push({path:"/schedule/main"})
          router.push({name:"일정관리"})
        }
      }).catch(() => {
        failToast('정보 변경에 실패하였습니다. 다시 시도해주세요.');
      })
}



const className = ref({
  inputName: "p-4 pl-10 text-sm text-gray-900 border border-gray-300\n" +
      "rounded-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500\n" +
      "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400\n" +
      "dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 flex-grow justify-start"
})

</script>
<style>

</style>