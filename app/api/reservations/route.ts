import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validação básica
    const { name, phone, date, time, guests } = body;
    
    if (!name || !phone || !date || !time || !guests) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Aqui você integraria com um sistema real (SendGrid, Resend, database, etc.)
    // Por enquanto, apenas simulamos sucesso
    
    console.log('New reservation:', {
      name,
      phone,
      date,
      time,
      guests,
      timestamp: new Date().toISOString(),
    });

    // Simular delay de processamento
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(
      {
        success: true,
        message: 'Reservation received successfully',
        data: {
          name,
          date,
          time,
          guests,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Reservation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
