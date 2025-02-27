const connection = require('../config/database')

class transmisiModel {
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query(`select * from transmisi`, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                }
            )
        })
    }

    static async Store(data) {
        return new Promise((resolve, reject) => {
            connection.query(`insert into transmisi set ?`, data, function(err, result) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                }
            )
        })
    }

    static async getId(id) {
        return new Promise((resolve, reject) => {
            connection.query(`select * from transmisi where transmisi_id = `, + id, function(err, result) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                }
            )
        })
    }

    static async update(id, data) {
        return new Promise((resolve, reject) => {
            connection.query(`update transmisi set ? where transmisi_id = ?`, [data, id], function(err, result) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                }
            )
        })
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            connection.query(`delete from transmisi where transmisi_id = ? `,  [id], function(err, result) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                }
            )
        })
    }
}

module.exports = transmisiModel