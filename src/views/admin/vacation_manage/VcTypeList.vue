<template>
  <div class="grid grid-cols-12 gap-5 mb-5">
    <div class="col-span-12">
      <BaseCard>
        <template v-slot:cardHeader>
          <div class="card-header">
            <div class="card-title py-3"><h1><strong>휴가유형관리</strong></h1></div>
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
                    v-for="(n, index) in 8"
                    :key="index"
                  >
                    <td style="min-width: 100px" class="py-5 px-4">
                      # {{ n }}
                    </td>

                    <td style="min-width: 100px" class="">Jhon</td>
                    <td style="min-width: 100px" class="py-5">
                      <div class="flex">
                        <img
                          class="w-9 h-9 rounded-full mr-2"
                          src="/images/products/speaker-1.jpg"
                          alt=""
                        /><img
                          class="w-9 h-9 rounded-full mr-2"
                          src="/images/products/speaker-1.jpg"
                          alt=""
                        />
                      </div>
                    </td>
                    <td style="min-width: 100px" class="py-5">
                      <span
                        class="px-3 py-1 rounded-full text-success border border-success mr-3 text-xs"
                        >Delivered</span
                      >
                    </td>
                    <td style="min-width: 100px" class="py-5">3.34%</td>
                    <td style="min-width: 100px" class="py-5">12-02-20</td>
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
            <!-- <div class="dataTable-bottom">
                                <div class="dataTable-info">
                                    Showing 1 to 8 of 8 entries
                                </div>
                                <nav class="dataTable-pagination">
                                    <ul class="dataTable-pagination-list"></ul>
                                </nav>
                            </div> -->
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { getVcTypeList } from '@/api/index.js'
import { onMounted } from 'vue'

onMounted(()=>{
  getVcTypeList().then((res)=>{
    console.log(res.data)
    //const vcTypeList = res.data.vcTypeList
  })
})
</script>

<style></style>
