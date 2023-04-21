<script setup>
import { ref } from 'vue'
import { getCancelApprovalList } from '@/api'
import { setStatusStyle } from '@/views/admin/vacation_manage/StatusStyle'
import router from '@/router'

const temp = ref(
  'border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold'
)

const cri = ref({
  pageNum: 1,
  keyword: '',
})
const currentPage = ref(1)
const pagination = ref({
  startPage: 1,
  endPage: 1,
  prev: false,
  next: false,
  total: 0,
})
const cancelList = ref({})
const getCancelApproval = () => {
  getCancelApprovalList(cri.value).then((res) => {
    console.log(res.data)
    cancelList.value = res.data.cancel
    pagination.value = res.data.paging
  })
}
getCancelApproval()
const getList = (page) => {
  cri.value.pageNum = page
  currentPage.value = page
  getCancelApproval()
}
const isOpenPosition = ref(false)

const optionsPosition = [
  { value: null, text: '전체' },
  { value: '자동승인', text: '자동승인' },
  { value: '승인', text: '승인' },
  { value: '관리자 대기중', text: '관리자대기중' },
  { value: '대기중', text: '대기중' },
  { value: '취소', text: '취소' },
]

const toggleDropdownPosition = () => {
  isOpenPosition.value = !isOpenPosition.value
}

const selectOptionPosition = (option) => {
  cri.value.keyword = option.value ? option.value : ''
  cri.value.pageNum = 1
  toggleDropdownPosition()
  getCancelApproval()
}

const onClickCancelDetail = (cancelId) => {
  router.push({
    name: '관리자휴가취소상세',
    params: { id: cancelId },
  })
}
</script>

<template>
  <BaseCard class="h-max">
    <div
      class="block w-full overflow-x-auto whitespace-nowrap borderless hover"
    >
      <div
        class="dataTable-wrapper dataTable-loading no-footer fixed-columns"
        style="height: 500px"
      >
        <div class="grid grid-cols-1 justify-items-end">
          <div
            class="m-4 gap-x-1 flex justify-between align-middle items-center w-1/2 lg:w-1/6 md:w-1/3 sm:w-1/3"
          >
            <div class="flex-2 relative inline-block w-full text-gray-700">
              <div class="relative">
                <div
                  class="bg-white rounded-md shadow-md w-full border border-gray-300 px-3 py-2 text-gray-700 font-medium h-full cursor-pointer select-none"
                  @click="toggleDropdownPosition"
                >
                  <div class="flex items-center justify-between">
                    <span v-if="cri.keyword" class="text-base">{{
                      cri.keyword
                    }}</span>
                    <span v-else class="text-gray-400 italic">결재 상태</span>
                    <svg
                      class="w-5 h-5 fill-current text-gray-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6 8l4 4 4-4"></path>
                    </svg>
                  </div>
                </div>
                <div
                  v-show="isOpenPosition"
                  class="absolute top-11 left-0 right-0 z-10 bg-white rounded-md shadow-md border border-gray-300 px-3 py-2 text-gray-700 font-medium cursor-pointer"
                >
                  <div class="flex flex-col space-y-2">
                    <option
                      v-for="(option, index) in optionsPosition"
                      :value="option.value"
                      :key="index"
                      :class="['py-2', 'hover:bg-gray-100', 'cursor-pointer']"
                      @click="selectOptionPosition(option)"
                    >
                      {{ option.text }}
                    </option>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="dataTable-container max-h- w-full overflow-x-auto whitespace-nowrap borderless hover"
        >
          <table class="table-3 dataTable-table max-w-full w-full">
            <thead>
              <tr>
                <th :class="temp">No</th>
                <th :class="temp">이름</th>
                <th :class="temp">부서</th>
                <th :class="temp">메일</th>
                <th :class="temp">요청일자</th>
                <th :class="temp">상태</th>
              </tr>
            </thead>
            <tbody v-if="cancelList.length === 0">
              <tr></tr>
            </tbody>
            <tbody v-else>
              <tr
                class="border-b border-gray-200 dark:border-dark hover:bg-gray-100 cursor-pointer dark:hover:bg-dark text-center"
                v-for="(cancel, idx) in cancelList"
                :key="idx"
                @click="onClickCancelDetail(cancel.cancelId)"
              >
                <td class="py-3">{{ cancel?.cancelId }}</td>
                <td class="py-3">{{ cancel?.vcReqDto?.empDto?.name }}</td>
                <td class="py-3">
                  {{ cancel?.vcReqDto?.empDto?.deptDto.deptName }}
                </td>
                <td class="py-3">{{ cancel?.vcReqDto?.empDto?.cEmail }}</td>
                <td class="py-3">{{ cancel?.cancelReqDate }}</td>
                <td class="px-3">
                  <base-btn
                    :class="setStatusStyle(cancel?.cancelStatus)"
                    class="py-1 w-full rounded-lg bg-primary dark:text-white text-white text-xs"
                  >
                    {{ cancel?.cancelStatus }}
                  </base-btn>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- pagination -->
        <div class="dataTable-bottom mt-6">
          <nav class="dataTable-pagination">
            <div class="px-4 py-3 flex items-center justify-between sm:px-6">
              <div class="flex-1 flex justify-between sm:hidden">
                <a
                  href="#"
                  @click="getList(currentPage - 1)"
                  :class="currentPage === 1 ? 'hidden' : null"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white dark:bg-dark dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark"
                >
                  Previous
                </a>
                <a
                  href="#"
                  @click="getList(currentPage + 1)"
                  :class="currentPage === 1 ? 'hidden' : null"
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
                      v-show="pagination.prev"
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
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1
                                   1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      href="#"
                      v-for="page in pagination.endPage"
                      :key="page"
                      :class="
                        currentPage === page
                          ? 'dark:border-foreground dark:hover:bg-foreground ' +
                            'z-10 bg-primary border-purple-500' +
                            ' text-white relative inline-flex items-center' +
                            ' px-4 py-2 border text-sm font-medium'
                          : 'dark:border-foreground dark:hover:bg-foreground ' +
                            'border-gray-300 text-gray-500 ' +
                            'hover:bg-gray-50 relative inline-flex items-center' +
                            ' px-4 py-2 border text-sm font-medium'
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
                      v-show="pagination.next"
                    >
                      <span class="sr-only">Next</span>
                      <svg
                        class="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0
                                  011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
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
</template>
