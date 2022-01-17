import * as fs from 'fs';
import stream from 'stream'
import { foodModel } from '../models/foodModel.js';
import { historiesModel } from '../models/historiesModel.js';
import { sessionModel } from '../models/sessionModel.js';
import { userModel } from '../models/userModel.js';
import { foodIngredientModel } from './../models/foodIngredientModel.js';

export const getHistory = async (req, res) => {
    console.log('Get History')
    try {
        const username = req.query.username

        let hitories = await historiesModel.find(
            {author: username}, 
            {createdAt: 0, updatedAt: 0, __v: 0,})
        .sort({time: "desc"})

        //GET HISTORIES
       let newHistories = []
       for (const history of hitories) {
           
           if(history.type == 'food') {
               let food = await foodModel.findOne(
                   {_id: history._foodID}, 
                   {_id: 0, createdAt: 0, updatedAt: 0, __v: 0, ingredients: 0, author: 0, description: 0}
               )

               const newFood = {
                   ...food?._doc,
                   _id: history._id,
                   time: history.time,
                   
                   name: history.name,
                   type: 'food',
                   calories: history.calories,
               }

               newHistories.push(newFood)
           } else if (history.type == 'session') {
               let session = await sessionModel.findOne(
                   {_id: history._sessionID}, 
                   {_id: 0, createdAt: 0, updatedAt: 0, __v: 0, author: 0, description: 0}
               )

               const newSession = {
                   ...session?._doc,
                   _id: history._id,
                   time: history.time,

                   name: history.name,
                   type: 'session',
                   calories: history.calories,
                   totalTime: history.totalTime,
               }

               newHistories.push(newSession)
           }

       }
       

       res.json({
           error: false,
           message: newHistories,
       })
    } catch (error) {
        console.log('error', error)
        res.json({
            error: true,
            message: error
        })
    }
}

export const postHistory = async (req, res) => {
    console.log('Post History')
    try {
        const data = req.body
        const username = req.query.username

        const newAddHistories = new historiesModel({
            ...data
        })

        await newAddHistories.save()

        let hitories = await historiesModel.find({
            author: username,
        }, {createdAt: 0, updatedAt: 0, __v: 0,}).sort({time: "desc"})

        //GET HISTORIES
        let newHistories = []
        for (const history of hitories) {
            
            if(history.type == 'food') {
                let food = await foodModel.findOne(
                    {_id: history._foodID}, 
                    {_id: 0, createdAt: 0, updatedAt: 0, __v: 0, ingredients: 0, author: 0, description: 0}
                )
 
                const newFood = {
                    ...food?._doc,
                    _id: history._id,
                    time: history.time,
                    
                    name: history.name,
                    type: 'food',
                    calories: history.calories,
                }
 
                newHistories.push(newFood)
            } else if (history.type == 'session') {
                let session = await sessionModel.findOne(
                    {_id: history._sessionID}, 
                    {_id: 0, createdAt: 0, updatedAt: 0, __v: 0, author: 0, description: 0}
                )
 
                const newSession = {
                    ...session?._doc,
                    _id: history._id,
                    time: history.time,
 
                    name: history.name,
                    type: 'session',
                    calories: history.calories,
                    totalTime: history.totalTime,
                }
 
                newHistories.push(newSession)
            }
 
        }
        
 
        res.json({
            error: false,
            message: newHistories,
        })
    } catch (error) {
        console.log('error', error)
        res.json({
            error: true,
            message: error
        })
    }
}

export const deleteHistory = async (req, res) => {
    console.log('Delete History')
    try {
        const id = req.params.id
        const username = req.query.username

        await historiesModel.findOneAndDelete({_id: id})

        let hitories = await historiesModel.find({
            author: username,
        }, {createdAt: 0, updatedAt: 0, __v: 0,}).sort({time: "desc"})

       //GET HISTORIES
       let newHistories = []
       for (const history of hitories) {
           
           if(history.type == 'food') {
               let food = await foodModel.findOne(
                   {_id: history._foodID}, 
                   {_id: 0, createdAt: 0, updatedAt: 0, __v: 0, ingredients: 0, author: 0, description: 0}
               )

               const newFood = {
                   ...food?._doc,
                   _id: history._id,
                   time: history.time,
                   
                   name: history.name,
                   type: 'food',
                   calories: history.calories,
               }

               newHistories.push(newFood)
           } else if (history.type == 'session') {
               let session = await sessionModel.findOne(
                   {_id: history._sessionID}, 
                   {_id: 0, createdAt: 0, updatedAt: 0, __v: 0, author: 0, description: 0}
               )

               const newSession = {
                   ...session?._doc,
                   _id: history._id,
                   time: history.time,

                   name: history.name,
                   type: 'session',
                   calories: history.calories,
                   totalTime: history.totalTime,
               }

               newHistories.push(newSession)
           }

       }
       

       res.json({
           error: false,
           message: newHistories,
       })
    } catch (error) {
        console.log('error', error)
        res.json({
            error: true,
            message: error
        })
    }
}

export const patchHistory = async (req, res) => {
    console.log('Patch History')
    try {
        const id = req.params.id
        const username = req.query.username
        const time = req.body.time

        await historiesModel.findOneAndUpdate({_id: id}, {
            time: time
        })

        let hitories = await historiesModel.find({
            author: username,
        }, {createdAt: 0, updatedAt: 0, __v: 0,}).sort({time: "desc"})

      //GET HISTORIES
       let newHistories = []
       for (const history of hitories) {
           
           if(history.type == 'food') {
               let food = await foodModel.findOne(
                   {_id: history._foodID}, 
                   {_id: 0, createdAt: 0, updatedAt: 0, __v: 0, ingredients: 0, author: 0, description: 0}
               )

               const newFood = {
                   ...food?._doc,
                   _id: history._id,
                   time: history.time,
                   
                   name: history.name,
                   type: 'food',
                   calories: history.calories,
               }

               newHistories.push(newFood)
           } else if (history.type == 'session') {
               let session = await sessionModel.findOne(
                   {_id: history._sessionID}, 
                   {_id: 0, createdAt: 0, updatedAt: 0, __v: 0, author: 0, description: 0}
               )

               const newSession = {
                   ...session?._doc,
                   _id: history._id,
                   time: history.time,

                   name: history.name,
                   type: 'session',
                   calories: history.calories,
                   totalTime: history.totalTime,
               }

               newHistories.push(newSession)
           }

       }
       

       res.json({
           error: false,
           message: newHistories,
       })
    } catch (error) {
        console.log('error', error)
        res.json({
            error: true,
            message: error
        })
    }
}

export const postDrinkHistory = async (req, res) => {
    console.log('Post Drink Histories')
    try {
        const username = req.query.username

        const start = new Date()
        start.setHours(0, 0, 0, 0)

        const end = new Date()
        end.setHours(23, 59, 59, 999)

        const data = {
            ...req.body,
            type: 'water',
            name: 'water',
            author: username,
            calories: 0,
        }
        

        let hitories = await historiesModel.findOne({
            author: username, type: 'water'
        }, {createdAt: 0, updatedAt: 0, __v: 0, author: 0, name: 0, calories: 0}).sort({time: "desc"})

        const lastDay = new Date(hitories.time)

        if(lastDay > start && lastDay < end) { //in
            await historiesModel.findOneAndUpdate({
                _id: hitories._id
            }, {...req.body}, {returnNewDocument: true})

        } else {
            const newAddHistories = new historiesModel({
                ...data
            })
    
            await newAddHistories.save()
        }


        res.json({
            error: false,
            message: data,
        })
     } catch (error) {
         console.log('error', error)
         res.json({
             error: true,
             message: error
         })
     }
}

export const getDrinkHistory = async (req, res) => {
    console.log('Get Drink Histories')
    try {
        const username = req.query.username

        const start = new Date()
        start.setHours(0, 0, 0, 0)

        const end = new Date()
        end.setHours(23, 59, 59, 999)

        let hitories = await historiesModel.findOne({
            author: username, type: 'water'
        }, {createdAt: 0, updatedAt: 0, __v: 0, author: 0, name: 0, calories: 0}).sort({time: "desc"})

        const lastDay = new Date(hitories.time)

        let data = { 
            mass: 0
         }

        if(lastDay > start && lastDay < end) { //in
           data = hitories
        } 

        res.json({
            error: false,
            message: data,
        })
     } catch (error) {
         console.log('error', error)
         res.json({
             error: true,
             message: error
         })
     }
}