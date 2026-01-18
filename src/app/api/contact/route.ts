import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { ContactFormData } from '@/types';

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const submissions = new Map<string, number[]>();

function getClientIp(request: NextRequest) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function isRateLimited(identifier: string) {
  const now = Date.now();
  const recentSubmissions = (submissions.get(identifier) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (recentSubmissions.length >= RATE_LIMIT_MAX_REQUESTS) {
    submissions.set(identifier, recentSubmissions);
    return true;
  }

  submissions.set(identifier, [...recentSubmissions, now]);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again soon.' },
        { status: 429 }
      );
    }

    const body: ContactFormData = await request.json();
    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const message = body.message?.trim();
    const website = body.website?.trim();

    if (website) {
      return NextResponse.json(
        { success: true, message: 'Message sent successfully!' },
        { status: 200 }
      );
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (name.length > 80 || email.length > 254 || message.length > 2000) {
      return NextResponse.json(
        { success: false, error: 'Message details are too long' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    await sendEmail({
      from: email,
      name,
      message,
    });

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
