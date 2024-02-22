const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const penColor = document.querySelector("input[name='penColor']");
const penWidth = document.querySelector("input[name='penWidth']");
const saver = document.querySelector("#saver");
const title = document.querySelector("#title");

const heading = "Paint";
heading.split("").forEach((el) => {
    const tag = document.createElement("span");
    tag.innerHTML = el;
    tag.style.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    title.appendChild(tag)
})

ctx.strokeStyle = "#000000";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 5;
let pen = {
    x: 0,
    y: 0,
    down: false
};

saver.addEventListener("click", saveFile);
canvas.addEventListener("mousedown", penDown);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", noDown);
canvas.addEventListener("mouseout", noDown);

function noDown() {
    pen.down = false;
}
function draw(e) {
    if (!pen.down) return;
    ctx.lineWidth = penWidth.value;
    ctx.strokeStyle = penColor.value;
    ctx.beginPath();
    ctx.moveTo(pen.x, pen.y);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [pen.x, pen.y] = [e.offsetX, e.offsetY];
}
function penDown(e) {
    pen.down = true;
    [pen.x, pen.y] = [e.offsetX, e.offsetY];
}
function saveFile() {
    let image = canvas.toDataURL();
    let a = document.createElement("a");
    a.setAttribute("download", "image.png");
    a.setAttribute("href", canvas.toDataURL("image/png").replace("image/png", "image/octet-strream"));
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    document.getElementById("myImage").src = image;;
}

// const img = new Image();
// const uploader = document.querySelector("#uploader");
// uploader.addEventListener("change", (e) => {
//     const file = uploader.files[0];
//     img.src = URL.createObjectURL(file);
//     ctx.drawImage(img, 0, 0);
// })

// uploader.addEventListener('change', (e) => {
//     console.log(canvas.height, canvas.width);
//     const myFile = uploader.files[0];
//     console.log(myFile.name);
//     const img = new Image();
//     img.src = URL.createObjectURL(myFile);
//     img.onload = function () {
//         console.log(img.height, img.width);
//         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//     }
// })


