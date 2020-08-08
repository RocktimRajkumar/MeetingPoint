const socket = io('/')
const videoGrid = document.getElementById("video-grid")
// Creating a html video element and setting the video to mute
const myVideo = document.createElement('video');
myVideo.muted = true;

var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '3030'
});

// using system camera and audio
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream);

    peer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', stream => {
            addVideoStream(video, stream)
        })
    });

    // Listening to the event when other connect to our room
    socket.on('user-connected', (userId) => {
        connectToNewUser(userId, stream);
    });
});

// Using WebRTC to share media like vdo and audio
peer.on('open', id => {
    // Joing a room
    socket.emit('join-room', ROOM_ID, id);
});

const connectToNewUser = (userId, stream) => {
    console.log('connected user: ' + userId);
    const call = peer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', stream => {
        addVideoStream(video, stream)
    });
};

// Adding system camera stream to html video element
const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video);
};