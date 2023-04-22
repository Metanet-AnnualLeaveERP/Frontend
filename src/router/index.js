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
    },
    children: [
      {
        path: '/schedule',
        name: 'Schedule',
        component: () => import('../views/calendar/index.vue'),
        redirect: '/schedule/main',
        meta: {
          title: 'Schedule',
          roles: ['ROLE_MGR', 'ROLE_EMP'],
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
        redirect: '/vacations/main',
        meta: {
          title: 'Vacations',
          roles: ['ROLE_MGR', 'ROLE_EMP'],
        },
        children: [
          // 휴가 신청 관련
          {
            path: 'main',
            name: '휴가관리',
            component: () => import('../views/vacations/ListTab.vue'),
          },
          {
            path: 'request/new',
            name: '휴가신청',
            component: () => import('../views/vacations/NewRequest.vue'),
          },
          {
            path: 'request/detail/:id',
            name: '휴가신청상세',
            component: () => import('../views/vacations/RequestDetail.vue'),
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
        redirect: '/certificates/main',
        meta: {
          title: 'Certificates',
          roles: ['ROLE_MGR', 'ROLE_EMP'],
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
        redirect: '/anp-docs/main',
        meta: {
          title: 'AnnualPromoteDoc',
          roles: ['ROLE_ADMIN', 'ROLE_MGR', 'ROLE_EMP'],
        },
        children: [
          {
            path: 'main',
            name: '연차촉진문서함',
            component: () => import('../views/annual_promote_doc/AnpList.vue'),
          },
          {
            path: '/anp-docs/list/:id',
            name: '촉진요청서상세',
            component: () =>
              import('@/views/admin/AnpDocDetail.vue'),
          },
          {
            path: '/anp-docs/use-plan/:id',
            name: '연차사용계획서',
            component: () => 
              import('@/views/annual_promote_doc/UsePlan.vue'),
          }
        ],
      },
      // {
      //   path: '/anp',
      //   name:'anpMain',
      //   component: () => import('@/views/annual_promote_doc/index.vue'),
      //   children:[
      //     {
      //       path: '/list',
      //       name: '연차촉진관리',
      //       component: () =>
      //         import('@/views/annual_promote_doc/AnpList.vue'),
      //     },
      //   ]
      // },
      {
        path: '/admin',
        name: 'AdminMain',
        component: () => import('@/views/admin/index.vue'),
        redirect: '/admin/employee/list',
        meta: {
          roles: ['ROLE_ADMIN'],
        },
        children: [
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
            path: 'employee/register/',
            name: '직원등록',
            component: () => import('@/views/admin/EmployeeRegister.vue'),
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
        ],
      },
      {
        path: '/vacation_manage',
        name: 'vacation_manage',
        component: () => import('@/views/vacation_manage/index.vue'),
        redirect: '/vacation_manage/main',
        meta: {
          roles: ['ROLE_ADMIN', 'ROLE_MGR'],
        },
        children: [
          {
            path: 'main',
            name: '휴가요청관리',
            component: () =>
              import('@/views/vacation_manage/RequestVcList.vue'),
          },
          {
            path:'request/approval/:id',
            name:'관리자결재상세',
            component : ()=>
                import("@/views/vacation_manage/RequestVcDetail.vue")
          },
          {
            path: 'request/cancel/:id',
            name: '관리자휴가취소상세',
            component: ()=> 
            import('@/views/vacation_manage/CancelVcDetail.vue')
          },
        ],
      },
      {
        path: '/employee',
        name: 'employeeMain',
        component: () => import('@/views/employee/index.vue'),
        redirect: '/employee/myInfo',
        meta: {
          roles: ['ROLE_EMP', 'ROLE_MGR'],
        },
        children: [
          {
            path: 'myInfo',
            name: '내정보',
            component: () => import('@/views/employee/myInfo.vue'),
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
      role: [],
    },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../views/sessions/LogIn.vue'),
        roles: ['anonymous'],
      },
      {
        path: '403',
        name: '403',
        component: () => import('../views/sessions/403.vue'),
        roles: ['anonymous', 'ROLE_ADMIN', 'ROLE_MGR', 'ROLE_EMP'],
      },
      {
        path: '404',
        name: '404',
        component: () => import('../views/sessions/404.vue'),
        roles: ['anonymous', 'ROLE_ADMIN', 'ROLE_MGR', 'ROLE_EMP'],
      },
      {
        path: 'forgot',
        name: 'forgot',
        component: () => import('../views/sessions/Forgot.vue'),
        roles: ['anonymous'],
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
  if (to.meta.roles && !to?.meta?.roles?.includes(role)) {
    console.log('접근 권한이 없습니다.')
    // 권한이 없는 유저는 403 에러 페이지로 보낸다
    return next({ name: '403' })
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
