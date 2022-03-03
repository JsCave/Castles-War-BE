const Mail=require('../Models/Mails')
exports.start=function(req,res){
	if(req.body.token){
			let game=new Mail(req.body)
			game.displayMails()
			.then((result)=>{
				res.json(result)
			})
			.catch()
}
}

exports.displayMail=function(req,res){
	if(req.body.token){
			let game=new Mail(req.body)
			game.displayMail()
			.then((result)=>{
				res.json(result)
			})
			.catch((e)=>{console.log(e)})
}
}


exports.sendM=function(req,res){
		let game=new Mail(req.body)
		game.sendM(req.body.id).then((result)=>{
res.json(result)
		}).catch((e)=>{console.log(e)})
}


exports.delete=function(req,res){
if(req.body.token){
		let game=new Mail(req.body)
		game.delete(req.body.id).then((result)=>{
res.json(result)
		}).catch((e)=>{console.log(e)})
}else{
	res.render("404")
}
}