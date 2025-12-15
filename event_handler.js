// MESSAGE SCRIPTS
import sendMessage from "./workScripts/messageScripts/sendMessage.js";
import listMessages from "./workScripts/messageScripts/listMessages.js";
import deleteMessages from "./workScripts/messageScripts/deleteMessage.js";
import changeMessagesStatus from "./workScripts/messageScripts/changeMessagesStatus.js";

// CONVERSATION SCRIPTS
import listConversations from "./workScripts/conversationScripts/listConversations.js";

// GROUP SCRIPTS
import createGroup from "./workScripts/groupScripts/createGroup.js";
import deleteGroup from "./workScripts/groupScripts/deleteGroup.js";
import giveAdminToUser from "./workScripts/groupScripts/giveAdmin.js";
import takeAdminFromUser from "./workScripts/groupScripts/takeAdmin.js";
import kickUserFromGroup from "./workScripts/groupScripts/kickUserFromGroup.js";
import userLeaveGroup from "./workScripts/groupScripts/leaveGroup.js";
import inviteUserToGroup from "./workScripts/groupScripts/inviteToGroup.js";
import acceptInviteToGroup from "./workScripts/groupScripts/putUserInGroup.js";
import updateInviteToGroupStatus from "./workScripts/groupScripts/changeInviteToGroupStatus.js";

// USER SCRIPTS
import createUser from "./workScripts/userScripts/createUser.js";
import deleteUser from "./workScripts/userScripts/deleteUser.js";
import getUser from "./workScripts/userScripts/getUser.js";

// AUTH SCRIPTS
import login from "./workScripts/userScripts/login.js";
import logout from "./workScripts/userScripts/logout.js";


async function event_handler(message) {


  switch (message.event) {

    // *** MESSAGE EVENTS ***
    case "send_message":
      return { event: "message_sent", payload: await sendMessage(message) };

    case "list_messages":
      return { event: "messages_listed", payload: await listMessages(message) };

    case "delete_messages":
      return { event: "messages_deleted", payload: await deleteMessages(message) };

    case "update_message":
      return { event: "message_updated", payload: await updateMessage(message) };

    case "change_messages_status":
      return { event: "messages_status_changed", payload: await changeMessagesStatus(message) };

    // *** USER EVENTS ***
    case "create_user":
      return { event: "user_created", payload: await createUser(message) };

    case "delete_user":
      return { event: "user_deleted", payload: await deleteUser(message) };

    case "get_user":
      return { event: "user_got", payload: await getUser(message) }

    // *** AUTH EVENTS ***
    case "login_user":
      return { event: "user_logged_in", payload: await login(message) };

    case "logout_user":
      return { event: "user_logged_out", payload: await logout(message) };


    // *** GROUP EVENTS ***
    case "create_group":
      return { event: "group_created", payload: await createGroup(message) };

    case "update_group":
      return { event: "group_updated", payload: await updateGroup(message) };

    case "user_leave_group":
      return { event: "user_leaved_group", payload: await userLeaveGroup(message) };

    case "give_admin_to_user":
      return { event: "admin_gived_to_user", payload: await giveAdminToUser(message) };

    case "take_admin_from_user":
      return { event: "admin_took_from_user", payload: await takeAdminFromUser(message) };

    case "invite_user_to_group":
      return { event: "user_invited_to_group", payload: await inviteUserToGroup(message) };

    case "kick_user_from_group":
      return { event: "user_kicked_from_group", payload: await kickUserFromGroup(message) };

    case "accept_invite_to_group":
      return { event: "user_accepted_invite_to_group", payload: await acceptInviteToGroup(message) };

    case "update_invite_to_group_status":
      return { event: "invite_to_group_status_updated", payload: await updateInviteToGroupStatus(message) };


    // *** CONVERSATIONS ***
    case "list_conversations":
      return { event: "conversations_listed", payload: await listConversations(message) };


    // *** FALLBACK ***
    default:
      return {
        event: "error",
        payload: {
          message: "Invalid event",
          success: false,
          data: null,
          code: 201
        }
      };
  }

}

export default event_handler;
