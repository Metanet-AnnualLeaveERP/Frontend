<template>
  <div class="grid grid-cols-12 gap-5 mb-5">
    <div class="col-span-12">
      <BaseCard>
        <template v-slot:cardHeader>
          <div class="card-header">
            <div class="card-title py-3">
              <h1><strong>휴가유형관리</strong></h1>
            </div>
          </div>
        </template>
        <div
          class="block w-full overflow-x-auto whitespace-nowrap borderless hover"
        >
          <div
            class="dataTable-wrapper dataTable-loading no-footer fixed-columns"
          >
            <div class="dataTable-top px-0 py-3">
              <div class="dataTable-dropdown float-right mb-4">
                <BaseBtn
                  type="button"
                  rounded
                  class="border border-primary text-primary hover:bg-primary hover:text-white"
                  @click="isOpen = true"
                >
                  <strong>+휴가 유형 추가하기</strong>
                </BaseBtn>
              </div>
            </div>
            <div
              class="dataTable-container block w-full overflow-x-auto whitespace-nowrap borderless hover"
            >
              <table class="table-3 dataTable-table max-w-full w-full">
                <thead>
                  <tr class="">
                    <th
                      class="text-left border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                    >
                      휴가유형
                    </th>
                    <th
                      class="text-left border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                    >
                      유급여부
                    </th>
                    <th
                      class="text-left border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                    >
                      최대사용가능일수
                    </th>
                    <th
                      class="text-left border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                    >
                      생성일자
                    </th>
                    <th
                      class="text-left border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                    >
                      수정일자
                    </th>
                    <th
                      class="text-left border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                    >
                      비고
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="hover:bg-gray-100 cursor-pointer dark:hover:bg-dark"
                    v-for="(item, index) in list"
                    :key="index"
                  >
                    <td style="min-width: 100px" class="py-5 px-4">
                      {{ item.typeName }}
                    </td>
                    <td style="min-width: 100px" class="py-5 px-4">
                      {{ item.pto === 1 ? '유급' : '무급' }}
                    </td>
                    <td style="min-width: 100px" class="py-5 px-4">
                      {{ item.maxGrantedDays }}
                    </td>
                    <td style="min-width: 100px" class="py-5 px-4">
                      {{ item.creationDate }}
                    </td>
                    <td style="min-width: 100px" class="py-5 px-4">
                      <span v-if="item.updateDate">{{ item.updateDate }}</span>
                      <span v-else>-</span>
                    </td>
                    <td style="min-width: 100px" class="py-5">
                      <span v-if="item.description">{{
                        item.description
                      }}</span>
                      <span v-else>-</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
  <!-- 모달창 -->

  <div
    v-show="isOpen"
    class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
  >
    <div class="max-w-2xl p-6 mx-4 bg-white rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl">휴가 유형 추가하기</h3>
      </div>
      <form class="space-y-12" @submit.prevent="onSubmit">
      <div class="mt-4">
        <div class="sm:col-span-4">
          <label
            for="typename"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >휴가이름</label
          >
          <p class="mt-1 text-sm leading-6 text-gray-600">휴가 유형 이름을 입력해 주세요.</p>
          <div class="mt-2">
            <div
              class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
            >
              <span
                class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"
              ></span>
              <input
                type="text"
                name="typeName"
                id="typeName"
                v-model="typeData.typeName"
                class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="ex)포상휴가"
              />
            </div>
          </div>
        </div>
        <fieldset>
          <legend class="text-sm font-semibold leading-6 text-gray-900">유급여부</legend>
          <p class="mt-1 text-sm leading-6 text-gray-600">생성하려는 휴가의 유급여부를 선택해 주세요.</p>
          <div class="mt-6 space-y-6">
            <div class="flex items-center gap-x-3">
              <input id="pto" name="pto" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" 
              />
              <label for="pto" class="block text-sm font-medium leading-6 text-gray-900">무급</label>
            </div>
            <div class="flex items-center gap-x-3">
              <input id="push-email" name="pto" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              <label for="push-email" class="block text-sm font-medium leading-6 text-gray-900">유급</label>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend class="relative flex gap-x-3 text-sm font-semibold leading-6 text-gray-900">최대사용가능일수</legend>
          <div class="sm:col-span-2">
            <div class="mt-2 space-y-6">
              <input type="text" name="region" id="region" autocomplete="address-level1" class="block w-1/6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div class="mt-6 space-y-6">
            <div class="relative flex gap-x-3">
              <div class="text-sm leading-6">
                <label for="no_limit_granted_days" class="font-medium text-gray-900">해당없음</label>
              </div>
              <div class="flex h-6 items-center">
                <input id="no_limit_granted_days" name="no_limit_granted_days" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              </div>
            </div>
          </div>
        </fieldset>

        <div class="col-span-full">
          <label
            for="about"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >메모</label
          >
          <div class="mt-2">
            <textarea
              id="description"
              name="description"
              rows="3"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              v-model="typeData.description"
            ></textarea>
          </div>
          <p class="mt-3 text-sm leading-6 text-gray-600"></p>
        </div>

        <BaseBtn
          @click="isOpen = false"
          rounded
          class="border border-danger text-danger hover:bg-danger hover:text-white"
          type="button"
        >
          Cancel
        </BaseBtn>
        <span>&nbsp;&nbsp;</span>
        <BaseBtn
          class="border border-success text-success hover:bg-success hover:text-white"
          type="button"
        >
          Save
        </BaseBtn>
      </div>
    </form>
    </div>
  </div>

  <!-- 모달창 -->
</template>

<script setup>
import { getVcTypeList, insertVcTypeList } from '@/api/index.js'
import { onMounted, ref } from 'vue'

const list = ref({})
const isOpen = ref(false)

const typeData = ref({
  typeName: '',
  pto: '1', // 일단 하드코딩
  maxGrantedDays: '1', // 일단 하드코딩
  description: '',
})


onMounted(() => {
  getList(1)
})

const getList = async () => {
  await getVcTypeList()
    .then((res) => {
      console.log(res.data)
      list.value = res.data
    })
    .catch(() => {
      failToast('데이터 로딩에 실패했습니다.')
    })
}

/* ==== 휴가신청 script ==== */
// 신청
const onSubmit = () => {
  insertVcTypeList(typeData.value).then((res) => {
    console.log(res)
  })
}

</script>

<style>
</style>
