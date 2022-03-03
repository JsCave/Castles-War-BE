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
if(req.body.token){
		let game=new Repo(req.body)
		game.delete().then((result)=>{
res.json(result)
		}).catch((e)=>{console.log(e)})
}else{
	res.render("404")
}
}