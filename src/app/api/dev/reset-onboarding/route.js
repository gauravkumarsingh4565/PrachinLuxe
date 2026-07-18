import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

// ⚠️ TEMPORARY TEST ROUTE — SIRF DEVELOPMENT KE LIYE
// Isse production me DELETE karo
export async function GET(request) {
  try {
    // Only allow in development
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json({ error: 'Not allowed in production.' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({
        error: 'Email parameter required.',
        usage: '/api/dev/reset-onboarding?email=your@email.com'
      }, { status: 400 });
    }

    await dbConnect();

    // Find user
    const userBefore = await User.findOne({ email: email.toLowerCase() }).lean();

    if (!userBefore) {
      return NextResponse.json({ error: `User not found: ${email}` }, { status: 404 });
    }

    console.log('\n========================================');
    console.log('🔧 DEV RESET: Resetting onboarding status');
    console.log('User BEFORE reset:', JSON.stringify({
      _id: userBefore._id,
      name: userBefore.name,
      email: userBefore.email,
      phoneNumber: userBefore.phoneNumber,
      isOnboarded: userBefore.isOnboarded,
    }, null, 2));

    // Reset onboarding
    const updatedUser = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      {
        isOnboarded: false,
        phoneNumber: '',
      },
      { new: true }
    ).lean();

    console.log('User AFTER reset:', JSON.stringify({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      isOnboarded: updatedUser.isOnboarded,
    }, null, 2));
    console.log('========================================\n');

    return NextResponse.json({
      success: true,
      message: `User ${email} reset to isOnboarded: false`,
      instruction: 'Ab localhost:3000 pe jaao aur Gmail se login karo — /onboarding form dikhega',
      userAfter: {
        id: updatedUser._id.toString(),
        name: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        isOnboarded: updatedUser.isOnboarded,
      }
    });
  } catch (error) {
    console.error('DEV RESET Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
