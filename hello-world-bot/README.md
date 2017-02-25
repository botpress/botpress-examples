# Tutorial

This tutorial will show you how easy it is to build a basic "hello world" bot using the Botpress and Messenger modules. This exercise should take you less than 10 minutes. If you have any problems, don't hesitate to talk to us on our [Public Community](https://slack.botpress.io). It will be a pleasure for us to answer your requests.

## Table of contents
* [Requirements](#requirements)
* [Step-by-step](#step-by-step)
	* [Install Botpress](#install-botpress)
	* [Create a new repository](#create-new-repo)
	* [Initialize Botpress](#initialize-botpress)
	* [Install Botpress modules](#install-botpress-modules)
	* [Start Botpress](#start-botpress)
	* [Configure Messenger connection settings](#configure-messenger)
		* [Verifying your configuration](#verifying-connection)
	* [Open your repo in an editor](#open-your-repo)
	* [Start coding](#start-coding)
	* [Answer a "hello world" user message](#answer-user-message)
	* [Answer any other user message](#answer-any-message)
* [Have fun](#have-fun)
* [Community](#community)
* [License](#license)

## Requirements<a name="requirements"></a>

Botpress requires [node](https://nodejs.org) (version >= 4.2) and uses [npm](https://www.npmjs.com) as package manager.

## Step-by-step<a name="step-by-step"></a>

### 1. Install Botpress<a name="install-botpress"></a>

You first need to have `botpress` installed as a general dependency using `npm`. If `npm` is already installed, you can install Botpress with the following command (make sure to install it globally):

```
npm install -g botpress
```

### 2. Create a new repository<a name="create-new-repo"></a>

Once `botpress` has been installed, you create a new repository and cd into it.

```js
mkdir hello-world-bot && cd hello-world-bot // Mac and Linux users

md hello-world-bot && cd hello-world-bot // Windows users
```

### 3. Initialize Botpress<a name="initialize-botpress"></a>

Now, let's use the command line interface of `botpress` to initialize your bot:

```
botpress init
```

### 4. Install Botpress modules<a name="install-botpress-modules"></a>

In your command line again, you need to install the [botpress-messenger](https://github.com/botpress/botpress-messenger) module to be able to connect your bot to your Facebook page.

```
botpress install messenger
```

### 5. Start Botpress<a name="start-botpress"></a>

Once everything is installed, you can start your bot and see what it includes.

```
botpress start
```

A local instance of your bot should be running at [http://localhost:3000](http://localhost:3000). From there you can install other modules as desired, but for this tutorial we only need `botpress-messenger` which we have just installed.

### 6. Configure Messenger connection settings<a name="configure-messenger"></a>

Before starting to code, you need to configure Messenger so it's connected directly to your Facebook page. If this is your first time to configure Messenger, we recommend following our [getting started](https://docs.botpress.io/getting-started.html) guide in the official Botpress documentation.

<img src='./assets/connexion-settings.png' height=300px />

Briefly, you need to create a [Facebook page](https://www.facebook.com/pages/create) if you don't already have one. You also need to create a new [Messenger app](https://developers.facebook.com/) on Facebook. After that, you can find your **App ID**, **App Secret**, and **Token Access**, and paste them directly into the `botpress-messenger` module settings of the [Botpress user interface](http://localhost:3000/modules/botpress-messenger) running locally. Finally, you only need to activate [ngrok](https://ngrok.com/), and then validate and connect your bot.

For further information on configuring `botpress-messenger` see the [Getting Started documentation](https://docs.botpress.io/getting-started.html).

#### Verifying your configuration<a name="verifying-connection"></a>

After connecting the Botpress Messenger module with your Facebook Messenger app in the step above, you can verify that everything's working by opening a chat tab on your Facebook page and typing `BOT_LICENSE`.

The bot should answer your user message, for example with:

```
Bot: motivation-bot
Created by: GB
License: AGPL-3.0
Botpress: 0.0.50
```

**Note**: `BOT_LICENSE` is a Botpress command to display basic information about your bot (name, version, licenses).

### 7. Open your repo in an editor<a name="open-your-repo"></a>

Once all the setup is done, you are ready to code your bot. You open your repository in your favorite editor (Sublime, Atom, WebStorm, Netbeans, ...). As you can see, some files and directories have already been created when you had previously initialized your repo with `botpress-init`.

```js
- botfile.js // your bot's configuration. Botpress uses this
- index.js // your bot's entry point. bot logic goes here
- package.json // regular node package.json file
- LICENSE // your bot license, either AGPLv3 or Botpress License
- .gitignore // ignoring some botpress-created files by default
```

### 8. Start coding<a name="start-coding"></a>

Now, open the `index.js` file and write (or paste) these lines of code. This is a simple to do list.

```js
module.exports = function(bp) {
  bp.middlewares.load()

  /* Things to do:
    [ ] Answering to hello world
    [ ] Answering to any other message
  */
}
```

**Tip:** When you are coding, using a to do list is good practice because it helps you to stay focused and to know exactly what needs to be done.

### 9. Answer a "hello world" user message<a name="answer-user-message"></a>

First, we will set up a basic answer to "hello world" from Facebook. You simply write (or paste) these lines into `index.js`.

```js
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

    const text = 'Congrats ' + first_name + " " + last_name + "! Your first chatbot using Botpress is now alive."
    bp.messenger.sendText(id, text)
  })
}
```

We use `hear` which is a built-in function of `bp` to listen on specific `event` conditions. In this case, we are listening on `platform: 'facebook'`, `type: 'message'`, and `text: 'hello world'`. When those conditions are respected, the `callback` function is called and it sends a custom answer to this specific `user`.

**Note**: You can restart your bot in the command line by running `botpress start` and your bot will now answer to "hello world" when you chat with it directly in Messenger.

### 10. Answer any other user message<a name="answer-any-message"></a>

From there, your bot now answers to "hello world", but it doesn't answer to anything else. We'll now fix that and add a default answer to other messages. To do it, you only need to `hear` on different conditions.

```js
module.exports = function(bp) {

  // ... (Catch 'hello world from 'facebook' code)

  //Catch any 'message' from 'facebook'
  bp.hear({
    platform: 'facebook',
    type: 'message',
    text: /.+/i
  }, (event, next) => {
    bp.messenger.sendText(event.user.id, "Sorry, I only answer to 'hello world'...")
  })
}
```

As you can see, `hear` supports regex expressions and in our case it's exactly what we want. If you don't have any experience using regex, just notice that `text: /.+/i` will be respected for any text entry.

## Have fun<a name="have-fun"></a>

Building a bot with Botpress is as simple as that!

Feel free to fork our bot, send pull requests, clone it, send comments, etc.

## Community<a name="community"></a>

Pull requests are welcome! We believe that everyone's contributions will create something big and impactful.

There's a [Slack community](https://slack.botpress.io) where you are welcome to join us, ask questions, and even help others.

Get an invite and join us now! 👉[https://slack.botpress.io](https://slack.botpress.io).

## License<a name="license"></a>

`hello-world-bot` is licensed under [AGPL-3.0](/LICENSE).
