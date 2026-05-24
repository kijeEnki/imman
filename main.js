import { createBlock, blockRegistry } from './blocks.js';
import { executeProgram } from './program.js';

const canvas = document.querySelector("canvas#result-image");
const ctx = canvas.getContext("2d");

const exportButton = document.querySelector("button#export");
const formatSelect = document.querySelector("select#format-select");

const renderSelect = document.querySelector("select#image-display");

canvas.style.imageRendering = "pixelated";

renderSelect.addEventListener("change", () => {
    if (renderSelect.value == "px") {
        canvas.style.imageRendering = "pixelated";
    } else if (renderSelect.value == "smooth") {
        canvas.style.imageRendering = "auto";
    }
})

function drawIfEmpty() {
    let oldFill = ctx.fillStyle;
    let oldAlign = ctx.textAlign;
    let oldFont = ctx.font;
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("Поки що нічого не намальовано.", canvas.width / 2, canvas.height / 2);
    ctx.beginPath();
    ctx.moveTo(canvas.width * 1/12, canvas.height * 0.5);
    ctx.lineTo(canvas.width * 11/12, canvas.height * 0.5);
    ctx.stroke();
    ctx.fillStyle = oldFill;
    ctx.textAlign = oldAlign;
    ctx.font = oldFont;
}

drawIfEmpty();

const select = document.querySelector("select#block-list");
const addButton = document.querySelector("button#add-block");
const ol = document.querySelector("ol#listProgram")

const program = [];
window.program = program;

function renderProgram() {
    ol.innerHTML = "";
    for (let i = 0; i < program.length; i++) {
        ol.appendChild(createBlockElement(i));
    }
}

addButton.addEventListener("click", () => {
    const type = select.value;
    program.push(createBlock(type));
    renderProgram();
});

const categoryNames = {
    "paths": "Paths",
    "path_geometry": "Path geometry",
    "properties": "Canvas properties",
    "initialization": "Initialization",
    "ignored": "Ignored commands",
    "geometry": "Geometry",
    "text": "Text"
}

const categoryIcons = {
    "paths": "pencil",
    "path_geometry": "shape_square_edit",
    "properties": "color_swatch",
    "initialization": "asterisk_yellow",
    "ignored": "comment",
    "geometry": "shape_square",
    "text": "font"
}

function createBlockElement(i) {
    const block = program[i];
    const def = blockRegistry[block.type];

    const li = document.createElement("li");

    const icon = document.createElement("i");
    icon.classList = `icon ${categoryIcons[def.category]}`;
    li.appendChild(icon);
    li.appendChild(document.createTextNode(" "));

    const splitBlockLabel = def.label.split(/\$\{|\}/g);
    for (let j = 0; j < splitBlockLabel.length; j++) {
        if (j % 2 == 0) {
            const span = document.createElement("span");
            span.textContent = splitBlockLabel[j];
            li.appendChild(span);
        } else {
            let name = splitBlockLabel[j];
            let meta = def.params[name];
            let input;
            if (meta.type == "textarea") {
                input = document.createElement("textarea");
                input.textContent = block.params[name];
            } else {
                input = document.createElement("input");
                input.type = meta.type === "number" ? "number" : "text";
                input.value = block.params[name];
            }
            input.placeholder = name;
            input.addEventListener("input", () => {
                block.params[name] = meta.type === "number" ? Number(input.value) : input.value;
            });
            li.appendChild(input);
        }
    }
    li.appendChild(document.createTextNode(" • "));

    // Move up
    const upBtn = document.createElement("button");
    upBtn.innerHTML = `<i class="icon arrow_up" />`;
    upBtn.disabled = i === 0;
    upBtn.addEventListener("click", () => {
        [program[i - 1], program[i]] = [program[i], program[i - 1]];
        renderProgram();
    });
    li.appendChild(upBtn);
    li.appendChild(document.createTextNode(" "));

    // Move down
    const downBtn = document.createElement("button");
    downBtn.innerHTML = `<i class="icon arrow_down" />`;
    downBtn.disabled = i === program.length - 1;
    downBtn.addEventListener("click", () => {
        [program[i + 1], program[i]] = [program[i], program[i + 1]];
        renderProgram();
    });
    li.appendChild(downBtn);
    li.appendChild(document.createTextNode(" "));

    // Delete
    const delBtn = document.createElement("button");
    delBtn.innerHTML = `<i class="icon delete" />`;
    delBtn.addEventListener("click", () => {
        program.splice(i, 1);
        renderProgram();
    });
    li.appendChild(delBtn);

    return li;
}

function populateBlockSelect() {
    const groups = {};
    for (const [key, def] of Object.entries(blockRegistry)) {
        if (!groups[def.category]) groups[def.category] = [];
        groups[def.category].push({ key, def });
    }

    for (const [category, blocks] of Object.entries(groups)) {
        const optgroup = document.createElement("optgroup");
        optgroup.label = categoryNames[category];
        for (const { key, def } of blocks) {
            const option = document.createElement("option");
            option.value = key;
            option.textContent = def.short_label ?? def.label;
            optgroup.appendChild(option);
        }
        select.appendChild(optgroup);
    }

    select.value = select.children[1].children[0].value;
}

populateBlockSelect();

select.disabled = false;
addButton.disabled = false;

const runButton = document.querySelector("button#run-script");

runButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.width = ctx.width; // to reset all properties
    if (program.length == 0) {
        drawIfEmpty();
    } else {
        executeProgram(program, ctx);
    }
    calculateZoom();
})

const saveScriptButton = document.querySelector("button#save-script");
const loadScriptButton = document.querySelector("button#load-script");

function saveScript() {
    let currentTime = new Date();
    let json = JSON.stringify(program);
    let file = new Blob([json], {type: "application/json"});
    let url = URL.createObjectURL(file);
    let a = document.createElement("a");
    a.href = url;
    a.download = `script${currentTime.getTime()}.json`;
    a.click();
    setTimeout(() => {
        URL.revokeObjectURL(url)
    }, 300000); // 300 000 ms = 5 min
}

saveScriptButton.addEventListener("click", saveScript);

function loadScript() {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.addEventListener("change", async () => {
        if (input.files.length == 0) return;
        let confirmation = window.confirm("Are you sure you want to override the current script with the loaded one?");
        if (!confirmation) {return;}
        let text = await input.files[0].text();
        let newProgram = JSON.parse(text);
        console.log(newProgram);
        program.splice(0, program.length, ...newProgram);
        renderProgram();
    })
    input.click();
}

loadScriptButton.addEventListener("click", loadScript);

const zoom = document.querySelector("span#zoom");

function calculateZoom() {
    const cssWidth = parseFloat(getComputedStyle(canvas).getPropertyValue("width"));
    const actualWidth = canvas.width;
    const percentage = cssWidth / actualWidth * 100;

    zoom.textContent = percentage.toFixed(2);
}

calculateZoom();

function exportImage() {
    let currentTime = new Date();
    const blob = canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `drawing${currentTime.getTime()}.${formatSelect.value}`;
        a.click();
        setTimeout(() => {URL.revokeObjectURL(url);}, 300000);
    }, `image/${formatSelect.value}`);
}

exportButton.addEventListener("click", exportImage);