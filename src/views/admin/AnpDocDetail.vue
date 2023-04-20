<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router/index.js'
import { getAnpDocDetail } from '@/api'
import AnpDocCertificate from '@/components/AnpDocCertificate.vue'
import { successToast } from '@/sweetAlert'

const route = useRoute()
const docId = route.params.id
const detail = ref({})
const detailLoaded = ref(false)

onMounted(async () => {
  // 촉진문서 상세 조회
  await getAnpDocDetail(docId).then((res) =>{
    console.log(res.data)
    detailLoaded.value = true
    detail.value = res.data
    // await getEmpInfo()
  })
})


// 돌아가기
const onClickBackBtn = () => {
  router.go(-1)
}

</script>

<template>
  <div>
    <BaseCard>
      <!-- axios response 후 props 넘기기 위해 v-if 설정  -->
      <div v-if="detailLoaded">
        <AnpDocCertificate :item="detail" />
      </div>
    </BaseCard>
    <div class="flex justify-end mt-5">
      <BaseBtn
        class="mr-3 text-white bg-light hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary dark:focus:ring-blue-800"
        @click="onClickBackBtn"
      >
        돌아가기
      </BaseBtn>
    </div>
  </div>
</template>