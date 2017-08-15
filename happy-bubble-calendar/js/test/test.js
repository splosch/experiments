
// Jasmine Specs for calender
describe('_isLeapYear(year) differentiates leap from non-leap years', function() {
  var myCal = new CalendarForYear(2012);

  it('detects leap years', function() {
      expect(myCal.isLeapYear(2000)).toBe(true);
      expect(myCal.isLeapYear(2004)).toBe(true);
  });

  it('detects non-leap years', function() {
    expect(myCal.isLeapYear(1999)).toBe(false);
    expect(myCal.isLeapYear(2001)).toBe(false);
  });

  it('returns null for invalid parameters', function() {
    //expect(myCal.isLeapYear("2000")).toBe(null);
    expect(myCal.isLeapYear(null)).toBe(null);
    //expect(myCal.isLeapYear({ foo : "bar" })).toBe(null);
  });

  it('for no given parameter it takes the year the instance was created with', function() {
    var myCal = new CalendarForYear(2012);
    expect(myCal.isLeapYear()).toBe(true);

    var myNoLeapCal = new CalendarForYear(2010);
    expect(myNoLeapCal.isLeapYear()).toBe(false);
  });
});

describe('_firstWeekdayOfTheYear(year) return name of 01. January', function() {
  var myCal = new CalendarForYear(2012);

  it('for given year', function() {
    expect(myCal.firstWeekdayOfTheYear(2025)).toBe("Wednesday");
    expect(myCal.firstWeekdayOfTheYear(2000)).toBe("Saturday");
    expect(myCal.firstWeekdayOfTheYear(1982)).toBe("Friday");
  });

  it('for current instance if no year defined', function() {
    var my2012Cal = new CalendarForYear(2012);
    expect(my2012Cal.firstWeekdayOfTheYear()).toBe("Sunday");
  });
});

describe('_nthDayWeekday(day, year) prints name for the n-th day of the year ', function() {
  var myCal = new CalendarForYear(2012);

  // e.g. 1st day of 2017 is 2017/01/01 --> Thursday
  it('handles non-leap year day range', function() {
    expect(myCal.nthDayWeekday(1,2017)).toBe("Thursday");
    expect(myCal.nthDayWeekday(7,2017)).toBe("Wednesday");
    expect(myCal.nthDayWeekday(365,2017)).toBe("Thursday");

    // for non leap year there is no 366th day
    expect(myCal.nthDayWeekday(366,2017)).toBe(null);
  });

  it('handles leap year day range', function() {
    expect(myCal.nthDayWeekday(1,2016)).toBe("Friday");
    expect(myCal.nthDayWeekday(7,2016)).toBe("Thursday");
    expect(myCal.nthDayWeekday(365,2016)).toBe("Friday");
    expect(myCal.nthDayWeekday(366,2016)).toBe("Saturday");
  });

  it('for current instance if no year defined', function() {
    var my2016Cal = new CalendarForYear(2016);
    expect(my2016Cal.nthDayWeekday(1)).toBe("Friday");
    expect(my2016Cal.nthDayWeekday(366)).toBe("Saturday");
  });
});

describe('_buildCalendarObject(months) returns an object with calendar data ', function() {
  var myCal = new CalendarForYear(2012),
      months   = ["January", "February", "March", "April", "Mai", "June", "July", "August", "September", "October", "November", "December"];

  it('returns the same object as the obj literal on the CalendarForYear instance', function() {
    expect(JSON.stringify(myCal.buildCalendarObject(months))).toBe(JSON.stringify(myCal.obj));
  });
});
