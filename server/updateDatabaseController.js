

module.exports = {
  async saveInteraction (req, res) {
    const db = req.app.get('db')
    try {
      let updatedInteraction = await db.save_interaction(req.body)
      res.status(201).send(updatedInteraction[0])
    } catch (err) {
      res.status(200).send(err.message)
    }
  } ,
  async newInteraction (req , res) {
    const db = req.app.get('db')
    try{
      let interaction = await db.new_interaction(req.body)
      res.status(201).send(interaction[0])
    } catch (error){
      res.status(400).send(error.message)
    } 
  } ,
  async newTicket (req , res) {
    const db = req.app.get('db')
    try{
      let ticket = await db.new_ticket(req.body)
      res.status(201).send(ticket[0])
    } catch (error){
      res.status(400).send(error.message)
    } 
  } ,
  async newCustomer (req , res) {
    const db = req.app.get('db')
    try{
      let customer = await db.new_customer(req.body)
      res.status(201).send(customer[0])
    } catch (error){
      res.status(400).send(error.message)
    } 
  } ,

  async delete (req , res){
    const { table , column , id } = req.params
    const db = req.app.get('db')
    try {
      await db.query(`
      DELETE FROM ${table}
      WHERE ${column} = ${id}
      `)
      res.sendStatus(204)
    } catch (error) {
      res.status(200).send(error.message)
    }
  }
}