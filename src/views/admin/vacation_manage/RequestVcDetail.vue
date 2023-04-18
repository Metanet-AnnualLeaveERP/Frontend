<script setup>
import {onMounted, ref} from 'vue'
import {useRoute} from 'vue-router'
import router from '@/router/index.js'
import {getVcReqDetail} from "@/api";
import BaseBtn from "@/components/Base/BaseBtn.vue";

const route = useRoute();
const reqId = route.params.id;
const detail = ref({});

getVcReqDetail(reqId).then((res) => {
  console.log(res.data)
  detail.value = res.data
})

// 돌아가기
const onClickBackBtn = () => {
  router.go(-1)
}
</script>

<template>
  <div>
    <BaseCard class="h-full">

    </BaseCard>
    <BaseBtn class="
        border border-primary
        text-primary
        hover:bg-primary hover:text-white mt-3"
             @click="onClickBackBtn"
    >돌아가기
    </BaseBtn>

  </div>
</template>