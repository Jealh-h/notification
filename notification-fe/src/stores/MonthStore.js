import { makeAutoObservable, runInAction } from 'mobx';
import axios from '../util/axios';

export default class MonthDataStore {
    monthData = {};
    year = new Date().getFullYear()
    month = new Date().getMonth()
    currentDate = new Date();
    constructor() {
        makeAutoObservable(this);
    }
    async getMonthData(date) {
        const res = await axios.get('/api/task/monthdata', {
            params: {
                year: this.year,
                month: this.month
            }
        })
        runInAction(() => {
            this.monthData = {};
            res.forEach((item, index) => {
                const date = `${item.month}月${item.date}日`
                if (!this.monthData[date]) {
                    this.monthData[date] = [];
                }
                this.monthData[date].push(item);
            })
            if (date) {
                this.currentDate = date;
            }
        })
    }

    /**
     * 改变月视图的时间
     * @param {Date} date 
     */
    changeDate(date) {
        runInAction(() => {
            this.year = date.getFullYear();
            this.month = date.getMonth();
            this.getMonthData(date);
        })
    }
}