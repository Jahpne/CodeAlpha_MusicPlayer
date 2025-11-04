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

        

// Player state variables
        let isPlaying = false;
        let currentTrackIndex = 0;
        let isShuffled = false;
        let repeatMode = 0; // 0: no repeat, 1: repeat all, 2: repeat one
        let originalPlaylist = [...playlistData];
        
        // Initialize the player
        function initPlayer() {
            // Load the first track
            loadTrack(currentTrackIndex);
            
            // Create playlist items
            createPlaylist();
            
            // Set initial volume
            audioPlayer.volume = 0.7;
            updateVolumeBar();
            
            // Add event listeners
            addEventListeners();
        }
        
        // Load a track by index
        function loadTrack(index) {
            // Get track data
            const track = playlistData[index];
            
            // Set audio source
            audioPlayer.src = track.src;
            
            // Update UI with track info
            songTitle.textContent = track.title;
            artist.textContent = track.artist;
            album.textContent = track.album;
            albumArt.querySelector('img').src = track.cover;
            
            // Update active playlist item
            updateActivePlaylistItem(index);
            
            // Reset progress bar
            progress.style.width = '0%';
            currentTime.textContent = '0:00';
            duration.textContent = track.duration;
            
            // If player was playing, continue playing
            if (isPlaying) {
                audioPlayer.play();
            }
        }
        
        // Create playlist items
        function createPlaylist() {
            // Clear existing playlist
            playlist.innerHTML = '';
            
            // Create playlist items for each track
            playlistData.forEach((track, index) => {
                const playlistItem = document.createElement('div');
                playlistItem.className = 'playlist-item';
                if (index === currentTrackIndex) {
                    playlistItem.classList.add('active');
                }
                
                playlistItem.innerHTML = `
                    <div class="item-number">${index + 1}</div>
                    <div class="item-info">
                        <div class="item-title">${track.title}</div>
                        <div class="item-artist">${track.artist}</div>
                    </div>
                    <div class="item-duration">${track.duration}</div>
                `;
                
                // Add click event to play this track
                playlistItem.addEventListener('click', () => {
                    currentTrackIndex = index;
                    loadTrack(currentTrackIndex);
                    if (isPlaying) {
                        audioPlayer.play();
                    }
                });
                
                // Append to playlist
                playlist.appendChild(playlistItem);
            });
        }
        
        // Update active playlist item
        function updateActivePlaylistItem(index) {
            // Remove active class from all items
            document.querySelectorAll('.playlist-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to current item
            if (playlist.children[index]) {
                playlist.children[index].classList.add('active');
            }
        }
        
        // Add event listeners to player elements
        function addEventListeners() {
            // Play/Pause button
            playBtn.addEventListener('click', togglePlayPause);
            
            // Previous button
            prevBtn.addEventListener('click', playPrevious);
            
            // Next button
            nextBtn.addEventListener('click', playNext);
            
            // Shuffle button
            shuffleBtn.addEventListener('click', toggleShuffle);
            
            // Repeat button
            repeatBtn.addEventListener('click', toggleRepeat);
            
            // Progress bar click
            progressBar.addEventListener('click', setProgress);
            
            // Volume bar click
            volumeBar.addEventListener('click', setVolume);
            
            // Audio time update
            audioPlayer.addEventListener('timeupdate', updateProgress);
            
            // Audio ended
            audioPlayer.addEventListener('ended', handleTrackEnd);
            
            // Audio loaded metadata
            audioPlayer.addEventListener('loadedmetadata', () => {
                duration.textContent = formatTime(audioPlayer.duration);
            });
            
            // Toggle playlist
            togglePlaylist.addEventListener('click', togglePlaylistView);
            
            // File input for adding music
            fileInput.addEventListener('change', handleFileUpload);
            
            // Keyboard shortcuts
            document.addEventListener('keydown', handleKeyPress);
        }
        
        // Toggle play/pause
        function togglePlayPause() {
            if (isPlaying) {
                pauseAudio();
            } else {
                playAudio();
            }
        }
        
        // Play audio
        function playAudio() {
            audioPlayer.play();
            isPlaying = true;
            playBtn.innerHTML = '⏸';
            albumArt.classList.add('playing');
        }
        
        // Pause audio
        function pauseAudio() {
            audioPlayer.pause();
            isPlaying = false;
            playBtn.innerHTML = '▶';
            albumArt.classList.remove('playing');
        }
        
        // Play previous track
        function playPrevious() {
            currentTrackIndex--;
            if (currentTrackIndex < 0) {
                currentTrackIndex = playlistData.length - 1;
            }
            loadTrack(currentTrackIndex);
            if (isPlaying) {
                audioPlayer.play();
            }
        }
        
        // Play next track
        function playNext() {
            currentTrackIndex++;
            if (currentTrackIndex >= playlistData.length) {
                currentTrackIndex = 0;
            }
            loadTrack(currentTrackIndex);
            if (isPlaying) {
                audioPlayer.play();
            }
        }
        
        // Toggle shuffle
        function toggleShuffle() {
            isShuffled = !isShuffled;
            shuffleBtn.style.background = isShuffled ? 'rgba(138, 43, 226, 0.5)' : 'rgba(255, 255, 255, 0.1)';
            
            if (isShuffled) {
                // Shuffle the playlist
                shufflePlaylist();
            } else {
                // Restore original order
                playlistData = [...originalPlaylist];
                createPlaylist();
            }
        }
        
        // Shuffle playlist
        function shufflePlaylist() {
            // Fisher-Yates shuffle algorithm
            for (let i = playlistData.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [playlistData[i], playlistData[j]] = [playlistData[j], playlistData[i]];
            }
            createPlaylist();
        }
        
        // Toggle repeat mode
        function toggleRepeat() {
            repeatMode = (repeatMode + 1) % 3;
            
            switch (repeatMode) {
                case 0:
                    repeatBtn.innerHTML = '🔁';
                    repeatBtn.title = 'Repeat Off';
                    repeatBtn.style.background = 'rgba(255, 255, 255, 0.1)';
                    break;
                case 1:
                    repeatBtn.innerHTML = '🔂°';
                    repeatBtn.title = 'Repeat All';
                    repeatBtn.style.background = 'rgba(138, 43, 226, 0.5)';
                    break;
                case 2:
                    repeatBtn.innerHTML = '🔂';
                    repeatBtn.style.background = 'rgba(138, 43, 226, 0.5)';
                    repeatBtn.title = 'Repeat One';
                    break;
            }
        }
        
        // Set progress based on click position
        function setProgress(e) {
            const width = this.clientWidth;
            const clickX = e.offsetX;
            const duration = audioPlayer.duration;
            
            audioPlayer.currentTime = (clickX / width) * duration;
        }
        
        // Update progress bar as audio plays
        function updateProgress() {
            const { currentTime: currTime, duration: dur } = audioPlayer;
            
            if (dur) {
                const progressPercent = (currTime / dur) * 100;
                progress.style.width = `${progressPercent}%`;
                
                // Update progress handle position
                const progressBarWidth = progressBar.clientWidth;
                progressHandle.style.left = `${progressPercent}%`;
                
                // Update time labels
                currentTime.textContent = formatTime(currTime);
            }
        }
        
        // Set volume based on click position
        function setVolume(e) {
            const width = this.clientWidth;
            const clickX = e.offsetX;
            const volume = clickX / width;
            
            audioPlayer.volume = volume;
            updateVolumeBar();
        }
        
        // Update volume bar display
        function updateVolumeBar() {
            const volume = audioPlayer.volume;
            volumeLevel.style.width = `${volume * 100}%`;
            volumeHandle.style.left = `${volume * 100}%`;
        }
        
        // Handle track end
        function handleTrackEnd() {
            switch (repeatMode) {
                case 0: // No repeat
                    if (currentTrackIndex < playlistData.length - 1) {
                        playNext();
                    } else {
                        pauseAudio();
                    }
                    break;
                case 1: // Repeat all
                    playNext();
                    break;
                case 2: // Repeat one
                    audioPlayer.currentTime = 0;
                    audioPlayer.play();
                    break;
            }
        }
        
        // Toggle playlist view
        function togglePlaylistView() {
            playlist.classList.toggle('expanded');
            togglePlaylist.textContent = playlist.classList.contains('expanded') ? '▲' : '▼';
        }
        
        // Handle file upload
        function handleFileUpload(e) {
            const files = e.target.files;

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file.type.startsWith('audio/')) {
                    const url = URL.createObjectURL(file);
                    const newSong = {
                        title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
                        artist: "Unknown Artist",
                        album: "Local Files",
                        src: url,
                        cover: "assets/15.jpg", // Default cover
                        duration: "0:00"
                    };

                    playlistData.push(newSong);
                    originalPlaylist.push(newSong);
                }
            }

            createPlaylist();
            fileInput.value = ''; // Reset file input
        }
        
        // Handle keyboard shortcuts
        function handleKeyPress(e) {
            switch (e.code) {
                case 'Space':
                    e.preventDefault();
                    togglePlayPause();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    audioPlayer.currentTime -= 10;
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    audioPlayer.currentTime += 10;
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    audioPlayer.volume = Math.min(audioPlayer.volume + 0.1, 1);
                    updateVolumeBar();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    audioPlayer.volume = Math.max(audioPlayer.volume - 0.1, 0);
                    updateVolumeBar();
                    break;
            }
        }
        
        // Format time from seconds to MM:SS
        function formatTime(seconds) {
            if (isNaN(seconds)) return '0:00';
            
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }
        
        // Initialize the player when page loads

        window.addEventListener('load', initPlayer);
