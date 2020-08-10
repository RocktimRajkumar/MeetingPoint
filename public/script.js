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

let myVideoStream;
// using system camera and audio
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream;
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

    let text = $('input');

    // Sending a message
    $('#chat_message').keydown((e) => {
        if (e.which == 13 && text.val().length != 0) {
            socket.emit('message', ROOM_ID, text.val());
            $('.messages').append(`<li class="my__message"><b>User</b></br>${text.val()}</li>`);
            text.val('');
            scrollToBottom();
        }
    });

    //Receiving messages
    socket.on('createMessage', msg => {
        $('.messages').append(`<li class="message"><b>User</b></br>${msg}</li>`);
        scrollToBottom();
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

const scrollToBottom = () => {
    let d = $('.main__chat_window');
    d.scrollTop(d.prop('scrollHeight'));
}

// Mute or Unmute the microphone
const muteUnmute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false;
        setUnmuteButton();
    } else {
        setMuteButton();
        myVideoStream.getAudioTracks()[0].enabled = true;
    }
}

const setUnmuteButton = () => {
    const unMute = `<i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span`

    $(".main__mute_button")[0].innerHTML = unMute;
}

const setMuteButton = () => {
    const mute = `<i class="mute fas fa-microphone"></i>
    <span>Mute</span`

    $(".main__mute_button")[0].innerHTML = mute;
}


// Turning Video ON or OFF

const playStop = () => {
    const enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        setPlayVideo();
    } else {
        setStopVideo();
        myVideoStream.getVideoTracks()[0].enabled = true;
    }
}

const setPlayVideo = () => {
    const play = `<i class="stop fas fa-video-slash"></i>
    <span>Play Video</span`

    $(".main__video_button")[0].innerHTML = play;
}

const setStopVideo = () => {
    const stop = `<i class="mute fas fa-video"></i>
    <span>Stop Video</span`

    $(".main__video_button")[0].innerHTML = stop;
}

