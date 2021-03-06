const builder = require('./lib/queryBuilder')

module.exports = {
  async searchTerm(req, res){
    const db = req.app.get('db')
    const fullTerm = '%' + req.params.term + '%'
    let results = await db.search_term({fullTerm}).catch(err => res.status(200).send(err.message))
    res.status(200).send(results)
  } ,
  testQueryBuilder(req, res){
    res.status(200).send(builder.queryBuilder(req.body.togglesOb))
  }
}