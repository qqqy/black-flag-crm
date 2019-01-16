
module.exports = {
  async loadDisplay(req,res){
    const db = req.app.get('db')
    let results = await db.load_display().catch(err => {return res.status(200).send(err.message)})
    res.status(200).send(results)
  }
}