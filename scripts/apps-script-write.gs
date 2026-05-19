// Apps Script web app for writing to the trip sheet from the public web app.
//
// Setup:
//   1. Open the sheet → Extensions → Apps Script
//   2. Replace Code.gs contents with this file
//   3. Deploy → New deployment → type: Web app
//        - Execute as: Me
//        - Who has access: Anyone
//   4. Copy the /exec URL, paste into the app's VITE_APPS_SCRIPT_URL env

const SHEET_ID = '1P0pucbfoJFnqnnAX1dEjmDq96TGTJb7Qz66sPZiGIGc';
const SECRET = 'AdaDenizTrip2026';

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
    return json_({ error: 'unknown action' });
  } catch (err) {
    return json_({ error: String(err) });
  }
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
