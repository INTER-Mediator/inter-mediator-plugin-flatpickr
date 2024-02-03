IMParts_Catalog.flatpickr = {
  instantiate: function (targetNode) {
    var nodeId = targetNode.getAttribute('id')
    this.ids.push(nodeId)

    targetNode._im_getComponentId = (function () {
      var theId = nodeId
      return function () {
        return theId
      }
    })()
    targetNode._im_setValue = (function () {
      var aNode = targetNode
      return function (str) {
        aNode.value = str
      }
    })()
    targetNode._im_getValue = (function () {
      var aNode = targetNode
      return function () {
        return aNode.value
      }
    })()
  },

  ids: [],
  dateFormat: 'Y-m-d H:i',
  enableTime: true,
  enableSeconds: false,
  time_24hr: true,
  noCalendar: false,
  locale: 'ja',

  finish: function () {
    let self = IMParts_Catalog.flatpickr
    for (var i = 0; i < self.ids.length; i++) {
      var targetId = self.ids[i]
      var targetNode = document.getElementById(targetId)
      if (targetNode) {
        flatpickr(targetNode, {
          dateFormat: self.dateFormat,
          enableTime: self.enableTime,
          noCalendar: self.noCalendar,
          enableSeconds: self.enableSeconds,
          time_24hr: self.time_24hr,
          locale: self.locale,
          onChange: (function () {
            var thisId = targetId
            var thisNode = targetNode
            return function (selectedDates, dateStr) {
              thisNode.value = dateStr
              IMLibUI.valueChange(thisId)
            }
          })()
        })
      }
    }
    this.ids = []
  }
}
