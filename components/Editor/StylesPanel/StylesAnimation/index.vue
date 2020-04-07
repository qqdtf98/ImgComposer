<template>
  <div id="layout-animation">
    <div class="layout-list-box">
      <div class="layout-list">animation</div>
      <div ref="nestedRef" class="nested">
        <div class="animation-property-box">
          <div class="animation-box">
            <div class="animation-input">Animation</div>
            <select id="animation-type">
              <option value="none">NONE</option>
              <option value="bounce">Bounce</option>
              <option value="fadein">FADE IN</option>
              <option value="moveright">MOVE RIGHT</option>
              <option value="slidein">SLIDE IN</option>
              <option value="rotate">ROTATE</option>
              <option value="custom">CUSTOM</option>
            </select>
          </div>
          <div class="animation-box">
            <div class="animation-input">Time</div>
            <input class="animation-input-value" name="animation" />
          </div>
          <div class="animation-box">
            <div class="animation-input">Delay</div>
            <input class="animation-input-value" name="animation" />
          </div>
          <div class="animation-box">
            <div class="animation-input">Repeat</div>
            <select id="animation-repeat">
              <option value="custom">CUSTOM</option>
              <option value="infinite">INFINITE</option>
            </select>
          </div>
          <div class="animation-box">
            <div class="animation-input">Function</div>
            <select id="animation-function">
              <option value="ease">EASE</option>
              <option value="easein">EASE-IN</option>
              <option value="easeout">EASE-OUT</option>
              <option value="easeinout">EASE-IN-OUT</option>
              <option value="linear">LENEAR</option>
            </select>
          </div>
          <div class="animation-box">
            <div class="animation-input">Direction</div>
            <select id="animation-direction">
              <option value="normal">NORMAL</option>
              <option value="alternate">aLTERNATE</option>
              <option value="reverse">REVERSE</option>
              <option value="altreverse">ALT-REVERSE</option>
              <option value="linear">LENEAR</option>
            </select>
          </div>
          <div class="animation-btn-box">
            <div class="animation-apply">APPLY</div>
            <div class="animation-delete">DELETE</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const nestedRef = ref() as Ref<HTMLElement>

    onMounted(() => {
      const nested = nestedRef.value
      const toggler = document.getElementsByClassName('layout-list')
      let i
      let j
      for (i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener('click', function () {
          nested.style.transition = 'all 300ms ease'
          nested.classList.toggle('active')
          for (j = 0; j < nested.children.length; j++) {
            nested.children[j].classList.add('template')
          }
        })
      }
    })

    return {
      nestedRef,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

#layout-animation {
  .layout-list-box {
    text-align: left;
    // margin: 0.3rem;
    border-top: 1px solid #333538;
    border-bottom: 1px solid #333538;
    padding: 0.5rem;
    .layout-list {
      margin-left: 0.4rem;
      @include auto-text-color;
      cursor: pointer;
      user-select: none; /* Prevent text selection */
      transition: all 300ms ease;
    }
    .layout-list::before {
      content: '\FF1E';
      @include auto-text-color;
      display: inline-block;
      margin-right: 6px;
    }
    .layout-list-down::before {
      transform: rotate(90deg);
    }
    .nested {
      display: none;
    }
    .active {
      display: flex;
      margin-top: 0.3rem;
      margin-bottom: 0.3rem;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
    .template {
      @include auto-text-color;
    }
    .template::before {
      margin-right: 0.2rem;
    }
    .animation-property-box {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      .animation-box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        flex-direction: row;
        height: 2rem;
        position: relative;
        margin-top: 0.3rem;
        margin-bottom: 0.3rem;
        .animation-input {
          color: #868686;
          text-align: center;
          width: 6rem;
          position: absolute;
          left: 0;
        }
        .animation-input-value {
          width: 4rem;
          position: absolute;
          background: none;
          right: 0;
          border: none;
          border-bottom: 1px solid #768ea7;
        }
        #animation-type,
        #animation-repeat,
        #animation-function,
        #animation-direction {
          width: 6rem;
          position: absolute;
          background-color: #707070;
          right: 0;
          font-size: 0.8rem;
          border: none;
          padding: 0.1rem;
        }
      }
      .animation-btn-box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80%;
        flex-direction: row;
        height: 2rem;
        position: relative;
        margin-top: 1em;
        margin-bottom: 0.3rem;
        .animation-apply,
        .animation-delete {
          margin: 0.5rem;
          background-color: gray;
          padding: 0.3rem;
          font-size: 0.8rem;
          border-radius: 0.3rem;
        }
        .animation-delete {
        }
      }
    }
  }
}
</style>
