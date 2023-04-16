<script setup>
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { getVcReqListPaging } from '@/api/index.js'
import store from '@/store/index.js'
import { onMounted, ref } from 'vue'
import router from '@/router/index.js'

const list = ref({})
const pagination = ref({})
const currentPage = ref(1)
const reqPeriod = ref(null)

onMounted(() => {
  getList(1)
})

const getList = async (page) => {
  if (page > pagination.value.endPage || page < pagination.value.startPage) {
    return
  }
  currentPage.value = page

  await getVcReqListPaging(page, 10)
    .then((res) => {
      // console.log(res.data)
      list.value = res.data.vcReqs
      pagination.value = res.data.paging
      // console.log(pagination.value)
    })
    .catch(() => {
      failToast('데이터 로딩에 실패하였습니다.')
    })
}

const setStatusStyle = (s) => {
  let style = ''
  switch (s) {
    case '자동승인':
      style = 'bg-info'
      break
    case '반려':
      style = 'bg-danger'
      break
    case '승인':
      style = 'bg-success'
      break
    case '관리자 대기중':
    case '대기중':
      style = 'bg-warning'
      break
    case '취소':
      style = 'bg-light'
      break
    default:
      style = 'bg-primary'
      break
  }
  return style
}

const onClickItem = (id) => {
  console.log(id)
  router.push({ name: '휴가신청상세', params: { id: id } })
}
</script>

<template>
  <div class="container mx-auto text-center">
    <breadcrumbs parentTitle="휴가 신청 내역" subParentTitle="휴가 관리" />
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-12">
        <BaseCard>
          <div
            class="block w-full overflow-x-auto whitespace-nowrap borderless hover"
          >
            <div
              class="dataTable-wrapper dataTable-loading no-footer fixed-columns"
            >
              <div
                class="dataTable-container block w-full overflow-x-auto whitespace-nowrap borderless hover"
              >
                <table class="table-3 dataTable-table max-w-full w-full">
                  <thead>
                    <tr class="">
                      <th
                        class="border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                      >
                        휴가 종류
                      </th>
                      <th
                        class="border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                      >
                        휴가 기간
                      </th>
                      <th
                        class="border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                      >
                        휴가 일수
                      </th>
                      <th
                        class="border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                      >
                        승인 상태
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="border-b border-gray-200 dark:border-dark hover:bg-gray-100 cursor-pointer dark:hover:bg-dark"
                      v-for="(item, index) in list"
                      :key="index"
                      @click="onClickItem(item.reqId)"
                    >
                      <td class="py-3">{{ item.vcTypeDto.typeName }}</td>
                      <td class="py-3" v-if="item.reqDays != 1">
                        {{ item.startDate }} - {{ item.endDate }}
                      </td>
                      <td class="py-3" v-else>
                        {{ item.startDate }}
                      </td>
                      <td class="py-3">{{ item.reqDays }}</td>
                      <td class="py-3">
                        <span
                          class="px-3 py-1 rounded-lg bg-primary dark:text-white text-white text-xs"
                          :class="setStatusStyle(item.status)"
                          >{{ item.status }}</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- pagination -->
              <div class="dataTable-bottom mt-6">
                <nav class="dataTable-pagination">
                  <div
                    class="px-4 py-3 flex items-center justify-between sm:px-6"
                  >
                    <div class="flex-1 flex justify-between sm:hidden">
                      <a
                        href="#"
                        @click="getList(currentPage - 1)"
                        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white dark:bg-dark dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark"
                      >
                        Previous
                      </a>
                      <a
                        href="#"
                        @click="getList(currentPage + 1)"
                        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white dark:bg-dark dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark"
                      >
                        Next
                      </a>
                    </div>
                    <div
                      class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center"
                    >
                      <div>
                        <nav
                          class="relative dark:bg-dark z-0 inline-flex rounded-md shadow-sm -space-x-px"
                          aria-label="Pagination"
                        >
                          <a
                            href="#"
                            @click="getList(currentPage - 1)"
                            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:border-foreground dark:hover:bg-foreground"
                          >
                            <span class="sr-only">Previous</span>
                            <!-- Heroicon name: solid/chevron-left -->
                            <svg
                              class="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </a>
                          <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->

                          <a
                            href="#"
                            v-for="page in pagination.endPage"
                            :key="page"
                            :class="
                              currentPage == page
                                ? 'dark:border-foreground dark:hover:bg-foreground z-10 bg-primary border-purple-500 text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                                : 'dark:border-foreground dark:hover:bg-foreground border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                            "
                            aria-current="page"
                            @click="getList(page)"
                          >
                            {{ page }}
                          </a>

                          <a
                            href="#"
                            @click="getList(currentPage + 1)"
                            class="dark:border-foreground dark:hover:bg-foreground relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50"
                          >
                            <span class="sr-only">Next</span>
                            <!-- Heroicon name: solid/chevron-right -->
                            <svg
                              class="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </a>
                        </nav>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
