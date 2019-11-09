<template>
    <div>
        Your CRON expression:
        <input type="text" :value="value"/>
    </div>
</template>

<script>
export default {
  name: 'CronDisplay',
  props: {
      value: String
  },
  computed: {

  },
  data: () => ({

  })
}
</script>

<style>
</style>