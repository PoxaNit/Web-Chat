
# Hash encoding

 For password hash or whatever need to be hashed,
 the encoding is 'hex' (hexadecimal), used
 with the nodejs library crypto.

# Conventions

 By convention, each data file to insert into the database
 need to have the same name as the table followed by a ".json".


# Data models


This is how each table in the database must be.

Models:

Model of table users:

  Fields of table:

    id         -> INT AUTO_INCREMENT PRIMARY KEY
    created_at -> BIGINT
    updated_at -> BIGINT
    name       -> VARCHAR(255)
    email      -> VARCHAR(255)
    password   -> VARCHAR(255)



Model of table messages:

  Fields of table:

    id              -> INT AUTO_INCREMENT PRIMARY KEY
    created_at      -> BIGINT
    updated_at      -> BIGINT
    conversation_id -> INT
    sender_id       -> INT
    content         -> TEXT


Model of table message_status:

  Fields of table:

    id         -> INT AUTO_INCREMENT PRIMARY KEY
    created_at -> BIGINT
    updated_at -> BIGINT
    message_id -> INT
    user_id    -> INT
    status     -> ENUM('sent', 'delivered', 'read')


Model of table conversations:

  Fields of table:

    id         -> INT AUTO_INCREMENT PRIMARY KEY
    created_at -> BIGINT
    updated_at -> BIGINT
    user1_id   -> INT | NULL
    user2_id   -> INT | NULL
    group_id   -> INT | NULL
    type       -> ENUM("private", "group")


Model of table groups:

  Fields of table:

    id              -> INT AUTO_INCREMENT PRIMARY KEY
    created_at      -> BIGINT
    updated_at      -> BIGINT
    name            -> VARCHAR(255)
    creator_user_id -> INT



Model of table group_participants:

  Fields of table:

    id         -> INT AUTO_INCREMENT PRIMARY KEY
    created_at -> BIGINT
    updated_at -> BIGINT
    group_id   -> INT
    user_id    -> INT
    role       -> ENUM('user', 'admin')



Model of table logins:

  Fields of table:

    id         -> INT AUTO_INCREMENT PRIMARY KEY
    created_at -> BIGINT
    updated_at -> BIGINT
    user_id    -> INT
    is_logged  -> TINYINT(1)

Model of table invites_to_group:

  Fields of table:

    id         -> INT AUTO_INCREMENT PRIMARY KEY
    created_at -> BIGINT
    updated_at -> BIGINT
    group_id   -> INT
    inviter_id -> INT
    invited_id -> INT
    status     -> ENUM("sent", "delivered", "accepted", "refused")



# Events

## Message Format:
{"event": <string>, payload: <object>}



## Server -> Client

### Only server events

notification
  payload:
    {
      message: <string>
    }

### In response to client events

message_sent -> response to send_message
  payload:
    {
      message: <string>
      success: <boolean>
      data: {
        message_id: <int>
        sender_id: <int>
        conversation_id: <int>
        content: <string>
      }
      code: <int>
    }

user_created -> response to create_user
  payload:
    {
      message: <string>
      success: <boolean>
      data: {
        user_id: <int>
        name: <string>
        email: <string>
      }
      code: <int>
    }

group_created -> response to create_group
  payload:
    {
      message: <string>
      success: <boolean>
      data: {
        group_id: <int>
        name: <string>
        creator_user_id: <int>
      }
      code: <int>
    }

user_leaved_group -> response to user_leave_group
  payload:
    {
      message: <string>
      success: <boolean>
      data: {
        group_id: <int>
        user_id: <int>
      }
      code: <int>
    }

admin_gived_to_user -> response to give_admin_to_user
  payload:
    {
      message: <string>
      success: <boolean>
      data: {
        group_id: <int>
        user_id: <int>
        role: <string> // 'admin'
      }
      code: <int>
    }

admin_took_from_user -> response to take_admin_from_user
  payload:
    {
      message: <string>
      success: <boolean>
      data: {
        group_id: <int>
        user_id: <int>
        role: <string> // 'user'
      }
      code: <int>
    }

message_updated -> response to update_message
  payload:
    {
      message: <string>
      success: <boolean>
      data: {
        message_id: <int>
        content: <string>
      }
      code: <int>
    }

group_updated -> response to update_group
  payload:
    {
      message: <string>
      success: <boolean>
      data: {
        group_id: <int>
        name: <string>
      }
      code: <int>
    }

user_updated -> response to update_user
  payload:
    {
      message: <string>
      success: <boolean>
      data: {
        user_id: <int>
        name: <string>
        email: <string>
      }
      code: <int>
    }

conversations_listed -> response to list_conversations
  payload:
    {
      message: <string>
      success: <boolean>
      data: {
        conversations: <array>
      }
      code: <int>
    }

messages_listed -> response to list_messages
  payload:
    {
      message: <string>
      success: <boolean>
      data: {
        messages: <array>
      }
      code: <int>
    }

messages_deleted -> response to delete_messages
  payload:
    {
      message: <string>
      success: <boolean>
      data: {
        message_ids: <array>
      }
      code: <int>
    }

user_invited_to_group -> response to invite_user_to_group
  payload:
    {
      message: <string>
      success: <boolean>
      data: {
        group_id: <int>
        inviter_id: <int>
        invited_id: <int>
      }
      code: <int>
    }

user_kicked_from_group -> response to kick_user_from_group
  payload:
    {
      message: <string>
      success: <boolean>
      data: {
        group_id: <int>
        kicked_id: <int>
        by_user_id: <int>
      }
      code: <int>
    }

user_accepted_invite_to_group -> response to accept_invite_to_group
  payload:
    {
      message: <string>
      success: <boolean>
      data: {
        group_id: <int>
        user_id: <int>
      }
      code: <int>
    }

invite_to_group_status_updated -> response to update_invite_to_group_status
  payload:
    {
      message: <string>
      success: <boolean>
      data: {
        invite_id: <int>
        status: <string>
      }
      code: <int>
    }

user_deleted -> response to delete_user
  payload:
    {
      message: <string>
      success: <boolean>
      data: {
        user_id: <int>
      }
      code: <int>
    }

user_logged_in -> response to log_in_user
  payload:
    {
      message: <string>
      success: <boolean>
      data: {
        user_id: <int>
        is_logged: <boolean>
      }
      code: <int>
    }

user_logged_out -> response to log_out_user
  payload:
    {
      message: <string>
      success: <boolean>
      data: {
        user_id: <int>
        is_logged: <boolean>
      }
      code: <int>
    }


## Client -> Server


send_message
  payload:
    {
      conversation_id: <int>
      sender_id: <int>
      content: <string>
    }

create_user
  payload:
    {
      name: <string>
      email: <string>
      password: <string>
    }

update_user
  payload:
    {
      user_id: <int>
      name: <string>
      email: <string>
    }

delete_user
  payload:
    {
      user_id: <int>
    }

log_in_user
  payload:
    {
      email: <string>
      password: <string>
    }

log_out_user
  payload:
    {
      user_id: <int>
    }

create_group
  payload:
    {
      name: <string>
      creator_user_id: <int>
    }

update_group
  payload:
    {
      group_id: <int>
      name: <string>
    }

user_leave_group
  payload:
    {
      group_id: <int>
      user_id: <int>
    }

give_admin_to_user
  payload:
    {
      group_id: <int>
      user_id: <int>
    }

take_admin_from_user
  payload:
    {
      group_id: <int>
      user_id: <int>
    }

invite_user_to_group
  payload:
    {
      group_id: <int>
      inviter_id: <int>
      invited_id: <int>
    }

kick_user_from_group
  payload:
    {
      group_id: <int>
      user_id: <int>
      by_user_id: <int>
    }

accept_invite_to_group
  payload:
    {
      invite_id: <int>
      user_id: <int>
    }

update_invite_to_group_status
  payload:
    {
      invite_id: <int>
      status: <string>  // sent | delivered | accepted | refused
    }

list_messages
  payload:
    {
      conversation_id: <int>
    }

list_conversations
  payload:
    {
      user_id: <int>
    }

delete_messages
  payload:
    {
      message_ids: <array>
    }

update_message
  payload:
    {
      message_id: <int>
      content: <string>
    }
