<template>
  <nuxt />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useVuex } from '../modules/vue-hooks'
import { Vuex } from '@/modules/vuex'
import 'codemirror/lib/codemirror.css'

export default defineComponent({
  setup(...args) {
    const ctx = args[1]
    const vuexStore = useVuex(ctx)

    Vuex.init(vuexStore)
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/global' as *;
</style>
