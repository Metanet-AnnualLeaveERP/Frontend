<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router/index.js'
import { approvalProcess, getVcReqDetail } from '@/api'
import BaseBtn from '@/components/Base/BaseBtn.vue'
import { setStatusStyle } from '@/views/vacation_manage/StatusStyle'
import { checkConfirm, checkInfo, successToast } from '@/sweetAlert'
import store from '@/store'

const route = useRoute()
const reqId = route.params.id
const req = ref({})
const openModal = ref(false)
const comments = ref('')
const role = store.state.role

const getVcReq = () => {
  getVcReqDetail(reqId).then((res) => {
    console.log(res.data)
    res.data.reqDate = res.data.reqDate.replaceAll('-', '.').slice(2)
    req.value = res.data
  })
}

getVcReq()
const warning = ref()
const approvalCancel = () => {
  const size = comments.value.length
  const infoData = {
    icon: 'info',
    title: '휴가반려 처리',
    text: '정말로 휴가를 반려하시겠습니까?\n' + '반려시 되돌릴 수 없습니다.',
    cancelText: '돌아가기',
    confirmText: '반려하기',
  }
  if (size >= 10 && size <= 100) {
    checkInfo(infoData).then((check) => {
      if (check.isConfirmed) {
        approvalProcess(reqId, '반려', comments.value).then((res) => {
          console.log(res)
        })
      }
    })
  } else {
    warning.value = true
  }
}
const approvalSuccess = () => {
  checkConfirm('휴가요청 처리', '휴가 요청을 처리하시겠습니까?').then(
    (data) => {
      const vcState = role === 'ROLE_ADMIN' ? '승인' : '관리자 대기중'
      if (data.isConfirmed) {
        approvalProcess(reqId, vcState, '').then((res) => {
          successToast(res.data)
          getVcReq()
        })
      }
    }
  )
}
// 돌아가기
const onClickBackBtn = () => {
  router.go(-1)
}
const onChangeText = () => {
  warning.value = false
}
</script>

<template>
  <div>
    <div>
      <BaseBtn
        class="border border-primary text-primary hover:bg-primary hover:text-white m-3"
        @click="onClickBackBtn"
        >돌아가기
      </BaseBtn>
      <BaseCard class="h-full">
        <div
          class="flex flex-col md:flex-row justify-evenly justify-items-center items-center"
        >
          <div class="w-2/3 md:w-5/6 text-center text-2xl md:text-3xl">
            휴가 결재 내역
          </div>
          <div
            class="w-full justify-between mt-5 md:flex-col md:justify-end justify-items-center md:items-end items-center text-end md:w-2/6 justify-end flex flex-row"
          >
            <div class="text-2xl">No. {{ req?.reqId }}</div>
            <div class="text-1xl lg:text-1xl">
              [요청일자] {{ req?.reqDate }}
            </div>
            <div>
              <base-btn
                :class="setStatusStyle(req?.status)"
                class="my-3 text-white"
                disabled
              >
                {{ req?.status }}
              </base-btn>
            </div>
          </div>
        </div>
        <hr class="m-2" />
        <div class="grid grid-cols-1 lg:grid-cols-2 font-black font gap-x-8">
          <div class="hover:bg-gray-100">
            <div class="flex flex-row rounded-sm p-2 m-2 justify-between">
              휴가 신청 사원명
              <span>{{ req?.empDto?.name }}</span>
            </div>
            <hr class="m-2" />
          </div>
          <div class="hover:bg-gray-100">
            <div class="flex flex-row rounded-sm p-2 m-2 justify-between hr">
              신청일자
              <span>{{ req?.startDate }} ~ {{ req?.endDate }}</span>
            </div>
            <hr class="m-2" />
          </div>
          <div class="hover:bg-gray-100">
            <div class="flex flex-row rounded-sm p-2 m-2 justify-between">
              요청 일수
              <span>{{ req?.reqDays }} 일</span>
            </div>
            <hr class="m-2" />
          </div>
          <div class="hover:bg-gray-100">
            <div class="flex flex-row rounded-sm p-2 m-2 justify-between">
              휴가 종류
              <span>{{ req?.vcTypeDto?.typeName }}</span>
            </div>
            <hr class="m-2" />
          </div>
          <div class="hover:bg-gray-100">
            <div class="flex flex-row rounded-sm p-2 m-2 justify-between">
              사내메일
              <span>{{ req?.empDto?.pEmail }}</span>
            </div>
            <hr class="m-2" />
          </div>
          <div class="hover:bg-gray-100">
            <div class="flex flex-row rounded-sm p-2 m-2 justify-between">
              전화번호
              <span>{{ req?.empDto?.tel }}</span>
            </div>
            <hr class="m-2" />
          </div>
        </div>
      </BaseCard>
      <div
        class="flex justify-end"
        v-if="
          (req?.status === '대기중' && role === 'ROLE_MGR') ||
          (req?.status === '관리자 대기중' && role === 'ROLE_ADMIN')
        "
      >
        <BaseBtn
          class="border border-primary text-primary hover:bg-primary hover:text-white m-3"
          @click="approvalSuccess"
          >승인하기
        </BaseBtn>
        <BaseBtn
          class="border border-warning text-warning hover:bg-warning hover:text-white m-3"
          @click="openModal = true"
          >반려하기
        </BaseBtn>
      </div>
    </div>

    <div
      v-show="openModal"
      class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 w-full"
    >
      <div
        class="w-2/3 h-2/3 p-6 mx-4 bg-white rounded-md shadow-xl overflow-scroll"
      >
        <div
          class="grid grid-cols-1 lg:grid-cols-2 justify-between align-middle items-center"
        >
          <h3 class="text-3xl font-bold text-center lg:text-end">반려 사유</h3>
          <h3 class="flex-col flex text-2xl font-bold text-end items-end">
            <div class="my-3 align-bottom">
              No. {{ req?.reqId }}
              <base-btn
                :class="setStatusStyle(req?.status)"
                class="text-white"
                disabled
                >{{ req?.status }}
              </base-btn>
            </div>
            <div class="w-full">
              <div class="text-1xl">요청일자 {{ req.reqDate }}</div>
            </div>
          </h3>
        </div>

        <hr class="m-2" />
        <div class="grid grid-cols-1 lg:grid-cols-2 font-black font gap-x-8">
          <div class="hover:bg-gray-100">
            <div class="flex flex-row rounded-sm p-2 m-2 justify-between">
              휴가 신청 사원명
              <span>
                {{ req?.empDto?.name }}
              </span>
            </div>
            <hr class="m-2" />
          </div>
          <div class="hover:bg-gray-100">
            <div class="flex flex-row rounded-sm p-2 m-2 justify-between hr">
              신청일자
              <span> {{ req?.startDate }} ~ {{ req?.endDate }} </span>
            </div>
            <hr class="m-2" />
          </div>
          <div class="hover:bg-gray-100">
            <div class="flex flex-row rounded-sm p-2 m-2 justify-between">
              요청 일수
              <span> {{ req?.reqDays }} 일 </span>
            </div>
            <hr class="m-2" />
          </div>
          <div class="hover:bg-gray-100">
            <div class="flex flex-row rounded-sm p-2 m-2 justify-between">
              휴가 종류
              <span>
                {{ req?.vcTypeDto?.typeName }}
              </span>
            </div>
            <hr class="m-2" />
          </div>
          <div class="hover:bg-gray-100">
            <div class="flex flex-row rounded-sm p-2 m-2 justify-between">
              사내메일
              <span>
                {{ req?.empDto?.pEmail }}
              </span>
            </div>
            <hr class="m-2" />
          </div>
          <div class="hover:bg-gray-100">
            <div class="flex flex-row rounded-sm p-2 m-2 justify-between">
              전화번호
              <span>
                {{ req?.empDto?.tel }}
              </span>
            </div>
            <hr class="m-2" />
          </div>
        </div>
        <form class="space-y-12">
          <div class="mt-4">
            <div class="mb-4">
              <textarea
                class="p-4 text-gray-900 border rounded-md h-full dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 w-full dark:focus:border-blue-500 h-32 overflow-hidden break-words break-inside-auto"
                placeholder="반려 사유를 입력해주세요."
                v-model="comments"
                @input="onChangeText"
                required
              />
            </div>
            <BaseBtn
              @click="approvalCancel"
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
            <div v-if="warning" class="text-red-600">
              반려 사유를 입력해주세요.
            </div>
          </div>
        </form>
      </div>
    </div>
    <div
      v-show="openModal"
      class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 w-full"
    >
      <div
        class="w-2/3 h-2/3 p-6 mx-4 bg-white rounded-md shadow-xl overflow-scroll"
      >
        <div
          class="grid grid-cols-1 lg:grid-cols-2 justify-between align-middle items-center"
        >
          <h3 class="text-3xl font-bold text-center lg:text-end">반려 사유</h3>
          <h3 class="flex-col flex text-2xl font-bold text-end items-end">
            <div class="my-3 align-bottom">
              No. {{ req?.reqId }}
              <base-btn
                :class="setStatusStyle(req?.status)"
                class="text-white"
                disabled
                >{{ req?.status }}
              </base-btn>
            </div>
            <div class="w-full">
              <div class="text-1xl">요청일자 {{ req.reqDate }}</div>
            </div>
          </h3>
        </div>

        <hr class="m-2" />
        <div class="grid grid-cols-1 lg:grid-cols-2 font-black font gap-x-8">
          <div class="hover:bg-gray-100">
            <div class="flex flex-row rounded-sm p-2 m-2 justify-between">
              휴가 신청 사원명
              <span>
                {{ req?.empDto?.name }}
              </span>
            </div>
            <hr class="m-2" />
          </div>
          <div class="hover:bg-gray-100">
            <div class="flex flex-row rounded-sm p-2 m-2 justify-between hr">
              신청일자
              <span> {{ req?.startDate }} ~ {{ req?.endDate }} </span>
            </div>
            <hr class="m-2" />
          </div>
          <div class="hover:bg-gray-100">
            <div class="flex flex-row rounded-sm p-2 m-2 justify-between">
              요청 일수
              <span> {{ req?.reqDays }} 일 </span>
            </div>
            <hr class="m-2" />
          </div>
          <div class="hover:bg-gray-100">
            <div class="flex flex-row rounded-sm p-2 m-2 justify-between">
              휴가 종류
              <span>
                {{ req?.vcTypeDto?.typeName }}
              </span>
            </div>
            <hr class="m-2" />
          </div>
          <div class="hover:bg-gray-100">
            <div class="flex flex-row rounded-sm p-2 m-2 justify-between">
              사내메일
              <span>
                {{ req?.empDto?.pEmail }}
              </span>
            </div>
            <hr class="m-2" />
          </div>
          <div class="hover:bg-gray-100">
            <div class="flex flex-row rounded-sm p-2 m-2 justify-between">
              전화번호
              <span>
                {{ req?.empDto?.tel }}
              </span>
            </div>
            <hr class="m-2" />
          </div>
        </div>
        <form class="space-y-12">
          <div class="mt-4">
            <div class="mb-4">
              <textarea
                class="p-4 text-gray-900 border rounded-md h-full dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 w-full dark:focus:border-blue-500 h-32 overflow-hidden break-words break-inside-auto"
                placeholder="반려 사유를 입력해주세요."
                v-model="comments"
                @input="onChangeText"
                required
              />
            </div>
            <BaseBtn
              @click="approvalCancel"
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
            <div v-if="warning" class="text-red-600">
              반려 사유를 입력해주세요.
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
