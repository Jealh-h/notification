/**
 * 定义抽象基类DAO(Data access object)
 * crud基本操作
 */

class BaseDAO {
    /**
     * 由不同model的子类构造
     * @param model
     */
    constructor(Model) {
        this.Model = Model;
    }

    /**
     * 
     * @param {object} obj 构造实体的对象 
     * @returns {Promise}
     */
    create(obj) {
        return new Promise((resolve, reject) => {
            let entity = new this.Model(obj);
            this.Model.create(entity, (error, result) => {
                if (error) {
                    console.log(`model create error--->${error}`);
                    reject(error);
                } else {
                    console.log(`model create success`);
                    resolve(result)
                }
            })
        })
    }

    /**
     * 使用 Model save()添加 doc
     * 
     * @param {object} 构造实体对象
     */
    save(obj) {
        return new Promise((resolve, reject) => {
            let entity = new this.Model(obj);
            entity.save((error, result) => {
                if (error) {
                    console.log(`save error=>${error}`);
                    reject(error);
                } else {
                    console.log(`save success`);
                    resolve(result);
                }
            })
        })
    }

    /**
     * 查找所有
     * @param {object} condition 
     * @param {object} constraints 
     * @returns {Promise}
     */
    findAll(condition, constraints) {
        return new Promise((resolve, reject) => {
            this.Model.find(condition, constraints ? constraints : null, (error, result) => {
                if (error) {
                    console.log(`findAll error=>${error}`);
                    reject(error);
                } else {
                    console.log(`findAll success`);
                    resolve(result);
                }
            })
        })
    }

    /**
     * 查找一个
     * @param {object} condition 
     * @param {object} constraints 
     * @returns {Promise}
     */
    findOne(condition, constraints) {
        return new Promise((resolve, reject) => {
            this.Model.findOne(condition, constraints ? constraints : null, (error, result) => {
                if (error) {
                    console.log(`findOne error=>${error}`);
                    reject(error);
                } else {
                    console.log(`findOne success`);
                    resolve(result);
                }
            })
        })
    }

    /**
     * 查找排序后的第一个
     * @param {object} condition 
     * @param {string} orderColumn 
     * @param {string} order 
     * @returns {Promise}
     */
    findFirstByOrder(condition, orderColumn, order) {
        return new Promise((resolve, reject) => {
            this.Model.findOne(condition)
                .sort({
                    [orderColumn]: orderType
                }).exec((err, record) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(record);
                    }
                })
        })
    }

    /**
     * 更新
     * @param {object} condition 
     * @param {object} updater 
     * @returns {Promise}
     */
    update(condition, updater) {
        return new Promise((resolve, reject) => {
            this.Model.updateOne(condition, updater, (error, result) => {
                if (error) {
                    console.log(`update error=>${error}`);
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        })
    }

    /**
     * 删除
     * @param {object} condition 
     * @returns {Pormise}
     */
    remove(condition) {
        return new Promise((resolve, reject) => {
            this.Model.remove(condition, (error, result) => {
                if (error) {
                    console.log(`remove error=>${error}`);
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        })
    }
}
module.exports = BaseDAO;