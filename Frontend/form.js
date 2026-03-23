let currentStep = 1;
const totalSteps = 3;

function updateStepper() {
for (let i = 1; i <= totalSteps; i++) {
    const item = document.getElementById("stepItem" + i);
    const circle = document.getElementById("stepCircle" + i);
    item.classList.remove("active", "completed");
    if (i < currentStep) {
    item.classList.add("completed");
    circle.textContent = "✓";
    } else if (i === currentStep) {
    item.classList.add("active");
    circle.textContent = i;
    } else {
    circle.textContent = i;
    }
}
const pct = ((currentStep - 1) / (totalSteps - 1)) * 100;

document.getElementById("stepperFill").style.width = pct + "%";

for (let i = 1; i <= totalSteps; i++) {
    document
    .getElementById("panel" + i)
    .classList.toggle("active", i === currentStep);
}

document.getElementById("stepCounter").textContent =
    `Paso ${currentStep} de ${totalSteps}`;
document.getElementById("btnBack").disabled = currentStep === 1;

const btnNext = document.getElementById("btnNext");
if (currentStep === totalSteps) {
    btnNext.textContent = "✓ Enviar Inscripción";
    btnNext.className = "btn-next btn-submit";
} else {
    btnNext.textContent = "Siguiente →";
    btnNext.className = "btn-next";
}
}

function validateStep1() {
let valid = true;
const fields = [
    {
    id: "nombre",
    fg: "fg-nombre",
    check: (v) => v.trim().split(" ").length >= 2,
    },
    { id: "codigo", fg: "fg-codigo", check: (v) => v.trim().length >= 6 },
    {
    id: "correo",
    fg: "fg-correo",
    check: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    },
    {
    id: "telefono",
    fg: "fg-telefono",
    check: (v) => /^\d{7,12}$/.test(v.replace(/\s/g, "")),
    },
    { id: "proyecto", fg: "fg-proyecto", check: (v) => v !== "" },
];
fields.forEach((f) => {
    const val = document.getElementById(f.id).value;
    const fg = document.getElementById(f.fg);
    if (!f.check(val)) {
    fg.classList.add("has-error");
    valid = false;
    } else {
    fg.classList.remove("has-error");
    }
});
return valid;
}

function fillConfirmSummary() {
document.getElementById("cs-nombre").textContent =
    document.getElementById("nombre").value;
document.getElementById("cs-codigo").textContent =
    document.getElementById("codigo").value;
document.getElementById("cs-correo").textContent =
    document.getElementById("correo").value;
document.getElementById("cs-telefono").textContent =
    document.getElementById("telefono").value;
document.getElementById("cs-proyecto").textContent =
    document.getElementById("proyecto").value;
document.getElementById("cs-campeon").textContent =
    document.getElementById("campeon").value || "—";
document.getElementById("cs-goleador").textContent =
    document.getElementById("goleador").value || "—";
}

function nextStep() {
if (currentStep === 1 && !validateStep1()) return;
if (currentStep === totalSteps) {
    submitForm();
    return;
}
currentStep++;
if (currentStep === 3) fillConfirmSummary();
updateStepper();
}

function prevStep() {
if (currentStep > 1) {
    currentStep--;
    updateStepper();
}
}

function submitForm() {
document.getElementById("panel3").classList.remove("active");
document.getElementById("formActions").style.display = "none";
document.getElementById("stepperFill").style.width = "100%";
for (let i = 1; i <= totalSteps; i++) {
    const item = document.getElementById("stepItem" + i);
    const circle = document.getElementById("stepCircle" + i);
    item.classList.remove("active");
    item.classList.add("completed");
    circle.textContent = "✓";
}
const pollNum = "#" + Math.floor(Math.random() * 90000 + 10000);
document.getElementById("pollNumber").textContent = pollNum;
document.getElementById("successScreen").classList.add("active");
}

function handleFile(input) {
const file = input.files[0];
if (!file) return;
document.getElementById("previewName").textContent = file.name;
document.getElementById("previewSize").textContent =
    (file.size / 1024).toFixed(0) + " KB";
document.getElementById("uploadPreview").classList.add("show");
}

function removeFile() {
document.getElementById("fileInput").value = "";
document.getElementById("uploadPreview").classList.remove("show");
}

function copyNequi() {
navigator.clipboard.writeText("3000000000").then(() => {
    const btn = document.querySelector(".nequi-copy");
    btn.textContent = "¡Copiado!";
    setTimeout(() => (btn.textContent = "Copiar"), 1800);
});
}

// Drag & drop
const ua = document.getElementById("uploadArea");
ua.addEventListener("dragover", (e) => {
e.preventDefault();
ua.classList.add("drag-over");
});
ua.addEventListener("dragleave", () => ua.classList.remove("drag-over"));
ua.addEventListener("drop", (e) => {
e.preventDefault();
ua.classList.remove("drag-over");
const file = e.dataTransfer.files[0];
if (file) {
    document.getElementById("fileInput").files = e.dataTransfer.files;
    handleFile({ files: [file] });
}
});

// Score inputs: only allow 0-20
document.querySelectorAll(".score-input").forEach((inp) => {
inp.addEventListener("input", function () {
    let v = parseInt(this.value);
    if (isNaN(v)) return;
    if (v < 0) this.value = 0;
    if (v > 20) this.value = 20;
});
});

updateStepper();