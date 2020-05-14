<template>
  <div class="side-panel-pages">
    <div class="previews">
      <div
        v-for="(page, i) in store.identifier.pages"
        :key="i"
        class="image-wrapper"
      >
        <img :src="page.imageData" />
      </div>
    </div>
    <input
      id="side-panel-input-file"
      type="file"
      accept="image/*"
      @change="handleInputFileChange"
    />
    <label class="add" for="side-panel-input-file"><p>＋</p></label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useStore } from '@/modules/vue-hooks'

export default defineComponent({
  setup(...args) {
    const ctx = args[1]
    const store = useStore(ctx)

    const handleInputFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const file = target.files && target.files.length > 0 && target.files[0]

      if (!file) {
        return
      }

      // Accept only image file
      if (!file.type.startsWith('image/')) {
        return
      }

      const reader = new FileReader()

      reader.onload = (e) => {
        const imageData = e.target?.result as string

        if (!imageData) {
          // Failed to read image
          return
        }

        store.identifier.addPage({
          imageData,
          identifiers: [],
        })
      }

      reader.readAsDataURL(file)
    }

    return {
      store,
      handleInputFileChange,
    }
  },
})
</script>

<style lang="scss">
.side-panel-pages {
  width: 256px;
  background-color: #fff;
  border: 1px solid #ababab;
  box-sizing: border-box;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  #side-panel-input-file {
    position: fixed;
    left: -9999px;
    visibility: hidden;
  }

  .add {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    font-size: 20px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #f0f0f3;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }

    &:active {
      background-color: #e0e0e0;
    }
  }

  .previews {
    max-height: 400px;
    overflow: auto;
    margin: 30px 0 60px 0;

    .image-wrapper {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 98%;
      height: 130px;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      overflow: hidden;
      margin: 20px 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
