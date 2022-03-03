const World=require('../Models/World')

exports.start=function(req,res){
	const world=new World(req.body)
	world.displayMap()
	.then((result)=>{
		res.json({map:result.mapData,diplomacy:result.diplomacy,location:result.playerLocation,allPlayers:result.playersData})})
	.catch()

}