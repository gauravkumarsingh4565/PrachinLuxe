import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // 1. Authenticate the user session
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 });
    }

    // 2. Validate the request payload
    const { phoneNumber } = await req.json();
    if (!phoneNumber || typeof phoneNumber !== 'string') {
      return NextResponse.json({ error: 'Phone number is required.' }, { status: 400 });
    }

    // Clean phone number (keep digits, +, and spaces, but check length)
    let cleanPhone = phoneNumber.trim();
    const digitsOnly = cleanPhone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      return NextResponse.json({ error: 'Please enter a valid 10-digit phone number.' }, { status: 400 });
    }

    // Ensure phone number starts with +91
    if (digitsOnly.length === 10) {
      cleanPhone = '+91' + digitsOnly;
    } else if (digitsOnly.length > 10 && digitsOnly.startsWith('91')) {
      cleanPhone = '+' + digitsOnly;
    } else if (!cleanPhone.startsWith('+')) {
      cleanPhone = '+' + cleanPhone;
    }

    // 3. Connect to the database
    await dbConnect();

    // 4. Update the user record
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      {
        phoneNumber: cleanPhone,
        isOnboarded: true,
      },
      { new: true } // returns the updated document
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found in database.' }, { status: 404 });
    }

    // 5. Return success response
    return NextResponse.json({
      success: true,
      message: 'Onboarding completed successfully.',
      user: {
        id: updatedUser._id.toString(),
        name: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        isOnboarded: updatedUser.isOnboarded,
        role: updatedUser.role || 'NORMALUSER',
      },
    });
  } catch (error) {
    console.error('Error in onboarding API route:', error);
    return NextResponse.json({ error: 'Internal Server Error.' }, { status: 500 });
  }
}
