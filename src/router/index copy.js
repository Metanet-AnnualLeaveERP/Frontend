// /*
//  * File: index.js
//  * Project: Gull
//  * File Created: Thursday, 18th November 2021 5:15:07 pm
//  * Author: Naime Hossain & ui-lib -> https://ui-lib.com/ (support@ui-lib.com)
//  * -----
//  * Last Modified: Sunday, 23rd October 2022 1:14:16 pm
//  * Modified By: Naime Hossain & ui-lib -> https://ui-lib.com/ (support@ui-lib.com>)
//  * -----
//  * Copyright 2019 - 2022 ui-lib  , ui-lib  ( https://ui-lib.com/ )
//  */

// import { createRouter, createWebHistory } from 'vue-router'
// import NotFound from '../views/sessions/404.vue'
// import store from '../store'

// const routes = [
//     {
//         path: '/',
//         name: 'Home',
//         component: () => import('../layout/index.vue'),
//         redirect: '/intro',
//         meta: {
//             title: 'Home',
//         },

//         children: [
//             {
//                 path: '/dashboards',
//                 name: 'Dashboards',
//                 component: () => import('../views/dashboards/index.vue'),
//                 meta: {
//                     title: 'Dashboard',
//                 },
//                 children: [
//                     {
//                         path: 'dashboard-version-one',
//                         name: 'dashboard-version-one',
//                         component: () =>
//                             import('../views/dashboards/Dashboards.v1.vue'),
//                     },
//                     {
//                         path: 'dashboard-version-two',
//                         name: 'dashboard-version-two',
//                         component: () =>
//                             import('../views/dashboards/Dashboards.v2.vue'),
//                     },
//                     {
//                         path: 'dashboard-version-three',
//                         name: 'dashboard-version-three',
//                         component: () =>
//                             import('../views/dashboards/Dashboards.v3.vue'),
//                     },
//                     {
//                         path: 'dashboard-version-four',
//                         name: 'dashboard-version-four',
//                         component: () =>
//                             import('../views/dashboards/Dashboards.v4.vue'),
//                     },
//                     {
//                         path: 'dashboard-version-five',
//                         name: 'dashboard-version-five',
//                         component: () =>
//                             import('../views/dashboards/Dashboards.v5.vue'),
//                     },
//                 ],
//             },
//             {
//                 path: '/components',
//                 name: 'components',
//                 component: () => import('../views/components/index.vue'),
//                 meta: {
//                     title: 'Components',
//                 },
//                 children: [
//                     {
//                         path: 'avatars',
//                         name: 'buttonavatars',
//                         component: () =>
//                             import('../views/components/Avatars.vue'),
//                     },
//                     {
//                         path: 'button',
//                         name: 'button',
//                         component: () =>
//                             import('../views/components/Button.vue'),
//                     },
//                     {
//                         path: 'badges',
//                         name: 'badges',
//                         component: () =>
//                             import('../views/components/Badges.vue'),
//                     },
//                     {
//                         path: 'accordions',
//                         name: 'accordions',
//                         component: () =>
//                             import('../views/components/Accordions.vue'),
//                     },
//                     {
//                         path: 'alerts',
//                         name: 'alerts',
//                         component: () =>
//                             import('../views/components/Alerts.vue'),
//                     },
//                     {
//                         path: 'tabs',
//                         name: 'tabs',
//                         component: () => import('../views/components/Tabs.vue'),
//                     },
//                     {
//                         path: 'typography',
//                         name: 'typography',
//                         component: () =>
//                             import('../views/components/Typography.vue'),
//                     },
//                 ],
//             },
//             {
//                 path: '/profile',
//                 name: 'profile',
//                 component: () => import('../views/profile/index.vue'),
//                 meta: {
//                     title: 'Profile',
//                 },
//                 children: [
//                     {
//                         path: 'profileOne',
//                         name: 'ProfileOne',
//                         component: () =>
//                             import('../views/profile/ProfileOne.vue'),
//                     },
//                     {
//                         path: 'profileTwo',
//                         name: 'ProfileTwo',
//                         component: () =>
//                             import('../views/profile/ProfileTwo.vue'),
//                     },
//                 ],
//             },

//             {
//                 path: '/widgets',
//                 name: 'Widgets',
//                 component: () => import('../views/widgets/index.vue'),
//                 meta: {
//                     title: 'Widgets',
//                 },
//                 children: [
//                     {
//                         path: 'general',
//                         name: 'general',
//                         component: () => import('../views/widgets/General.vue'),
//                     },
//                     {
//                         path: 'charts',
//                         name: 'charts',
//                         component: () => import('../views/widgets/Charts.vue'),
//                     },
//                 ],
//             },
//             {
//                 path: '/apps',
//                 name: 'Apps',
//                 component: () => import('../views/apps/index.vue'),
//                 meta: {
//                     title: 'Apps',
//                 },
//                 children: [
//                     {
//                         path: 'chat',
//                         name: 'Chat',
//                         component: () => import('../views/apps/Chat.vue'),
//                     },
//                     {
//                         path: 'inbox',
//                         name: 'Inbox',
//                         component: () => import('../views/apps/Inbox.vue'),
//                     },
//                     {
//                         path: 'ecommerce',
//                         name: 'ecommerce',
//                         component: () => import('../views/apps/Ecommerce.vue'),
//                     },
//                     {
//                         path: 'cart',
//                         name: 'cart',
//                         component: () => import('../views/apps/Cart.vue'),
//                     },
//                     {
//                         path: 'checkout',
//                         name: 'checkout',
//                         component: () => import('../views/apps/Checkout.vue'),
//                     },
//                     {
//                         path: 'create-invoice',
//                         name: 'create invoice',
//                         component: () =>
//                             import('../views/apps/CreateInvoice.vue'),
//                     },
//                     {
//                         path: 'print-invoice',
//                         name: 'print invoice',
//                         component: () =>
//                             import('../views/apps/PrintInvoice.vue'),
//                     },
//                     {
//                         path: 'todo-list',
//                         name: 'todo todo',
//                         component: () => import('../views/apps/TodoList.vue'),
//                     },
//                     {
//                         path: 'contact-grid',
//                         name: 'Contact Grid',
//                         component: () =>
//                             import('../views/contacts/ContactGrid.vue'),
//                     },
//                     {
//                         path: 'contact-table',
//                         name: 'Contact Table',
//                         component: () =>
//                             import('../views/contacts/ContactTable.vue'),
//                     },
//                     {
//                         path: 'contact-list',
//                         name: 'Contact List',
//                         component: () =>
//                             import('../views/contacts/ContactList.vue'),
//                     },
//                 ],
//             },
//             {
//                 path: '/charts',
//                 name: 'Charts',
//                 component: () => import('../views/charts/index.vue'),
//                 meta: {
//                     title: 'Widgets',
//                 },
//                 children: [
//                     {
//                         path: 'bar',
//                         name: 'bar',
//                         component: () => import('../views/charts/Bar.vue'),
//                     },
//                     {
//                         path: 'area',
//                         name: 'area',
//                         component: () => import('../views/charts/Area.vue'),
//                     },
//                     {
//                         path: 'line',
//                         name: 'line',
//                         component: () => import('../views/charts/Line.vue'),
//                     },
//                     {
//                         path: 'mix',
//                         name: 'mix',
//                         component: () => import('../views/charts/Mix.vue'),
//                     },
//                     {
//                         path: 'column',
//                         name: 'column',
//                         component: () => import('../views/charts/Column.vue'),
//                     },
//                     {
//                         path: 'pieDonut',
//                         name: 'pieDonut',
//                         component: () => import('../views/charts/PieDonut.vue'),
//                     },
//                     {
//                         path: 'radarChart',
//                         name: 'radarChart',
//                         component: () =>
//                             import('../views/charts/RadarChart.vue'),
//                     },
//                     {
//                         path: 'radialBar',
//                         name: 'radialBar',
//                         component: () =>
//                             import('../views/charts/RadialBar.vue'),
//                     },
//                     {
//                         path: 'scatter',
//                         name: 'scatter',
//                         component: () => import('../views/charts/Scatter.vue'),
//                     },
//                     {
//                         path: 'sparkline',
//                         name: 'sparkline',
//                         component: () =>
//                             import('../views/charts/Sparkline.vue'),
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         path: '/sessions',
//         name: 'sessions',
//         component: () => import('../views/sessions/index.vue'),
//         meta: {
//             title: 'Sessions',
//         },
//         children: [
//             {
//                 path: 'signin',
//                 name: 'signin',
//                 component: () => import('../views/sessions/SignIn.vue'),
//             },
//             {
//                 path: 'signin-two',
//                 name: 'signin two',
//                 component: () => import('../views/sessions/SignInTwo.vue'),
//             },
//             {
//                 path: 'signin-three',
//                 name: 'signin three',
//                 component: () => import('../views/sessions/SignInThree.vue'),
//             },
//             {
//                 path: 'signin-four',
//                 name: 'signin four',
//                 component: () => import('../views/sessions/SignInFour.vue'),
//             },
//             {
//                 path: 'signup',
//                 name: 'sign up',
//                 component: () => import('../views/sessions/SignUp.vue'),
//             },
//             {
//                 path: 'signup-two',
//                 name: 'sign up two',
//                 component: () => import('../views/sessions/SignUpTwo.vue'),
//             },
//             {
//                 path: 'signup-three',
//                 name: 'sign up three',
//                 component: () => import('../views/sessions/SignUpThree.vue'),
//             },
//             {
//                 path: 'signup-four',
//                 name: 'sign up four',
//                 component: () => import('../views/sessions/SignUpFour.vue'),
//             },
//             {
//                 path: '404',
//                 name: '404',
//                 component: () => import('../views/sessions/404.vue'),
//             },
//             {
//                 path: 'forgot',
//                 name: 'forgot',
//                 component: () => import('../views/sessions/Forgot.vue'),
//             },
//         ],
//     },
//     {
//         path: '/intro',
//         name: 'Intro',
//         component: () => import('../views/LandingPage.vue'),
//         meta: {
//             title: 'Intro',
//         },
//     },

//     { path: '/:path(.*)', component: NotFound },
// ]

// const router = createRouter({
//     history: createWebHistory(),
//     scrollBehavior(to, from, savedPosition) {
//         return { left: 0, top: 0 }
//     },

//     routes,
// })

// // 여기에 권한 설정
// router.beforeEach((to, from, next) => {
//     document.title = `${to.name} - ${import.meta.env.VITE_APP_TITLE}`
//     next()
// })
// router.afterEach(() => {
//     // Remove initial loading
//     const GullPreLoading = document.getElementById('loading_wrap')
//     if (GullPreLoading) {
//         GullPreLoading.style.display = 'none'
//     }
//     const secondarySideNav =
//         store.state.largeSidebar.sidebarToggleProperties.isSecondarySideNavOpen
//     if (window.innerWidth <= 1200) {
//         store.dispatch('largeSidebar/changeSidebarProperties')
//         if (secondarySideNav) {
//             store.dispatch('largeSidebar/changeSecondarySidebarProperties')
//         }
//     } else {
//         if (secondarySideNav) {
//             store.dispatch('largeSidebar/changeSecondarySidebarProperties')
//         }
//     }
// })

// export default router