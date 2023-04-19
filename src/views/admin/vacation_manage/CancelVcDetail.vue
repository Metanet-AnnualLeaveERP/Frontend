<script setup>
import {ref} from 'vue'
import {useRoute} from 'vue-router'
import router from '@/router/index.js'
import store from '@/store'
import {getCancelApproval} from "@/api";
import BaseBtn from "@/components/Base/BaseBtn.vue";
import {setStatusStyle} from "@/views/admin/vacation_manage/StatusStyle";
import {approvalCancelSuccess} from "@/api/vacation-cancel";
import {successToast} from "@/sweetAlert";

const route = useRoute();
const role = store?.state?.role;
const cancelId = route.params.id;
const cancelReq = ref({});
const getCancelVC = () => {
  getCancelApproval(cancelId).then((res) => {
    console.log(res.data)
    cancelReq.value = res.data
  })
}
getCancelVC();
const openModal = ref(false);
const comments = ref('');
const warning = ref();

// 승인하기 눌렸을 때 동작
const cancelApprovalSuccess = () => {
  const vcStatus = role==='ROLE_ADMIN' ? '승인':'관리자 대기중'
  const data = {
    cancelId: cancelId,
    vcStatus: vcStatus,
  }

  approvalCancelSuccess(data).then((res)=>{
    successToast(res.data)
    getCancelVC()
  })

}
// 돌아가기
const onClickBackBtn = () => {
  router.go(-1)
}
const onChangeText = () => {
  warning.value = false;
}
</script>

<template>
  <!--  <div>-->
  <div>
    <BaseBtn class="
        border border-primary
        text-primary
        hover:bg-primary hover:text-white m-3"
             @click="onClickBackBtn"
    >돌아가기
    </BaseBtn>
    <BaseCard class="h-full">
      <div class="flex flex-col md:flex-row justify-evenly justify-items-center items-center">
        <div class="w-2/3 md:w-5/6 text-center  text-2xl md:text-3xl ">
          휴가 상세 내역
        </div>
        <div
            class="w-full justify-between mt-5 md:flex-col md:justify-end justify-items-center md:items-end
             items-center text-end md:w-2/6 justify-end flex flex-row">
          <div class="text-2xl">
            No. {{ cancelReq?.cancelId }}
          </div>
          <div class="text-1xl lg:text-1xl ">
            [요청일자] {{ cancelReq?.cancelReqDate }}
          </div>
          <div>
            <base-btn :class="setStatusStyle(cancelReq?.cancelStatus)"
                      class="my-3 text-white"
                      disabled
            >{{ cancelReq?.cancelStatus }}
            </base-btn>
          </div>
        </div>
      </div>
      <hr class="m-2">
      <div class="grid grid-cols-1 lg:grid-cols-2 font-black font gap-x-8">
        <div class="hover:bg-gray-100">
          <div class="flex flex-row  rounded-sm p-2 m-2 justify-between">휴가 신청 사원명
            <span>{{ cancelReq?.vcReqDto?.empDto?.name }}</span>
          </div>
          <hr class="m-2">
        </div>
        <div class="hover:bg-gray-100">
          <div class="flex flex-row  rounded-sm p-2 m-2 justify-between">
            휴가 종류
            <span>{{ cancelReq?.vcReqDto?.vcTypeDto?.typeName }}</span>
          </div>
          <hr class="m-2">
        </div>
        <div class="hover:bg-gray-100">
          <div class="flex flex-row  rounded-sm p-2 m-2 justify-between">
            사내메일
            <span>{{ cancelReq?.vcReqDto?.empDto?.pEmail }}</span>
          </div>
          <hr class="m-2">
        </div>
        <div class="hover:bg-gray-100">
          <div class="flex flex-row  rounded-sm p-2 m-2 justify-between">
            전화번호
            <span>{{ cancelReq?.vcReqDto?.empDto?.tel }}</span>
          </div>
          <hr class="m-2">
        </div>
        <div class="border-2 col-span-full rounded-2xl">
          <div class="text-gray-400 dark:text-white p-2">
          요청사유
          </div>
          <div class="flex flex-row  rounded-sm p-2 m-2 justify-between">
             {{ cancelReq.reqComm }}</div>
        </div>
      </div>

    </BaseCard>
    <!-- Button (Manager && Admin)  -->
    <div class="flex justify-end" v-if="(cancelReq?.cancelStatus==='대기중' && role === 'ROLE_MGR') ||
     (cancelReq?.cancelStatus==='관리자 대기중' && role === 'ROLE_ADMIN')">
      <BaseBtn class="
        border border-primary
        text-primary
        hover:bg-primary hover:text-white m-3"
               @click="cancelApprovalSuccess"
      >승인하기
      </BaseBtn>
      <BaseBtn class="
        border border-warning
        text-warning
        hover:bg-warning hover:text-white m-3"
               @click="openModal=true"
      >반려하기
      </BaseBtn>
    </div>

    <div
        v-show="openModal"
        class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50
       w-full">
      <div class="w-2/3 h-2/3 p-6 mx-4 bg-white rounded-md shadow-xl overflow-scroll">
        <div class="grid grid-cols-1 lg:grid-cols-2 justify-between align-middle items-center">
          <h3 class="text-3xl font-bold text-center lg:text-end ">반려 사유</h3>
          <h3 class="flex-col flex text-2xl font-bold text-end items-end">
            <div class="my-3 align-bottom ">
              No. {{ cancelReq?.cancelId }}
              <base-btn :class="setStatusStyle(cancelReq?.cancelStatus)"
                        class=" text-white"
                        disabled
              >{{ cancelReq.cancelStatus }}
              </base-btn>
            </div>
            <div
                class="w-full">
              <div class="text-1xl ">
                요청일자 {{ cancelReq.cancelReqDate }}
              </div>

            </div>
          </h3>

        </div>

        <hr class="m-2">
        <div class="grid grid-cols-1 lg:grid-cols-2 font-black font gap-x-8">
          <div class="hover:bg-gray-100">
            <div class="flex flex-row  rounded-sm p-2 m-2 justify-between">휴가 신청 사원명
              <span>
          {{ cancelReq?.vcReqDto?.empDto?.name }}
          </span>
            </div>
            <hr class="m-2">
          </div>
          <div class="hover:bg-gray-100">
            <div class="flex flex-row  rounded-sm p-2 m-2 justify-between">
              휴가 종류
              <span>
              {{ cancelReq?.vcTypeDto?.typeName }}
          </span>
            </div>
            <hr class="m-2">
          </div>
          <div class="hover:bg-gray-100">
            <div class="flex flex-row  rounded-sm p-2 m-2 justify-between">
              사내메일
              <span>
              {{ cancelReq?.VcReqDto?.empDto?.pEmail }}
          </span>
            </div>
            <hr class="m-2">
          </div>
          <div class="hover:bg-gray-100">
            <div class="flex flex-row  rounded-sm p-2 m-2 justify-between">
              전화번호
              <span>
              {{ cancelReq?.VcReqDto?.empDto?.tel }}
          </span>
            </div>
            <hr class="m-2">
          </div>
        </div>
        <form class="space-y-12">
          <div class="mt-4">
            <div class="mb-4">
            <textarea
                class="p-4 text-gray-900 border rounded-md h-full dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 w-full dark:focus:border-blue-500 h-32
                    overflow-hidden break-words break-inside-auto"
                placeholder="반려 사유를 입력해주세요."
                v-model="comments"
                @input="onChangeText"
                required/>
            </div>
            <BaseBtn
                @click="null"
                rounded
                class="border border-danger text-danger hover:bg-danger hover:text-white mr-3"
                type="button"
            >반려하기
            </BaseBtn>
            <BaseBtn
                @click="openModal = false"
                rounded
                class="border border-primary text-primary hover:bg-primary hover:text-white"
                type="button"
            >
              돌아가기
            </BaseBtn>
            <div v-if="warning" class="text-red-600">반려 사유를 입력해주세요.</div>
          </div>
        </form>
      </div>
    </div>

    <!--  Show Modal  -->
    <div
        v-show="openModal"
        class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50
       w-full">
      <div class="w-2/3 h-2/3 p-6 mx-4 bg-white rounded-md shadow-xl overflow-scroll">
        <div class="grid grid-cols-1 lg:grid-cols-2 justify-between align-middle items-center">
          <h3 class="text-3xl font-bold text-center lg:text-end ">반려 사유</h3>
          <h3 class="flex-col flex text-2xl font-bold text-end items-end">
            <div class="my-3 align-bottom ">
              No. {{ cancelReq?.cancelId }}
              <base-btn :class="setStatusStyle(cancelReq?.cancelStatus)"
                        class=" text-white"
                        disabled
              >{{ cancelReq?.cancelStatus }}
              </base-btn>
            </div>
            <div
                class="w-full">
              <div class="text-1xl ">
                요청일자 {{ cancelReq?.cancelReqDate }}
              </div>
            </div>
          </h3>

        </div>
        <hr class="m-2">
        <div class="grid grid-cols-1 lg:grid-cols-2 font-black font gap-x-8">
          <div class="hover:bg-gray-100">
            <div class="flex flex-row  rounded-sm p-2 m-2 justify-between">휴가 신청 사원명
              <span>{{ cancelReq?.vcReqDto?.empDto?.name }}</span>
            </div>
            <hr class="m-2">
          </div>
          <div class="hover:bg-gray-100">
            <div class="flex flex-row  rounded-sm p-2 m-2 justify-between">
              휴가 종류
              <span>{{ cancelReq?.vcReqDto?.vcTypeDto?.typeName }}</span>
            </div>
            <hr class="m-2">
          </div>
          <div class="hover:bg-gray-100">
            <div class="flex flex-row  rounded-sm p-2 m-2 justify-between">
              사내메일
              <span>{{ cancelReq?.vcReqDto?.empDto?.pEmail }}</span>
            </div>
            <hr class="m-2">
          </div>
          <div class="hover:bg-gray-100">
            <div class="flex flex-row  rounded-sm p-2 m-2 justify-between">
              전화번호
              <span>{{ cancelReq?.vcReqDto?.empDto?.tel }}</span>
            </div>
            <hr class="m-2">
          </div>
        </div>
        <form class="space-y-12">
          <div class="mt-4">
            <div class="mb-4">
            <textarea
                class="p-4 text-gray-900 border rounded-md h-full dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 w-full dark:focus:border-blue-500 h-32
                    overflow-hidden break-words break-inside-auto"
                placeholder="반려 사유를 입력해주세요."
                v-model="comments"
                @input="onChangeText"
                required/>
            </div>
            <BaseBtn
                @click="null"
                rounded
                class="border border-danger text-danger hover:bg-danger hover:text-white mr-3"
                type="button"
            >반려하기
            </BaseBtn>
            <BaseBtn
                @click="openModal = false"
                rounded
                class="border border-primary text-primary hover:bg-primary hover:text-white"
                type="button"
            >
              돌아가기
            </BaseBtn>
            <div v-if="warning" class="text-red-600">반려 사유를 입력해주세요.</div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>