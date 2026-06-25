import { NextResponse } from 'next/server';
import fs from 'fs';

export async function GET() {
  try {
    const file = fs.readFileSync('C:\\Users\\abhin\\.gemini\\antigravity-ide\\brain\\b891b761-ec7e-44a0-8e71-d0dc81bd9edc\\media__1782142258958.jpg');
    return new NextResponse(file, { headers: { 'Content-Type': 'image/jpeg', 'Cache-Control': 'public, max-age=31536000, immutable' } });
  } catch (error) {
    return new NextResponse('Image not found', { status: 404 });
  }
}
