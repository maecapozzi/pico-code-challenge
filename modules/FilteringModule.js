var FilteringModule = (function () {
  var filterPicosEarned = function () {
    $('.filter-earned').click(function () {
      $('.used').hide()
      $('.earned').show()
    })
  }

  var filterPicosSpent = function () {
    $('.filter-spent').click(function () {
      $('.used').show()
      $('.earned').hide()
    })
  }

  return {
    filterPicosSpent: filterPicosSpent,
    filterPicosEarned: filterPicosEarned
  }
})()
