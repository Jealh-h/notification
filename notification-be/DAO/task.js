const BaseDAO = require('./index');
const TaskModel = require('../model/task.js');

class TaskDAO extends BaseDAO {
    constructor() {
        super(TaskModel);
    }
}
module.exports = new TaskDAO();