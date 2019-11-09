<template>
    <div class="inline">
        Every
        <v-select
          dense
          :items="Array(31).fill(0).map(Number.call, Number)"
          />
        day(s) at
        <v-select
          dense
          :items="Array(24).fill(0).map(Number.call, Number)"
          />
        <v-select
          dense
          :items="Array(60).fill(0).map(Number.call, Number)"
          />
    </div>
</template>

<script>

export default {
  name: 'Daily',
  computed: {

  },
  data: () => ({

  })
}
</script>

<style>
.inline{
    display: inline-flex
}
</style>