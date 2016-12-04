module.exports = function(bp) {
  bp.middlewares.load()

  //Catch 'hello world' from 'facebook'
  bp.hear({
    platform: 'facebook',
    type: 'message',
    text: 'hello world'
  }, (event, next) => {
    const id = event.user.id
    const last_name = event.user.last_name
    const first_name = event.user.first_name

    const text = 'Congrats ' + first_name + " " + last_name + "! Your first chatbot using Botpress is now working."
    bp.messenger.sendText(id, text)
  })

  //Catch any 'message' from 'facebook'
  bp.hear({
    platform: 'facebook',
    type: 'message',
    text: /.+/i
  }, (event, next) => {
    bp.messenger.sendText(event.user.id, "Sorry, I only answer to 'hello world'...")
  })
}
