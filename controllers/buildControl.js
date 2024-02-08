const Build=require('../Models/Build')
exports.start=function(req,res){
	if(req.body.token){
			let game=new Build(req.body)
			game.addBuild()
			.then((result)=>{
				res.json(result)
			})
			.catch((e)=>{
				res.json(e)})
}
}