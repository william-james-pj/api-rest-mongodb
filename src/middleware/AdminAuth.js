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

    if (decoded.role === 1) next()
    else
      return res
        .status(403)
        .send({ status: false, res: "You don't have permission to access" })
  } catch (error) {
    // console.log(error);
    return res
      .status(403)
      .send({ status: false, res: 'You are not authenticated' })
  }
}
