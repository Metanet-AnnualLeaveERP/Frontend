<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue'
import { Switch } from '@headlessui/vue'
import HeaderSearch from '../components/HeaderSearch.vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useStore } from 'vuex'
import { logout } from '@/api'
import { successToast } from '@/sweetAlert'
import router from '@/router'

let store = useStore()

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

const signOut = async () => {
  await logout().then((res) => {
    if (res.status === 200) {
      successToast('로그아웃 되었습니다.')
      store.commit('setRole', '')
      store.commit('setEmp', '')
      store.commit('setEmpNum', '')
      store.commit('setManager', '')
      router.push({ name: 'Home' })
    }
  })
}

const empId = store.state.emp.empId
const moveMyPage = (empId) => {
  router.push({ name: '내정보', params: { id: empId } })
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
      <!-- mega-menu  -->

      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton
            class="btn-sm mx-3 md:block hidden focus:outline-none dropdown-button"
          >
            <div class="flex items-center">
              <p class="mr-2 text-sm">Mega Menu</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </MenuButton>
        </div>

        <MenuItems
          class="absolute mega-menu left-0 mt-2 overflow-hidden origin-top-right bg-white rounded-md custom-box-shadow focus:outline-none"
        >
          <div class="">
            <MenuItem>
              <div class="grid grid-cols-12 gap-0">
                <div
                  class="col-span-4 bg-gradient-to-r from-purple-500 to-purple-700"
                >
                  <div class="p-4">
                    <p class="text-2xl text-white font-semibold mb-3">
                      Mega Menu Sidebar
                    </p>
                    <p class="text-white mb-4">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Asperiores natus laboriosam fugit, consequatur.
                    </p>
                    <p class="text-white mb-4">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Exercitationem odio amet eos dolore suscipit placeat.
                    </p>
                    <BaseBtn
                      rounded
                      class="border border-warning text-warning hover:bg-warning hover:text-white"
                    >
                      Learn More
                    </BaseBtn>
                  </div>
                </div>
                <div class="col-span-4 dark:bg-dark">
                  <div class="p-4">
                    <p
                      class="text-primary border-b border-purple-500 inline-block mb-4"
                    >
                      Features
                    </p>
                    <div class="menu-icon-grid flex justify-between flex-wrap">
                      <a
                        class="hover:bg-primary hover:text-white text-gray-600 dark:text-gray-300 p-5 inline-flex flex-col items-center rounded w-24"
                        href="#"
                      >
                        <i class="i-Shop-4 text-2xl"> </i>Home
                      </a>
                      <a
                        class="hover:bg-primary hover:text-white text-gray-600 dark:text-gray-300 p-5 inline-flex flex-col items-center rounded w-24"
                        href="#"
                      >
                        <i class="i-Library text-2xl"></i>UI Kits
                      </a>
                      <a
                        class="hover:bg-primary hover:text-white text-gray-600 dark:text-gray-300 p-5 inline-flex flex-col items-center rounded w-24"
                        href="#"
                      >
                        <i class="i-Drop text-2xl"></i>Apps
                      </a>
                      <a
                        class="hover:bg-primary hover:text-white text-gray-600 dark:text-gray-300 p-5 inline-flex flex-col items-center rounded w-24"
                        href="#"
                      >
                        <i class="i-File-Clipboard-File--Text text-2xl"> </i
                        >Forms
                      </a>
                      <a
                        class="hover:bg-primary hover:text-white text-gray-600 dark:text-gray-300 p-5 inline-flex flex-col items-center rounded w-24"
                        href="#"
                      >
                        <i class="i-Checked-User text-2xl"></i>Sessions
                      </a>
                      <a
                        class="hover:bg-primary hover:text-white text-gray-600 dark:text-gray-300 p-5 inline-flex flex-col items-center rounded w-24"
                        href="#"
                      >
                        <i class="i-Ambulance text-2xl"></i>Support
                      </a>
                    </div>
                  </div>
                </div>
                <div class="col-span-4 dark:bg-dark">
                  <div class="p-4">
                    <p
                      class="text-primary border-b border-purple-500 inline-block mb-4"
                    >
                      Components
                    </p>
                    <ul class="links">
                      <li>
                        <a
                          class="hover:text-primary text-gray-600 dark:text-gray-300 dark:hover:text-primary"
                          href="#"
                          >Accordion
                        </a>
                      </li>
                      <li>
                        <a
                          class="hover:text-primary text-gray-600 dark:text-gray-300 dark:hover:text-primary"
                          href="#"
                          >Alerts
                        </a>
                      </li>
                      <li>
                        <a
                          class="hover:text-primary text-gray-600 dark:text-gray-300 dark:hover:text-primary"
                          href="#"
                          >Buttons
                        </a>
                      </li>
                      <li>
                        <a
                          class="hover:text-primary text-gray-600 dark:text-gray-300 dark:hover:text-primary"
                          href="#"
                          >Badges
                        </a>
                      </li>
                      <li>
                        <a
                          class="hover:text-primary text-gray-600 dark:text-gray-300 dark:hover:text-primary"
                          href="#"
                          >Carousels
                        </a>
                      </li>
                      <li>
                        <a
                          class="hover:text-primary text-gray-600 dark:text-gray-300 dark:hover:text-primary"
                          href="#"
                          >Lists
                        </a>
                      </li>
                      <li>
                        <a
                          class="hover:text-primary text-gray-600 dark:text-gray-300 dark:hover:text-primary"
                          href="#"
                          >Popover
                        </a>
                      </li>
                      <li>
                        <a
                          class="hover:text-primary text-gray-600 dark:text-gray-300 dark:hover:text-primary"
                          href="#"
                          >Tables
                        </a>
                      </li>
                      <li>
                        <a
                          class="hover:text-primary text-gray-600 dark:text-gray-300 dark:hover:text-primary"
                          href="#"
                          >Datatables
                        </a>
                      </li>
                      <li>
                        <a
                          class="hover:text-primary text-gray-600 dark:text-gray-300 dark:hover:text-primary"
                          href="#"
                          >Modals
                        </a>
                      </li>
                      <li>
                        <a
                          class="hover:text-primary text-gray-600 dark:text-gray-300 dark:hover:text-primary"
                          href="#"
                          >Sliders
                        </a>
                      </li>
                      <li>
                        <a
                          class="hover:text-primary text-gray-600 dark:text-gray-300 dark:hover:text-primary"
                          href="#"
                          >Tabs
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>

      <HeaderSearch />
    </div>
    <div class="flex items-center">
      <button
        id="lightOrDarkMode"
        @click="colorModeSwitch"
        class="w-7 h-7 mr-3 border border-gray-300 dark:border-primary-300 rounded-full flex items-center justify-center text-white"
      >
        <img
          class="block dark:hidden w-[12px] h-[12px] fill-gray-700 dark:fill-primary-100"
          src="/images/svg-sprite/Dark-mode.svg"
        />

        <img
          class="hidden dark:block w-[12px] h-[12px] fill-gray-700 dark:fill-primary-100"
          src="/images/svg-sprite/Light-mode.svg"
        />
      </button>

      <Menu as="div" class="relative inline-block text-left">
        <MenuButton
          class="btn btn-sm dark:hover:bg-dark hover:bg-gray-100 rounded w-full px-4 py-2 text-sm font-medium"
        >
          <i class="i-Safe-Box text-gray-800 dark:text-gray-300 text-xl"></i>
        </MenuButton>

        <MenuItems
          class="absolute right-0 w-40 mt-2 overflow-hidden origin-top-right bg-white dark:bg-dark rounded-md custom-box-shadow focus:outline-none"
        >
          <div class="">
            <MenuItem class="">
              <div class="flex justify-between flex-wrap">
                <a
                  class="hover:bg-primary hover:text-white text-gray-600 dark:text-gray-300 p-4 inline-flex flex-col items-center rounded w-20"
                  href="#"
                >
                  <i class="i-Shop-4 text-2xl"> </i>Home
                </a>
                <a
                  class="hover:bg-primary hover:text-white text-gray-600 dark:text-gray-300 p-4 inline-flex flex-col items-center rounded w-20"
                  href="#"
                >
                  <i class="i-Library text-2xl"></i>UI Kits
                </a>
                <a
                  class="hover:bg-primary hover:text-white text-gray-600 dark:text-gray-300 p-4 inline-flex flex-col items-center rounded w-20"
                  href="#"
                >
                  <i class="i-Drop text-2xl"></i>Apps
                </a>
                <a
                  class="hover:bg-primary hover:text-white text-gray-600 dark:text-gray-300 p-4 inline-flex flex-col items-center rounded w-20"
                  href="#"
                >
                  <i class="i-File-Clipboard-File--Text text-2xl"> </i>Forms
                </a>
                <a
                  class="hover:bg-primary hover:text-white text-gray-600 dark:text-gray-300 p-4 inline-flex flex-col items-center rounded w-20"
                  href="#"
                >
                  <i class="i-Checked-User text-2xl"></i>Sessions
                </a>
                <a
                  class="hover:bg-primary hover:text-white text-gray-600 dark:text-gray-300 p-4 inline-flex flex-col items-center rounded w-20"
                  href="#"
                >
                  <i class="i-Ambulance text-2xl"></i>Support
                </a>
              </div>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
      <!-- notification-dropdown  -->
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton
            class="btn btn-sm hover:bg-gray-100 dark:hover:bg-dark rounded badge-top-container inline-flex justify-center w-full px-4 py-2 text-sm font-medium"
          >
            <span class="badge-count text-white bg-primary dark:text-gray-300"
              >3</span
            >
            <i
              class="i-Bell text-xl header-icon text-gray-800 dark:text-gray-300"
            ></i>
          </MenuButton>
        </div>

        <MenuItems
          class="absolute right-0 w-44 mt-2 overflow-hidden origin-top-right bg-white dark:bg-dark rounded-md custom-box-shadow focus:outline-none"
        >
          <div class="">
            <MenuItem
              v-for="(item, index) in 4"
              :key="index"
              v-slot="{ active }"
            >
              <button
                :class="[
                  active
                    ? 'bg-primary text-white'
                    : 'text-gray-900 dark:text-gray-300',
                  'group flex  items-center w-full px-4 py-2 text-sm',
                ]"
                aria-label="notifications"
                role="button"
              >
                <div class="flex flex-1 justify-between">
                  <div>
                    <h6>New Message</h6>
                    <p :class="[active ? 'text-gray-300' : 'text-gray-500']">
                      How are you ?
                    </p>
                  </div>
                  <div>
                    <p :class="[active ? 'text-gray-200' : 'text-gray-400']">
                      10s
                    </p>
                  </div>
                </div>
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>

      <!-- profile-dropdown  -->
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton
            class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium"
          >
            <img class="avatar rounded-full" src="/images/faces/1.jpg" alt="" />
          </MenuButton>
        </div>

        <MenuItems
          class="absolute right-0 w-44 mt-2 overflow-hidden origin-top-right bg-white dark:bg-dark rounded-md custom-box-shadow focus:outline-none"
        >
          <div class="">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active
                    ? 'bg-primary text-white'
                    : 'text-gray-900 dark:text-gray-300',
                  'group flex  items-center w-full px-4 py-2 text-sm',
                ]"
                aria-label="Account Settings"
                role="button"
                @click="moveMyPage(empId)"
              >
                내 정보
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active
                    ? 'bg-primary text-white'
                    : 'text-gray-900 dark:text-gray-300',
                  'group flex  items-center w-full px-4 py-2 text-sm',
                ]"
                aria-label="History"
                role="button"
              >
                Billing History
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active
                    ? 'bg-primary text-white'
                    : 'text-gray-900 dark:text-gray-300',
                  'group flex  items-center w-full px-4 py-2 text-sm',
                ]"
                aria-label="Sign out"
                role="button"
                @click="signOut"
              >
                로그아웃
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
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
