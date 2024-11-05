import type { Ref } from "vue";

export const resizeTextArea = (refVal: Ref) => {
    refVal.value.style.height = 'auto'
    if (refVal.value.scrollHeight < 104) {
      refVal.value.style.height = refVal.value.scrollHeight + 'px'
    } else {
      refVal.value.style.height = '6.5rem'
    }
    if (refVal.value.scrollHeight > 40) {
      refVal.value.classList.add('expanded-text')
    } else {
      refVal.value.classList.remove('expanded-text')
    }
}