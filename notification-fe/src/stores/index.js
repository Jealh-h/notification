import UserStore from "./UserStore";
import TaskStore from "./TaskStore";
import VerifyCodeStore from "./verifyCodeStore";
import VerifyStore from './VerifyStore';

export default class RootStore {
    constructor() {
        this.userStore = new UserStore();
        this.taskStore = new TaskStore();
        // this.verifyStore = new VerifyCodeStore();
        this.verifyStore = new VerifyStore()
    }
}