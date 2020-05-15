const vscode = acquireVsCodeApi();

window.addEventListener('message', event => {
	console.log(event.data);
});

// document.getElementById("button-send-type").addEventListener('click', e => {
// 	vscode.postMessage({type: 'submit', value: document.getElementById('select-system-type').value});
// 	console.log('wysylanie...');
// });

vscode.postMessage({type: 'loaded'});