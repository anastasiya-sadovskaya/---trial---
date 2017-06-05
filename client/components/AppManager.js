import AppSettings from './AppSettings';

export default (function AppManager() {
    return{
        visibleMonth: AppSettings.currentMonth,
        days: [],
    }
}());
