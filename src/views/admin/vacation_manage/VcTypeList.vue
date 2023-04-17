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
                  rounded
                  class="border border-primary text-primary hover:bg-primary hover:text-white"
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
                    <th
                      class="text-left border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                    >
                      Action
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
                      <span v-if="item.description">{{ item.description }}</span>
                      <span v-else>-</span>
                    </td>
                    <td style="min-width: 100px" class="py-5">
                      <BaseBtn
                        rounded
                        class="border border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        View
                      </BaseBtn>
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
</template>

<script setup>
import { getVcTypeList } from '@/api/index.js'
import { onMounted, ref } from 'vue'

const list = ref({})

onMounted(() => {
  getList()
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
</script>

<style></style>
