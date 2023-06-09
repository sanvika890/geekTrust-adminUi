import Head from "next/head";
import { Inter } from "next/font/google";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>Admin UI Table</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/table.png" />
			</Head>
			<Grid container justifyContent="center" alignItems="center" sx={{ height: "80vh" }} direction="column" spacing={5}>
				<Grid item>
					<Typography variant="h2">Welcome to Admin UI!</Typography>
				</Grid>
				<Grid item>
					<Button onClick={() => router.push("/view-table")} variant="contained">
						View Table
					</Button>
				</Grid>
			</Grid>
		</>
	);
}
