import { NextResponse } from 'next/server';

export async function GET(request) {

    try {
        return NextResponse.json({ message: "Hello World!" }, { status: 200 });
    } catch (error) {
        console.error('Error in GET /api/products:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}