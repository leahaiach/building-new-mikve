// lib/db.ts
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data.json');

type Signature = {
  id: number;
  name: string;
  neighborhood: string | null;
  phone: string;
  email: string | null;
  wants_to_volunteer: boolean;
  note: string | null;
  created_at: string;
};

type DataFile = {
  signatures: Signature[];
};

function ensureFile() {
  if (!fs.existsSync(dataPath)) {
    const initial: DataFile = { signatures: [] };
    fs.writeFileSync(dataPath, JSON.stringify(initial, null, 2), 'utf8');
  }
}

function readData(): DataFile {
  ensureFile();
  const raw = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(raw) as DataFile;
}

function writeData(data: DataFile) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
}

export function getSignatureCount(): number {
  const data = readData();
  return data.signatures.length;
}

export function addSignature(params: {
  name: string;
  neighborhood: string;
  phone: string;
  email: string | null;
  wantsToVolunteer: boolean;
  note: string | null;
}): number {
  const data = readData();
  const nextId =
    data.signatures.length > 0
      ? data.signatures[data.signatures.length - 1].id + 1
      : 1;

  const signature: Signature = {
    id: nextId,
    name: params.name,
    neighborhood: params.neighborhood || null,
    phone: params.phone,
    email: params.email,
    wants_to_volunteer: params.wantsToVolunteer,
    note: params.note,
    created_at: new Date().toISOString(),
  };

  data.signatures.push(signature);
  writeData(data);

  return data.signatures.length;
}