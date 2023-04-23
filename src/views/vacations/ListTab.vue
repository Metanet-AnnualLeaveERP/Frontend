<script setup>
import RequestList from './RequestList.vue'
import CancelList from './CancelList.vue'
import { ref } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

const check = ref(true)
</script>

<template>
  <div>
    <TabGroup>
      <TabList class="bg-primary rounded-lg pl-3 py-1 dark:bg-blue-800">
        <Tab
          class="mr-12 hover:text-black text-white text-2xl py-1"
          :class="
            check ? 'underline black rounded-md font-bold' : 'bg-transparent'
          "
          @click="check = true"
        >
          신청 내역
        </Tab>
        <Tab
          class="mr-12 hover:text-black text-white text-2xl py-1"
          :class="
            check ? 'bg-transparent' : 'underline black rounded-md  font-bold'
          "
          @click="check = false"
        >
          취소 내역
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <RequestList v-if="check" />
        </TabPanel>
        <TabPanel>
          <CancelList v-if="!check" />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<style>
.check-class {
  color: black;
  background-color: white;
  font-weight: bold;
}
</style>
