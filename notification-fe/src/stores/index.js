import UserStore from "./UserStore";
import TaskStore from "./TaskStore";

export default class RootStore {
    constructor() {
        this.userStore = UserStore;
        this.taskStore = TaskStore;
    }
}