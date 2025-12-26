import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, name, source } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const resendAudienceId = process.env.RESEND_AUDIENCE_ID;

    if (!resendApiKey || !resendAudienceId) {
      console.error('Missing Resend configuration for newsletter subscriptions.');
      return NextResponse.json(
        { success: false, message: 'Newsletter provider is not configured' },
        { status: 500 }
      );
    }

    const [firstName, ...restName] = typeof name === 'string' ? name.split(' ') : [];
    const lastName = restName.length > 0 ? restName.join(' ') : undefined;

    const response = await fetch('https://api.resend.com/contacts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        audience_id: resendAudienceId,
        email,
        first_name: firstName || undefined,
        last_name: lastName,
        unsubscribed: false,
        metadata: {
          source: source || 'newsletter',
        },
      }),
    });

    if (!response.ok) {
      let providerMessage = 'Unable to subscribe at this time.';
      try {
        const errorBody = await response.json();
        if (typeof errorBody?.message === 'string') {
          providerMessage = errorBody.message;
        }
      } catch (parseError) {
        console.warn('Unable to parse newsletter provider error.', parseError);
      }

      return NextResponse.json(
        {
          success: false,
          message: 'Newsletter subscription failed',
          error: providerMessage,
        },
        { status: response.status }
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
