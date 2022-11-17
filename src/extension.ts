import path = require('path');
import * as vscode from 'vscode';
import fs = require('fs');

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('rich.openRoot', async (url) => {
		const pageName = await vscode.window.showInputBox({
			password: false, // 输入内容是否是密码
			placeHolder: 'page module name', // 在输入框内的提示信息
			prompt:'Please enter the request to create page module name', // 在输入框下方的提示信息
			// validateInput:function(text){return text;} // 对输入内容进行验证并返回
		}) || '';

		if (!pageName) {
			vscode.window.showErrorMessage('Page module name cannot be empty');
			return;
		}

		// 当前工作目录
		const currentWorkDir = (vscode.workspace.workspaceFolders|| [])[0].uri.path;
		const templatePath = path.resolve(currentWorkDir, 'mpa.template.js');

		// 如果工作根目录下没有map.template.js文件提示报错
		try {
			await fs.promises.stat(templatePath);
		} catch (err) {
			vscode.window.showErrorMessage('The template file "mpa.template.js" cannot be empty');
			return;
		}

		const filePath = path.normalize(path.resolve(url.path, pageName));
		if (!fs.existsSync(filePath)) {
			fs.mkdirSync(filePath);
		}

		// 获取当前工作目录下mpa.tempalte.js中的模板配置
		const config = require(templatePath);
		const templates = config.render(pageName);
		Object.keys(templates).forEach(fileName => {
			fs.writeFile(filePath + `/${fileName}`, templates[fileName], () => {});
		});

	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
