$(document).ready(function () {
  'strict mode'
  UserRequestModule.init()
  UserRequestModule.updateState()
  FilteringModule.filterPicosEarned()
  FilteringModule.filterPicosSpent()
  FilteringModule.resetFilter()
  FilteringModule.backToUsers()
})
