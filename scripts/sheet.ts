import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Sheet ID is NOT hardcoded here (this repo is public). Read it from .env
// (gitignored) — the same VITE_GOOGLE_SHEET_ID the app build uses.
function readSheetId(): string {
  const fromEnv = process.env.SHEET_ID || process.env.VITE_GOOGLE_SHEET_ID;
  if (fromEnv) return fromEnv;
  try {
    const env = readFileSync(resolve(import.meta.dirname, '../.env'), 'utf-8');
    const m = /^VITE_GOOGLE_SHEET_ID=(.*)$/m.exec(env);
    if (m) return m[1].trim().replace(/^['"]|['"]$/g, '');
  } catch { /* no .env */ }
  throw new Error('Sheet ID not found — set VITE_GOOGLE_SHEET_ID in .env');
}

const SHEET_ID = readSheetId();
const CREDENTIALS_PATH = resolve(import.meta.dirname, '../credentials.json');

async function getSheets() {
  const credentials = JSON.parse(readFileSync(CREDENTIALS_PATH, 'utf-8'));
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return google.sheets({ version: 'v4', auth });
}

// ─── READ ────────────────────────────────────────────────────────────────────

export async function readTab(tabName: string): Promise<string[][]> {
  const sheets = await getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: tabName,
  });
  return res.data.values || [];
}

// ─── APPEND ROWS ─────────────────────────────────────────────────────────────

export async function appendRows(tabName: string, rows: string[][]): Promise<number> {
  const sheets = await getSheets();
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${tabName}!A1`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: rows },
  });
  return res.data.updates?.updatedRows || 0;
}

// ─── UPDATE SPECIFIC RANGE ───────────────────────────────────────────────────

export async function updateRange(range: string, rows: string[][]): Promise<void> {
  const sheets = await getSheets();
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: rows },
  });
}

// ─── CLEAR ROWS (excluding header) ──────────────────────────────────────────

export async function clearTab(tabName: string): Promise<void> {
  const sheets = await getSheets();
  await sheets.spreadsheets.values.clear({
    spreadsheetId: SHEET_ID,
    range: `${tabName}!A2:Z`,
    requestBody: {},
  });
}

// ─── DELETE SPECIFIC ROWS ────────────────────────────────────────────────────

export async function deleteRows(tabName: string, startRow: number, count: number): Promise<void> {
  const sheets = await getSheets();
  // Get sheet ID (gid) for the tab
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
  const sheetMeta = meta.data.sheets?.find(s => s.properties?.title === tabName);
  if (!sheetMeta) throw new Error(`Tab "${tabName}" not found`);

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SHEET_ID,
    requestBody: {
      requests: [{
        deleteDimension: {
          range: {
            sheetId: sheetMeta.properties!.sheetId!,
            dimension: 'ROWS',
            startIndex: startRow - 1, // 0-indexed
            endIndex: startRow - 1 + count,
          },
        },
      }],
    },
  });
}

// ─── CLI ─────────────────────────────────────────────────────────────────────

const command = process.argv[2];
const tabName = process.argv[3];

async function main() {
  switch (command) {
    case 'read': {
      const rows = await readTab(tabName);
      console.table(rows.slice(0, 20));
      console.log(`Total rows: ${rows.length} (showing first 20)`);
      break;
    }
    case 'append': {
      // Read JSON array from stdin or argv[4]
      const json = process.argv[4];
      if (!json) { console.error('Usage: sheet append <Tab> \'[["col1","col2",...]]\''); process.exit(1); }
      const rows = JSON.parse(json);
      const count = await appendRows(tabName, rows);
      console.log(`Appended ${count} rows to ${tabName}`);
      break;
    }
    case 'clear': {
      await clearTab(tabName);
      console.log(`Cleared all data rows from ${tabName}`);
      break;
    }
    case 'update': {
      // Usage: sheet update '<Range>' '[["v"],...]'
      const range = process.argv[3];
      const json = process.argv[4];
      if (!range || !json) { console.error('Usage: sheet update <Range> \'[["v"],...]\''); process.exit(1); }
      await updateRange(range, JSON.parse(json));
      console.log(`Updated ${range}`);
      break;
    }
    default:
      console.log('Usage: npx tsx scripts/sheet.ts <read|append|clear> <TabName> [data]');
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
