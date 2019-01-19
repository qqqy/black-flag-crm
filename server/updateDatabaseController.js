

module.exports = {
  async saveInteraction (req, res) {
    const db = req.app.get('db')
    try {
      let updatedInteraction = await db.save_interaction(req.body)
      res.status(201).send(updatedInteraction[0])
    } catch (err) {
      res.status(200).send(err.message)
    }
  }
}