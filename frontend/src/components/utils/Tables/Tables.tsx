export function Table(payload: { headTitle: string[]; propertySeq: string[]; data: any[] }) {
	return (
		<table className="my-2" key={`${payload.headTitle}`}>
			<thead>
				<tr>
					{payload.headTitle.map((value) => (
						<th className="border-2 p-1 border-lime-400" key={`th${value}`}>
							{value}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{payload?.data ? (
					payload.data.map((obj) => (
						<tr key={`tbody${obj}`}>
							{payload.propertySeq.map((value) => (
								<td
									className="border-2 p-1 border-lime-400"
									key={`tdtr${obj + value}`}
								>
									{obj[value]}
								</td>
							))}
						</tr>
					))
				) : (
					<></>
				)}
			</tbody>
		</table>
	);
}
