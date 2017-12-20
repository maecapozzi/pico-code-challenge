var UserRequestModule = (function () {
  var state = {
    filterEarned: false,
    filterUsed: false,
    unfiltered: true
  } || JSON.parse(Cookies.get('state'))

  var initializeState = function () {
    state = state || JSON.parse(Cookies.get('state'))
  }

  var setState = function () {
    if (state.filterEarned) {
      $('.used').hide()
    } else if (state.filterSpent) {
      $('.earned').hide()
    }
  }

  var storeState = function (state) {
    Cookies.set('state', state)
  }

  var updateState = function () {
    $('.filter-earned').click(function () {
      state = {
        filterEarned: true,
        filterSpent: false,
        unfiltered: false
      }
      storeState(state)
      return state
    })

    $('.filter-spent').click(function () {
      state = {
        filterEarned: false,
        filterSpent: true,
        unfiltered: false
      }
      storeState(state)
      return state
    })

    $('.filter-reset').click(function () {
      state = {
        filterEarned: false,
        filterSpent: false,
        unfiltered: true
      }
      storeState(state)
      return state
    })
  }

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
      let p = createElement('p')
      let address = createElement('li')
      let email = createElement('li')
      let button = createElement('button')

      p.html(`${user.first_name} ${user.last_name}`)
      address.html(`${user.city} ${user.state}`)
      email.html(`${user.email}`)
      button.html('See user activity')
          .attr('id', user.id)
          .attr('class', 'button user-button')

      $(address).append(email)
      $(p).append(address)
      $('.users').append(p)
      $('.users').append(button)
    })
  }

  var getUserId = function (e) {
    return event.target.id
  }

  var getActivityData = function () {
    var url = './json/activity.json'
    $('.user-button').click(function (e) {
      $('.clicked').remove()
      var id = getUserId()
      $('.activity-log').show()
      $('.users').hide()

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
      if (element.event === 'used') {
        setPicos(element, 'Spent', 'used')
      } else if (element.event === 'earned') {
        setPicos(element, 'Earned', 'earned')
      }
    })
  }

  var setPicos = function (element, string, className) {
    let picos = element.picos
    let p = createElement('p').addClass('clicked').addClass(className)
    p.html(string + ' ' + picos + ' picos')
    setState()
    return appendToLog(p)
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
    initializeState()
    getUsers()
    $('.activity-log').addClass('hidden')
  }

  return {
    init: init,
    updateState: updateState
  }
})()
