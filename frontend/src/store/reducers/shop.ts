import { createAction, createReducer } from "@reduxjs/toolkit";
import { IRowShop, IShop } from "../../../../global/interfaces/ishop";

////////////////////////////////////////////////////////////////////////
export const SHOP = "SHOP";

export const shopAction = createAction<IShop>(SHOP);

export const row: IRowShop = {
	Row1: false,
	Row2: false,
	Row3: false,
	Row4: false,
	Row5: false,
};

export const initialStateShop: IShop = {
	Col1: { ...row },
	Col2: { ...row },
	Col3: { ...row },
	Col4: { ...row },
	Col5: { ...row },
	Col6: { ...row },
	Col7: { ...row },
	Col8: { ...row },
	Col9: { ...row },
	Col10: { ...row },
	Col11: { ...row },
	Col22: { ...row },
	Col23: { ...row },
	Col24: { ...row },
	Col25: { ...row },
	Col26: { ...row },
	Col27: { ...row },
	Col28: { ...row },
	Col29: { ...row },
	Col30: { ...row },
};

export const shopReducer = createReducer(initialStateShop, (builder) => {
	builder.addCase(shopAction, (state: IShop, action: any) => {
		const shop = { ...action.payload };

		return shop;
	});
});

////////////////////////////////////////////////////////////////////////
