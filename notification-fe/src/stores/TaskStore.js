import axios from '../util/axios';
import { makeAutoObservable } from "mobx";

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
            console.log("--addtask-", res);
        } catch (error) {
            console.log(err);
        }
    }

    async deleteTask() {
        let res = await axios.delete('/api/task/delete', { id: 123 });

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
        console.log(res);
    }
}
export default TaskStore;
