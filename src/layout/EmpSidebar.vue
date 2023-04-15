/* * File: Sidebar.vue * Project: Gull * File Created: Thursday, 18th November
2021 5:15:07 pm * Author: Naime Hossain & ui-lib -> https://ui-lib.com/
(support@ui-lib.com) * ----- * Last Modified: Wednesday, 19th October 2022
5:38:29 pm * Modified By: Naime Hossain & ui-lib -> https://ui-lib.com/
(support@ui-lib.com>) * ----- * Copyright 2019 - 2022 ui-lib , ui-lib (
https://ui-lib.com/ ) */

<script setup>
import { useStore } from 'vuex'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
let store = useStore()
const route = useRoute()

let selectedParentMenu = ref('')
let isMenuOver = ref(false)

onMounted(() => {
  toggleSelectedParentMenu()
  document.addEventListener('click', returnSelectedParentMenu)
  window.addEventListener('resize', handleWindowResize)
})

// beforeDestroy
onBeforeUnmount(() => {
  document.removeEventListener('click', returnSelectedParentMenu)
  window.removeEventListener('resize', handleWindowResize)
})
const handleWindowResize = () => {
  const sidenav = store.state.largeSidebar.sidebarToggleProperties.isSideNavOpen
  const secondarySideNav =
    store.state.largeSidebar.sidebarToggleProperties.isSecondarySideNavOpen

  if (window.innerWidth <= 1200) {
    // console.log('mobile is working');

    if (sidenav) {
      store.commit('largeSidebar/toggleSidebarProperties')
    }
    if (secondarySideNav) {
      store.commit('largeSidebar/toggleSecondarySidebarProperties')
    }
  } else {
    if (!sidenav) {
      store.commit('largeSidebar/toggleSidebarProperties')
    }
  }
}

const returnSelectedParentMenu = () => {
  if (!isMenuOver.value) {
    toggleSelectedParentMenu()
  }
}
const removeOverlay = () => {
  store.dispatch('largeSidebar/changeSecondarySidebarPropertiesViaMenuItem')

  if (window.innerWidth <= 1200) {
    // this.changeSidebarProperties();
    store.commit('largeSidebar/toggleSidebarProperties')
    console.log('adsasd')
  }
  toggleSelectedParentMenu()
}

let toggleSelectedParentMenu = () => {
  let currentParentUrl = route.path.split('/').filter((x) => x !== '')[0]

  if (currentParentUrl !== undefined || currentParentUrl !== null) {
    selectedParentMenu.value = currentParentUrl.toLowerCase()
  } else {
    selectedParentMenu.value = 'dashboards'
  }
}
let toggleSubMenu = (e) => {
  let hasSubmenu = e.target.dataset.submenu
  let parent = e.target.dataset.item

  if (hasSubmenu) {
    selectedParentMenu.value = parent
    store.dispatch(
      'largeSidebar/changeSecondarySidebarPropertiesViaMenuItem',
      true
    )
  } else {
    selectedParentMenu.value = parent
    store.dispatch(
      'largeSidebar/changeSecondarySidebarPropertiesViaMenuItem',
      false
    )
  }
}

// mobile working
</script>
<template>
  <div
    class="side-content-wrap"
    @mouseenter="isMenuOver = true"
    @mouseleave="isMenuOver = false"
    @touchstart="isMenuOver = true"
  >
    <div class="side-content-wrap">
      <div
        :class="
          store.state.largeSidebar.sidebarToggleProperties.isSideNavOpen ===
          true
            ? 'open'
            : ''
        "
        class="sidebar-left bg-white dark:bg-foreground"
      >
        <!-- sidebar 부모 -->
        <perfect-scrollbar>
          <ul class="navigation-left dark:bg-foreground dark:text-gray-300">
            <!-- nav child 없는 애들 -->
            <li
              @mouseenter="toggleSubMenu"
              class="nav-item border-b border-gray-200 dark:border-dark"
            >
              <router-link class="nav-item-hold" :to="{ name: '일정관리' }"
                ><i class="i-Calendar text-3xl"></i>
                <p>캘린더</p>
              </router-link>
            </li>
            <li
              @mouseenter="toggleSubMenu"
              class="nav-item border-b border-gray-200 dark:border-dark"
            >
              <router-link class="nav-item-hold" :to="{ name: '휴가신청내역' }"
                ><i class="i-Calendar text-3xl"></i>
                <p>휴가 신청 내역</p>
              </router-link>
            </li>
            <li
              @mouseenter="toggleSubMenu"
              class="nav-item border-b border-gray-200 dark:border-dark"
            >
              <router-link
                class="nav-item-hold"
                :to="{ name: '연차촉진문서함' }"
                ><i class="i-Calendar text-3xl"></i>
                <p>문서 보관함</p>
              </router-link>
            </li>
            <!-- nav child 있는 애들 -->
            <li
              @mouseenter="toggleSubMenu"
              class="nav-item border-b border-gray-200 dark:border-dark"
              :class="selectedParentMenu == 'dashboards' ? 'active' : ''"
              data-item="dashboards"
              :data-submenu="true"
            >
              <a class="nav-item-hold">
                <i class="i-Bar-Chart text-3xl"></i>
                <p>Dashboard</p>
              </a>
            </li>
          </ul>
        </perfect-scrollbar>
      </div>
      <!-- sidebar childs -->
      <div
        :class="{
          open: store.state.largeSidebar.sidebarToggleProperties
            .isSecondarySideNavOpen,
        }"
        class="sidebar-left-secondary shadow bg-white dark:bg-foreground dark:text-gray-300"
      >
        <ul
          class="mb-4 childNav"
          data-parent="dashboards"
          :class="selectedParentMenu == 'dashboards' ? 'block' : 'hidden'"
        >
          <li>
            <router-link :to="{ name: 'dashboard-version-one' }">
              <i class="nav-icon i-Clock mr-2"></i>
              <span class="item-name"> Version One </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <div
      @click="removeOverlay()"
      class="sidebar-overlay"
      :class="{
        open: store.state.largeSidebar.sidebarToggleProperties
          .isSecondarySideNavOpen,
      }"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.submenuLi {
  @apply dark:bg-foreground;
  &:hover {
    .submenuli-icon {
      @apply text-primary;
    }
  }
  .submenuli-icon {
    color: #9ca3af;
  }
}
.dark .dark\:bg-dark {
  .submneu-nested-link {
    color: #f3f4f6 !important;
    &:hover {
      background-color: transparent !important;
      @apply text-primary;
    }
  }
}
.submneu-nested-link {
  padding: 0 !important;
  color: #000 !important;

  &:hover {
    background-color: transparent !important;
    @apply text-primary;
  }
}
.side-content-wrap {
  .sidebar-left {
    position: fixed;
    top: 80px;
    left: -120px;
    width: 120px;

    box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.06),
      0 1px 4px rgba(0, 0, 0, 0.08);
    z-index: 90;
    transition: left 0.24s ease-in-out;
    &.open {
      left: 0;
      transition: left 0.24s ease-in-out;
    }
    .ps {
      height: calc(100vh - 80px);
    }
    .navigation-left {
      list-style: none;
      text-align: center;
      width: 120px;
      height: 100%;
      margin: 0;
      padding: 0;
      .nav-item,
      .nav-item-single {
        position: relative;
        display: block;
        width: 100%;
        overflow: hidden;
        cursor: pointer;
        // border-bottom: 1px solid #dee2e6;

        &:hover {
          .nav-item-hold {
            @apply text-primary;
          }
          &:after {
            content: '';
            position: absolute;
            width: 30px;
            height: 30px;
            bottom: -15px;
            right: -15px;
            transform: rotate(45deg);
            @apply bg-primary;
          }
        }

        &.active {
          @apply text-primary;

          &:after {
            content: '';
            position: absolute;
            width: 30px;
            height: 30px;
            bottom: -15px;
            right: -15px;
            transform: rotate(45deg);
            @apply bg-primary;
          }
        }

        .nav-item-hold {
          display: block;
          width: 100%;
          padding: 26px 0;
          p {
            font-size: 13px;
          }
          span.material-icons {
            font-size: 2rem;
          }
        }
      }
    }
  }
  .sidebar-left-secondary {
    position: fixed;
    top: 80px;
    left: calc(-220px - 20px);
    z-index: 89;
    height: calc(100vh - 80px);
    width: 220px;
    padding: 0.75rem 0;
    transition: left 0.24s ease-in-out;
    // background: #fff;

    &.open {
      left: 120px;
    }
    ul.childNav {
      li {
        &.dropdown-sidemenu {
          display: block;
          transition: left 0.24s ease-in-out;
          &.open {
            a {
              .dd-arrow {
                transform: rotate(90deg);
                transition: left 0.24s ease-in-out;
              }
            }
            ul.submenu {
              display: block;
              max-height: 1000px;
              transition: left 0.24s ease-in-out;
            }
          }

          a {
            .dd-arrow {
              margin-left: auto !important;
              transition: left 0.24s ease-in-out;
            }
          }
        }

        a {
          text-transform: capitalize;
          display: flex;
          align-items: center;
          font-size: 13px;
          cursor: pointer;
          padding: 12px 24px;
          transition: 0.15s all ease-in;
          &:hover {
            background-color: #f3f4f6;
            @apply text-primary dark:bg-dark;
          }
          &.router-link-active.router-link-exact-active {
            @apply text-primary;
          }
        }
        ul.submenu {
          @apply bg-gray-50;
          display: none;
          max-height: 0px;
          transition: left 0.24s ease-in-out;

          &.open {
            display: block;
            transition: left 0.24s ease-in-out;
          }
          li {
            a {
              padding-left: 48px;
            }
          }
        }
      }
    }
  }
  .sidebar-overlay {
    display: none;
    position: fixed;
    width: calc(100% - 120px - 220px);
    height: calc(100vh - 80px);
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0);
    z-index: 101;
    cursor: w-resize;
    &.open {
      display: block;
    }
  }
}
</style>
