<template>
  <div>
    <div class="container mx-auto text-center">
      <breadcrumbs parentTitle="사원 내역" subParentTitle="사원 관리" />
      <div class="grid grid-cols-12 gap-5">
        <div class="col-span-12">
          <BaseCard>
            <div class="flex flex-row-reverse items-center align-middle">
              <div class="relative w-fit text-gray-600 search-bar mx-3">
                <input
                  class="bg-purple-50 bg-gray-100 dark:bg-dark border-transparent h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
                  placeholder="이름검색"
                  v-model="keywordName"
                />
                <button
                  role="button"
                  class="absolute right-0 top-0 mt-2 mr-4 focus:outline-none"
                  @click="searchName"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
              <div class="m-4 gap-x-10 w-1/4">
                <div class="relative text-gray-700">
                  <select v-model="keywordActive" :class="['hidden']">
                    <option value="전체">전체</option>
                    <option value="재직자" selected>재직자</option>
                    <option value="퇴사자">퇴사자</option>
                    <!-- 추가적인 직책은 여기에 작성 -->
                  </select>
                  <div class="relative w-full grid grid-cols-1 right-0">
                    <div
                      class="bg-white w-full rounded-md shadow-md w-full border border-gray-300 px-3 py-2 text-gray-700 font-medium h-full cursor-pointer select-none"
                      @click="toggleDropdown"
                    >
                      <div class="flex items-center justify-between">
                        <span v-if="keywordActive" class="text-base">{{
                          keywordActive
                        }}</span>
                        <span v-else class="text-gray-400 italic">전체</span>
                        <svg
                          class="w-5 h-5 fill-current text-gray-400"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6 8l4 4 4-4"></path>
                        </svg>
                      </div>
                    </div>
                    <div
                      v-show="isOpen"
                      class="absolute top-11 left-0 right-0 z-10 bg-white rounded-md shadow-md border border-gray-300 px-3 py-2 text-gray-700 font-medium cursor-pointer"
                    >
                      <div class="flex flex-col space-y-2">
                        <option
                          v-for="(option, index) in options"
                          :value="option.value"
                          :key="index"
                          :class="[
                            'py-2',
                            'hover:bg-gray-100',
                            'cursor-pointer',
                          ]"
                          @click="selectOption(option)"
                        >
                          {{ option.text }}
                        </option>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="m-4 gap-x-10 flex justify-between align-middle items-center w-full"
              >
                <div class="flex-1 relative inline-block w-full text-gray-700">
                  <select v-model="keywordDept" :class="['hidden']">
                    <option value="전체" selected>부서 선택</option>
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
                  <div class="relative w-1/4 grid grid-cols-1 right-0">
                    <div
                      class="bg-white rounded-md shadow-md w-full border border-gray-300 px-3 py-2 text-gray-700 font-medium h-full cursor-pointer select-none"
                      @click="toggleDropdownDept"
                    >
                      <div class="flex items-center justify-between">
                        <span v-if="keywordDept" class="text-base">{{
                          keywordDept
                        }}</span>
                        <span v-else class="text-gray-400 italic"
                          >부서 선택</span
                        >
                        <svg
                          class="w-5 h-5 fill-current text-gray-400"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6 8l4 4 4-4"></path>
                        </svg>
                      </div>
                    </div>
                    <div
                      v-show="isOpenDept"
                      class="absolute top-11 left-0 right-0 z-10 bg-white rounded-md shadow-md border border-gray-300 px-3 py-2 text-gray-700 font-medium cursor-pointer"
                    >
                      <div class="flex flex-col space-y-2">
                        <option
                          v-for="(option, index) in optionsDept"
                          :value="option.value"
                          :key="index"
                          :class="[
                            'py-2',
                            'hover:bg-gray-100',
                            'cursor-pointer',
                          ]"
                          @click="selectOptionDept(option)"
                        >
                          {{ option.text }}
                        </option>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 justify-items-end mb-5">
              <BaseBtn
                class="bg-primary text-white hover:bg-blue-700"
                :md="true"
                @click="addMember"
                >직원등록</BaseBtn
              >
            </div>
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
                          사번
                        </th>
                        <th
                          class="border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                        >
                          직급
                        </th>
                        <th
                          class="border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                        >
                          이름
                        </th>
                        <th
                          class="border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                        >
                          부서
                        </th>
                        <th
                          class="border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                        >
                          연락처
                        </th>
                        <th
                          class="border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                        >
                          고용일자
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="border-b border-gray-200 dark:border-dark hover:bg-gray-100 cursor-pointer dark:hover:bg-dark"
                        v-for="(item, index) in empList"
                        :key="index"
                        @click="onClickView(item.empId)"
                      >
                        <td class="py-3">{{ item.userDto.empNum }}</td>
                        <td class="py-3">{{ item.position }}</td>
                        <td class="py-3">{{ item.name }}</td>
                        <td class="py-3">{{ item.deptDto.deptName }}</td>
                        <td class="py-3">{{ item.tel }}</td>
                        <td class="py-3">{{ item.hireDate }}</td>
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
                              v-if="currentPage != 1"
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
                              v-if="currentPage < pagination.endPage"
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

<script setup>
import { getEmpList } from '@/api'
import { onMounted, ref } from 'vue'
import router from '@/router/index.js'
import { failToast } from '@/sweetAlert'
import HeaderSearch from '@/components/HeaderSearch.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'

const empList = ref([])
const pagination = ref({})
const currentPage = ref(1)
const keywordActive = ref('')
const keywordName = ref('')
const keyword = ref('')
const keywordDept = ref('')
const isOpenDept = ref(false)
const optionsDept = [
  { value: '전체', text: '전체' },
  { value: '개발팀', text: '개발팀' },
  { value: '인사팀', text: '인사팀' },
  { value: '재무팀', text: '재무팀' },
  { value: '영업팀', text: '영업팀' },
  { value: '디지인팀', text: '디지인팀' },
  { value: '법무팀', text: '법무팀' },
  { value: 'IT팀', text: 'IT팀' },
  { value: '영상팀', text: '영상팀' },
  { value: '서비스팀', text: '서비스팀' },
  { value: '미래전략팀', text: '미래전략팀' },
]
const isOpen = ref(false)
const options = [
  { value: '전체', text: '전체' },
  { value: '재직자', text: '재직자' },
  { value: '퇴사자', text: '퇴사자' },
]

const toggleDropdown = () => {
  isOpenDept.value = false
  isOpen.value = !isOpen.value
}

const selectOption = (option) => {
  keywordActive.value = option.value
  toggleDropdown()
  getList(currentPage.value)
}

onMounted(() => {
  keywordActive.value = '재직자'
  keywordDept.value = '전체'
  getList(1)
})

const toggleDropdownDept = () => {
  isOpen.value = false
  isOpenDept.value = !isOpenDept.value
}

const selectOptionDept = (option) => {
  keywordDept.value = option.value
  toggleDropdownDept()
  getList(currentPage.value)
}

const searchName = () => {
  getList(currentPage.value)
}
const getList = async (page) => {
  // if (page > pagination.value.endPage || page < pagination.value.startPage) {
  //   return ;
  // }
  currentPage.value = page
  keyword.value = keywordDept.value + ','
  if (keywordName.value === '') {
    keyword.value += '이름,'
  } else {
    keyword.value += keywordName.value + ','
  }
  keyword.value += keywordActive.value
  await getEmpList(page, 10, keyword.value)
    .then((res) => {
      empList.value = res.data.empList
      pagination.value = res.data.paging
    })
    .catch(() => {
      failToast('데이터 로딩에 실패했습니다.')
    })
}

const onClickView = (empId) => {
  router.push({ name: '사원상세', params: { id: empId } })
}

const addMember = () => {
  router.push({ name: '직원등록' })
}
</script>

<style></style>
