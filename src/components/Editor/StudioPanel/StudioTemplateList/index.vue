<template>
  <div id="template-options" class="template-category">
    <div
      v-for="(temp, i) in templates"
      :key="i"
      state="false"
      class="template-list-box"
    >
      <div class="template-list">
        <div class="template-text">{{ temp }}</div>
        <img class="template-icon" src="@/assets/images/down.svg" />
      </div>
      <div class="nested active">
        <BasicTemplates v-if="temp === 'Basic Templates'" class="template" />
        <PageTemplates v-if="temp === 'Page Templates'" class="template" />
        <!-- <SampleTemplate v-if="temp === 'Custom Templates'" class="template" /> -->
        <CustomTemplates v-if="temp === 'Custom Templates'" class="template" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'
import BasicTemplates from './BasicTemplates.vue'
import PageTemplates from './PageTemplates.vue'
import CustomTemplates from './CustomTemplates.vue'
import SampleTemplate from './SampleTemplate.vue'

export default defineComponent({
  components: {
    BasicTemplates,
    PageTemplates,
    CustomTemplates,
    SampleTemplate,
  },
  setup() {
    const templates: string[] = [
      'Basic Templates',
      'Page Templates',
      'Custom Templates',
    ]

    onMounted(() => {
      const toggler = document.getElementsByClassName('template-list')
      let i
      for (i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener('click', function (e) {
          let target = e.target as HTMLElement
          if (target.className !== 'template-list') {
            target = (e.target as HTMLElement).closest(
              '.template-list'
            ) as HTMLElement
          }

          if (target.parentElement) {
            if (target.parentElement.children[1] instanceof HTMLElement) {
              target.children[1].classList.toggle('icon-rotate')
              if (target.parentElement.getAttribute('state') === 'true') {
                target.parentElement.setAttribute('state', 'false')
                target.parentElement.style.height = '50px'
              } else {
                target.parentElement.setAttribute('state', 'true')
                let newHeight = 20
                let i
                for (i = 0; i < target.parentElement.children.length; i++) {
                  newHeight += target.parentElement.children[
                    i
                  ].getBoundingClientRect().height
                }
                target.parentElement.style.height = newHeight + 'px'
              }
            }
          }
        })
      }
    })
    return {
      templates,
    }
  },
})
</script>

<style lang="scss">
@use '@/assets/styles/package' as *;

.template-category {
  .template-list-box {
    text-align: left;
    border-bottom: 1px solid #000000;
    padding: 0.5rem;
    overflow: hidden;
    height: 50px;
    transition: height 0.3s ease;

    .template-list {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-left: 0.4rem;
      min-height: 30px;
      position: relative;
      @include auto-text-color;
      cursor: pointer;
      letter-spacing: 0.3px;
      font-weight: 450;
      user-select: none; /* Prevent text selection */
      transition: all 300ms ease;

      .template-text {
        font-weight: 700;
        position: absolute;
        left: 0;
      }

      .template-icon {
        height: 7px;
        position: absolute;
        right: 0;
      }
    }

    .template-list::before {
      @include auto-text-color;
      display: inline-block;
      margin-right: 6px;
    }

    .template-list-down::before {
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

    .icon-rotate {
      transform: rotate(180deg);
    }

    .template {
      @include auto-text-color;
    }

    .template::before {
      margin-right: 0.2rem;
    }
  }
}
</style>
