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
  try {
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

      trigger_id: body.trigger_id,
      view: broadcastModal
    });
  } catch (error) {
    console.log(error.data.response_metadata);
  }
});

app.view("broadcast_modal_callback", async ({ ack, view, context }) => {
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
        as_user: true,
        username: "Obione",
        text
      });
    } catch (error) {
      console.log(error);
    }
  });
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log(`⚡️ Bolt app is running on ${process.env.PORT}!`);
})();
