import React, { useCallback, useEffect, useState } from "react";

import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "../TableFooter/Footer";
import Image from "next/image";

const Table = ({ data, rowsPerPage, handleDelete, handleSearch }) => {
	const [page, setPage] = useState(1);
	const [selectedRows, setSelectedRows] = useState<string[]>([]);
	const [dataDisplay, setDataDisplay] = useState<any>();
	const [searchText, setSearchText] = useState<string>("");
	const [loading, setLoading] = useState(false);

	let { slice, range } = useTable(data, page, rowsPerPage);

	const handleSelection = (e) => {
		if (e.target.checked === true) {
			setSelectedRows((selectedRows) => [...selectedRows, e.target.value]);
		}
	};

	useEffect(() => {
		setDataDisplay([...slice]);
	}, [slice]);

	const handleDeleteButton = () => {
		if (selectedRows.length > 0) {
			handleDelete(selectedRows);
		} else {
			alert("please select a row to delete");
		}

		setSelectedRows([]);
	};
	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoading(true);
		setSearchText(e.target.value);
	};
	useEffect(() => {
		const timeVal = setTimeout(() => {
			handleSearch(searchText);
			setLoading(false);
		}, 2000);

		return () => clearTimeout(timeVal);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchText]);
	//style={{ width: "100px", margin: "auto", display: "inline", height: "5vh" }}
	return (
		<>
			<input type="text" className={styles.input} placeholder="Search by name, email or role" onChange={handleTextChange} />
			{loading ? <Image src="/loadingGif.gif" alt="Loading..." width={100} height={50} style={{ marginTop: 0 }} /> : null}

			<table className={styles.table}>
				<thead className={styles.tableRowHeader}>
					<tr>
						<th className={styles.tableHeader}>
							<input type="checkbox" disabled className={styles.headerInput} />
						</th>
						<th className={styles.tableHeader}>Name</th>
						<th className={styles.tableHeader}>Email</th>
						<th className={styles.tableHeader}>Role</th>
					</tr>
				</thead>
				<tbody>
					{dataDisplay !== undefined && dataDisplay.length > 0 ? (
						dataDisplay.map((el: { id: string; name: string; email: string; role: string }) => (
							<tr className={styles.tableRowItems} key={el.id}>
								<td className={styles.tableCell}>
									<input type="checkbox" onChange={handleSelection} value={el.id} />
								</td>
								<td className={styles.tableCell}>{el.name}</td>
								<td className={styles.tableCell}>{el.email}</td>
								<td className={styles.tableCell}>{el.role}</td>
							</tr>
						))
					) : (
						<tr>
							<td>
								<div style={{ textAlign: "center", width: "100vw" }}>
									<h2>No data to display!</h2>
								</div>
							</td>
						</tr>
					)}
				</tbody>
			</table>
			<div style={{ display: "flex", justifyContent: "space-evenly" }}>
				{dataDisplay !== undefined && dataDisplay.length > 0 && (
					<button className={styles.button} onClick={handleDeleteButton}>
						Delete
					</button>
				)}
				<TableFooter range={range} slice={slice} setPage={setPage} page={page} />
			</div>
		</>
	);
};

export default Table;
