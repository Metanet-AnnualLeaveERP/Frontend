<script setup>
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { onMounted, ref } from 'vue'
import { getCertificateList } from '@/api/index.js'
import router from '@/router'
import { failToast } from '@/sweetAlert'

const list = ref({})
const pagination = ref({})
const currentPage = ref(1)
const certType = ref([])

onMounted(async () => {
  getList(1)
})

const getList = async (page) => {
  if (page > pagination.value.endPage || page < pagination.value.startPage) {
    return
  }
  currentPage.value = page

  await getCertificateList()
    .then((res) => {
      // console.log(res.data)
      list.value = res.data.certificates
      pagination.value = res.data.paging
      checkCertType() // 증명서 타입 검사
    })
    .catch(() => {
      failToast('데이터 로딩에 실패하였습니다.')
    })
}

const checkCertType = () => {
  list.value.forEach((element) => {
    if (element.cancelDto) {
      certType.value.push({ id: element.certId, type: '휴가 취소 확인서' })
    } else if (element.vcReqDto) {
      certType.value.push({ id: element.certId, type: '휴가 신청 확인서' })
    }
  })
}

const onClickItem = (id) => {
  router.push({ name: '증명서상세', params: { id: id } })
}
</script>

<template>
<div>
  <div class="container mx-auto text-center">
    <breadcrumbs
      parentTitle="증명서 발급 내역"
      subParentTitle="증명서 보관함"
    />
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
                        발급 번호
                      </th>
                      <th
                        class="border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                      >
                        발급 유형
                      </th>
                      <th
                        class="border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                      >
                        발급 목적
                      </th>
                      <th
                        class="border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                      >
                        발급 일자
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="border-b border-gray-200 dark:border-dark hover:bg-gray-100 cursor-pointer dark:hover:bg-dark"
                      v-for="(item, index) in list"
                      :key="index"
                      @click="onClickItem(item.certId)"
                    >
                      <td class="py-3">{{ item.certId }}</td>
                      <td class="py-3">{{ certType[index].type }}</td>
                      <td class="py-3">{{ item.purpose }}</td>
                      <td class="py-3">{{ item.issuedDate }}</td>
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
                                ? 'dark:border-foreground dark:hover:bg-foreground z-10 bg-primary border-blue-500 text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium'
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
</div>
</template>
