<template>
  <div>
  <div style="margin: 2em 0;">
    <span class="text-xl mr-4">
      <h1>직원등록</h1>
    </span>
  </div>
  <BaseCard>
    <div class="grid grid-cols-1 md:grid-cols-2 justify-items-center">
      <div class="w-full flex flex-col">
        <div class="m-4 gap-x-10 flex justify-start align-middle items-center">
          <span class="text-xl mr-4">이름&nbsp;</span>
          <input type="text" v-model="detail.name" :class="className.inputName">
        </div>
        <div class="flex flex-col">
          <div class="m-4 gap-x flex justify-between align-middle items-center">
          <span class=" text-xl mr-4">전화번호&nbsp;</span>
          <input type="text" v-model="detail.tel"
                 placeholder="010-xxxx-xxxx" @blur="checkPhoneNumber" :class="className.inputName" >
          </div>
          <div v-if="showMessageHp" class="text-red-500 text-end mr-4">{{ messageHp }}</div>
        </div>
        <div class="m-4 gap-x-10 flex justify-between align-middle items-center">
          <span class="text-xl mr-4">직책&nbsp;</span>
          <div class="flex-1 relative inline-block w-full text-gray-700">
            <select v-model="detail.position" :class="['hidden']">
              <option value="" disabled selected>직책 선택</option>
              <option value="팀장">팀장</option>
              <option value="팀원">팀원</option>
              <!-- 추가적인 직책은 여기에 작성 -->
            </select>
            <div class="relative">
              <div
                  class="bg-white rounded-md shadow-md w-full border border-gray-300 px-3 py-2 text-gray-700 font-medium h-full cursor-pointer select-none"
                  @click="toggleDropdownPosition">
                <div class="flex items-center justify-between">
                  <span v-if="detail.position" class="text-base">{{ detail.position }}</span>
                  <span v-else class="text-gray-400 italic">직책 선택</span>
                  <svg class="w-5 h-5 fill-current text-gray-400" viewBox="0 0 20 20">
                    <path d="M6 8l4 4 4-4"></path>
                  </svg>
                </div>
              </div>
              <div v-show="isOpenPosition"
                   class="absolute top-11 left-0 right-0 z-10 bg-white rounded-md shadow-md border border-gray-300 px-3 py-2 text-gray-700 font-medium cursor-pointer">
                <div class="flex flex-col space-y-2">
                  <option v-for="(option, index) in optionsPosition" :value="option.value" :key="index"
                          :class="['py-2', 'hover:bg-gray-100', 'cursor-pointer']"
                          @click="selectOptionPosition(option)">
                    {{ option.text }}
                  </option>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="m-4 gap-x-10 flex justify-between align-middle items-center">
          <span class="text-xl mr-4">부서&nbsp;</span>
          <div class="flex-1 relative inline-block w-full text-gray-700">
            <select v-model="detail.deptDto.deptName" :class="['hidden']">
              <option value="" disabled selected>부서 선택</option>
              <option value="개발팀">개발팀</option>
              <option value="인사팀">인사팀</option>
              <option value="재무팀">재무팀</option>
              <option value="디자인팀">디자인팀</option>
              <option value="법무팀">법무팀</option>
              <option value="IT팀">IT팀</option>
              <option value="영상팀">영상팀</option>
              <option value="서비스팀">서비스팀</option>
              <option value="미래전략팀">미래전략팀</option>
              <!-- 추가적인 부서는 여기에 작성 -->
            </select>
            <div class="relative">
              <div
                  class="bg-white rounded-md shadow-md w-full border border-gray-300 px-3 py-2 text-gray-700 font-medium h-full cursor-pointer select-none"
                  @click="toggleDropdownDept">
                <div class="flex items-center justify-between">
                  <span v-if="detail.deptDto.deptName" class="text-base">{{ detail.deptDto.deptName }}</span>
                  <span v-else class="text-gray-400 italic">부서 선택</span>
                  <svg class="w-5 h-5 fill-current text-gray-400" viewBox="0 0 20 20">
                    <path d="M6 8l4 4 4-4"></path>
                  </svg>
                </div>
              </div>
              <div v-show="isOpenDept"
                   class="absolute top-11 left-0 right-0 z-10 bg-white rounded-md shadow-md border border-gray-300 px-3 py-2 text-gray-700 font-medium cursor-pointer">
                <div class="flex flex-col space-y-2">
                  <option v-for="(option, index) in optionsDept" :value="option.value" :key="index"
                          :class="['py-2', 'hover:bg-gray-100', 'cursor-pointer']" @click="selectOptionDept(option)">
                    {{ option.text }}
                  </option>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col ">
        <div class="m-4 flex gap-x-16 justify-between align-middle items-center">
          <span class="text-xl mr-4">입사일&nbsp;</span>
          <input type="date" v-model="detail.hireDate" :class="className.inputName">
        </div>
        <div class="flex flex-col">
          <div class="m-4 gap-x-7 flex justify-between align-middle items-center">
            <span class=" text-xl mr-4">개인이메일</span>
            <input type="text" v-model="detail.pEmail"
                   placeholder="example@gmail.com" @blur="checkEmail" :class="className.inputName" >
          </div>
          <div v-if="showMessageEmail" class="text-red-500 text-end mr-4">{{ messageEmail }}</div>
        </div>
        <div class="m-4 gap-x-12 flex justify-start align-middle items-center">
          <span class="text-xl mr-4">비밀번호</span>
          <input type="password" v-model="detail.userDto.pwd" @blur="checkPassword" :class="className.inputName">
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
    <BaseBtn class="bg-primary text-white hover:bg-blue-700" :md="true" @click="validate">등록하기</BaseBtn>
  </div>
  </div>
</template>
<script setup>
import {onMounted, ref, watch} from "vue";
import router from '@/router/index.js'
import {useRoute} from "vue-router";
import {registerEmp} from "@/api";
import BaseCard from "@/components/Base/BaseCard.vue";
import {failToast, loadingAlert, successToast} from '@/sweetAlert';
const route = useRoute();

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

const pwdConfirm = ref('');
const isEqualPwd = ref(false);
const messagePwdCheck = ref('');
const showMessagePwdCheck = ref(false);
const checkPassword = () => {
  isEqualPwd.value = detail.value.userDto.pwd === pwdConfirm.value;
  showMessagePwdCheck.value = true;
  messagePwdCheck.value = isEqualPwd.value ? '' : '비밀번호가 일치하지 않습니다.';
}

const isOpenDept = ref(false);
const optionsDept = [
  {value: "개발팀", text: "개발팀"},
  {value: "인사팀", text: "인사팀"},
  {value: "재무팀", text: "재무팀"},
  {value: "영업팀", text: "영업팀"},
  {value: "디자인팀", text: "디자인팀"},
  {value: "법무팀", text: "법무팀"},
  {value: "IT팀", text: "IT팀"},
  {value: "영상팀", text: "영상팀"},
  {value: "서비스팀", text: "서비스팀"},
  {value: "미래전략팀", text: "미래전략팀"},
];
const isOpenPosition = ref(false);
const optionsPosition = [
  {value: "팀장", text: "팀장"},
  {value: "팀원", text: "팀원"},
];

const toggleDropdownDept = () => {
  isOpenPosition.value = false;
  isOpenDept.value = !isOpenDept.value;
};

const selectOptionDept = (option) => {
  detail.value.deptDto.deptName = option.value;
  toggleDropdownDept();
};

const toggleDropdownPosition = () => {
  isOpenDept.value = false;
  isOpenPosition.value = !isOpenPosition.value;
};

const selectOptionPosition = (option) => {
  detail.value.position = option.value;
  toggleDropdownPosition();
};

const validate = () => {
  if (detail.value.name === '') {
    failToast('이름을 입력하세요.')
    return false;
  }
  if (!isValidPhoneNumber.value) {
    failToast('휴대폰 번호를 확인하세요');
    return false;
  }
  if (detail.value.position === '') {
    failToast('직책을 입력하세요.');
    return false;
  }
  if (detail.value.hireDate === '') {
    failToast('입사일을 입력하세요.');
    return false;
  }
  if (detail.value.pEmail === '') {
    failToast('개인이메일을 입력하세요.');
    return false;
  }
  if (detail.value.userDto.pwd === '') {
    failToast('비밀번호를 입력하세요.');
    return false;
  }
  if (!isEqualPwd.value) {
    failToast('비밀번호가 일치하지 않습니다.');
    return false;
  }
  addMember()
}

const addMember = async () => {
  loadingAlert()
  await registerEmp({
    empDto : {
      empId: detail.value.empId,
      name: detail.value.name,
      hireDate: detail.value.hireDate,
      position: detail.value.position,
      pEmail: detail.value.pEmail,
      cEmail: detail.value.cEmail,
      tel: detail.value.tel,
      deptDto : detail.value.deptDto
    },
    userDto : {
      empNum : detail.value.userDto.empNum,
      pwd : detail.value.userDto.pwd
    }
  }).then(async (res) => {
    if (res.status === 200) {
      await successToast('등록 완료');
      loadingAlert().close()
      router.push({name: '사원관리'});
    }
  }).catch(() => {
    failToast('직원등록에 실패하였습니다. 다시 시도해주세요.')
  })

}


const phoneNumberRegex = /^\d{3}-\d{3,4}-\d{4}$/;
const isValidPhoneNumber = ref(false);
const messageHp = ref('');
const showMessageHp = ref(false);

const checkPhoneNumber = () => {
  isValidPhoneNumber.value = phoneNumberRegex.test(detail.value.tel);
  showMessageHp.value = true;
  messageHp.value = isValidPhoneNumber.value ? '' : '유효한 번호가 아닙니다.';
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const isValidEmail = ref(false);
const messageEmail = ref('');
const showMessageEmail = ref(false);

const checkEmail = () => {
  isValidEmail.value = emailRegex.test(detail.value.pEmail);
  showMessageEmail.value = true;
  messageEmail.value = isValidEmail.value ? '' : '유효한 이메일이 아닙니다.';
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