import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./ViewTable.module.css";
import Table from "@/components/Table";
import Head from "next/head";

const ViewTable = () => {
	const [data, setData] = useState<any[]>();

	const fetchData = async () => {
		const response = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");

		setData(response.data);

		return response.data;
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleDelete = useCallback(
		(rows) => {
			if (data) {
				const newArr = data?.filter((item) => !rows.includes(item.id));
				setData([...newArr]);
			}
		},
		[data]
	);

	const handleSearch = useCallback(
		(value) => {
			if (data) {
				if (value !== "") {
					const newArr = data.filter((item) => item.name.match(value) || item.email.match(value) || item.role.match(value));

					setData([...newArr]);
				} else if (value === "") {
					(async function () {
						const res = await fetchData();
					})();
				}
			}
		},
		[data]
	);

	return (
		<>
			<Head>
				<title>View Table</title>
			</Head>
			<main className={styles.container}>
				<div className={styles.wrapper}>
					<Table data={data ? data : []} rowsPerPage={10} handleDelete={handleDelete} handleSearch={handleSearch} />
				</div>
			</main>
		</>
	);
};

export default ViewTable;
