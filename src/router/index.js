/*
 * File: index.js
 * Project: Gull
 * File Created: Thursday, 18th November 2021 5:15:07 pm
 * Author: Naime Hossain & ui-lib -> https://ui-lib.com/ (support@ui-lib.com)
 * -----
 * Last Modified: Sunday, 23rd October 2022 1:14:16 pm
 * Modified By: Naime Hossain & ui-lib -> https://ui-lib.com/ (support@ui-lib.com>)
 * -----
 * Copyright 2019 - 2022 ui-lib  , ui-lib  ( https://ui-lib.com/ )
 */

import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../views/sessions/404.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../layout/index.vue'),
    redirect: '/sessions/login',
    meta: {
      title: 'Home',
      roles: [],
    },
    children: [
      {
        path: '/schedule',
        name: 'Schedule',
        component: () => import('../views/calendar/index.vue'),
        meta: {
          title: 'Schedule',
        },
        children: [
          {
            path: 'main',
            name: '일정관리',
            component: () => import('../views/calendar/Calendar.vue'),
          },
        ],
      },
      {
        path: '/vacations',
        name: 'Vacations',
        component: () => import('../views/vacations/index.vue'),
        meta: {
          title: 'Vacations',
        },
        children: [
          // 휴가 신청 관련
          {
            path: 'request/new',
            name: '휴가신청',
            component: () => import('../views/vacations/NewRequest.vue'),
          },
          {
            path: 'request/list',
            name: '휴가신청내역',
            component: () => import('../views/vacations/RequestList.vue'),
          },
          {
            path: 'request/detail/:id',
            name: '휴가신청상세',
            component: () => import('../views/vacations/RequestDetail.vue'),
          },
          // 휴가 취소 관련
          {
            path: 'request/list',
            name: '휴가취소내역',
            component: () => import('../views/vacations/CancelList.vue'),
          },
          {
            path: 'cancel/detail/:id',
            name: '휴가취소상세',
            component: () => import('../views/vacations/CancelDetail.vue'),
          },
        ],
      },
      {
        path: '/certificates',
        name: 'Certificates',
        component: () => import('../views/annual_promote_doc/index.vue'),
        meta: {
          title: 'AnnualPromoteDoc',
        },
        children: [
          {
            path: 'main',
            name: '증명서내역',
            component: () =>
              import('../views/certificates/CertificateList.vue'),
          },
          {
            path: 'detail/:id',
            name: '증명서상세',
            component: () =>
              import('../views/certificates/CertificateDetail.vue'),
          },
        ],
      },
      {
        path: '/anp-docs',
        name: 'AnnualPromoteDoc',
        component: () => import('../views/annual_promote_doc/index.vue'),
        meta: {
          title: 'AnnualPromoteDoc',
        },
        children: [
          {
            path: 'main',
            name: '연차촉진문서함',
            component: () => import('../views/annual_promote_doc/AnpList.vue'),
          },
        ],
      },
      {
        path: '/admin',
        name: 'AdminMain',
        component: () => import('@/views/admin/index.vue'),
        meta: {
          roles: ['ROLE_ADMIN'],
        },
        children: [
          {
            path: 'main',
            name: '관리자메인',
            component: () => import('@/views/admin/AdminMain.vue'),
          },
          {
            path: 'employee/list',
            name: '사원관리',
            component: () => import('@/views/admin/EmployeeList.vue'),
          },
          {
            path: 'employee/detail/:id',
            name: '사원상세',
            component: () => import('@/views/admin/EmployeeDetail.vue'),
          },
          {
            path: 'vacation_manage/type',
            name: '휴가유형관리',
            component: () =>
              import('@/views/admin/vacation_manage/VcTypeList.vue'),
          },
          {
            path: 'vacation_manage/grant',
            name: '휴가부여관리',
            component: () =>
              import('@/views/admin/vacation_manage/GrantedVcList.vue'),
          },
          {
            path: 'vacation_manage/grant/:id',
            name: '휴가부여상세',
            component: () =>
              import('@/views/admin/vacation_manage/GrantedVcDetail.vue'),
          },
          {
            path: 'vacation_manage/request',
            name: '휴가요청관리',
            component: () =>
              import('@/views/admin/vacation_manage/RequestVcList.vue'),
          },
        ],
      },
      {
        path: '/dashboards',
        name: 'Dashboards',
        component: () => import('../views/dashboards/index.vue'),
        meta: {
          title: 'Dashboard',
        },
        children: [
          {
            path: 'main',
            name: 'dashboard-version-one',
            component: () => import('../views/dashboards/Dashboards.v1.vue'),
          },
        ],
      },
      {
        path: '/components',
        name: 'components',
        component: () => import('../views/components/index.vue'),
        meta: {
          title: 'Components',
        },
        children: [
          {
            path: 'avatars',
            name: 'buttonavatars',
            component: () => import('../views/components/Avatars.vue'),
          },
          {
            path: 'button',
            name: 'button',
            component: () => import('../views/components/Button.vue'),
          },
          {
            path: 'badges',
            name: 'badges',
            component: () => import('../views/components/Badges.vue'),
          },
          {
            path: 'accordions',
            name: 'accordions',
            component: () => import('../views/components/Accordions.vue'),
          },
          {
            path: 'alerts',
            name: 'alerts',
            component: () => import('../views/components/Alerts.vue'),
          },
          {
            path: 'tabs',
            name: 'tabs',
            component: () => import('../views/components/Tabs.vue'),
          },
          {
            path: 'typography',
            name: 'typography',
            component: () => import('../views/components/Typography.vue'),
          },
        ],
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/profile/index.vue'),
        meta: {
          title: 'Profile',
        },
        children: [
          {
            path: 'profileOne',
            name: 'ProfileOne',
            component: () => import('../views/profile/ProfileOne.vue'),
          },
        ],
      },
      {
        path: '/widgets',
        name: 'Widgets',
        component: () => import('../views/widgets/index.vue'),
        meta: {
          title: 'Widgets',
        },
        children: [
          {
            path: 'general',
            name: 'general',
            component: () => import('../views/widgets/General.vue'),
          },
          {
            path: 'charts',
            name: 'charts',
            component: () => import('../views/widgets/Charts.vue'),
          },
        ],
      },
      {
        path: '/apps',
        name: 'Apps',
        component: () => import('../views/apps/index.vue'),
        meta: {
          title: 'Apps',
        },
        children: [
          {
            path: 'chat',
            name: 'Chat',
            component: () => import('../views/apps/Chat.vue'),
          },
          {
            path: 'inbox',
            name: 'Inbox',
            component: () => import('../views/apps/Inbox.vue'),
          },
          {
            path: 'ecommerce',
            name: 'ecommerce',
            component: () => import('../views/apps/Ecommerce.vue'),
          },
          {
            path: 'cart',
            name: 'cart',
            component: () => import('../views/apps/Cart.vue'),
          },
          {
            path: 'checkout',
            name: 'checkout',
            component: () => import('../views/apps/Checkout.vue'),
          },
          {
            path: 'create-invoice',
            name: 'create invoice',
            component: () => import('../views/apps/CreateInvoice.vue'),
          },
          {
            path: 'print-invoice',
            name: 'print invoice',
            component: () => import('../views/apps/PrintInvoice.vue'),
          },
          {
            path: 'todo-list',
            name: 'todo todo',
            component: () => import('../views/apps/TodoList.vue'),
          },
          {
            path: 'contact-grid',
            name: 'Contact Grid',
            component: () => import('../views/contacts/ContactGrid.vue'),
          },
          {
            path: 'contact-table',
            name: 'Contact Table',
            component: () => import('../views/contacts/ContactTable.vue'),
          },
          {
            path: 'contact-list',
            name: 'Contact List',
            component: () => import('../views/contacts/ContactList.vue'),
          },
        ],
      },
      {
        path: '/charts',
        name: 'Charts',
        component: () => import('../views/charts/index.vue'),
        meta: {
          title: 'Widgets',
        },
        children: [
          {
            path: 'bar',
            name: 'bar',
            component: () => import('../views/charts/Bar.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/sessions',
    name: 'sessions',
    component: () => import('../views/sessions/index.vue'),
    meta: {
      title: 'Sessions',
    },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../views/sessions/LogIn.vue'),
        meta: {
          roles: [],
        },
      },

      {
        path: '404',
        name: '404',
        component: () => import('../views/sessions/404.vue'),
      },
      {
        path: 'forgot',
        name: 'forgot',
        component: () => import('../views/sessions/Forgot.vue'),
      },
    ],
  },

  { path: '/:path(.*)', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    return { left: 0, top: 0 }
  },

  routes,
})

// 현재 페이지 이름 설정
router.beforeEach((to, from, next) => {
  /* 권한은 로그인 시에만 부여되고 모든 서비스는 로그인한 유저에 한헤서만 접근 가능하다. */
  const role = store.state.role

  // 이동할 페이지의 권한이 현재 로그인한 유저의 권한을 포함하지 않는 경우
  // console.log(to.meta.roles)
  if (to.meta.roles != '' && !to.meta.roles.includes(role)) {
    console.log('접근 권한이 없습니다.')
    // 권한이 없는 유저는 403 에러 페이지로 보낸다
    return next({ name: '404' })
  } else {
    return next()
  }
})

router.afterEach(() => {
  // Remove initial loading
  const GullPreLoading = document.getElementById('loading_wrap')
  if (GullPreLoading) {
    GullPreLoading.style.display = 'none'
  }
  const secondarySideNav =
    store.state.largeSidebar.sidebarToggleProperties.isSecondarySideNavOpen
  if (window.innerWidth <= 1200) {
    store.dispatch('largeSidebar/changeSidebarProperties')
    if (secondarySideNav) {
      store.dispatch('largeSidebar/changeSecondarySidebarProperties')
    }
  } else {
    if (secondarySideNav) {
      store.dispatch('largeSidebar/changeSecondarySidebarProperties')
    }
  }
})

export default router
