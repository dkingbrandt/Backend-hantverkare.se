



const Adds = require("../models/addsModel")

getAdds = async (req, res) => {
  await Adds.find({}, (err, add) => {
    if (err) {
      return res.status(404).json({ success: false, error: err })
    } if (!add.length) {
      return res.status(404).json({ success: false, error: "didnt find what your looking for" })
    }
    return res.status(200).json({ success: true, data: add })
  }).clone().catch(err => console.log(err))
}

createAdds = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "this is not an add",
    })
  }

  const add = new Adds(body)

  if (!add) {
    return res.status(400).json({ success: false, error: err })
  }

  add.save()

}


module.exports = { getAdds, createAdds }