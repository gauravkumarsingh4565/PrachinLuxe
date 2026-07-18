import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // 1. Authenticate the user session
    const session = await getServerSession(authOptions);

    console.log('\n========================================');
    console.log('🔐 ONBOARDING API HIT');
    console.log('========================================');
    console.log('📋 Session from NextAuth:', JSON.stringify(session?.user, null, 2));

    if (!session || !session.user) {
      console.log('❌ Unauthorized - No session found');
      return NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 });
    }

    // 2. Parse request body
    const body = await req.json();
    const { phoneNumber, name } = body;

    console.log('\n📦 Request Body Received:');
    console.log('   Name:', name);
    console.log('   Phone:', phoneNumber);

    if (!phoneNumber || typeof phoneNumber !== 'string') {
      return NextResponse.json({ error: 'Phone number is required.' }, { status: 400 });
    }

    // Clean phone number
    let cleanPhone = phoneNumber.trim();
    const digitsOnly = cleanPhone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      return NextResponse.json({ error: 'Please enter a valid 10-digit phone number.' }, { status: 400 });
    }

    if (digitsOnly.length === 10) {
      cleanPhone = '+91' + digitsOnly;
    } else if (digitsOnly.length > 10 && digitsOnly.startsWith('91')) {
      cleanPhone = '+' + digitsOnly;
    } else if (!cleanPhone.startsWith('+')) {
      cleanPhone = '+' + cleanPhone;
    }

    // 3. Connect to DB
    await dbConnect();

    // 4. Fetch user BEFORE update — for comparison log
    const userBeforeUpdate = await User.findById(session.user.id).lean();

    console.log('\n📂 DATABASE — User Record BEFORE Update:');
    console.log(JSON.stringify(userBeforeUpdate, null, 2));

    // 5. Build update object
    const updateFields = {
      phoneNumber: cleanPhone,
      isOnboarded: true,
    };

    // Update name only if provided and non-empty
    if (name && typeof name === 'string' && name.trim().length > 0) {
      updateFields.name = name.trim();
    }

    // 6. Update the user record
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      updateFields,
      { new: true }
    ).lean();

    if (!updatedUser) {
      console.log('❌ User not found in DB with ID:', session.user.id);
      return NextResponse.json({ error: 'User not found in database.' }, { status: 404 });
    }

    console.log('\n✅ DATABASE — User Record AFTER Update:');
    console.log(JSON.stringify(updatedUser, null, 2));
    console.log('========================================\n');

    // 7. Return success
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
    console.error('💥 Error in onboarding API route:', error);
    return NextResponse.json({ error: 'Internal Server Error.' }, { status: 500 });
  }
}
