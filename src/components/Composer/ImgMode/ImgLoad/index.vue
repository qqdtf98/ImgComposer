    function setColor(color: string, index: number) {
      if (!identifierData[index]) return
      identifierData[index].color = color
      // TODO 색깔 선택이 한번씩 밀리는 문제 해결하기
    }
