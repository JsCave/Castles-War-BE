const Bribe=require('../Models/Bribe')
exports.stepOne=function(req,res){
	if(req.body.token){
			let game=new Bribe(req.body)
			game.createHash()
			.then((result)=>{
				console.log(result)
				res.json(result)
			})
			.catch((e)=>{
				res.json(e)})
}
}