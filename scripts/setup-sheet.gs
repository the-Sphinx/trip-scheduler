// Google Apps Script — paste into Extensions > Apps Script in your Google Sheet, then Run > setupTabs
function setupTabs() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const tabs = {
    Overview: ['city', 'country', 'arrival_date', 'departure_date', 'transport_type'],
    Schedule: ['date', 'time_start', 'time_end', 'activity', 'category', 'location_name', 'address', 'lat', 'lng', 'notes', 'links', 'photo_url'],
    Hotels: ['city', 'name', 'address', 'check_in_date', 'check_out_date', 'check_in_time', 'confirmation_no', 'phone', 'website', 'notes', 'lat', 'lng'],
    Transport: ['type', 'from_city', 'to_city', 'date', 'departure_time', 'arrival_time', 'carrier', 'booking_ref', 'terminal', 'seat', 'notes'],
    Attractions: ['name', 'city', 'category', 'address', 'hours', 'price', 'website', 'notes', 'lat', 'lng', 'photo_url'],
    Restaurants: ['name', 'city', 'cuisine', 'address', 'hours', 'price_range', 'rating', 'reservation_required', 'reservation_link', 'website', 'google_maps_link', 'notes', 'lat', 'lng', 'photo_url'],
  };

  for (const [tabName, headers] of Object.entries(tabs)) {
    let sheet = ss.getSheetByName(tabName);
    if (!sheet) {
      sheet = ss.insertSheet(tabName);
    }
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    // Bold the header row
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    // Freeze header row
    sheet.setFrozenRows(1);
  }

  // Remove default "Sheet1" if it exists and is empty
  const sheet1 = ss.getSheetByName('Sheet1');
  if (sheet1 && sheet1.getLastRow() === 0) {
    ss.deleteSheet(sheet1);
  }

  SpreadsheetApp.getUi().alert('Done! All 6 tabs created with headers.');
}
