const Units=require('../Models/Units')
exports.start=function(req,res){
	if(req.body.token){
			let game=new Units(req.body)
			game.updateUnits()
			.then((result)=>{
				res.json(result)
			})
			.catch((e)=>{res.json(e)})
}
}


exports.war=function(req,res){
	if(req.body.token){
			let game=new Units(req.body)
			game.war()
			.then((result)=>{
				res.json(result)
			})
			.catch((e)=>{res.json(e)})
}
}

exports.aid=function(req,res){
	if(req.body.token){
			let game=new Units(req.body)
			game.aid()
			.then((result)=>{
				res.json(result)
			})
			.catch((e)=>{res.json(e)})
}
}