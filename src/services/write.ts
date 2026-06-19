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
interface DeletePayload {
  action: 'delete';
  tab: string;
  rowIndex: number;
}
interface UploadImagePayload {
  action: 'uploadImage';
  tab: string;
  dataBase64: string;
  mimeType: string;
  filename: string;
  caption: string;
  category: string;
  link: string;
  added_by: string;
}
interface DeleteBookmarkPayload {
  action: 'deleteBookmark';
  tab: string;
  rowIndex: number;
  fileId: string;
}

type Payload = AppendPayload | UpdatePayload | DeletePayload | UploadImagePayload | DeleteBookmarkPayload;

async function call(body: Payload): Promise<{ ok?: boolean; rowIndex?: number; url?: string; fileId?: string; error?: string }> {
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

export function deleteRow(tab: string, rowIndex: number) {
  return call({ action: 'delete', tab, rowIndex });
}

export interface UploadImageInput {
  dataBase64: string;
  mimeType: string;
  filename: string;
  caption?: string;
  category?: string;
  link?: string;
  added_by?: string;
}

// Upload an image to Drive + append a Bookmarks row. Returns the public URL,
// Drive file id, and the new row index.
export function uploadImage(input: UploadImageInput) {
  return call({
    action: 'uploadImage',
    tab: 'Bookmarks',
    dataBase64: input.dataBase64,
    mimeType: input.mimeType,
    filename: input.filename,
    caption: input.caption || '',
    category: input.category || '',
    link: input.link || '',
    added_by: input.added_by || '',
  });
}

export function deleteBookmark(rowIndex: number, fileId: string) {
  return call({ action: 'deleteBookmark', tab: 'Bookmarks', rowIndex, fileId });
}
