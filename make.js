  // DOM elements - Get references to all important elements
        const audioPlayer = document.getElementById('audioPlayer');
        const albumArt = document.getElementById('albumArt');
        const songTitle = document.getElementById('songTitle');
        const artist = document.getElementById('artist');
        const album = document.getElementById('album');
        const playBtn = document.getElementById('playBtn');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const shuffleBtn = document.getElementById('shuffleBtn');
        const repeatBtn = document.getElementById('repeatBtn');
        const progressBar = document.getElementById('progressBar');
        const progress = document.getElementById('progress');
        const progressHandle = document.getElementById('progressHandle');
        const currentTime = document.getElementById('currentTime');
        const duration = document.getElementById('duration');
        const volumeBar = document.getElementById('volumeBar');
        const volumeLevel = document.getElementById('volumeLevel');
        const volumeHandle = document.getElementById('volumeHandle');
        const togglePlaylist = document.getElementById('togglePlaylist');
        const playlist = document.getElementById('playlist');
        const fileInput = document.getElementById('fileInput');
        
        // Music playlist data
        let playlistData = [
            {
                title: "Angels In The Sky",
                artist: "Polo G",
                album: "HOOD POET",
                src: "Angels.mp3",
                cover: "15.jpg",
                duration: "3:45"
            },
            {
                title: "Hero",
                artist: "Alan Walker & Sasha",
                album: "Hero",
                src: "Hero.mp3",
                cover: "18.jpg",
                duration: "2:51"
            },
            {
                title: "Before You Leave Me",
                artist: "Alex Warren",
                album: "Broken",
                src: "Before.mp3",
                cover: "22.jpg",
                duration: "2:56"
            },
            {
                title: "Carry You Home",
                artist: "Alex Warren",
                album: "55 years?",
                src: "Home.mp3",
                cover: "20.jpg",
                duration: "3:10"
            },
            {
                title: "CRG",
                artist: "Central Cee",
                album: "Can't Rush Greatness",
                src: "Central-Cee-CRG.MP3",
                cover: "19.jpg",
                duration: "3:05"
            }
        ];

        
