# Tutorial

This tutorial will show you how easy it is to build a bot using Messenger and Wit.ai. For this purpose, we will build a bot from scratch and we will end up with a simple weather bot in about 30 minutes. If you have any problem, do not hesitate to talk to us on our [Public Chatroom](https://gitter.im/botpress/core), it will be a pleasure for us to answer your requests.

If you don't want to follow up our step-by-step guide, you can clone this repository and just try it by linking it to a Facebook Page (Step #6) and you Wit.ai account (Step #7). If you clone the repository, don't forget to run `npm install` in your cloned repository.

## Requirements

Botpress requires [node](https://nodejs.org) (version >= 4.2) and uses [npm](https://www.npmjs.com) as package manager.

## Step-by-step

### 1. Install

First thing you need to have `botpress` installed as a general dependency using `npm`. If it's done yet, you only need to install it using the following command.

```
npm install -g botpress
```

### 2. Create a new repository

Once `botpress` has been installed, in your command line tool, you need to create a new repository and move into it.

```js
mkdir wit-bot && cd wit-bot // Mac and Linux users

md wit-bot && cd wit-bot // Windows users
```

### 3. Initialization

Now, let's simply use command line interface to initialize your bot. To do it, you need to run the following command.

```
botpress init
```

### 4. Install modules

Directly in your command line again, you need to install [botpress-messenger](https://github.com/botpress/botpress-messenger) module to connect your bot to a Facebook Page. Also, we will need (botpress-wit)[https://github.com/botpress/botpress-messenger to connect our bot to your Wit.ai account.

```
botpress install messenger wit
```

### 5. Start

Once you have everything installed, you can start your bot and see what have been installed on it.

```
botpress start
```

Go to http://localhost:3000 and from there you can install other modules if you want to, but for this tutorial we only need `botpress-messenger` and `botpress-wit` which are supposed to be already installed.

### 6. Configure Messenger connexion settings

Before starting coding it, we need to configure Messenger then it will be linked directly to your Facebook Page. To do this step, you can follow our [5 steps](https://github.com/botpress/botpress-messenger#get-started) guide in botpress-messenger documentation.

<img src='./assets/messenger-connexion-settings.png' height=300px />

Briefly, you only need to create a [Facebook Page](https://www.facebook.com/pages/create) if you don't already have one and create a new [Messenger Application](https://developers.facebook.com/) on Facebook Developers Interface. After that, you need to find your **App ID**, **App Secret** and **Token Access**, and copy them directly in your web messenger [module interface](http://localhost:3000/modules/botpress-messenger). Finally, you only need to activate [**ngrok**](https://ngrok.com/), **validate** and **connect** your bot.


### 7. Configure your Wit.ai account

The next step is to link your `botpress-wit` module to your Wit.ai account. To do it, you only need to fill `Access token` field in the UI of the module.

<img src='./assets/wit-settings.png' height=140px />

First, you need to create an account on http://www.wit.ai if you don't already have one. Once your account is created, you now have to create a new application on Wit.ai, but by default, if you just created your account, you are supposed to already have one application initialize (MyFirstApp).

To find your access token, you need to go in **Settings** and in **API Details** panel, you will find it.

<img src='./assets/wit-access-token.png' height=350px />

### 8. Select Wit.ai mode

You need to switch of mode in `botpress-wit` module to **stories**. As you probably notice, `botpress-wit` module offers two different modes: **understanding** and **story**.

<img src='./assets/wit-documentation.png' height=400px />

**Note 1**: The **understanding** mode will inject understanding metadata inside incoming messages through the Wit.ai middleware. Events will have a wit property populated with the extracted entities and the context.

**Note 2**: The **stories** mode will run your Wit.ai stories automatically given that you defined the Actions in botpress. For more information about Actions and how they are run, make sure to read [node-wit's documentation](https://github.com/wit-ai/node-wit).

### 9. Begin a stories

Directly on Wit.ai, you will need to create a new story. First, we will begin by a simple _hello world_ to test if everything works from the beginning. You can create your own interaction to test the bot if you want to.

<img src='./assets/wit-hello.png' height=400px />

If everything works fine from the begin of the tutorial, your bot is supposed to work and answer to `Hello!` if you chat with it directly on [Messenger](https://www.messenger.com/) or [Facebook](https://www.facebook.com).

<img src='./assets/wit-test.png' height=200px />

**Note**: From there, if you want to only build a conversation using Wit.ai, you have everything you need and you didn't have to code anything.

### 10. Add an weather action interaction

Now, we have a basic _hello world_ conversation, we will need add some actions to answer to weather question. To do that, in Wit.ai again, we will add a conversation with intent and





## Have fun

Building a bot with Botpress is simple as that! Just notice, it takes us only a few hours and everything was done (code and tutorial)...

Feel free to fork our bot, send pull requests, clone it, send any comment...

## Community

Pull requests are welcomed! We believe that it takes all of us to create something big and impactful.

We have a [Public Chatroom](https://gitter.im/botpress/core), everybody is invited to come and share ideas, issues or simply get in touch.

## License

motivation-bot is licensed under [AGPL-3.0](/LICENSE)
