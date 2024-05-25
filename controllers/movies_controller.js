const { movies } = require('../models')

class MovieController {
    static async create(req, res, next){
        const { title, genres, year } = req.body
        const data = await movies.create({
            title, genres, year
        })

        res.status(200).json(data)
    }
    
    static async get(req, res, next){
        const data = await movies.findAll()

        res.status(200).json(data)
    }

    static async updateOne(req, res, next) {
        const { id } = req.params
        const { title, genres, year } = req.body
        const data = await movies.update(
            { title: title,
                genres: genres,
                year: year
             },
            {
              where: {
                id: id,
              }
            },
          )
        res.status(200).json({
            message: "Data Succesfully Updated"
        })
    }

    static async getOne(req, res, next) {
        const { id } = req.params
        const data = await movies.findByPk(id)

        res.status(200).json(data)
    }

    static async delete(req,res,next){
        const { id } = req.params
        const data = await movies.destroy(
            {where: {
                id: id}})
        res.status(200).json(
            {
                message: "Succesfully Deleted"
            }
        )
    }

}

module.exports = MovieController