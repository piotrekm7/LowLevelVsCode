const vscode = acquireVsCodeApi();

let settings;

function createOptions(arr) {
    const options = document.querySelector(".options");

    for (const entry of arr) {
        const option = document.createElement("div");
        option.classList.add('option');

        const label = document.createElement("label");
        label.innerHTML = entry[0];
        label.for = entry[0];

        const input = document.createElement("input");
        // label.type = "text";
        input.value = entry[1];
        input.id = entry[0];

        option.append(label);
        option.append(input);
        options.append(option);
    }
};

window.addEventListener('message', event => {
    console.log(event.data);
    settings = new Map(event.data);
    createOptions(event.data);
});

document.getElementById("button-save").addEventListener('click', e => {

    const inputs = document.querySelectorAll(".options input");
    for (input of inputs) {
        settings.set(input.id, input.value);
    }

    const settingsPairs = [...settings.entries()]
    console.log(settingsPairs);

    vscode.postMessage({type: 'save', value: settingsPairs});
});

document.getElementById("button-save").addEventListener('click', e => {
    vscode.postMessage({type: 'cancel'});
});

vscode.postMessage({type: 'loaded'});