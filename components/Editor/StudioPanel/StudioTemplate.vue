        <block-icon v-if="template === 'block'" class="template-icon" />
        <image-icon v-if="template === 'image'" class="template-icon" />
        <link-icon v-if="template === 'link'" class="template-icon" />
        <text-icon v-if="template === 'text'" class="template-icon" />
import BlockIcon from '@/components/icons/BlockIcon.vue'
import ImageIcon from '@/components/icons/ImageIcon.vue'
import LinkIcon from '@/components/icons/LinkIcon.vue'
import TextIcon from '@/components/icons/TextIcon.vue'
