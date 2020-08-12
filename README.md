# 💻 MeetingPoint
 
A video conference app using WebRTC 
[https://meetingpoint.herokuapp.com/](https://meetingpoint.herokuapp.com/)

A **roomId** is automatically generated and appended to the `URL` when visited to the above `URL`.
For other to join to the same room the `URL`+**roomID** needs to be shared.


# Plan of Action

- [x] Initialize NodeJS Project 
- [x] Initialize the first view
- [x] Create a room id
- [x] Add the ability to view our own Video
- [x] Add ability to allow others to stream their video
- [x] Add styling
- [x] Add the ability to create messages
- [x] Add mute button
- [x] Add Stop Video button


### `Steps`
- **To install dependencies**
    > npm install
 - **To Run the app**
    > npm start


### `Dependencies Used`

| Name | Version | Description |
|--|--|--|
| ejs | ^3.1.3 | Embedded Javascript, a template Engine that helps to generate HTML with plain javascript |
| express  | ^4.17.1 | JavaScript back-end framework that's designed to develop complete web applications and APIs |
| peer | ^0.5.3 | PeerJS wraps the browser's WebRTC implementation to provide a complete, configurable, and easy-to-use peer-to-peer connection API.  |
|socket.io | ^2.3.0 | Socket.IO enables real-time bidirectional event-based communication. |
| uuid | ^8.3.0 | UUIDs used for identifying information that needs to be unique within a system or network |