    const chromePicker = ref<HTMLElement>(null)
    const compoName = ref<HTMLElement>(null)
    const pickerValue = ref('')

    function setPickerValue(e: MouseEvent) {
      if (!chromePicker.value) return
      if (!compoName.value) return
      chromePicker.value.style.backgroundImage = 'none'
      chromePicker.value.style.backgroundColor = pickerValue.value
      compoName.value.style.color = pickerValue.value
      ctx.emit('set-color', pickerValue.value)
    }
