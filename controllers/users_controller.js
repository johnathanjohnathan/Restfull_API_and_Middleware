const { users } = require('../models')
const bcrypt = require('bcrypt')
const express = require('express')

class UserController {
    static async register(req, res, next){
        const { email, gender, password, role } = req.body
        const hashedPassword = bcrypt.hashSync(password,8)
        const data = await users.create({
            email, gender, password: hashedPassword, role
        })

        res.status(200).json(data)
    }

    static async login(req, res, next){
        const { email, password} = req.body

        try{
            const user = await users.findOne({
                where: {email}
            })

            if(!user || !bcrypt.compareSync(password, user.password)){
                return res.status(401).json(
                   {message: "Invalid Credential"}
                )
            }

            res.status(200).json({
                message: "Login Success"
            })
        } catch(err){
            next(err)
        }
    }
    
    static async get(req, res, next){
        const { page=1 , limit =10} = req.query
        const offset = (page-1) * limit
        try{
            const data = await users.findAndCountAll({
                limit: parseInt(limit),
                offset: parseInt(offset)
            })

            res.status(200).json({
                totalItems: data.count,
                totalPages: Math.ceil(data.count/limit),
                currentPage: parseInt(page),
                users: data.rows 
            })
        } catch(err){
            next(err)
        }
    }

    static async updateOne(req, res, next) {
        const { id } = req.params
        const { email, gender, password, role } = req.body
        const hashedPassword = bcrypt.hashSync(password,8)
        const data = await users.update(
            { email: email,
                gender: gender,
                password: hashedPassword,
                role: role
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
        const data = await users.findByPk(id)

        res.status(200).json(data)
    }

    static async delete(req,res,next){
        const { id } = req.params
        const data = await users.destroy(
            {where: {
                id: id}})
        res.status(200).json(
            {
                message: "Succesfully Deleted"
            }
        )
    }

}

module.exports = UserController