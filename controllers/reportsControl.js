const Repo=require('../Models/Reports')
exports.start=function(req,res){
	if(req.body.token){
			let game=new Repo(req.body)
			game.displayReports()
			.then((result)=>{
				res.json(result)
			})
			.catch()
}
}

exports.deleteSelected=function(req,res){
	if(req.body.selectedR){
			let game=new Repo(req.body)
			game.deleteS()
			.then((result)=>{
				res.json(result)
			})
			.catch()
}
}



exports.displayReport=function(req,res){
	if(req.body.token){
			let game=new Repo(req.body)
			game.displayReport()
			.then((result)=>{
				res.json(result)
			})
			.catch((e)=>{console.log(e)})
}
}


exports.delete=function(req,res){
	if(req.body.selectedR){
			let game=new Repo(req.body)
			game.delete()
			.then((result)=>{
				res.json(result)
			})
			.catch()
}
}

exports.deleteAll=function(req,res){
			let game=new Repo(req.body)
			game.deleteAll()
			.then((result)=>{
				res.json(result)
			})
			.catch()
}