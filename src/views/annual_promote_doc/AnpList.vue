<script setup>
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { onMounted, ref } from 'vue'
import store from '@/store/index.js'
import {
  getListAnpDoc,
  getListDept,
  getListEmpByDeptId,
  getAnnualLeaveByEmpId,
  insertAnpDoc,
  selectEmpListByDeptIdAndExistsAnnualLeave,
} from '@/api/index.js'
import router from '@/router'
import { successToast, loadingAlert, failToast } from '@/sweetAlert'

// 연차촉진문서함
const importedAnpDocsList = ref({})
const pagination = ref({})
const currentPage = ref(1)
const importedEmpId = ref('')

onMounted(async () => {
  getList(1) // 촉진문서리스트
  // getListDpt() // 부서조회(추가 모달에서 사용)
})

// 검색용
const keywordName = ref('')
const keyword = ref('')
const getList = async (page) => {
  currentPage.value = page
  if (keywordName.value === '') {
    keywordName.value += '이름'
  }
  await getListAnpDoc(page, 10, keywordName.value)
    .then((res) => {
      console.log(res.data)
      importedAnpDocsList.value = res.data.anpDocs
      pagination.value = res.data.paging
    })
    .catch(() => {
      failToast('데이터 로딩에 실패했습니다.')
    })
  console.log('keywordName : ' + keywordName.value)
}

// 검색
const searchName = () => {
  console.log(keywordName.value)
  getList(currentPage.value)
}

const onClickItem = (docId) => {
  router.push({ name: '촉진요청서상세', params: { id: docId } })
}

//Modal
const isOpen = ref(false)

//부서 데이터 로딩
const getListDpt = async () => {
  await getListDept()
    .then((res) => {
      deptList.value = res.data
    })
    .catch(() => {
      failToast('부서 데이터 로딩에 실패했습니다.')
    })
}
// 부서리스트
const deptList = ref([])
const selectedDept = ref('')

// 사원리스트
const empList = ref([])
const selectedEmpId = ref('')
//부서 선택 시 부서Id로 부서사원 조회
const onChangeTypes = async (e) => {
  selectedDept.value = e.target.value
  console.log('부서번호 : ' + selectedDept.value) // 확인
  await selectEmpListByDeptIdAndExistsAnnualLeave(selectedDept.value)
    .then((res) => {
      console.log(res.data)
      empList.value = res.data
      anpData.value.empDto.empId = empList?.value[0]?.empId
    })
    .catch((e) => {
      console.log(e)
      failToast('사원 데이터 로딩에 실패했습니다.')
    })
}
// 사원 연차정보
const annualLeaveInfo = ref([])
//insertData
const anpData = ref({
  totalAnv: '',
  usedAnv: '',
  remainAnv: '',
  anvOccurDate: '',
  empDto: {
    empId: '',
  },
})
// 선택된 사원으로 촉진문서요청 넣기
const onChangeNames = async (e) => {
  selectedEmpId.value = e.target.value // 사원번호
  anpData.value.empDto.empId = selectedEmpId.value
  console.log('선택된 emp::' + selectedEmpId.value)
  const id = selectedEmpId.value
  await getAnnualLeaveByEmpId(id).then((res) => {
    console.log(res.data)
    annualLeaveInfo.value = res.data
    anpData.value.totalAnv = annualLeaveInfo.value.vcDays
    anpData.value.remainAnv = annualLeaveInfo.value.remainDays
    anpData.value.usedAnv = anpData.value.totalAnv - anpData.value.remainAnv
    anpData.value.anvOccurDate = annualLeaveInfo.value.grantedDate
  })
  console.log('현재 anpData 저장값:' + anpData.value.anvOccurDate)
}
//문서 생성
const onSubmit = async () => {
  console.log(anpData.value)
  loadingAlert()
  await insertAnpDoc(anpData.value).then(async (res) => {
    console.log(res)
    await successToast('촉진 요청서가 추가되었습니다')
    loadingAlert().close()
  })
}
</script>

<template>
  <div>
    <div class="container mx-auto text-center">
      <breadcrumbs
        parentTitle="문서관리"
        subParentTitle="연차촉진문서"
        style="font-weight: bold; font-size: 1.2em"
      />
      <div class="grid grid-cols-12 gap-5">
        <div class="col-span-12">
          <BaseCard>
            <div
              class="block w-full overflow-x-auto whitespace-nowrap borderless hover"
            >
              <div class="flex flex-row-reverse items-center align-middle">
                <div class="relative w-fit text-gray-600 search-bar mx-3">
                  <input
                    class="bg-purple-50 bg-gray-100 dark:bg-dark border-transparent h-10 px-5 pr-10 rounded-md text-sm focus:outline-none"
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
              </div>

              <div
                class="dataTable-wrapper dataTable-loading no-footer fixed-columns"
              >
                <div class="dataTable-top px-0 py-3">
                  <div class="dataTable-dropdown float-right mb-4">
                    <BaseBtn
                      rounded
                      class="border border-primary text-primary hover:bg-primary hover:text-white"
                      @click=";(isOpen = true), getListDpt()"
                      v-if="store.state.emp == false"
                    >
                      <strong>+촉진 문서 추가하기</strong>
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
                          class="border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                        >
                          문서번호
                        </th>
                        <th
                          class="border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                        >
                          수신대상
                        </th>
                        <th
                          class="border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                        >
                          발송일자
                        </th>
                        <th
                          class="border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                        >
                          연차만료일자
                        </th>
                        <th
                          class="border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                        >
                          계획서 작성 여부
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="border-b border-gray-200 dark:border-dark hover:bg-gray-100 cursor-pointer dark:hover:bg-dark"
                        v-for="(item, index) in importedAnpDocsList"
                        :key="index"
                        @click="onClickItem(item?.docId)"
                      >
                        <td class="py-3">{{ item?.docId }}</td>
                        <!--문서번호-->
                        <td class="py-3">{{ item?.empDto?.name }}</td>
                        <!-- 수신대상-->
                        <td class="py-3">{{ item?.occurDate }}</td>
                        <!--발송일자-->
                        <td class="py-3">{{ item?.anvOccurDate }}</td>
                        <!--연차만료일자-->
                        <td class="py-3">
                          {{ item?.plan === 0 ? '미작성' : '작성' }}
                        </td>
                        <!--계획서 작성 여부-->
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

    <!-- 문서생성 모달창 -->
    <div
      v-show="isOpen"
      class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
    >
      <div class="w-1/2 p-6 mx-4 bg-white rounded-md shadow-xl flex">
        <!-- <div class="w-2/3 mr-4"> -->
        <div class="w-full mr-4">
          <!--왼쪽 영역-->
          <div class="flex items-center justify-between">
            <h3 class="text-2xl font-bold">연차촉진문서 발송대상 선택</h3>
          </div>
          <form class="space-y-12" @submit.prevent="onSubmit">
            <div class="mt-4">
              <!-- 부서 선택 -->
              <div class="field">
                <label
                  for="types"
                  class="mb-2 text-lg font-bold text-gray-900 dark:text-white"
                  >부서 선택
                </label>
                <select
                  id="deptNames"
                  @change="onChangeTypes($event)"
                  class="mt-1 block w-full mb-4 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option disabled selected value="">--부서 선택--</option>
                  <option
                    v-for="(item, index) in deptList"
                    :key="index"
                    :value="item.deptId"
                  >
                    {{ item?.deptName }}
                  </option>
                </select>
              </div>

              <!-- 사원 선택 -->
              <div class="field">
                <label
                  for="types"
                  class="mb-2 text-lg font-bold text-gray-900 dark:text-white"
                  >사원 선택
                </label>
                <select
                  id="empNames"
                  @change="onChangeNames($event)"
                  class="mt-1 block w-full mb-4 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <template v-if="empList?.length > 0">
                    <option disabled selected value="">--직원 선택--</option>
                    <option
                      v-for="(item, index) in empList"
                      :key="index"
                      :value="item.empId"
                    >
                      {{ item?.name }}
                    </option>
                  </template>
                  <template v-else>
                    <option value="">사원이 없습니다</option>
                  </template>
                </select>
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
                send
              </BaseBtn>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- 문서생성 모달창 끝-->
  </div>
</template>
