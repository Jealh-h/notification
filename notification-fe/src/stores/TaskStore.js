import axios from '../util/axios';
import { makeAutoObservable, runInAction } from "mobx";

class TaskStore {
    taskInfo = {}
    tasks = []
    isLoading = true
    totalPage = 0
    currentPage = 1
    pageSize = 6
    constructor() {
        makeAutoObservable(this);
    }
    resetTaskInfo() {

    }
    async addTask(data) {
        try {
            let res = await axios.post('/api/task/addtask', data);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async deleteTask(_id) {
        let res = await axios.delete('/api/task/delete', { data: { _id }, params: { _id } });
        this.loadTasks();
    }
    /**
     * 加载task数据
     * 使用分页查询
     */
    async loadTasks() {
        this.isLoading = true;
        let res = await axios.get('/api/task/querytask', {
            params: {
                currentPage: this.currentPage,
                pageSize: this.pageSize
            }
        });
        runInAction(() => {
            this.tasks = res;
            this.isLoading = false;
        })
    }

    /**
     * 翻页函数
     * @param {NUmber} e 当前页号 
     */
    pageChange(e) {
        runInAction(() => {
            this.currentPage = e;
            this.loadTasks();
        });
    }

    /**
     * 获取task总数
     */
    async getTotalNumber() {
        const number = await axios.get('/api/task/total');
        runInAction(() => {
            this.totalPage = Math.ceil(number / this.pageSize);
        })
    }

    async test() {
        const res = await axios.get('/api/task/test');
    }
}
export default TaskStore;
