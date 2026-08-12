import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

var loaded_models: Array<string> = [];
const GET_COMMAND: string = 'ollama ps';
const STOP_COMMAND: string = 'ollama stop ';

export async function activate(): Promise<void> {
	const config = vscode.workspace.getConfiguration('ollama-stop-on-close');
	const onlyCloseSessionModels: boolean = config.get<boolean>('onlyCloseSessionModels', true);

	if (onlyCloseSessionModels) {
		await get_loaded_models();
	}
}

export async function deactivate(): Promise<void> {
	const config = vscode.workspace.getConfiguration('ollama-stop-on-close');
	const onlyCloseSessionModels: boolean = config.get<boolean>('onlyCloseSessionModels', true);
	var start_models: Array<string> = loaded_models;
	var stop_models: Array<string> = [];

	await get_loaded_models();

	if (!onlyCloseSessionModels) {
		for (var i = 0; i < loaded_models.length; i++) {
			if (!start_models.includes(loaded_models[i])) {
				stop_models.push(loaded_models[i]);
			}
		}
	}
	else {
		stop_models = loaded_models;
	}

	if (stop_models.length > 0) {
		let command: string = '';
		stop_models.forEach(element => {
			if (element.trim()) {
				command += `${STOP_COMMAND}${element.trim()}; `;
			}
		});

		try {
			await execPromise(command);
		} catch (error: any) {
			console.error(`Error stopping models: ${error.message}`);
		}
	}
}

async function get_loaded_models(): Promise<void> {
	const config = vscode.workspace.getConfiguration('ollama-stop-on-close');
	const ignore_models: Array<string> = config.get<Array<string>>('ignoreModels', []);

	loaded_models = new Array<string>();

	try {
		const { stdout } = await execPromise(GET_COMMAND);
		const output_lines: string[] = stdout.split('\n');

		// Start at 1 to skip the headers of 'ollama ps'
		for (var i = 1; i < output_lines.length; i++) {
			const line = output_lines[i].trim();
			if (!line) {
				continue; // Skip empty trailing lines
			}

			// Split by whitespace and grab the first element (the model name)
			const name: string = line.split(/\s+/)[0];
			if (name && !ignore_models.includes(name)) {
				loaded_models.push(name);
			}
		}
	} catch (error: any) {
		console.error(`Error fetching loaded models: ${error.message}`);
	}
}