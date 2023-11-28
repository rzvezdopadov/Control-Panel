export interface IQueryAnswer {
	data: {} | null;
	error: {} | null;
	loaded: boolean;
	querySend(link: string, data: {}, modalLoad: boolean, config?: {}): void;
}

export interface IQueryAnswerError {
	message: string;
	name: string;
	code: string;
	response: {
		data: {
			message: string;
		};
	};
	status: number;
}

export interface IQueryAnswerMessageData {
	msg: string;
}
