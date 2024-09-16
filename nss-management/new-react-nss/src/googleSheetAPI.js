import { gapi } from 'gapi-script';

// Google Sheets API configuration
const CLIENT_ID = '877781895823-1mhaarhfgm8aalq52qgdvn2edbg40rlo.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCvgGt7ayK0cPjgjT8me1JW5j3pu0_y1xA';
const SHEET_ID = '1A7Bs3Zpmpm4I94YMi7DFxYE1wd1oX7T1pc5F9Gm4A7A';
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
  gapi.auth2.getAuthInstance().signIn();
};

// Sign out from Google
export const signOut = () => {
  gapi.auth2.getAuthInstance().signOut();
};

export const fetchSheetData = async () => {
  try {
    const response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1',
    });
    
    const rows = response.result.values || [];
    if (rows.length < 2) return { volunteers: [] };

    const headers = rows[0];
    const volunteers = rows.slice(1).map(row => {
      const data = { id: row[0], name: row[1] };
      headers.slice(2).forEach((header, index) => {
        data[header] = row[index + 2] || ''; // Add date-specific status
      });
      return data;
    });

    return { volunteers };
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    return { volunteers: [] };
  }
};

// Update data in Google Sheets
export const updateSheetData = async (records) => {
  try {
    const range = 'Sheet1'; // Adjust the range if necessary
    const sheetData = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range,
    });
    
    const existingData = sheetData.result.values || [];
    const headers = existingData[0] || [];
    const dateIndex = headers.indexOf(records[0].date);

    // Check if the date column already exists
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
        // Add new row if not exists
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
        }
      }
    });

    // Write the updated data back to the sheet
    await gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: existingData,
      },
    });
    console.log('Data updated:', existingData);
  } catch (error) {
    console.error('Error updating data in Google Sheets:', error);
  }
};
