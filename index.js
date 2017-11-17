$(document).ready(function () {
  UserRequestModule.init()
  FilteringModule.filterPicosEarned()
  FilteringModule.filterPicosSpent()
  ActivityModule.getActivityData()
})
