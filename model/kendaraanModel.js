const connection = require('../config/database')

class kendaraanModel {
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query(`select k.no_pol, k.nama_kendaraan, k.gambar_kendaraan, t.transmisi_id, t.nama_transmisi from kendaraan k join transmisi t on k.id_transmisi = t.transmisi_id`, (err, rows) => {
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
            connection.query(`insert into kendaraan set ?`, data, function(err, result) {
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
            connection.query(`select k.no_pol, k.nama_kendaraan, k.gambar_kendaraan, t.transmisi_id, t.nama_transmisi from kendaraan k join transmisi t on k.id_transmisi = t.transmisi_id where k.no_pol = ?`, [id], function(err, result) {
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
            connection.query(`update kendaraan set ? where no_pol = ?`, [data, id], function(err, result) {
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
            connection.query(`delete from kendaraan where no_pol = ? `,  [id], function(err, result) {
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

module.exports = kendaraanModel