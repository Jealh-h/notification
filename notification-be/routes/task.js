const express = require('express');
const TaskDAO = require('../DAO/task');
var router = express.Router();
const taskDao = new TaskDAO();
const util = require('../utils/util')
router.get('/querytask', (req, res) => {
    console.log("---querytask---", req.query);
    const data = util.getTokenInfo(req);
    res.json({
        data: data,
        status: "OK"
    });
});
router.post('/addtask', (req, res) => {
    try {
        const tokenData = util.getTokenInfo(req);
        const { uuid, verifycode } = req.body;
        const data = { ...req.body, ...tokenData };
        delete data?.uuid;
        delete data?.verifycode;
        console.log(data);
        taskDao.create(data);
        res.json({
            data: req.body,
            status: "OK"
        })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;