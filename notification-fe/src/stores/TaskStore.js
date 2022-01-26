import axios from '../util/axios';
import { makeAutoObservable } from "mobx";

class TaskStore {
    taskInfo = {}
    tasks = []
    isLoading = true

    constructor() {
        makeAutoObservable(this);
    }

    async addTask() {
        let res = await axios.post('/api/task/add', { data: {} })
    }

    async deleteTask() {
        let res = await axios.delete('/api/task/delete', { id: 123 });

    }

    async loadTasks() {
        this.isLoading = true;
        let res = await axios.get('/api/task/gettask');
    }
}
export default new TaskStore();
