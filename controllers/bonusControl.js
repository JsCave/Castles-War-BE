const Bonus=require('../Models/Bonus')

exports.getBonus=function(req,res){
			let game=new Bonus(req.body)
			game.accept()
			.then((result)=>{
				res.json(result)
			})
			.catch((e)=>{console.log(e)})
}

exports.vote=function(req,res){
			let game=new Bonus(req.body)
			game.vote()
			.then((result)=>{
				res.json(result)
			})
			.catch((e)=>{console.log(e)})
}

exports.collect=function(req,res){
			let game=new Bonus(req.body)
			game.collect()
			.then((result)=>{
				res.json(result)
			})
			.catch((e)=>{console.log(e)})
}