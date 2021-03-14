require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const authToke = req.headers['authorization']

  if (authToke === undefined)
    return res
      .status(403)
      .send({ status: false, res: 'You are not authenticated' })

  const bearer = authToke.split(' ')
  let token = bearer[1]

  try {
    let decoded = jwt.verify(token, process.env.SECRET)

    if (decoded.email !== undefined) next()
    else return res.status(403).send({ status: false, res: 'Invalid token' })
  } catch (error) {
    // console.log(error);
    return res
      .status(403)
      .send({ status: false, res: 'You are not authenticated' })
  }
}
