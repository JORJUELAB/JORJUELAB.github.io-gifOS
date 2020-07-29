let video = document.querySelector("video");//ok
let videoScreen = document.getElementById("start-gif");//ok
let stopButton = document.getElementById("btn-stop-recording");//ok
let startButton = document.getElementById("btn-start-recording");//ok
let createGif = document.getElementById("create-gif");//ok
let uploadButton = document.getElementById("upload-gif");//ok
let uploadButtons = document.getElementById("gifUploadDiv");//ok
let repeatButton = document.getElementById("repeatCapture");//ok
let repeat = document.getElementById("repeat");//ok
let start = document.getElementById("start-button");//ok
let cGif = document.getElementById("finishedGif");//ok
let buttonCopyLink = document.getElementById("copyLink");//ok
let downloadButton = document.getElementById("download");//ok
let mygifos = document.getElementById("misGifos");//ok
let capturar = document.getElementById("capturar");//ok
let stopDiv = document.getElementById("stopDiv");//ok
let imgfinished = document.getElementById("uploadedGif");//ok
let cameraContainer = document.getElementById("cameraContainer");//ok
let recordingContainer = document.getElementById("recordingContainer");//ok
let uVideo = document.getElementById("uploadVideo");

let blob, record, preview, recorder, camera, stream, idToSave, blob_url;

repeatButton.onclick = repeatGif;
start.onclick = requestVideo;
uploadButton.onclick = uploadVideo;
buttonCopyLink.onclick = copy;
downloadButton.onclick = download;

videoScreen.style.display = "none";
stopButton.style.display = "none";
uploadButtons.style.display = "none";
cGif.style.display = "none";
capturar.style.display = "none";
stopDiv.style.display = "none";
uVideo.style.display = "none";


function requestVideo() {
    capturar.style.display = "block";
    mygifos.style.display = "none";
    createGif.style.display = "none";
    videoScreen.style.display = "block";
    video.style.display = "block";
    navigator.mediaDevices
        .getUserMedia({
            video: {
                width: { ideal: 637 },
                height: { min: 432 },
            },
            audio: false,
        })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
            startButton.onclick = function() {
                stopDiv.style.display = "block";
                recorder = RecordRTC(stream, {
                    type: "gif",
                    frameRate: 1,
                    quality: 10,
                    width: 360,
                    hidden: 240,
                });
                recorder.startRecording();
                recorder.stream = stream;
                stopButton.disabled = false;
                stopButton.style.display = "block";
                startButton.style.display = "none";
                cameraContainer.style.display ="none";
                recordingContainer.style.display = "block"
                document.getElementById("trytitle").innerHTML = "Capturando Tu Guifo"; 

            };
        })
        .catch((e) => console.error(e));
}

document.getElementById("btn-stop-recording").onclick = async function() {
    recorder.stopRecording(function(record) {
        console.log("fin de grabacion");
        preview = record;
    });
    document.getElementById("trytitle").innerHTML = "Vista Previa";          
    recordingContainer.style.display = "none"
    stopButton.style.display = "none";
    uploadButtons.style.display = "block";
    recorder.stream.stop();
    video.style.stream = "none";
    blob = await recorder.getBlob();
    video.style.display = "none";
    repeat.style.display = "block";
    repeatButton.style.display = "block";
    uploadButton.style.display = "block";
    blob_url = URL.createObjectURL(blob);
    repeat.src = blob_url;
    console.log(blob);
};

function uploadVideo() {
    let form = new FormData();
    form.append("file", blob, "myGifo.git");
    console.log(form.get("file"));
    whileChange();
    fetchURL(
        "https://upload.giphy.com/v1/gifs?api_key=lCIxyIpyjzmnIETV0Z1M6WMnWOtsdeH3", {
            method: "POST",
            body: form,
            headers: {
                Accept: "application/json",
            },
            json: true,
        }
    );
    repeat.style.display = "none";
    uploadButtons.style.display = "none";
    //alert("UPLOAD!!!");
    cGif.style.display = "block";
    repeat.style.display = "block";
    videoScreen.style.display = "none";
    imgfinished.src = repeat.src;
    mygifos.style.display = "block";
}

async function fetchURL(url, params) {
    try {
        const response = await fetch(url, params);
        idToSave = await response.json();
        console.log(await idToSave.data.id);
        let vector_id = localStorage.getItem("vector_id");
        console.log("desde getitem");
        console.log(vector_id);
        if (vector_id === undefined) {
            vector_id = "";
            console.log("vacio");
        }
        vector_id = vector_id + ", " + idToSave.data.id;
        console.log(vector_id);
        localStorage.setItem("vector_id", vector_id);
        return response;
    } catch (error) {
        if (error.name !== "AbortError") {
            console.log("Error al obtener resultados");
        }
        return error;
    }
}

function repeatGif() {
    recorder.destroy();
    recorder = null;
    video.src = recorder;
    document.getElementById("trytitle").innerHTML = "Un Chequeo Antes de Empezar"; 
    cameraContainer.style.display ="block";
    repeatButton.style.display = "none";
    repeat.style.display = "none";
    uploadButtons.style.display = "none";
    createGif.style.display = "none";
    videoScreen.style.display = "block";
    capturar.style.display = "block";
    startButton.style.display = "block";
    stopDiv.style.display = "none";
    requestVideo();
}

async function copy() {
    cGif.style.display = "block";
    console.log("copy");
    await navigator.clipboard.writeText(
        "https://giphy.com/gifs/" + idToSave.data.id
    );
    //alert("enlace copiado");
}

function download() {
    recorder.save();
}

function whileChange() {
    uVideo.style.display = "block";
    cGif.style.visibility = "hidden";
    setTimeout(function chageToEnd() {
        uVideo.style.display = "none";
        cGif.style.visibility = "visible";
    }, 3000);
}
