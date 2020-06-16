const vscode = acquireVsCodeApi();

function createOptions(arr) {
    console.log(arr);
    for (const name of arr) {
        const option = document.createElement("option");
        option.value = name;
        option.innerText = name;
        const select = document.getElementById("select-system-type");
        select.appendChild(option);
    }
};

window.addEventListener('message', event => {
    console.log(event.data);
    createOptions(event.data);
});

document.getElementById("button-save").addEventListener('click', e => {
    vscode.postMessage({type: 'save', value: document.getElementById('select-system-type').value});
});

document.getElementById("button-cancel").addEventListener('click', e => {
    vscode.postMessage({type: 'cancel'});
});

vscode.postMessage({type: 'loaded'});