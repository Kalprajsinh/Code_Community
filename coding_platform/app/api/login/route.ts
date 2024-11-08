import { Client } from 'pg';
import { NextRequest, NextResponse } from 'next/server';

async function getClient() {
    const client = new Client("postgresql://neondb_owner:yNGbrmJl30xL@ep-calm-meadow-a59lbrzh.us-east-2.aws.neon.tech/neondb?sslmode=require");
    await client.connect();
    return client;
}


export async function POST(req: NextRequest) {
    const { email, password } = await req.json();
    const client = await getClient();
    const selectUserText = 'SELECT * FROM users WHERE email=$1 AND password=$2';
    const userValues = [email, password];

    const response = await client.query(selectUserText, userValues);
    if (response.rowCount) {
        if(response.rowCount > 0)
        {
            const { name, email } = response.rows[0];
            return NextResponse.json({ name,email }, { status: 201 });
        }
    } else {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
}




// nakaxom871@orsbap.com
// Nakaxom871@orsbap.com