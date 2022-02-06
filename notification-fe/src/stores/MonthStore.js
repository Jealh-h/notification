import { makeAutoObservable, runInAction } from 'mobx';
import axios from '../util/axios';

export default class MonthDataStore {
    monthData = {};
    year = new Date().getFullYear()
    month = new Date().getMonth()
    constructor() {
        makeAutoObservable(this);
    }
    async getMonthData() {
        const res = await axios.get('/api/task/monthdata', {
            params: {
                year: this.year,
                month: this.month
            }
        })
        runInAction(() => {
            // TODO处理数据变换成map形式
            // this.monthData = res;
            res.forEach((item, index) => {
                const date = `${item.month - 1}月${item.date}日`
                if (!this.monthData[date]) {
                    this.monthData[date] = [];
                }
                this.monthData[date].push(item);
            })
        })
    }
}