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

exports.deleteSelected=function(req,res){
	if(req.body.selectedM){
			let game=new Mail(req.body)
			game.deleteS()
			.then((result)=>{
				res.json(result)
			})
			.catch()
}
}

exports.delete=function(req,res){
	if(req.body.selectedM){
			let game=new Mail(req.body)
			game.delete()
			.then((result)=>{
				res.json(result)
			})
			.catch()
}
}

exports.deleteAll=function(req,res){

			let game=new Mail(req.body)
			game.deleteAll()
			.then((result)=>{
				res.json(result)
			})
			.catch()

}

exports.sendMail=function(req,res){
	if(req.body.token){
			let game=new Mail(req.body)
			game.sendMail()
			.then((result)=>{
				console.log(result)
				res.json(result)
			})
			.catch((e)=>{console.log(e)})
}
}

exports.sendReply=function(req,res){
	if(req.body.token){
			let game=new Mail(req.body)
			game.sendReply()
			.then((result)=>{
				res.json(result)
			})
			.catch((e)=>{console.log(e)})
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


/*
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
*/