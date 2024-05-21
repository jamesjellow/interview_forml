'use client';
import { Search } from '@mui/icons-material';
import {
	Box,
	Button,
	Container,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { useState } from 'react';

export default function Home() {
	const [attempts, setAttempts] = useState('0');
	const [timeTaken, setTimeTaken] = useState('0');
	const [searchQuery, setSearchQuery] = useState('');

	const fetchSomeData = async () => {
		try {
			const data = await fetch(
				'https://jamesjellow.pythonanywhere.com/api/crack_safe',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						actual_combination: searchQuery,
					}),
				}
			);

			return await data.json();
		} catch (err) {
			console.error('Error', err);
		}
	};

	const handleClick = async () => {
		const resp = await fetchSomeData();
		const { time_taken, attempts } = resp;

		setTimeTaken(time_taken);
		setAttempts(attempts);
	};

	return (
		<main>
			<Container>
				<Box
					marginTop={'10vh'}
					component={'section'}
					display={'flex'}
					alignItems={'center'}
					flexDirection={'column'}
					gap={5}
				>
					<Stack direction={'column'} gap={2}>
						<Typography variant="h2">Crack the Safe!</Typography>
						<TextField
							onChange={(event) => {
								setSearchQuery(event.target.value);
							}}
							label={
								<Stack direction={'row'} justifyContent={'space-between'}>
									<Typography variant="body1">
										Type in a safe code to crack &nbsp;
									</Typography>
									<Search />
								</Stack>
							}
						/>
						<Button variant="contained" color="primary" onClick={handleClick}>
							Crack Safe!
						</Button>
					</Stack>

					<Stack minWidth={'25vw'} gap={2}>
						<Stack
							direction={{ lg: 'row', sm: 'column' }}
							justifyContent="space-between"
							gap={1}
						>
							<Typography color={'primary'} variant="h4">
								Time taken
							</Typography>
							<Typography color={'secondary'} variant="h4">
								{`${(parseFloat(timeTaken) * 1000).toFixed(2)}`} ms
							</Typography>
						</Stack>
						<Stack
							direction={{ lg: 'row', sm: 'column' }}
							justifyContent="space-between"
							gap={1}
						>
							<Typography color={'primary'} variant="h4">
								Attempts Taken
							</Typography>
							<Typography color={'secondary'} variant="h4">
								{attempts} attempts
							</Typography>
						</Stack>
					</Stack>
				</Box>
			</Container>
		</main>
	);
}
