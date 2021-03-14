class ValidateController {
  async validate(req, res) {
    return res.status(200).send({ status: true, res: 'User ok' })
  }
}

module.exports = new ValidateController()
