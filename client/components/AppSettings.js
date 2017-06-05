export default (function AppSettings() {
    var today = new Date();

    function isLeapYear(){
        return today.getFullYear() % 4 == 0;
    }

    return {
        today: today,
        currentDate: today.getDate(),
        currentDay: today.getDay(),
        currentMonth: today.getMonth(),
        currentYear: today.getFullYear(),
        isLeapYear: isLeapYear(),
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        daysInMonth: [31, (isLeapYear() ?29 :28) , 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'],
        daysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        
};
}());
