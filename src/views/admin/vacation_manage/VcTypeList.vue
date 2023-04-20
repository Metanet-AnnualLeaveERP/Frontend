<template>
  <div>
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
                        <span v-if="item.updateDate">{{
                          item.updateDate
                        }}</span>
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
      class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
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
              <p class="mt-1 text-sm leading-6 text-gray-600">
                휴가 유형 이름을 입력해 주세요.
              </p>
              <div class="mt-2 mb-2">
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
                    required
                  />
                </div>
              </div>
            </div>
            <fieldset class="mb-2">
              <legend class="text-sm font-semibold leading-6 text-gray-900">
                유급여부
              </legend>
              <p class="mt-1 text-sm leading-6 text-gray-600">
                생성하려는 휴가의 유급여부를 선택해 주세요.
              </p>
              <div class="flex mt-2">
                <div class="flex w-1/2 items-center gap-x-3">
                  <input
                    id="pto"
                    name="pto"
                    type="radio"
                    value="0"
                    v-model="typeData.pto"
                    class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    checked
                  />
                  <label
                    for="pto"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >무급</label
                  >
                </div>
                <div class="flex w-1/2 items-center gap-x-3">
                  <input
                    id="push-email"
                    name="pto"
                    type="radio"
                    value="1"
                    v-model="typeData.pto"
                    class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    for="push-email"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >유급</label
                  >
                </div>
              </div>
            </fieldset>

            <fieldset class="flex">
              <legend
                class="relative flex gap-x-3 text-sm font-semibold leading-6 text-gray-900"
              >
                최대사용가능일수
              </legend>
              <div>
                <div class="mt-2 space-y-6">
                  <input
                    type="text"
                    name="region"
                    id="region"
                    autocomplete="address-level1"
                    class=" rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <span class="text-sm text-gray-400">*미입력 시 기본값은 365일입니다</span>
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
              type="submit"
            >
              Save
            </BaseBtn>
          </div>
        </form>
      </div>
    </div>
    <!-- 모달창 -->
  </div>
</template>

<script setup>
import { getVcTypeList, insertVcTypeList } from '@/api/index.js'
import { onMounted, ref } from 'vue'
import { successToast } from '@/sweetAlert'

const list = ref({})
const isOpen = ref(false)

const typeData = ref({
  typeName: '',
  pto: '',
  maxGrantedDays: '365',
  description: '',
})

// 휴가타입 출력
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

// 신청
const onSubmit = () => {
  console.log(typeData)
  insertVcTypeList(typeData.value).then((res) => {
    console.log(res)
    successToast('휴가유형 생성이 완료되었습니다.')
  }).catch(() => {
      failToast('오류가 발생했습니다.')
    })
}
</script>

<style>
</style>
