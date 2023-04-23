<template>
  <div class="my-10 text-4xl flex flex-row justify-between" >
    <BaseBtn class="bg-primary text-white hover:bg-blue-700" @click="router.go(-1)">이전으로</BaseBtn>
    <span class="text-xl mr-4  ">
      {{ detail.name }} 님의 정보
    </span>
  </div>
  <hr class="mb-5">
  <BaseCard>
    <div class="grid grid-cols-1 md:grid-cols-2 justify-items-center">
      <div class="w-full flex flex-col">
        <div class="m-4 gap-x-10 flex justify-start align-middle items-center">
          <span class="text-xl mr-4">사번&nbsp;</span>
          <input type="text" v-model="detail.userDto.empNum" :class="className.inputName" readonly disabled>
        </div>
        <div class="m-4 gap-x-1 flex justify-start align-middle items-center">
          <span class="text-xl mr-4">재직여부</span>
          <input type="text" v-model="employmentStatus" :class="className.inputName" readonly disabled>
        </div>
        <div class="m-4 gap-x-10 flex justify-between align-middle items-center" v-if="detail.userDto.enabled !== 0">
          <span class="text-xl mr-4">직책&nbsp;</span>
          <div class="flex-1 relative inline-block w-full text-gray-700" >
            <select v-model="detail.deptDto.deptName" :class="['hidden']">
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
        <div class="m-4 gap-x-10 flex justify-between align-middle items-center" v-if="detail.userDto.enabled !== 0">
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
        <div class="m-4 gap-x-1 flex justify-between align-middle items-center">
          <span class=" text-xl mr-4">전화번호&nbsp;</span>
          <input type="text" v-model="detail.tel" :class="className.inputName" disabled>
        </div>
        <div class="m-4 flex gap-x-2 justify-between align-middle items-center">
          <span class="text-xl mr-4">입사일&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <input type="text" v-model="detail.hireDate" :class="className.inputName" disabled>
        </div>
        <div class="m-4 flex gap-x-1 justify-between align-middle items-center">
          <span class="text-xl mr-4">사내메일&nbsp;</span>
          <input type="text" v-model="detail.pEmail" :class="className.inputName" disabled>
        </div>
        <div class="m-4 flex gap-x-1 justify-between align-middle items-center">
          <span class="text-xl mr-4">개인메일&nbsp;</span>
          <input type="text" v-model="detail.cEmail" :class="className.inputName" disabled>
        </div>
      </div>
    </div>
  </BaseCard>
  <div class="flex mt-5 justify-end"  v-if="detail.userDto.enabled !== 0">
    <BaseBtn class="bg-primary text-white hover:bg-blue-700" :md="true" @click="modifyInfo">수정하기</BaseBtn>
    <BaseBtn class="bg-primary text-white ml-5 hover:bg-blue-700" :md="true" @click="disableAccount">비활성화</BaseBtn>
  </div>

</template>
<script setup>
import {onMounted, ref, watch} from "vue";
import router from '@/router/index.js'
import {useRoute} from "vue-router";
import {getEmpInfo, modifyEmpInfoByAdmin, disableAccountByAdmin} from "@/api";
import BaseCard from "@/components/Base/BaseCard.vue";
import { failToast, returnInfoAlert } from '@/sweetAlert';
import BaseBtn from "@/components/Base/BaseBtn.vue";

const route = useRoute();
const empId = route.params.id;
const detail = ref({
  empId: empId,
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
    enabled: ""
  },
});

const employmentStatus = ref(detail.value.userDto.enabled === 1 ? '재직중' : '퇴사');

watch(() => detail.value.userDto.enabled, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    employmentStatus.value = newValue === 1 ? '재직중' : '퇴사';
  }
});
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

onMounted(async () => {

  await getEmpInfo(empId).then((res) => {
    detail.value = res.data;
  });

});
const modifyInfo = async () => {
  await modifyEmpInfoByAdmin({
    empId : detail.value.empId,
    position: detail.value.position,
    deptDto: detail.value.deptDto
  })
      .then((res) => {
        if (res.status === 200) {
          returnInfoAlert('정보 수정완료!');
          router.push({name:'사원관리'});
        }
      }).catch(() => {
        failToast('정보 변경에 실패하였습니다. 다시 시도해주세요.');
      })
}

const disableAccount = async () => {
  await disableAccountByAdmin({
    empDto : {
      empId: detail.value.empId,
      hireDate: detail.value.hireDate,
      position: detail.value.position,
      pEmail: detail.value.pEmail,
      cEmail: detail.value.cEmail,
      tel: detail.value.tel,
      deptDto : detail.value.deptDto
    },
    userDto : {
      empNum : detail.value.userDto.empNum
    }
  })
      .then((res) => {
        if (res.status === 200) {
          returnInfoAlert('비활성화 완료!');
          router.push({name:'사원관리'});
        }
      }).catch(() => {
        failToast('비활성화에 실패하였습니다. 다시 시도해주세요.');
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