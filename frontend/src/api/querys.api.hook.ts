import { useState } from "react";
import axios from "axios";
import { logout } from "../helpers/logout";
import { IQueryAnswer } from "./iquerys.api";
import { modalLoadingOnHide, modalLoadingOnShow } from "../components/modal/ModalLoading";

function testOnBadTokenStatus(message: string) {
	if (
		message === "Токен просрочен, повторите вход в систему!" ||
		message === "У вас нет прав доступа на выполнение данной операции!" ||
		message === "Токен не валидный!"
	) {
		setTimeout(() => {
			logout();
		}, 1500);
	}
}

export function useQueryGet() {
	const [data, setDataAnswer] = useState(null);
	const [error, setErrorAnswer] = useState("");
	const [loaded, setLoaded] = useState(false);

	const querySend = async (
		link: string = "",
		data: {} = { params: {} },
		modalLoad: boolean = false
	) => {
		if (modalLoad) modalLoadingOnShow();
		setLoaded(true);

		const newData = {
			params: data,
		};

		await axios
			.get(link, newData)
			.then((payload) => {
				setDataAnswer(payload.data);
			})
			.catch((error) => {
				setErrorAnswer(error);
				testOnBadTokenStatus(error.response.data.message);
			})
			.finally(() => {
				if (modalLoad) modalLoadingOnHide();
				setLoaded(false);
			});
	};

	const queryAnswer: IQueryAnswer = { data, error, loaded, querySend };

	return queryAnswer;
}

export function useQueryPost() {
	const [data, setDataAnswer] = useState(null);
	const [error, setErrorAnswer] = useState("");
	const [loaded, setLoaded] = useState(false);

	const querySend = async (
		link: string = "",
		data: {} = {},
		modalLoad: boolean = false,
		config: {} = {}
	) => {
		if (modalLoad) modalLoadingOnShow();
		setLoaded(true);

		await axios
			.post(link, data, config)
			.then((payload) => {
				setDataAnswer(payload.data);
			})
			.catch((error) => {
				setErrorAnswer(error);
				testOnBadTokenStatus(error.response.data.message);
			})
			.finally(() => {
				if (modalLoad) modalLoadingOnHide();
				setLoaded(false);
			});
	};

	const queryAnswer: IQueryAnswer = { data, error, loaded, querySend };

	return queryAnswer;
}

export function useQueryPut() {
	const [data, setDataAnswer] = useState(null);
	const [error, setErrorAnswer] = useState("");
	const [loaded, setLoaded] = useState(false);

	const querySend = async (
		link: string = "",
		data: {} = {},
		modalLoad: boolean = false,
		config: {} = {}
	) => {
		if (modalLoad) modalLoadingOnShow();
		setLoaded(true);

		await axios
			.put(link, data, config)
			.then((payload) => {
				setDataAnswer(payload.data);
			})
			.catch((error) => {
				setErrorAnswer(error);
				testOnBadTokenStatus(error.response.data.message);
			})
			.finally(() => {
				if (modalLoad) modalLoadingOnHide();
				setLoaded(false);
			});
	};

	const queryAnswer: IQueryAnswer = { data, error, loaded, querySend };

	return queryAnswer;
}

export function useQueryDelete() {
	const [data, setDataAnswer] = useState(null);
	const [error, setErrorAnswer] = useState("");
	const [loaded, setLoaded] = useState(false);

	const querySend = async (link: string = "", data: {} = {}, modalLoad: boolean = false) => {
		if (modalLoad) modalLoadingOnShow();
		setLoaded(true);

		await axios
			.delete(link, { data })
			.then((payload) => {
				setDataAnswer(payload.data);
			})
			.catch((error) => {
				setErrorAnswer(error);
				testOnBadTokenStatus(error.response.data.message);
			})
			.finally(() => {
				if (modalLoad) modalLoadingOnHide();
				setLoaded(false);
			});
	};

	const queryAnswer: IQueryAnswer = { data, error, loaded, querySend };

	return queryAnswer;
}
