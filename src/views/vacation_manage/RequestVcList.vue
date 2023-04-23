<script setup>
import {Tab, TabGroup, TabList, TabPanel, TabPanels} from '@headlessui/vue'
import ApprovalRequestComponent from "./ApprovalRequestComponent.vue"
import CancelApprovalRequestComponent from "./CancelApprovalRequestComponent.vue";
import {ref} from "vue";

const check = ref(true);
</script>

<template>
  <div>
    <TabGroup>
      <TabList class="bg-primary rounded-lg pl-3 py-1 dark:bg-blue-800">
        <Tab class="mr-12 hover:text-black text-white text-2xl py-1"
             :class=" check ? 'underline black rounded-md font-bold' : 'bg-transparent'" @click="check = true">
          결재 요청 리스트
        </Tab>
        <Tab class="mr-12 hover:text-black text-white text-2xl py-1"
             :class="check ? 'bg-transparent' : 'underline black rounded-md  font-bold'  " @click="check = false">취소 요청 리스트
        </Tab>
      </TabList>
      <TabPanels class="mt-4">
        <TabPanel>
          <ApprovalRequestComponent v-if="check"/>
        </TabPanel>
      <TabPanel class="mt-2">
        <CancelApprovalRequestComponent v-if="!check"/>
      </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>


