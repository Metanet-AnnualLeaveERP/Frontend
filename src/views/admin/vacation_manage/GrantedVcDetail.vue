<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getGrantedVcDetail, deleteGrantedVc} from '@/api'
import router from '@/router/index.js'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { checkConfirm, successToast } from '@/sweetAlert'

const route = useRoute()
const gvId = route.params.id
const gvInfo = ref({})
const gvIdNo = 'No.' + route.params.id

onMounted(async () => {
  // 상세조회
  console.log(gvId)
  await getGrantedVcDetail(gvId).then((res) => {
    gvInfo.value = res.data
  })
})

// 뒤로가기
const onClickBackBtn = () => {
  router.go(-1)
}

// 삭제하기
let confirmFlag = null;
const onClickDeleteBtn = async () => {
  confirmFlag = await checkConfirm('해당 내역을 삭제할까요?', 
  '삭제 시엔 부여일수만큼 전부 삭제됩니다!')
  if(confirmFlag == null){
    return;
  } else if(confirmFlag.isConfirmed){
    deleteGrantedVc(gvId).then( (res => {
      successToast('삭제가 성공하였습니다.')
      router.go(-1)
    }))
  }
}

</script>
<template>
  <div class="container mx-auto max-w-screen-lg w-2/5">
    <breadcrumbs parentTitle="휴가부여상세정보" :subParentTitle="gvIdNo" />
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-12">
        <BaseCard>
          <div class="col-span-12 xl:col-span-4 lg:col-span-4 md:col-span-12">
            <div class="font-bold text-lg mb-2">휴가상세정보</div>
            <span class="mb-1">휴가유형: </span>
            <span class="font-bold text-lg">{{ gvInfo?.vcTypeDto?.typeName }}</span>
          </div>
          <div class="col-span-4"></div>
          <div
            class="col-span-12 text-left md:text-right xl:col-span-4 lg:col-span-4 md:col-span-12"
          >
            <label for="">생성일자: </label>
            <span class="font-bold">{{ gvInfo?.grantedDate }}</span>
          </div>
          <div
            class="col-span-12 text-left md:text-right xl:col-span-4 lg:col-span-4 md:col-span-12"
          >
            <label for="">만료일자: </label>
            <span class="font-bold">{{ gvInfo?.expiredDate }}</span>
          </div>
          <div
            class="col-span-12 text-left md:text-right xl:col-span-4 lg:col-span-4 md:col-span-12"
          >
            <label for="">부여휴가일수: </label>
            <span class="font-bold">{{ gvInfo?.vcDays }}</span>
          </div>
          <div class="col-span-12 py-5">
            <div class="border-b border-gray-200"></div>
          </div>
          <div class="col-span-12 xl:col-span-4 lg:col-span-4 md:col-span-12">
            <div class="font-bold text-lg mb-2">직원정보</div>
            <span class="font-semibold mb-4 text-3xl">{{gvInfo?.empDto?.name}}</span>
            <span class="ml-3 mb-4 text-lg">{{gvInfo?.empDto?.position}}</span>
            <p class="mt-2 font-semibold">
              {{gvInfo?.empDto?.deptDto?.deptName}}</p>
          </div>
          <div class="col-span-4"></div>
          <div
            class="col-span-12 text-left md:text-right xl:col-span-4 lg:col-span-4 md:col-span-12"
          >
            <p class="font-semibold mb-1">{{gvInfo?.empDto?.cEmail}}</p>
            <p class="font-semibold">{{gvInfo?.empDto?.tel}}</p>
          </div>
          <div class="col-span-12 mt-10">
            <div
              class="overflow-x-auto pr-10 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
            >
              <div class="align-middle inline-block min-w-full">
              </div>
            </div>
          </div>
          <div class="text-right mb-10">
            <BaseBtn
              class="border border-light text-light hover:bg-light hover:text-white mr-2"
              @click="onClickBackBtn"
            >
              뒤로가기
            </BaseBtn>
            <BaseBtn 
              class="text-white bg-danger mr-2"
              @click="onClickDeleteBtn"
              > 부여내역삭제 </BaseBtn>
            <!-- <BaseBtn class="bg-success text-white mr-2"> 증명서 출력 </BaseBtn> -->
            <!-- 시간 나면... -->
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>