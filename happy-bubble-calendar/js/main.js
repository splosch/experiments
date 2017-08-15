// using Array.reduce - TODO provide polyfill

// global helper
function isInt(value) {
  return typeof value === "number" &&
         !isNaN(value) &&
         parseInt(Number(value)) == value &&
         !isNaN(parseInt(value, 10));
}

//Source Code
var CalendarForYear = function(year) {
  var cal      = {},
      months   = ["January", "February", "March", "April", "Mai", "June", "July", "August", "September", "October", "November", "December"],
      weekdays = ["Sunday" ,"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // TODO implement simple localization
  //weekdays  = ["So" ,"Mo", "Di", "Mi", "Do", "Fr", "Sa"];

  cal.year = year;

  cal.firstWeekdayOfTheYear = function(year){
    var year = year || (year === null ? null : this.year),
        first_of_january = (new Date('January 1,'+year)).getDay();

    return weekdays[first_of_january] || null;
  };

  cal.isLeapYear = function(year) {
    var year = year || (year === null ? null : this.year),
        isLeapYear = null;

    if(year && isInt(year)) {
      isLeapYear = ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
    }

    return isLeapYear;
  };

  cal.days_per_month = function(month, year){
    var year = year || (year === null ? null : this.year),
        days = null,
        days_per_month_array = [31, cal.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 30, 31];

    return days_per_month_array[month];
  }

  cal.nthDayWeekday = function(day, year){
    var year = year || (year === null ? null : this.year),
        dayName = null,
        offset  = weekdays.indexOf(cal.firstWeekdayOfTheYear(year)) + 6,
        weekday = (day + offset) % 7,
        maxDaysInYear = cal.isLeapYear(year) ? 366 : 365;

    if (day <= maxDaysInYear) {
      dayName = weekdays[weekday]
    }

    return dayName;
  };

  cal.buildCalendarObject = function(months){
    var monthArr = months,
    obj = { months: [] };

    monthArr.forEach(function(month, current_month_index, monthArr){
      var currentMonth = { name: month, days: [] },
      month_day_offset = 0,
      totalDays = cal.days_per_month(current_month_index, year);

      for(var day_count=1; day_count <= totalDays; day_count++){
        var day_index = day_count + month_day_offset,
        name_of_day = cal.nthDayWeekday(day_index, year);

        currentMonth.days.push({ name: name_of_day, index: day_index });
      }

      // finally
      obj.months.push(currentMonth);
      // update monthly offset only after month is over
      month_day_offset += totalDays;
    });

    return obj;
  };

  cal.renderAt = function($element){
    var calData   = cal.buildCalendarObject(months) || {},
        $calEmptyBubbles = '<li class="example"><ul class="days nolist"><li></li><li></li><li></li><li></li><li></li></ul></li>';

    if(!($element && $element.length === 1)){
      return false;
    }

    $element.html("");
    calData.months.forEach(function(month, index, months){
      var $currentMonth = $("<li class='month'><h2 class='month__title'>"+ month.name +"</h2></li>"),
      $currentMonthDays = $("<ol class='days nolist'></ol>");

      if(month.days && month.days.length > 0) {
        month.days.forEach(function(day, index, days){
          $currentMonthDays.append($("<li data-day-index='"+day.index+"' data-day-name='"+day.name+"'></li>"));
        });
      }else{
        $currentMonthDays.html("");
      }

      $currentMonth.append($currentMonthDays);
      $element.append($currentMonth);
    });

    $element.append($calEmptyBubbles);
  };

  cal.obj  = cal.buildCalendarObject(months);

  return cal;
};



$( document ).ready(function() {
  var cal, data, year;

  function updateCalender(){
    var titleString = $("#main_title").val();

    year = Number.parseInt(titleString.match(/\d{4}/g) || 2016);

    cal = CalendarForYear(year);
    cal.renderAt($("#cal"));
  }

  function closeDialog(){
    $("#dialog").remove();
    $(".background").toggleClass("background");
  }

  updateCalender();
  $("input#main_title").on("keyup", updateCalender);

  $("#confirm_title").on("click", closeDialog);
});
