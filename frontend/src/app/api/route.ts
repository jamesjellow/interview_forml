import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const body = await request.json();

	try {
		const res = await fetch(
			'https://jamesjellow.pythonanywhere.com/api/crack_safe',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			}
		);
		if (!res.ok) {
			throw new Error('Failed to fetch data');
		}
		const data = await res.json();

		console.log(data);
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Error with fetching response' },
			{ status: 500 }
		);
	}
}
