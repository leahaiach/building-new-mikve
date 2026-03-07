
import { NextRequest, NextResponse } from 'next/server';
import { addSignature, getSignatureCount } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  const count = getSignatureCount();
  return NextResponse.json({ count });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = (body.name ?? '').trim();
    const neighborhood = (body.neighborhood ?? 'גבעת מרדכי').trim();
    const phone = (body.phone ?? '').trim();
    const email = (body.email ?? '').trim() || null;
    const wantsToVolunteer = !!body.wantsToVolunteer;
    const note = (body.note ?? '').trim() || null;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'שם וטלפון הם שדות חובה.' },
        { status: 400 }
      );
    }

    const count = addSignature({
      name,
      neighborhood,
      phone,
      email,
      wantsToVolunteer,
      note,
    });

    return NextResponse.json({ ok: true, count }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'אירעה שגיאה בעת שמירת החתימה.' },
      { status: 500 }
    );
  }
}