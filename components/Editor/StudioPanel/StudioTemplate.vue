    <div
      v-for="(template, i) in templates"
      :key="i"
      class="template-wrapper"
      @mousedown="insertTemplate"
    >
      <div class="default-template">
        <block-icon v-if="template === 'block'" class="template-icon" />
        <image-icon v-if="template === 'image'" class="template-icon" />
        <link-icon v-if="template === 'link'" class="template-icon" />
        <text-icon v-if="template === 'text'" class="template-icon" />
        <span class="template-text">{{ templateList[template].name }}</span>
      </div>
      <div v-if="templateList[template].options" class="optional-template">
        <div
          v-for="(list, j) in templateList[template].optionList"
          :key="j"
          class="template-option"
        >
          {{ list }}
        </div>
      </div>
    </div>
import BlockIcon from '@/components/icons/BlockIcon.vue'
import ImageIcon from '@/components/icons/ImageIcon.vue'
import LinkIcon from '@/components/icons/LinkIcon.vue'
import TextIcon from '@/components/icons/TextIcon.vue'

    function insertTemplate(e: MouseEvent) {
      let target = e.target as HTMLElement
      if (target) {
        while (1) {
          if (target.className === 'template-wrapper') break
          else if (target.parentElement) {
            target = target.parentElement
          }
        }
        let moveEvent: (e: MouseEvent) => void
        let upEvent: (e: MouseEvent) => void
        const copyTarget = target.cloneNode(true) as HTMLElement
        const initLeftInter = e.clientX - target.getBoundingClientRect().left
        const initTopInter = e.clientY - target.getBoundingClientRect().top
        copyTarget.style.opacity = '0.8'
        copyTarget.style.position = 'fixed'
        copyTarget.style.left = target.style.left
        copyTarget.style.top = target.style.top
        copyTarget.style.zIndex = '555'
        target.appendChild(copyTarget)

        window.addEventListener(
          'mousemove',
          (moveEvent = (e: MouseEvent) => {
            copyTarget.style.left = e.clientX - initLeftInter + 'px'
            copyTarget.style.top = e.clientY - initTopInter + 'px'
          })
        )
        window.addEventListener(
          'mouseup',
          (upEvent = () => {
            target.removeChild(copyTarget)
            window.removeEventListener('mousemove', moveEvent)
            window.removeEventListener('mouseup', upEvent)
          })
        )
      }
    }
