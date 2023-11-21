export interface IJWT {
	timecode: number;
	token: string;
	ipaddress: string;
	browser: string;
}

export interface ILogin {
	login: string;
	password: string;
}

export interface IChangePass {
	passwordnow: string;
	passwordnew: string;
}
