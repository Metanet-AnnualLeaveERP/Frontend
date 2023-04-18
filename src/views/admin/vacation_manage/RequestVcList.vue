<script setup>
import {Tab, TabGroup, TabList, TabPanel, TabPanels} from '@headlessui/vue'
import {onMounted, ref} from "vue";
import {getTeamApprovalList} from "@/api";
import BaseBtn from "@/components/Base/BaseBtn.vue";
import router from "@/router";
import {setStatusStyle} from "@/views/admin/vacation_manage/StatusStyle";
const temp = ref("border-b dark:border-dark dark:text-gray-300 pb-3 mb-3 text-gray-500 font-semibold");
const check = ref(true);
const cri = ref({
  pageNum: 1,
  keyword: '',
});
const currentPage = ref(1);
const pagination = ref({
  startPage: 1,
  endPage: 1,
  prev: false,
  next: false,
  total: 0,
})
const vcReqList = ref([])

const getTeamApproval=()=>{
  getTeamApprovalList(cri.value).then((res) => {
    console.log(res.data)
    pagination.value = res.data.paging;
    res.data.vcReqs.map((e) => {
      e.reqDate = e.reqDate.slice(2);
      e.startDate = e.startDate.replaceAll('-', '.');
      e.endDate = e.endDate.replaceAll('-', '.');
    })
    vcReqList.value = res.data.vcReqs;
  });
}
getTeamApproval();
const getList = (page) => {
  cri.value.pageNum = page;
  currentPage.value=page;
  getTeamApproval();
}
const onClickVcReq = (reqId) => {
  // console.log(id)
  router.push({name: '관리자결재상세', params: {id: reqId}})
}
const isOpenPosition = ref(false);

const optionsPosition = [
  {value: null, text: '전체'},
  {value: "자동승인", text: "자동승인"},
  {value: "승인", text: "승인"},
  {value: "관리자대기중", text: "관리자대기"},
  {value: "대기중", text: "대기중"},
  {value: "취소", text: "취소"},
];

const toggleDropdownPosition = () => {
  isOpenPosition.value = !isOpenPosition.value;
};

const selectOptionPosition = (option) => {

  cri.value.keyword = option.value ?option.value  : '';
  cri.value.pageNum=1;
  getTeamApproval();
  toggleDropdownPosition();
};

</script>

<template>
  <div>
  <TabGroup>
    <TabList class="bg-primary rounded-lg pl-3 py-1">
      <Tab class="mr-12 bg-transparent hover:text-black text-white text-2xl"
           :class=" check ? 'bg-purple-200 rounded-sm' : null" @click="check = true">
        휴가 내역
      </Tab>
      <Tab class="mr-12  bg-transparent  hover:text-black text-white text-2xl"
           :class="check ? null : 'bg-purple-200 rounded-sm'" @click="check = false">결재내역
      </Tab>
    </TabList>
    <TabPanels class="mt-4">
      <TabPanel>
        <BaseCard class="h-max">
          <div
              class="block w-full overflow-x-auto whitespace-nowrap borderless hover">
            <div
                class="dataTable-wrapper dataTable-loading no-footer fixed-columns"
            style="height: 500px">
              <div class="grid grid-cols-1 justify-items-end">
                <div
                    class="m-4 gap-x-1 flex justify-between align-middle items-center w-1/2 lg:w-1/6 md:w-1/3 sm:w-1/3">
                  <div class="flex-2 relative inline-block w-full text-gray-700">
                    <div class="relative">
                      <div
                          class="bg-white rounded-md shadow-md w-full border border-gray-300
                             px-3 py-2 text-gray-700 font-medium h-full cursor-pointer select-none"
                          @click="toggleDropdownPosition">
                        <div class="flex items-center justify-between">
                          <span v-if="cri.keyword" class="text-base">{{ cri.keyword }}</span>
                          <span v-else class="text-gray-400 italic">결재 상태</span>
                          <svg class="w-5 h-5 fill-current text-gray-400" viewBox="0 0 20 20">
                            <path d="M6 8l4 4 4-4"></path>
                          </svg>
                        </div>
                      </div>
                      <div v-show="isOpenPosition"
                           class="absolute top-11 left-0 right-0 z-10 bg-white rounded-md shadow-md
                              border border-gray-300 px-3 py-2 text-gray-700 font-medium cursor-pointer">
                        <div class="flex flex-col space-y-2">
                          <option v-for="(option, index) in optionsPosition" :value="option.value" :key="index"
                                  :class="['py-2', 'hover:bg-gray-100', 'cursor-pointer']"
                                  @click="selectOptionPosition(option)">
                            {{ option.text }}
                          </option>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                  class="dataTable-container max-h- w-full overflow-x-auto whitespace-nowrap borderless hover">

                <table class="table-3 dataTable-table max-w-full w-full">

                  <thead>
                  <tr>
                    <th :class="temp">No</th>
                    <th :class="temp">사번</th>
                    <th :class="temp">이름</th>
                    <th :class="temp">사내 메일</th>
                    <th :class="temp">신청기간</th>
                    <th :class="temp">신청휴가일수</th>
                    <th :class="temp">요청일자</th>
                    <th :class="temp">결재상태</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr class="border-b border-gray-200 dark:border-dark
                             hover:bg-gray-100 cursor-pointer dark:hover:bg-dark text-center"
                      v-for="(vcReq,idx) in vcReqList" :key="idx"
                      @click="onClickVcReq(vcReq.reqId)">
                    <td class="py-3">{{ vcReq.reqId }}</td>
                    <td class="py-3">{{ vcReq.empDto.name }}</td>
                    <td class="py-3">{{ vcReq?.empDto?.userDto?.empNum }}</td>
                    <td class="py-3">{{ vcReq?.empDto?.pEmail }}</td>
                    <td class="py-3">{{ vcReq?.startDate }}~ {{ vcReq?.endDate }}</td>
                    <td class="py-3">{{ vcReq?.reqDays }}</td>
                    <td class="py-3">{{ vcReq?.reqDate }}</td>
                    <td class="px-3 ">
                      <base-btn :class="setStatusStyle(vcReq?.status)"
                                class="py-1 w-full rounded-lg bg-primary  dark:text-white text-white text-xs">
                        {{ vcReq?.status }}
                      </base-btn>
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
                          class="relative inline-flex items-center px-4 py-2 border
                          border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white
                           dark:bg-dark dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark"
                      >
                        Previous
                      </a>
                      <a
                          href="#"
                          @click="getList(currentPage + 1)"
                          class="ml-3 relative inline-flex items-center px-4 py-2
                          border border-gray-300 text-sm font-medium rounded-md text-gray-700
                           bg-white dark:bg-dark dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark"
                      >
                        Next
                      </a>
                    </div>
                    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
                      <div>
                        <nav class="relative dark:bg-dark z-0 inline-flex rounded-md shadow-sm -space-x-px"
                             aria-label="Pagination">
                          <a href="#"
                             @click="getList(currentPage - 1)"
                             v-show="pagination.prev"
                             class="relative inline-flex
                             items-center px-2 py-2 rounded-l-md border
                              border-gray-300 text-sm font-medium text-gray-500
                               hover:bg-gray-50 dark:border-foreground dark:hover:bg-foreground"
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
                              :class="currentPage == page
                                              ? 'dark:border-foreground dark:hover:bg-foreground ' +
                                               'z-10 bg-primary border-purple-500' +
                                               ' text-white relative inline-flex items-center' +
                                                ' px-4 py-2 border text-sm font-medium'
                                              : 'dark:border-foreground dark:hover:bg-foreground ' +
                                               'border-gray-300 text-gray-500 ' +
                                               'hover:bg-gray-50 relative inline-flex items-center' +
                                                ' px-4 py-2 border text-sm font-medium'"
                              aria-current="page"
                              @click="getList(page)">
                            {{ page }}
                          </a>

                          <a
                              href="#"
                              @click="getList(currentPage + 1)"
                              class="dark:border-foreground dark:hover:bg-foreground relative inline-flex
                              items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium
                              text-gray-500 hover:bg-gray-50"
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
      </TabPanel>
    </TabPanels>
    <TabPanels class="mt-2">
      <TabPanel>내1용</TabPanel>
    </TabPanels>
  </TabGroup>
  </div>
</template>


<style></style>
