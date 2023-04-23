<script setup>
import {ref} from 'vue'
import {Menu, MenuItem, MenuItems} from '@headlessui/vue'
import {useStore} from 'vuex'
import {logout} from '@/api'
import {successToast} from '@/sweetAlert'
import router from '@/router'
import BaseBtn from "@/components/Base/BaseBtn.vue";

let store = useStore()
const role = store.state.role;

const sideBarToggle = () => {
  let sidenav = store.state.largeSidebar.sidebarToggleProperties.isSideNavOpen
  let secondarySideNav =
      store.state.largeSidebar.sidebarToggleProperties.isSecondarySideNavOpen
  // store.commit('largeSidebar/toggleSecondarySidebarProperties')

  if (sidenav == false) {
    store.commit('largeSidebar/toggleSidebarProperties')
    // store.commit('largeSidebar/toggleSecondarySidebarProperties')
  } else if (sidenav == true && secondarySideNav == true) {
    store.commit('largeSidebar/toggleSecondarySidebarProperties')
  } else {
    store.commit('largeSidebar/toggleSidebarProperties')
  }
}

// switch color to dark and light
let isDarkMode = ref(false)
const html = document.querySelector('html')

let colorModeSwitch = () => {
  if (isDarkMode.value === false) {
    html.classList.add('dark')
    isDarkMode.value = true
    console.log(isDarkMode.value)
  } else {
    html.classList.remove('dark')
    isDarkMode.value = false
    console.log(isDarkMode.value)
  }
}
const userName = store.state?.emp?.name || '관리자';
const signOut = async () => {
  await logout().then((res) => {
    if (res.status === 200) {
      successToast('로그아웃 되었습니다.')
      store.commit('setRole', '')
      store.commit('setEmp', '')
      store.commit('setEmpNum', '')
      store.commit('setManager', '')
      router.push({name: 'Home'})
    }
  })
}

const empId = store.state.emp.empId
const moveMyPage = (empId) => {
  router.push({name: '내정보', params: {id: empId}})
}
</script>

<template>
  <div
      class="header-wrapper flex bg-white justify-between px-4 dark:bg-foreground dark:text-gray-300"
  >
    <div class="flex items-center">
      <div class="logo flex justify-center">
        <img
            class="h-16 w-16 mr-6 ml-3"
            src="/images/MetaVC-logo.png"
            alt="logo"
            srcset=""
        />
      </div>
      <div class="mx-0 sm:mx-3">
        <button
            role="button"
            @click="sideBarToggle"
            class="menu-toggle cursor-pointer text-gray-500 align-middle focus:outline-none"
            type="button"
            aria-label="Sidebar Toggle"
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="flex items-center">
      <div class="mr-5">
        <span class="font-bold">{{userName}}</span>
        <span class="mx-2">님 환영합니다.</span>
      </div>
      <button
          id="lightOrDarkMode"
          @click="colorModeSwitch"
          class="w-7 h-7 mr-3 border border-gray-300 dark:border-primary-300 rounded-full
                flex items-center justify-center text-white">
        <img
            class="block dark:hidden w-[12px] h-[12px] fill-gray-700 dark:fill-primary-100"
            src="/images/svg-sprite/Dark-mode.svg"
        />

        <img
            class="hidden dark:block w-[12px] h-[12px] fill-gray-700 dark:fill-primary-100"
            src="/images/svg-sprite/Light-mode.svg"
        />
      </button>
      <div>
        <BaseBtn active aria-label="Account Settings" role="button" @click="moveMyPage"
                 v-if="role !=='ROLE_ADMIN'"
        >
          내 정보수정
        </BaseBtn>
        <BaseBtn aria-label="Sign out" role="button" @click="signOut">
          로그아웃
        </BaseBtn>
      </div>
      <!-- profile-dropdown  -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-wrapper {
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  z-index: 100;
  box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
}

.mega-menu {
  width: 1200px;
}

ul.links {
  column-count: 2;

  li {
    margin-bottom: 8px;
  }
}
</style>
