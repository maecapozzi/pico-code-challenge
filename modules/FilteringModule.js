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

  var resetFilter = function () {
    $('.filter-reset').click(function () {
      $('.used').show()
      $('.earned').show()
    })
  }

  var backToUsers = function (element) {
    $('.show-users').click(function () {
      $('.users').show()
      $('.activity-log').hide()
    })
  }

  return {
    filterPicosSpent: filterPicosSpent,
    filterPicosEarned: filterPicosEarned,
    resetFilter: resetFilter,
    backToUsers: backToUsers
  }
})()
