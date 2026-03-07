// lib/db.ts
import { sql } from '@vercel/postgres';

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS signatures (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      neighborhood TEXT,
      phone TEXT NOT NULL,
      email TEXT,
      wants_to_volunteer BOOLEAN NOT NULL DEFAULT false,
      note TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
}

let initDone: Promise<void> | null = null;

function init(): Promise<void> {
  if (!initDone) {
    initDone = ensureTable();
  }
  return initDone;
}

export async function getSignatureCount(): Promise<number> {
  await init();
  const { rows } = await sql<{ count: number }>`
    SELECT COUNT(*)::int AS count FROM signatures
  `;
  return rows[0]?.count ?? 0;
}

export async function addSignature(params: {
  name: string;
  neighborhood: string;
  phone: string;
  email: string | null;
  wantsToVolunteer: boolean;
  note: string | null;
}): Promise<number> {
  await init();
  const { rows: existing } = await sql<{ id: number }>`
    SELECT id FROM signatures WHERE name = ${params.name} LIMIT 1
  `;

  if (existing.length === 0) {
    await sql`
      INSERT INTO signatures (name, neighborhood, phone, email, wants_to_volunteer, note)
      VALUES (
        ${params.name},
        ${params.neighborhood || null},
        ${params.phone},
        ${params.email},
        ${params.wantsToVolunteer},
        ${params.note}
      )
    `;
  }
  return getSignatureCount();
}
