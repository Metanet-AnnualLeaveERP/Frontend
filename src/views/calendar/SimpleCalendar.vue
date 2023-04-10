<template>
    <div id="calendar">
        <h1>My Calendar</h1>
        <calendar-view
            :show-date="showDate"
            class="theme-default holiday-us-traditional holiday-us-official"
        >
            <template #header="{ headerProps }">
                <calendar-view-header
                    :header-props="headerProps"
                    @input="setShowDate"
                />
            </template>
        </calendar-view>
    </div>
</template>
<script>
import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar'

import '/node_modules/vue-simple-calendar/dist/style.css'
// The next two lines are optional themes
import '/node_modules/vue-simple-calendar/dist/css/default.css'
import '/node_modules/vue-simple-calendar/dist/css/holidays-us.css'

export default {
    name: 'app',
    data: function () {
        return { showDate: new Date() }
    },
    components: {
        CalendarView,
        CalendarViewHeader,
    },
    methods: {
        setShowDate(d) {
            this.showDate = d
        },
    },
}
</script>
<style>
#calendar {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    height: 80vh;
    width: 90vw;
    margin-left: auto;
    margin-right: auto;
}
</style>
