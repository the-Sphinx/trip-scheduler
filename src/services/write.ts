// Client for the Apps Script web app that performs sheet writes.
// Uses text/plain content-type to skip CORS preflight.

const URL_ = import.meta.env.VITE_APPS_SCRIPT_URL as string;
const SECRET = import.meta.env.VITE_WRITE_SECRET as string;

interface AppendPayload {
  action: 'append';
  tab: string;
  row: (string | number | boolean)[];
}
interface UpdatePayload {
  action: 'update';
  tab: string;
  rowIndex: number;
  row: (string | number | boolean)[];
}

async function call(body: AppendPayload | UpdatePayload): Promise<{ ok?: boolean; rowIndex?: number; error?: string }> {
  if (!URL_) throw new Error('VITE_APPS_SCRIPT_URL not configured');
  const res = await fetch(URL_, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ ...body, secret: SECRET }),
    redirect: 'follow',
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data;
}

export function appendRow(tab: string, row: (string | number | boolean)[]) {
  return call({ action: 'append', tab, row });
}

export function updateRow(tab: string, rowIndex: number, row: (string | number | boolean)[]) {
  return call({ action: 'update', tab, rowIndex, row });
}
