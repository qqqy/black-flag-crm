
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
  } ,
  async load(req , res){
    const db = req.app.get('db')
    const { column , table } = req.params
    console.log(column)
    try {
      let options = await db.query(`select ${column} from ${table}`)
      res.status(200).send(options)
    } catch (error) {
      res.status(200).send(error.message)
    }
  }
}