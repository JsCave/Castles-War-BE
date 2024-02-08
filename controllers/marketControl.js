const Market=require('../Models/Market')
exports.start=function(req,res){
			let game=new Market(req.body)
			game.start()
			.then((result)=>{
				res.json(result)
			})
			.catch((e)=>{
				res.json(e)})
}


exports.buy=function(req,res){
			let game=new Market(req.body)
			game.buy()
			.then((result)=>{
				res.json(result)
			})
			.catch((e)=>{
				res.json(e)})
}


exports.sell=function(req,res){
			let game=new Market(req.body)
			game.sell()
			.then((result)=>{
				res.json(result)
			})
			.catch((e)=>{
				res.json(e)})
}

exports.upgrade=function(req,res){
			let game=new Market(req.body)
			game.upgrade()
			.then((result)=>{
				res.json(result)
			})
			.catch((e)=>{
				res.json(e)})
}