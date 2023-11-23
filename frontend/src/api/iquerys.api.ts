export interface IQueryAnswer {
	data: {} | null;
	error: {} | null;
	loaded: boolean;
	querySend(link: string, data: {}, modalLoad: boolean, config?: {}): void;
}

export interface IQueryAnswerError {
	message: "";
	name: "";
	code: "";
	response: {
		data: {
			message: "";
		};
	};
	status: number;
}

export interface IQueryAnswerMessageData {
	msg: "";
}
