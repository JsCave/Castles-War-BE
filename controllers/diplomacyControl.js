const Diplomacy=require('../Models/Diplomacy')
exports.start=function(req,res){
	if(req.body.token){
			let game=new Diplomacy(req.body)
			game.setDiplomacy()
			.then((result)=>{
				res.json(result)
			})
			.catch((e)=>{res.json(e)})
}
}