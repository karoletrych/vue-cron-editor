<template>
    <div class="inline">
        Every
        <v-select
          dense
          :items="Array(24).fill(0).map(Number.call, Number)"
          />
        hour(s) on minute
        <v-select
          dense
          :items="Array(60).fill(0).map(Number.call, Number)"
          />
    </div>
</template>

<script>

export default {
  name: 'Hourly',
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