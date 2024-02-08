const World=require('../Models/World')
const jwt=require('jsonwebtoken')

exports.start=function(req,res){
    const world=new World(req.body)
    world.displayMap()
    .then((result)=>{
        res.json({map:result.mapData,diplomacy:result.diplomacy,location:result.playerLocation,allPlayers:result.playersData,player:result.playerData})})
    .catch()

}

exports.reveal=function(req,res){
    const world=new World(req.body)
    world.Reveal()
    .then((result)=>{
        console.log(result)
        res.json(result)
    })
    .catch()

}