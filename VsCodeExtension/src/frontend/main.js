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

document.getElementById("button-send-type").addEventListener('click', e => {
	vscode.postMessage({type: 'submit', value: document.getElementById('select-system-type').value});
	console.log('wysylanie...');
});

vscode.postMessage({type: 'ready'});