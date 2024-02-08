const WorldActions=require('../Models/WorldActions')
const jwt=require('jsonwebtoken')

exports.explore=function(req,res){
    const action=new WorldActions(req.body)
    action.Explore()
    .then((result)=>{
        res.json(result)
    })
    .catch((error)=>{
  console.log(error)
res.json({error:error})
})

}

exports.exploreUpdate=function(req,res){
    const action=new WorldActions(req.body)
    action.ExploreUpdate()
    .then((result)=>{
        res.json(result)
        console.log(result)
    })
    .catch((error)=>{
res.json(error)

})

}


exports.fortress=function(req,res){
    const action=new WorldActions(req.body)
    action.Fortress()
    .then((result)=>{
        res.json(result)
    })
    .catch((error)=>{
  console.log(error)
res.json(error)
})

}

exports.rebuild=function(req,res){
    const action=new WorldActions(req.body)
    action.Rebuild()
    .then((result)=>{
        res.json(result)
    })
    .catch((error)=>{
  console.log(error)
res.json(error)
})

}


exports.test=function(req,res){
    const action=new WorldActions(req.body)
    action.Test()
    .then((result)=>{
        res.json(result)
    })
    .catch((error)=>{
  console.log(error)
res.json({error:error})
})

}

exports.attack=function(req,res){
    const action=new WorldActions(req.body)
    action.War()
    .then((result)=>{
        res.json(result)
    })
    .catch((error)=>{
  console.log(error)
res.json(error)
})

}


