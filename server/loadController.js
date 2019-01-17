
module.exports = {
  async loadDisplay(req,res){
    const db = req.app.get('db')
    let results = await db.load_display().catch(err => {return res.status(200).send(err.message)})
    res.status(200).send(results)
  } ,
  async loadTerm(req, res){
    const { term } = req.params
    
    const db = req.app.get('db')
    let array = await db['load_' + req.params.term]({term , id: req.query.id}).catch(err => {return res.status(200).send(err.message)})
    res.status(200).send(array)
  } ,
  async targetTerm(req, res){
    const { term } = req.params
    
    const db = req.app.get('db')
    let array = await db['target_' + req.params.term]({term , id: req.query.id}).catch(err => {return res.status(200).send(err.message)})
    res.status(200).send(array[0])
  }
}