var UserRequestModule = (function () {
  var getUsers = function () {
    var url = './json/users.json'

    $.ajax({
      url: url
    }).done(function (data) {
      var sortedUsers = data.users.sort(compare)
      getUserData(sortedUsers)
    }).then(function () {
      getActivityData()
    })
  }

  var getUserData = function (users) {
    return users.map(function (user) {
      let div = createElement('div')
      let p = createElement('p')
      let address = createElement('li')
      let email = createElement('li')
      let button = createElement('button')

      p.html(`${user.first_name} ${user.last_name}`)
      address.html(`${user.city} ${user.state}`)
      email.html(`${user.email}`)
      button.html('See user activity')
          .attr('id', user.id)
          .attr('class', 'user-button')

      $(address).append(email)
      $(p).append(address)
      $('.users').append(p)
      $('.users').append(button)
    })
  }

  getUserId = function (e) {
    return event.target.id
  }

  var getActivityData = function () {
    var url = './json/activity.json'
    $('.user-button').click(function (e) {
      $('.clicked').remove()
      var id = getUserId()

      $.ajax({
        url: url
      }).done(function (data) {
        getActivities(data, id)
      })
    })
  }

  var getActivities = function (data, id) {
    for (var key in data) {
      if (key === id) {
        var individualData = data[key]
        countSpentPicos(individualData)
      }
    }
  }

  var countSpentPicos = function (data) {
    data.map(element => {
      element.event === 'used' ? buildLog(element, 'Used') : buildLog(element, 'Earned')
    })
  }

  var buildLog = function (element, string) {
    let picos = element.picos
    let p = setActivityLog()
    setActivityLog(element, 'used')
    p.html(string + ' ' + picos + ' picos')
    return appendToLog(p)
  }

  var setActivityLog = function (element, className) {
    return createElement('p').addClass('clicked').addClass('used')
  }

  var appendToLog = function (element) {
    return $('.activity-log').append(element)
  }

  var createElement = function (element) {
    return $('<' + element + '></' + element + '>')
  }

  var compare = function (a, b) {
    if (a.date_created < b.date_created) return -1
    if (a.date_created > b.date_created) return 1
    return 0
  }

  var init = function () {
    getUsers()
  }

  return {
    init: init
  }
})()
