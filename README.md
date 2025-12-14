
# Hash encoding

 For password hash or whatever need to be hashed,
 the encoding is 'hex' (hexadecimal), used
 with the nodejs library crypto.

# Conventions

 By convention, each data file to insert into the database
 need to have the same name as the table followed by a ".json".

 Although the id field in server <-> client comunication
 payload's data is the name of table followed by underscore
 and id (message_id, user_id, to make it more legible),
 for standalization, in the databases it's stored just as id.



# Technical decisions

## Authentication

I decided to use stateful authentication (table logins)
because I think it's better when users try to access an
account already logged. It's easier to handle with this. Using
JWT, for example, is bad for the user experience, because to a
communication app, the user would have to log in many times.


# Data Models (databases)

## Data models -> Server Database (MariaDB)


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



## Data models -> Client Database (IndexedDB)

This is how each object store in the database must be.

Models:


Model of object store users:

  Fields of object store:

    id         -> INT
    created_at -> INT
    updated_at -> INT
    name       -> STRING
    email      -> STRING



Model of object store conversations:

  Fields of object store:

    id       -> INT keyPath
    user1_id -> INT | NULL
    user2_id -> INT | NULL
    group_id -> INT | NULL
    type     -> "private" | "group"


Model of object store groups:

  Fields of object store:

    id         -> INT keyPath
    creator_id -> INT
    name       -> STRING

Model of object store messages

  Fields of object store:

    id              -> INT keyPath
    created_at      -> BIGINT
    updated_at      -> BIGINT
    conversation_id -> INT
    sender_id       -> INT
    content         -> STRING


Model of object store message_status

  Fields of object store:

    id         -> INT keyPath
    created_at -> BIGINT
    updated_at -> BIGINT
    user_id    -> INT
    message_id -> INT
    status     -> STRING


Model of object store logins

  Fields of object store:

    id         -> INT keyPath
    created_at -> BIGINT
    updated_at -> BIGINT
    user_id    -> INT
    is_logged  -> TINYINT (1)


# Events

## Message Format:
{
  event: <string>
  payload: <object>
}

## Server format of Payload:
{
  message: <string>
  success: <boolean>
  data: <object> | null
  code: <int>
}


## Client format of Payload:
{
  event: <string>
  payload: {
    the fields of the event model's payload data
  }
}


## Server -> Client Events

### Not in response to client events

notification
  payload data field:
    {
      content: <string>
    }

error
  payload data field:
    null

new_message
  payload data field:
    {
      message: {
        message_id: <int>
        created_at: <int>
        updated_at: <int>
        sender_id: <int>
        conversation_id: <int>
        content: <string>
      }
      message_status: {
        message_status_id: <int>
        created_at: <int>
        updated_at: <int>
        message_id: <int>
        user_id: <int>
        status: <string>
      }
    }

### In response to client events

user_got -> response to get_user
  payload data field:
    {
      user_id: <int>
      created_at: <int>
      updated_at: <int>
      name: <string>
      email: <string>
    }

message_sent -> response to send_message
  payload data field:
    {
      message: {
        message_id: <int>
        created_at: <int>
        updated_at: <int>
        sender_id: <int>
        conversation_id: <int>
        content: <string>
      }
      [
          message_status: {
          message_status_id: <int>
          created_at: <int>
          updated_at: <int>
          user_id: <int>
          message_id: <int>
          status: <string>
        }
      ]
    }

messages_status_changed -> response to change_messages_status
  payload data field:
    [
      {
        message_status_id: <int>
        created_at: <int>
        updated_at: <int>
        message_id: <int>
        user_id: <int>
        status: "delivered" | "read"
      }
    ]

message_updated -> response to update_message
  payload data field:
    null

user_created -> response to create_user
  payload data field:
    {
      user_id: <int>
      created_at: <int>
      updated_at: <int>
      name: <string>
      email: <string>
    }

group_created -> response to create_group
  payload data field:
    {
      group_id: <int>
      name: <string>
      creator_user_id: <int>
    }

group_deleted -> response to delete_group
  payload data field:
    {
      group_id: <int>
      by_admin_id: <int>
    }

user_leaved_group -> response to user_leave_group
  payload data field:
    {
      group_id: <int>
      user_id: <int>
    }

admin_gived_to_user -> response to give_admin_to_user
  payload data field:
    {
      group_id: <int>
      user_id: <int>
      role: "user" | "admin"
    }

admin_took_from_user -> response to take_admin_from_user
  payload data field:
    {
      group_id: <int>
      user_id: <int>
      role: "user" | "admin"
    }


group_updated -> response to update_group
  payload data field:
    {
      group_id: <int>
      name: <string>
    }

user_updated -> response to update_user
  payload data field:
    {
      user_id: <int>
      name: <string>
      email: <string>
    }

logged_in_user -> response to login_user
  payload data field:
    {
      user_id: <int>
      created_at: <int>
      updated_at: <int>
      name: <string>
      email: <string>
    }

conversation_created -> response to create_conversation
  payload data field:
    {
      conversation_id: <int>
      user1_id: <int> | null
      user2_id: <int> | null
      group_id: <int> | null
      type: "private" | "group"
    }

conversations_listed -> response to list_conversations
  payload data field:
    {
      conversations: [
        {
          conversation_id: <int>
          user1_id: <int> | null
          user2_id: <int> | null
          group_id: <int> | null
          type: "private" | "group"
          not_read_messages: [
            {
              message_id: <int>
              created_at: <int>
              updated_at: <int>
              conversation_id: <int>
              sender_id: <int>
              content: <string>
            }
             ...
          ]
          last_message: {
            message_id: <int>
            created_at: <int>
            updated_at: <int>
            conversation_id: <int>
            sender_id: <int>
            content: <string>
          } | null
        }
        ...
      ]
    }

messages_listed -> response to list_messages
  payload data field:
    {
      messages: [
        {
          message_id: <int>
          created_at: <int>
          updated_at: <int>
          conversation_id: <int>
          sender_id: <int>
          content: <string>
        }
         ...
      ]
    }

messages_deleted -> response to delete_messages
  payload data field:
    null


user_invited_to_group -> response to invite_user_to_group
  payload data field:
    {
      group_id: <int>
      inviter_id: <int>
      invited_id: <int>
    }

invite_to_group_status_changed -> response to change_invite_to_group_status
  payload data field:
    {
      invite_to_group_id: <int>
      status: <string>
    }


user_kicked_from_group -> response to kick_user_from_group
  payload data field:
    {
      group_id: <int>
      kicked_id: <int>
      by_admin_id: <int>
    }

user_putted_in_group -> response to put_user_in_group
  payload data field:
    {
      user_id: <int>
      group_id: <int>
    }

user_accepted_invite_to_group -> response to accept_invite_to_group
  payload data field:
    {
      group_id: <int>
      user_id: <int>
    }

invite_to_group_status_updated -> response to update_invite_to_group_status
  payload data field:
    {
      invite_id: <int>
      status: <string>
    }

user_deleted -> response to delete_user
  payload data field:
    {
      user_id: <int>
    }

user_logged_in -> response to log_in_user
  payload data field:
    {
      user_id: <int>
      is_logged: <boolean>
    }

user_logged_out -> response to logout_user
  payload data field:
    {
      user_id: <int>
      is_logged: <boolean>
    }


## Client -> Server Events

get_user
  payload:
    {
      email: <string>
    }

send_message
  payload:
    {
      conversation_id: <int>
      sender_id: <int>
      content: <string>
    }

message_received
  payload:
    {
      message_id: <int>
      user_id: <int>
    }

change_messages_status
  payload:
    [
     {
       message_id: <int>
       user_id: <int>
       status: "delivered" | "read"
     }
     ...
    ]

create_user
  payload:
    {
      name: <string>
      email: <string>
      password: <string>
    }

login_user
  payload:
    {
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

logout_user
  payload:
    {
      user_id: <int>
    }

create_group
  payload:
    {
      group_name: <string>
      creator_user_id: <int>
    }

delete_group
  payload:
    {
      group_id
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

change_invite_to_group_status
  payload:
    {
      invite_to_group_id: <int>
      status: <string>
    }

kick_user_from_group
  payload:
    {
      group_id: <int>
      user_id: <int>
      by_admin_id: <int>
    }

put_user_in_group
  payload:
    {
      user_id: <int>
      group_id: <int>
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
    [
      conversation_id: <int>,
      ...
    ]

create_conversation
  payload:
    {
      user1_id: <int> | null
      user2_id: <int> | null
      type: "private" | "group"
    }

list_conversations
  payload:
    {
      user_id: <int>
    }

delete_messages
  payload:
    {
      message_ids: [
        <int>,
        ...
      ]
    }

update_message
  payload:
    {
      message_id: <int>
      content: <string>
    }



## 📦 Event System Response Codes

### ✅ Success Codes (100–199)

| Code | Name                  | Description |
|------|------------------------|-------------|
| 100  | OK                    | Generic success response |
| 101  | CONNECTED             | Successfully connected to the WebSocket server |
| 102  | AUTH_SUCCESS          | Authentication completed successfully |
| 103  | MESSAGE_SENT          | Message delivered |
| 104  | MESSAGES_HISTORY      | History messages fetched successfully |
| 105  | PING_RESPONSE         | Pong response from server health check |
| 106  | CREATED               | When server create resource
| 107  | UPDATED               | When server update resource

---

### ⚠️ Client Errors (200–299)

| Code | Name                  | Description |
|------|-----------------------|-------------|
| 200  | BAD_REQUEST           | Invalid or malformed client request |
| 201  | INVALID_EVENT         | Event does not exist or is not allowed |
| 202  | INVALID_PAYLOAD       | Payload missing fields or formatted incorrectly |
| 203  | AUTH_REQUIRED         | Action requires authentication |
| 204  | INVALID_TOKEN         | Token invalid or expired |
| 205  | NOT_FOUND             | Target does not exist |
| 206  | MESSAGE_TOO_LONG      | Message exceeds character limit |
| 207  | EMPTY_MESSAGE         | Empty content was sent |
| 208  | FLOODING_DETECTED     | User sending messages too frequently |
| 209  | RESOURCE_FORBIDDEN    | Operation not allowed |
| 210  | UNSUPPORTED_VERSION   | Client version not supported |

---

### 💀 Server Errors (300–399)

| Code | Name                   | Description |
|------|------------------------|-------------|
| 300  | SERVER_ERROR           | Generic server crash |
| 301  | DATABASE_ERROR         | Database connection or query failure |
| 302  | INTERNAL_EXCEPTION     | Unexpected exception caught |
| 303  | SERVICE_UNAVAILABLE    | Service temporarily offline |
| 304  | MESSAGE_DELIVERY_FAILED| Could not deliver message |
| 305  | TIMEOUT                | Timeout occurred |
| 306  | DEPENDENCY_FAILURE     | External service or module failed |

---
