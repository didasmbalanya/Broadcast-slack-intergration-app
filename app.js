require("dotenv").config();
const {
  intro,
  divider,
  about,
  openModalButton,
  broadcastModal
} = require("./views");

const { App } = require("@slack/bolt");

// initialize app with bot token and signing secret

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.event("app_home_opened", async ({ event, context }) => {
  // const publicChannels = await app.client.conversations.list();
  // console.log(publicChannels);
  try {
    /* view.publish is the method that your app uses to push a view to the Home tab */
    const result = await app.client.views.publish({
      /* retrieves your xoxb token from context */
      token: context.botToken,

      /* the user that opened your app's app home */
      user_id: event.user,
      view: {
        type: "home",
        callback_id: "home_view",
        blocks: [
          intro,
          divider,
          about,
          divider,
          {
            type: "actions",
            elements: [openModalButton]
          }
        ]
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.action("open_broadcast_modal", async ({ context, ack, body }) => {
  ack();

  try {
    const result = await app.client.views.open({
      token: context.botToken,
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: body.trigger_id,
      // View payload
      view: broadcastModal
    });
  } catch (error) {
    console.log(error.data.response_metadata);
  }
});

app.view("broadcast_modal_callback", async ({ ack, view, context }) => {
  // Acknowledge the view_submission event
  ack();
  const text =
    view["state"]["values"]["text_block"]["text_input_broadcast"]["value"];
  const users =
    view["state"]["values"]["selected_users_block"]["users_broadcast_to"][
      "selected_users"
    ];

  users.map(async user => {
    try {
      
      await app.client.chat.postMessage({
        token: context.botToken,
        channel: user,
        as_user:true,
        username:'Obione',
        text
      });
    } catch (error) {
      console.log(error);
    }
  });
});

(async () => {
  // start app
  await app.start(process.env.PORT || 3000);
  console.log(`⚡️ Bolt app is running on ${process.env.PORT}!`);
})();
