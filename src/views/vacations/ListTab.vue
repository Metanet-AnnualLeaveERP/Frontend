<script setup>
import RequestList from './RequestList.vue'
import CancelList from './CancelList.vue'
import {ref} from 'vue'
import {TabGroup, TabList, Tab, TabPanels, TabPanel} from '@headlessui/vue'

const check = ref(true)
</script>

<template>
  <div>
    <TabGroup>
      <TabList class="bg-primary rounded-lg pl-3 py-1 mb-5">
        <Tab
            class="mr-12 italic bg-transparent hover:text-black text-white text-2xl"
            :class="check ? 'bg-blue-900 rounded-sm check-class' : null"
            @click="check = true">
          신청 내역
        </Tab>
        <Tab
            class="mr-12 italic bg-transparent hover:text-black text-white text-2xl"
            :class="check ? null : 'bg-blue-800 rounded-sm check-class'"
            @click="check = false">
          취소 내역
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <RequestList v-if="check"/>
        </TabPanel>
        <TabPanel>
          <CancelList v-if="!check"/>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<style>
.check-class{
  color: black;
  background-color: white;
  font-weight: bold;
}
</style>