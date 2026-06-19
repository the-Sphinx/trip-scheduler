// Apps Script web app for writing to the trip sheet from the public web app.
//
// Setup:
//   1. Open the sheet → Extensions → Apps Script
//   2. Replace Code.gs contents with this file
//   3. In the editor, select the `setup` function and click Run once.
//      Approve the permission prompt (Sheets + Drive) — this grants the Drive
//      access the image upload needs. Required after adding uploadImage.
//   4. Deploy → Manage deployments → edit (✏️) → Version: New version → Deploy
//        - Execute as: Me
//        - Who has access: Anyone   (NOT "Anyone with Google account")
//   5. Copy the /exec URL, paste into the app's VITE_APPS_SCRIPT_URL env

const SHEET_ID = '1P0pucbfoJFnqnnAX1dEjmDq96TGTJb7Qz66sPZiGIGc';
const SECRET = 'AdaDenizTrip2026';

// Run this once from the editor to grant the Drive permission the upload
// feature needs (approve the consent prompt when asked). Safe to re-run.
function setup() {
  const folder = getOrCreateFolder_('TripBookmarks');
  Logger.log('Drive folder ready: %s (%s)', folder.getName(), folder.getId());
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.secret !== SECRET) return json_({ error: 'unauthorized' });

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(body.tab);
    if (!sheet) return json_({ error: 'tab not found: ' + body.tab });

    if (body.action === 'append') {
      sheet.appendRow(body.row);
      return json_({ ok: true, rowIndex: sheet.getLastRow() });
    }
    if (body.action === 'update') {
      const r = body.rowIndex; // 1-based incl header (first data row = 2)
      if (!r || r < 2) return json_({ error: 'invalid rowIndex' });
      sheet.getRange(r, 1, 1, body.row.length).setValues([body.row]);
      return json_({ ok: true });
    }
    if (body.action === 'delete') {
      const r = body.rowIndex;
      if (!r || r < 2) return json_({ error: 'invalid rowIndex' });
      sheet.deleteRow(r);
      return json_({ ok: true });
    }
    if (body.action === 'uploadImage') {
      // Save an uploaded image to Drive, make it link-viewable, and append a
      // row to the Bookmarks tab. body: { dataBase64, mimeType, filename,
      // caption, category, link, added_by }
      const folder = getOrCreateFolder_('TripBookmarks');
      const bytes = Utilities.base64Decode(body.dataBase64);
      const blob = Utilities.newBlob(bytes, body.mimeType || 'image/jpeg', body.filename || 'bookmark.jpg');
      const file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      const fileId = file.getId();
      const url = 'https://lh3.googleusercontent.com/d/' + fileId;
      const createdAt = new Date().toISOString();
      // Column order must match the Bookmarks header:
      // image_url | file_id | caption | category | link | created_at | added_by
      sheet.appendRow([url, fileId, body.caption || '', body.category || '', body.link || '', createdAt, body.added_by || '']);
      return json_({ ok: true, url: url, fileId: fileId, rowIndex: sheet.getLastRow() });
    }
    if (body.action === 'deleteBookmark') {
      const r = body.rowIndex;
      if (!r || r < 2) return json_({ error: 'invalid rowIndex' });
      if (body.fileId) {
        try { DriveApp.getFileById(body.fileId).setTrashed(true); } catch (e) { /* file may already be gone */ }
      }
      sheet.deleteRow(r);
      return json_({ ok: true });
    }
    return json_({ error: 'unknown action' });
  } catch (err) {
    return json_({ error: String(err) });
  }
}

// Find (or lazily create) a Drive folder by name for storing bookmark images.
function getOrCreateFolder_(name) {
  const it = DriveApp.getFoldersByName(name);
  return it.hasNext() ? it.next() : DriveApp.createFolder(name);
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
