<template>
  <div>
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-12">
        <BaseCard>
          <template v-slot:cardHeader>
            <div class="card-header">
              <div class="card-title py-3">
                <h1><strong>휴가부여관리</strong></h1>
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
                    @click="isOpen = true"
                  >
                    <strong>+임의 휴가 생성하기</strong>
                  </BaseBtn>
                </div>
              </div>
              <!-- <TabGroup>
                <TabList class="flex p-1 space-x-1 dark:bg-dark rounded-xl">
                  <Tab
                    v-for="category in Object.keys(categories)"
                    as="template"
                    :key="category"
                    v-slot="{ selected }"
                  >
                    <button
                      role="button"
                      :class="[
                        'px-3 py-1 text-sm leading-5  rounded-lg',
                        'focus:outline-none',
                        selected
                          ? 'bg-primary text-white shadow'
                          : 'text-gray-700 hover:bg-white/[0.12] hover:text-primary text-primary',
                      ]"
                    >
                      {{ category }}
                    </button>
                  </Tab>
                </TabList>

                <TabPanels class="mt-2">
                  <TabPanel
                    v-for="(posts, idx) in Object.values(categories)"
                    :key="idx"
                    :class="[]"
                  >
                    <ul>
                      <li
                        v-for="post in posts"
                        :key="post.id"
                        class="relative p-3 rounded-md hover:bg-coolGray-100"
                      >
                        <h3 class="text-md font-medium leading-5">
                          {{ post.title }}
                        </h3>
                        <ul class="flex mt-1 space-x-1">
                          {{
                            post.data
                          }}
                        </ul>
                      </li>
                    </ul>
                  </TabPanel>
                </TabPanels>
              </TabGroup> -->
              <div
                class="dataTable-container block w-full overflow-x-auto whitespace-nowrap borderless hover"
              >
                <table class="table-3 dataTable-table max-w-full w-full">
                  <thead>
                    <tr class="">
                      <th
                        class="text-left border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                      >
                        휴가생성번호
                      </th>
                      <th
                        class="text-left border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                      >
                        부서
                      </th>
                      <th
                        class="text-left border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                      >
                        이름
                      </th>
                      <th
                        class="text-left border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                      >
                        휴가유형
                      </th>
                      <th
                        class="text-left border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                      >
                        생성일자
                      </th>
                      <th
                        class="text-left border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                      >
                        부여휴가일수
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="hover:bg-gray-100 cursor-pointer dark:hover:bg-dark"
                      v-for="(item, index) in list"
                      :key="index"
                      @click="onClickItem(item.vcId)"
                    >
                      <td style="min-width: 100px" class="py-5 px-4">
                        {{ item.vcId }}
                      </td>
                      <td style="min-width: 100px" class="py-5 px-4">
                        {{ item.empDto.deptDto.deptName }}
                      </td>
                      <td style="min-width: 100px" class="py-5 px-4">
                        {{ item.empDto.name }}
                      </td>
                      <td style="min-width: 100px" class="py-5 px-4">
                        {{ item.vcTypeDto.typeName }}
                      </td>
                      <td style="min-width: 100px" class="py-5 px-4">
                        {{ item.grantedDate }}
                      </td>
                      <td style="min-width: 100px" class="py-5">
                        {{ item.vcDays }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- 페이징 -->
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
              <!-- 페이징 끝 -->
            </div>
          </div>
        </BaseCard>
      </div>
    </div>

    <!-- 휴가생성 모달창 -->
    <div
      v-show="isOpen"
      class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
    >
      <div class="w-1/2 p-6 mx-4 bg-white rounded-md shadow-xl flex">
        <!-- <div class="w-2/3 mr-4"> -->
        <div class="w-full mr-4">
          <!--왼쪽 영역-->
          <div class="flex items-center justify-between">
            <h3 class="text-2xl font-bold">임의 휴가 부여</h3>
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
                  <option
                    v-for="(item, index) in deptList"
                    :key="index"
                    :value="item.deptId"
                  >
                    {{ item.deptName }}
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
                  <template v-if="empList.length > 0">
                    <option
                      v-for="(item, index) in empList"
                      :key="index"
                      :value="item.empId"
                    >
                      {{ item.name }}
                    </option>
                  </template>
                  <template v-else>
                    <option value="">사원이 없습니다</option>
                  </template>
                </select>
              </div>

              <!-- 휴가유형 선택 -->
              <div class="field">
                <label
                  for="types"
                  class="mb-2 text-lg font-bold text-gray-900 dark:text-white"
                  >휴가유형 선택
                </label>
                <select
                  id="typeId"
                  class="mt-1 block w-full mb-4 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option
                    v-for="(item, index) in vcTypeList"
                    :key="index"
                    :value="item.typeId"
                  >
                    <!-- 연차빼고 선택-->
                    {{ item.typeName }}
                  </option>
                </select>
              </div>

              <div class="sm:col-span-4">
                <label
                  for="typename"
                  class="mb-2 text-lg font-bold text-gray-900 dark:text-white"
                  >휴가일수</label
                >
                <p class="mt-1 text-sm leading-6 text-gray-600">
                  휴가 일수를 선택해 주세요.
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
                      name="vcDays"
                      id="vcDays"
                      v-model="gvData.vcDays"
                      class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="mb-4">
                <label
                  for="date"
                  class="mb-2 text-lg font-bold text-gray-900 dark:text-white"
                  >만료일자 설정
                </label>
                <p class="mt-1 text-sm leading-6 text-gray-600">
                  기본값은 올해 마지막 날입니다.
                </p>
                <input
                  type="date"
                  id="expiredDate"
                  name="expiredDate"
                  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  v-model="gvData.expiredDate"
                  required
                />
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
        <!-- 오른쪽 영역 -->
        <!-- <div class="w-2/3 bg-gray-100 text-right">
          <label
            for="types"
            class="mb-2 text-4xl font-bold text-gray-900 dark:text-white"
            >부여내용
          </label>
          <div>뭔가 허전해서 채우면 좋겠다.</div>
          <div>뭔가 허전해서 채우면 좋겠다.</div>
        </div> -->
      </div>
    </div>
    <!-- 휴가생성 모달창 끝-->
  </div>
</template>

<script setup>
import {
  getListGrantedVc,
  insertGrantedVc,
  getListDept,
  getListEmpByDeptId,
  getVcTypeList,
} from '@/api/index.js'
import { onMounted, ref } from 'vue'
import { successToast, loadingAlert, failToast } from '@/sweetAlert'
import router from '@/router/index.js'

// for TapGroup
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'

let categories = ref({
  연차휴가: [
    {
      id: 1,
      title: '연차휴가',
    },
  ],
  기타휴가: [
    {
      id: 1,
      title: '기타휴가',
    },
  ],
})
// for TapGroup
const list = ref({})
const pagination = ref({})
const currentPage = ref(1)

// 부서리스트
const deptList = ref([])
const selectedDept = ref('')

// 사원리스트
const empList = ref([])
const selectedEmpId = ref('')

// 휴가리스트
const vcTypeList = ref([])

// insert Data
const gvData = ref({
  expiredDate: '',
  vcDays: '',
  vcTypeDto: {
    typeId: '',
  },
  empDto: {
    empId: '',
  },
})

//Modal
const isOpen = ref(false)

onMounted(() => {
  const endOfYear = new Date(Date.UTC(new Date().getUTCFullYear(), 11, 31))
  const formattedDate = endOfYear.toISOString().slice(0, 10)
  gvData.value.expiredDate = formattedDate
  getList(1), getListDpt(), getVcType()
})

//휴가리스트조회
const getList = async (page) => {
  if (page > pagination.value.endPage || page < pagination.value.startPage) {
    return
  }
  currentPage.value = page

  await getListGrantedVc(page, 10)
    .then((res) => {
      list.value = res.data.grantedVcs
      pagination.value = res.data.paging
    })
    .catch(() => {
      failToast('휴가 데이터 로딩에 실패했습니다.')
    })
}

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

//부서 선택 시 부서Id로 부서사원 조회
const onChangeTypes = async (e) => {
  selectedDept.value = e.target.value
  console.log('부서번호 : ' + selectedDept.value) // 확인
  await getListEmpByDeptId(selectedDept.value)
    .then((res) => {
      empList.value = res.data
      gvData.value.empDto.empId = empList.value[0].empId //초기값 지정
    })
    .catch(() => {
      failToast('사원 데이터 로딩에 실패했습니다.')
    })
}

// 선택된 사원 넣기.
const onChangeNames = async (e) => {
  selectedEmpId.value = e.target.value
  gvData.value.empDto.empId = selectedEmpId.value
  console.log('현재 gvData 저장값:' + gvData.value.empDto.empId)
}

// 휴가신청
const onSubmit = async () => {
  console.log(gvData.value)
  loadingAlert()
  await insertGrantedVc(gvData.value).then(async (res) => {
    console.log(res)
    await successToast('휴가 부여가 완료되었습니다.')
    loadingAlert().close()
  })
}

// 휴가유형 리스트 출력
const getVcType = async () => {
  await getVcTypeList().then((res) => {
    const filteredList = res.data.filter((item) => item.typeName !== '연차')
    vcTypeList.value = filteredList // 연차 제외한 항목만 선택리스트에 담음
    gvData.value.vcTypeDto.typeId = vcTypeList.value[0].typeId // 초기값
  })
}

// 상세페이지 이동
const onClickItem = (id) => {
  router.push({ name: '휴가부여상세', params: { id:id}
  })
}
</script>

