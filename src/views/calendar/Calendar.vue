<template>
    <div class="calendar-div">
        <bryntum-project-model
            ref="project"
            v-bind="projectConfig"
            :resources="resources"
        />
        <bryntum-calendar
            ref="calendar"
            v-bind="calendarConfig"
            :events="events"
        />
    </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'

import { BryntumProjectModel, BryntumCalendar } from '@bryntum/calendar-vue-3'

import { useCalendarConfig, useProjectConfig } from '@/calendar/config.js'

export default {
    components: {
        BryntumProjectModel,
        BryntumCalendar,
    },

    setup() {
        const calendar = ref(null)
        const project = ref(null)

        const calendarConfig = reactive(useCalendarConfig())
        const projectConfig = reactive(useProjectConfig())

        const resources = ref(null)
        const events = ref(null)

        resources.value = [
            {
                id: 1,
                name: 'Default Calendar',
                eventColor: 'green',
            },
            {
                id: 2,
                name: 'test',
                eventColor: 'red',
            },
        ]
        events.value = [
            {
                id: 1,
                name: 'Meeting',
                startDate: '2023-04-09T10:00:00',
                endDate: '2023-04-09T11:00:00',
                resourceId: 1,
            },
        ]

        onMounted(() => {
            calendar.value.instance.value.project = project.value.instance.value
        })

        return {
            project,
            calendar,
            projectConfig,
            calendarConfig,
            resources,
            events,
        }
    },
}
</script>

<style lang="scss">
@import '@bryntum/calendar/calendar.stockholm.css';

.calendar-div {
    display: flex;
    height: 77vh;
    // width: 90vw;
    margin-left: auto;
    margin-right: auto;
}
</style>
