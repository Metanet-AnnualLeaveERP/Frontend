<script setup>
import { onMounted, ref } from 'vue'
import { getVcRemainInfo } from '@/api/index.js'

const annual = ref([])
const reward = ref([])
const list = ref([])
const loading = ref(false)

onMounted(async () => {
  await getVcRemainInfo().then((res) => {
    console.log(res.data)
    // list.value = res.data
    annual.value = res.data.annual
    reward.value = res.data.reward
    loading.value = true
  })
})
</script>

<template>
  <div class="relative overflow-x-auto">
    <table
      class="w-full text-sm text-center text-gray-500 dark:text-gray-400"
      v-if="loading"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">휴가 유형</th>
          <th scope="col" class="px-6 py-3">총 부여일</th>
          <th scope="col" class="px-6 py-3">사용일</th>
          <th scope="col" class="px-6 py-3">잔여일</th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ annual.vcTypeDto.typeId }}
          </th>
          <td class="px-6 py-4">{{ annual.vcDays }}</td>
          <td class="px-6 py-4">
            {{ annual.vcDays - annual.remainDays }}
          </td>
          <td class="px-6 py-4">{{ annual.remainDays }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
