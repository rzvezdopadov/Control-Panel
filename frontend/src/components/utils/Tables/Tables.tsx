import { convertTextToSign } from "../../../helpers/convert";

interface IDeleteProperty {
	property: string;
	clbk: Function;
}

export function Table(payload: {
	headTitle: string[];
	propertySeq: string[];
	data: any[];
	delete?: IDeleteProperty;
}) {
	return (
		<table className="my-2" key={`${payload.headTitle}`}>
			<thead>
				<tr className="bg-slate-800">
					{payload.headTitle.map((value) => (
						<th className="border-2 p-1 border-lime-400" key={`th${value}`}>
							{value}
						</th>
					))}
				</tr>
			</thead>
			<tbody className="[&>*:nth-child(2n+2)]:bg-slate-600">
				{payload?.data ? (
					payload.data.map((obj) => (
						<tr key={`tbody${JSON.stringify(obj)}`}>
							{payload.propertySeq.map((value) => (
								<td
									className="border-2 p-1 border-lime-400"
									key={`trtd${JSON.stringify(obj) + value}`}
								>
									{obj[value]}
								</td>
							))}
							{payload?.delete ? (
								<td
									className="border-2 p-1 border-lime-400 "
									key={`trtd${
										JSON.stringify(obj) + obj[payload.delete.property]
									}`}
								>
									<span
										className="cursor-pointer"
										title="Удалить"
										onClick={() =>
											payload?.delete?.clbk(
												JSON.parse(
													`{"${payload.delete.property}":"${
														obj[payload.delete.property]
													}"}`
												)
											)
										}
									>
										{convertTextToSign("&#10060;")}
									</span>
								</td>
							) : (
								<></>
							)}
						</tr>
					))
				) : (
					<></>
				)}
			</tbody>
		</table>
	);
}
