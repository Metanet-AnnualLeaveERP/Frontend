<template>
  <div class="grid grid-cols-12 gap-5 mb-5">
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
                >
                  <strong>+임의 휴가 생성하기</strong>
                </BaseBtn>
              </div>
            </div>
            <TabGroup>
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
                                    <ul
                                        class="flex mt-1 space-x-1"
                                    >
                                    {{ post.data }}
                                    </ul>
                                    <!-- <a
                                        href="#"
                                        :class="[
                                            'absolute inset-0 rounded-md',
                                            'focus:z-10 focus:outline-none focus:ring-2 ring-primary',
                                        ]"
                                    /> -->
                                </li>
                            </ul>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
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
                    <th
                      class="text-left border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold"
                    >
                      잔여휴가일수
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
              </div><!-- 페이징 -->
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { getListGrantedVc } from '@/api/index.js'
import { onMounted, ref } from 'vue'

// for TapGroup
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
let categories = ref({
    연차휴가: [
        {
            id: 1,
            title: '연차휴가',
            data: "연차휴가컴포넌트"
        },
    ],
    기타휴가: [
        {
            id: 1,
            title: '기타휴가',
            data: "기타휴가컴포넌트"
        },
    ],
})
// for TapGroup
const list = ref({})
const pagination = ref({})
const currentPage = ref(1)


onMounted(() => {
  getList()
})

const getList = async (page) => {
  if(page > pagination.value.endPage || page < pagination.value.startPage){
    return
  }
  currentPage.value = page

  await getListGrantedVc(page, 10)
    .then((res) => {
      console.log(res.data)
      list.value = res.data.grantedVcs
      pagination.value = res.data.paging
      console.log(pagination.value)
    })
    .catch(() => {
      failToast('데이터 로딩에 실패했습니다.')
    })
}
</script>

<style></style>
