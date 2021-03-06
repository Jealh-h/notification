import UserStore from "./UserStore";
import TaskStore from "./TaskStore";
import VerifyStore from './VerifyStore';
import MonthDataStore from "./MonthStore";

export default class RootStore {
    constructor() {
        this.userStore = new UserStore();
        this.taskStore = new TaskStore();
        this.verifyStore = new VerifyStore();
        this.monthDataStore = new MonthDataStore();
    }
}