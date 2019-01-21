

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
      res.status(200).send(error.message)
    } 
  } ,
  async newTicket (req , res) {
    const db = req.app.get('db')
    try{
      let interaction = await db.new_ticket(req.body)
      res.status(201).send(interaction[0])
    } catch (error){
      res.status(200).send(error.message)
    } 
  } ,
}