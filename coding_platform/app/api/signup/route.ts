import { Client } from 'pg';
import { NextRequest, NextResponse } from 'next/server';

async function getClient() {
    const client = new Client("postgresql://neondb_owner:yNGbrmJl30xL@ep-calm-meadow-a59lbrzh.us-east-2.aws.neon.tech/neondb?sslmode=require");
    await client.connect();
    return client;
}


export async function POST(req: NextRequest) {
    const body = await req.json();
    const name = body.name;
    const email = body.email;
    const password = body.password;
    const client = await getClient();
    const insertUserText = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id';
    const userValues = [name,email,password];

    let response = await client.query(insertUserText, userValues);
    console.log("Entries created!");

    return NextResponse.json({ name: body.name })
}



// nakaxom871@orsbap.com
// Nakaxom871@orsbap.com