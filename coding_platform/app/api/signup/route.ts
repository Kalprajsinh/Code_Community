import { Client } from 'pg';
import { NextRequest, NextResponse } from 'next/server';

async function getClient() {
    const client = new Client("postgresql://neondb_owner:yNGbrmJl30xL@ep-calm-meadow-a59lbrzh.us-east-2.aws.neon.tech/neondb?sslmode=require");
    await client.connect();
    return client;
}


export async function POST(req: NextRequest) {
    const { name, email, password } = await req.json();
    const client = await getClient();
    const insertUserText = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id';
    const userValues = [name, email, password];

    const response = await client.query(insertUserText, userValues);
    return NextResponse.json({ name, email }, { status: 201 });
}




// nakaxom871@orsbap.com
// Nakaxom871@orsbap.com