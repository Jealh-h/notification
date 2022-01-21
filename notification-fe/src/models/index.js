import { TaskModel } from './notification';
import { UserModel } from './user';
import createStore from '../util/store';

const userModel = new UserModel({
    "login": '',
    "name": '',
    "id": '',
    "avatar_url": '',
})
const taskModel = new TaskModel({
    "taskInfo": {},
    "tasks": [],
})

export default createStore(userModel, taskModel);


