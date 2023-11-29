import { useEffect } from "react";
import { useFormFieldInputString } from "../../hooks/form.hook";
import { ILogin } from "../../api/auth/iauth.api";
import { useQueryAuth } from "../../api/auth/auth.api.hook";
import { store } from "../../store/store";
import { jwtAction } from "../../store/reducers/auth";
import { Button } from "../utils/Buttons/Buttons";
import { Input } from "../utils/Inputs/Inputs";
import { FormWrapper } from "../wrappers/FormWrapper";
import { MainScrollWrapper } from "../wrappers/MainScrollWrapper";
import { LabelWidget } from "../utils/Labels/Labels";
import { modalMessageOpen } from "../modal/ModalMessage";

export function Login() {
	const { dataLogin, errorLogin, querySendLogin } = useQueryAuth.login();
	const login = useFormFieldInputString();
	const password = useFormFieldInputString();

	const btnLoginClickHandler = () => {
		if (!login) {
			modalMessageOpen("Логин должен быть обязательно указан!");
			return;
		}
		if (!password) {
			modalMessageOpen("Пароль должен быть обязательно указан!");
			return;
		}
		const dataQuery: ILogin = {
			login: login.value,
			password: password.value,
		};

		querySendLogin(dataQuery);
	};

	useEffect(() => {
		if (!dataLogin) return;

		const { jwt, message } = dataLogin;

		modalMessageOpen(message);

		document.cookie = `jwt=${jwt}; max-age=${365 * 24 * 60 * 60}`;

		setTimeout(() => {
			store.dispatch(jwtAction(jwt));
		}, 1500);
	}, [dataLogin]);

	useEffect(() => {
		if (!errorLogin) return;

		modalMessageOpen(errorLogin.response.data.message);
	}, [errorLogin]);

	return (
		<MainScrollWrapper center={true} color={true} shadow={true}>
			<FormWrapper>
				<LabelWidget value={`Вход`} />
				<Input {...login} type="login" placeholder="Логин" />
				<Input {...password} type="password" placeholder="Пароль" />
				<Button onClick={btnLoginClickHandler} value={`Войти`} />
			</FormWrapper>
		</MainScrollWrapper>
	);
}
