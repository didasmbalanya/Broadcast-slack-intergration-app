const intro = {
  type: "section",
  text: {
    type: "mrkdwn",
    text: "*Welcome to BroadCast's Home_* :speaker:"
  }
};

const intro2 = {
  type: "section",
  text: {
    type: "mrkdwn",
    text: "Well I am a modal"
  }
};

const about = {
  type: "section",
  text: {
    type: "mrkdwn",
    text:
      "Want to send all broadcast to specific users? \n Click below :small_red_triangle_down: "
  }
};

const divider = {
  type: "divider"
};

const openModalButton = {
  type: "button",
  text: {
    type: "plain_text",
    text: "Broadcast"
  },
  action_id: "open_broadcast_modal",
  style: "primary"
};

const userSelect = {
  type: "input",
  label: {
    type: "plain_text",
    text: "Users"
  },
  element: {
    type: "users_select",
    placeholder: {
      type: "plain_text",
      text: "Select a user"
    }
  }
};

const multiUserSelect = {
  type: "input",
  block_id: "selected_users_block",
  element: {
    type: "multi_users_select",
    action_id: "users_broadcast_to",
    placeholder: {
      type: "plain_text",
      text: "Select users",
      emoji: true
    }
  },
  label: {
    type: "plain_text",
    text: "Select Recipients",
    emoji: true
  }
};

const broadcastModal = {
  type: "modal",
  callback_id: "broadcast_modal_callback",
  title: {
    type: "plain_text",
    text: "BroadCast",
    emoji: true
  },
  submit: {
    type: "plain_text",
    text: "Broadcast",
    emoji: true
  },
  close: {
    type: "plain_text",
    text: "Cancel",
    emoji: true
  },
  blocks: [
    multiUserSelect,
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: "Write Message to broadcast to selected users"
        }
      ]
    },
    {
      type: "input",
      block_id:"subject_block",
      optional: true,
      element: {
        type: "plain_text_input",
        action_id: "subject_input_broadcast",
      },
      label: {
        type: "plain_text",
        text: "Subject",
        emoji: true
      }
    },
    {
      type: "input",
      block_id: "text_block",
      element: {
        type: "plain_text_input",
        action_id: "text_input_broadcast",
        multiline: true
      },
      label: {
        type: "plain_text",
        text: "Message",
        emoji: true
      }
    },
    {
      type: "input",
      block_id:"link_block",
      optional: true,
      element: {
        type: "plain_text_input",
        action_id: "link_input_broadcast",
      },
      label: {
        type: "plain_text",
        text: "Link",
        emoji: true
      }
    }
  ]
};

const resBlock = (headline, text, sender, link = "N/A") => [
  divider,
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `*Subject*: *${headline}*`
    }
  },
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `*Message*:\n\n\`\`\`${text}\`\`\``
    }
  },
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `*link*: ${link}`
    }
  },
  {
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: `*From:* <@${sender}>`
      }
    ]
  }
];

module.exports = {
  intro,
  about,
  divider,
  userSelect,
  openModalButton,
  intro2,
  broadcastModal,
  resBlock
};
