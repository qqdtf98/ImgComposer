        @set-color="setColor"
    function setColor(color: string) {
      ctx.emit('set-color', color)
    }
