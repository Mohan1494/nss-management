import { gapi } from 'gapi-script';

// Google Sheets API configuration
const CLIENT_ID = import.meta.env.VITE_GOOGLE_SHEETS_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEETS_SHEET_ID;
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

// Initialize Google API client
export const initClient = () => {
  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: [DISCOVERY_DOC],
      scope: SCOPES,
    }).then(() => {
      console.log('Google API client initialized.');
    }).catch((error) => {
      console.error('Error initializing Google API client:', error);
    });
  });
};

// Sign in to Google
export const signIn = () => {
  return gapi.auth2.getAuthInstance().signIn();
};

// Sign out from Google
export const signOut = () => {
  return gapi.auth2.getAuthInstance().signOut();
};

// Fetch data from a specific year sheet
export const fetchSheetData = async (year) => {
  try {
    const sheetName = `Year ${year}`; // Dynamic sheet name based on year
    const response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${sheetName}!A1:Z1000`, // Fetch from the respective sheet
    });
    
    const rows = response.result.values || [];
    if (rows.length < 2) return { volunteers: [] };

    const headers = rows[0]; // Assuming first row contains headers (SNO, Name, Date)
    const volunteers = rows.slice(1).map(row => {
      const data = { id: row[0], name: row[1] };
      headers.slice(2).forEach((header, index) => {
        data[header] = row[index + 2] || ''; // Add date-specific attendance status
      });
      return data;
    });

    return { volunteers };
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    return { volunteers: [] };
  }
};

// Update data in a specific year sheet
export const updateSheetData = async (year, records) => {
  try {
    const sheetName = `Year ${year}`; // Dynamic sheet name based on year
    const range = `${sheetName}!A1:Z1000`; // Adjust the range if necessary

    // Fetch the existing sheet data
    const sheetData = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range,
    });
    
    const existingData = sheetData.result.values || [];
    const headers = existingData[0] || [];
    const dateIndex = headers.indexOf(records[0].date);

    // Check if the date column already exists, if not, add the date
    if (dateIndex === -1) {
      headers.push(records[0].date);
      existingData[0] = headers;
    }
    
    // Create a map of existing data by SNO
    const dataMap = {};
    for (let i = 1; i < existingData.length; i++) {
      const row = existingData[i];
      dataMap[row[0]] = row;
    }

    // Update or add records
    records.forEach(record => {
      if (!dataMap[record.volunteerId]) {
        // Add new row if volunteer does not exist
        const newRow = [record.volunteerId, record.volunteerName];
        headers.forEach((header, index) => {
          if (header === record.date) {
            newRow[index] = record.status;
          } else if (index >= 2) {
            newRow[index] = '';
          }
        });
        existingData.push(newRow);
      } else {
        // Update existing row
        const row = dataMap[record.volunteerId];
        const dateColumnIndex = headers.indexOf(record.date);
        if (dateColumnIndex !== -1) {
          row[dateColumnIndex] = record.status;
        } else {
          row.push(record.status);
        }
      }
    });

    // Update the sheet with new data
    await gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range,
      valueInputOption: 'RAW',
      resource: {
        values: existingData,
      },
    });
  } catch (error) {
    console.error('Error updating Google Sheets:', error);
  }
};
