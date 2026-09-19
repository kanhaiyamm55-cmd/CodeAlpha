/* =========================================================
   MELODYBOX MUSIC PLAYER
   CodeAlpha Task 4

   Features:
   ✔ Category-wise playlist
   ✔ Play / Pause
   ✔ Next
   ✔ Previous
   ✔ Shuffle
   ✔ Repeat
   ✔ Volume
   ✔ Progress bar
   ✔ Actual MP3 playback
   ✔ Mobile hamburger menu
   ✔ Easy to add more songs
   ========================================================= */


/* =========================================================
   1. MUSIC LIBRARY

   YAHAN NEW SONG ADD KARNA HAI.

   Example:

   {
       title: "New Song",
       artist: "Artist Name",
       file: "music/song6.mp3",
       category: "Hindi"
   }

   category exactly inme se ek hona chahiye:
   Bhojpuri
   Hindi
   Bhakti
   Punjabi
   Haryanvi
   ========================================================= */

const songs = [

    {
        title: "Bhojpuri Song 1",
        artist: "Bhojpuri Music",
        file: "music/song1.mp3",
        category: "Bhojpuri"
    },

    {
        title: "Hindi Song 1",
        artist: "Hindi Music",
        file: "music/song2.mp3",
        category: "Hindi"
    },

    {
        title: "Bhakti Song 1",
        artist: "Bhakti Music",
        file: "music/song3.mp3",
        category: "Bhakti"
    },

    {
        title: "Punjabi Song 1",
        artist: "Punjabi Music",
        file: "music/song4.mp3",
        category: "Punjabi"
    },

    {
        title: "Haryanvi Song 1",
        artist: "Haryanvi Music",
        file: "music/song5.mp3",
        category: "Haryanvi"
    }

];


/* =========================================================
   2. GET HTML ELEMENTS
   ========================================================= */

const audio = document.getElementById("audioPlayer");

const songList = document.getElementById("songList");

const playBtn = document.getElementById("playBtn");

const previousBtn =
    document.getElementById("previousBtn");

const nextBtn =
    document.getElementById("nextBtn");

const shuffleBtn =
    document.getElementById("shuffleBtn");

const repeatBtn =
    document.getElementById("repeatBtn");

const progressBar =
    document.getElementById("progressBar");

const volumeSlider =
    document.getElementById("volumeSlider");

const volumeIcon =
    document.getElementById("volumeIcon");

const currentTitle =
    document.getElementById("currentTitle");

const currentCategory =
    document.getElementById("currentCategory");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

const categoryTitle =
    document.getElementById("categoryTitle");

const songCount =
    document.getElementById("songCount");

const sidebar =
    document.getElementById("sidebar");

const menuBtn =
    document.getElementById("menuBtn");


/* =========================================================
   3. PLAYER VARIABLES
   ========================================================= */

let currentCategoryName = "Bhojpuri";

let currentSongIndex = 0;

let isShuffle = false;

let isRepeat = false;


/* =========================================================
   4. GET SONGS OF CURRENT CATEGORY
   ========================================================= */

function getCategorySongs() {

    return songs.filter(
        song =>
            song.category === currentCategoryName
    );

}


/* =========================================================
   5. CATEGORY EMOJI
   ========================================================= */

function getCategoryEmoji(category) {

    switch (category) {

        case "Bhakti":
            return "🕉️";

        case "Bhojpuri":
            return "🎵";

        case "Hindi":
            return "🎵";

        case "Punjabi":
            return "🎵";

        case "Haryanvi":
            return "🎵";

        default:
            return "🎵";
    }

}


/* =========================================================
   6. DISPLAY SONGS
   ========================================================= */

function displaySongs() {

    const categorySongs =
        getCategorySongs();


    /* Clear old cards */

    songList.innerHTML = "";


    /* Category heading */

    categoryTitle.textContent =
        getCategoryEmoji(currentCategoryName)
        + " "
        + currentCategoryName;


    /* Song count */

    songCount.textContent =
        categorySongs.length
        + (
            categorySongs.length === 1
                ? " song"
                : " songs"
        );


    /* Empty category */

    if (categorySongs.length === 0) {

        songList.innerHTML = `

            <div class="song-card">

                <div class="album-art">
                    🎵
                </div>

                <div class="song-info">

                    <h4>No songs available</h4>

                    <p>
                        Add songs to this category
                    </p>

                </div>

            </div>

        `;

        return;
    }


    /* Create song cards */

    categorySongs.forEach(
        (song, index) => {

            const card =
                document.createElement("div");


            card.className =
                "song-card";


            card.innerHTML = `

                <div class="album-art">
                    ${getCategoryEmoji(song.category)}
                </div>

                <div class="song-info">

                    <h4>
                        ${song.title}
                    </h4>

                    <p>
                        ${song.artist}
                    </p>

                </div>

            `;


            /* Click card */

            card.addEventListener(
                "click",
                () => {

                    currentSongIndex =
                        index;

                    loadSong();

                    playSong();

                }
            );


            songList.appendChild(card);

        }
    );


    updateActiveCard();

}


/* =========================================================
   7. LOAD SONG
   ========================================================= */

function loadSong() {

    const categorySongs =
        getCategorySongs();


    if (categorySongs.length === 0) {
        return;
    }


    /* Safety */

    if (
        currentSongIndex < 0
        ||
        currentSongIndex >=
            categorySongs.length
    ) {

        currentSongIndex = 0;

    }


    const song =
        categorySongs[currentSongIndex];


    /* Set audio */

    audio.src = song.file;


    /* Update player */

    currentTitle.textContent =
        song.title;

    currentCategory.textContent =
        song.category
        + " • "
        + song.artist;


    /* Reset progress */

    progressBar.value = 0;

    currentTime.textContent = "0:00";

    duration.textContent = "0:00";


    /* Load */

    audio.load();


    /* Active card */

    updateActiveCard();

}


/* =========================================================
   8. PLAY SONG
   ========================================================= */

function playSong() {

    if (!audio.src) {

        loadSong();

    }


    audio.play()
        .then(() => {

            playBtn.textContent = "⏸️";

        })
        .catch(error => {

            console.log(
                "Audio playback error:",
                error
            );

        });

}


/* =========================================================
   9. PAUSE SONG
   ========================================================= */

function pauseSong() {

    audio.pause();

    playBtn.textContent = "▶️";

}


/* =========================================================
   10. PLAY / PAUSE BUTTON
   ========================================================= */

playBtn.addEventListener(
    "click",
    () => {

        if (!audio.src) {

            loadSong();

            playSong();

            return;

        }


        if (audio.paused) {

            playSong();

        } else {

            pauseSong();

        }

    }
);


/* =========================================================
   11. NEXT SONG
   ========================================================= */

nextBtn.addEventListener(
    "click",
    nextSong
);


function nextSong() {

    const categorySongs =
        getCategorySongs();


    if (categorySongs.length === 0) {
        return;
    }


    /* SHUFFLE */

    if (
        isShuffle
        &&
        categorySongs.length > 1
    ) {

        let newIndex;


        do {

            newIndex =
                Math.floor(
                    Math.random()
                    *
                    categorySongs.length
                );

        } while (
            newIndex ===
            currentSongIndex
        );


        currentSongIndex =
            newIndex;

    }

    /* NORMAL NEXT */

    else {

        currentSongIndex++;


        if (
            currentSongIndex
            >= categorySongs.length
        ) {

            currentSongIndex = 0;

        }

    }


    loadSong();

    playSong();

}


/* =========================================================
   12. PREVIOUS SONG
   ========================================================= */

previousBtn.addEventListener(
    "click",
    previousSong
);


function previousSong() {

    const categorySongs =
        getCategorySongs();


    if (categorySongs.length === 0) {
        return;
    }


    currentSongIndex--;


    if (currentSongIndex < 0) {

        currentSongIndex =
            categorySongs.length - 1;

    }


    loadSong();

    playSong();

}


/* =========================================================
   13. SHUFFLE
   ========================================================= */

shuffleBtn.addEventListener(
    "click",
    () => {

        isShuffle =
            !isShuffle;


        shuffleBtn.classList.toggle(
            "active",
            isShuffle
        );


        shuffleBtn.title =
            isShuffle
                ? "Shuffle ON"
                : "Shuffle OFF";

    }
);


/* =========================================================
   14. REPEAT
   ========================================================= */

repeatBtn.addEventListener(
    "click",
    () => {

        isRepeat =
            !isRepeat;


        repeatBtn.classList.toggle(
            "active",
            isRepeat
        );


        repeatBtn.title =
            isRepeat
                ? "Repeat ON"
                : "Repeat OFF";

    }
);


/* =========================================================
   15. SONG ENDED
   ========================================================= */

audio.addEventListener(
    "ended",
    () => {

        /* Repeat current song */

        if (isRepeat) {

            audio.currentTime = 0;

            playSong();

        }

        /* Otherwise next */

        else {

            nextSong();

        }

    }
);


/* =========================================================
   16. PROGRESS BAR UPDATE
   ========================================================= */

audio.addEventListener(
    "timeupdate",
    () => {

        if (!audio.duration) {
            return;
        }


        const progress =
            (
                audio.currentTime
                /
                audio.duration
            )
            * 100;


        progressBar.value =
            progress;


        currentTime.textContent =
            formatTime(
                audio.currentTime
            );

    }
);


/* =========================================================
   17. AUDIO DURATION
   ========================================================= */

audio.addEventListener(
    "loadedmetadata",
    () => {

        duration.textContent =
            formatTime(
                audio.duration
            );

    }
);


/* =========================================================
   18. PROGRESS BAR CLICK / DRAG
   ========================================================= */

progressBar.addEventListener(
    "input",
    () => {

        if (!audio.duration) {
            return;
        }


        audio.currentTime =
            (
                progressBar.value
                /
                100
            )
            *
            audio.duration;

    }
);


/* =========================================================
   19. FORMAT TIME
   ========================================================= */

function formatTime(seconds) {

    if (
        isNaN(seconds)
        ||
        !isFinite(seconds)
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const secs =
        Math.floor(
            seconds % 60
        );


    return (
        minutes
        +
        ":"
        +
        String(secs)
            .padStart(2, "0")
    );

}


/* =========================================================
   20. VOLUME CONTROL
   ========================================================= */

volumeSlider.addEventListener(
    "input",
    () => {

        audio.volume =
            Number(
                volumeSlider.value
            );


        updateVolumeIcon();

    }
);


/* =========================================================
   21. VOLUME ICON
   ========================================================= */

function updateVolumeIcon() {

    const volume =
        Number(
            volumeSlider.value
        );


    if (volume === 0) {

        volumeIcon.textContent =
            "🔇";

    }

    else if (volume < 0.5) {

        volumeIcon.textContent =
            "🔉";

    }

    else {

        volumeIcon.textContent =
            "🔊";

    }

}


/* =========================================================
   22. CATEGORY BUTTONS
   ========================================================= */

const categoryButtons =
    document.querySelectorAll(
        ".category-btn"
    );


categoryButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                /* Remove active */

                categoryButtons.forEach(
                    btn => {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                /* Add active */

                button.classList.add(
                    "active"
                );


                /* Change category */

                currentCategoryName =
                    button.dataset.category;


                /* Start from first song */

                currentSongIndex = 0;


                /* Display */

                displaySongs();


                /* Close mobile menu */

                if (
                    window.innerWidth <= 900
                ) {

                    sidebar.classList.remove(
                        "open"
                    );

                }

            }
        );

    }
);


/* =========================================================
   23. MOBILE HAMBURGER MENU
   ========================================================= */

menuBtn.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle(
            "open"
        );

    }
);


/* =========================================================
   24. CLOSE MENU WHEN CLICKING OUTSIDE
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            window.innerWidth <= 900
            &&
            sidebar.classList.contains("open")
            &&
            !sidebar.contains(event.target)
            &&
            !menuBtn.contains(event.target)
        ) {

            sidebar.classList.remove(
                "open"
            );

        }

    }
);


/* =========================================================
   25. ACTIVE SONG CARD
   ========================================================= */

function updateActiveCard() {

    const cards =
        document.querySelectorAll(
            ".song-card"
        );


    cards.forEach(
        card => {

            card.classList.remove(
                "active"
            );

        }
    );


    if (
        cards[currentSongIndex]
    ) {

        cards[currentSongIndex]
            .classList.add(
                "active"
            );

    }

}


/* =========================================================
   26. KEYBOARD CONTROLS
   =========================================================

   Space = Play / Pause
   Arrow Right = Next
   Arrow Left = Previous
   Arrow Up = Volume +
   Arrow Down = Volume -
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /* Don't interfere with sliders */

        if (
            event.target.tagName ===
            "INPUT"
        ) {

            return;

        }


        /* SPACE */

        if (
            event.code === "Space"
        ) {

            event.preventDefault();

            playBtn.click();

        }


        /* NEXT */

        if (
            event.code === "ArrowRight"
        ) {

            nextSong();

        }


        /* PREVIOUS */

        if (
            event.code === "ArrowLeft"
        ) {

            previousSong();

        }


        /* VOLUME UP */

        if (
            event.code === "ArrowUp"
        ) {

            event.preventDefault();

            let volume =
                Number(
                    volumeSlider.value
                );


            volume =
                Math.min(
                    1,
                    volume + 0.1
                );


            volumeSlider.value =
                volume;

            audio.volume =
                volume;

            updateVolumeIcon();

        }


        /* VOLUME DOWN */

        if (
            event.code === "ArrowDown"
        ) {

            event.preventDefault();

            let volume =
                Number(
                    volumeSlider.value
                );


            volume =
                Math.max(
                    0,
                    volume - 0.1
                );


            volumeSlider.value =
                volume;

            audio.volume =
                volume;

            updateVolumeIcon();

        }

    }
);


/* =========================================================
   27. AUDIO ERROR
   ========================================================= */

audio.addEventListener(
    "error",
    () => {

        currentTitle.textContent =
            "Unable to play this song";

        currentCategory.textContent =
            "Check the MP3 file path";

        playBtn.textContent =
            "▶️";

        console.log(
            "Could not load:",
            audio.src
        );

    }
);


/* =========================================================
   28. INITIAL SETTINGS
   ========================================================= */

audio.volume = 1;

volumeSlider.value = 1;

updateVolumeIcon();


/* =========================================================
   29. INITIAL PLAYLIST
   ========================================================= */

displaySongs();
