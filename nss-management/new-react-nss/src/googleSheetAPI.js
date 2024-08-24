// src/googleSheetAPI.js

import { gapi } from 'gapi-script';

// Google Sheets API configuration
const CLIENT_ID = '877781895823-1mhaarhfgm8aalq52qgdvn2edbg40rlo.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCvgGt7ayK0cPjgjT8me1JW5j3pu0_y1xA';
const SHEET_ID = '1A7Bs3Zpmpm4I94YMi7DFxYE1wd1oX7T1pc5F9Gm4A7A';
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';


// Initialize Google API client
export const initClient = () => {
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
};

// Sign in to Google
export const signIn = () => {
  gapi.auth2.getAuthInstance().signIn();
};

// Sign out from Google
export const signOut = () => {
  gapi.auth2.getAuthInstance().signOut();
};

// Fetch data from Google Sheets
export const fetchSheetData = async () => {
  try {
    const response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1',
    });
    return response.result.values || [];
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    return [];
  }
};

// Update data in Google Sheets
export const updateSheetData = async (record) => {
  try {
    const response = await gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[record.date, record.volunteerName, record.status]],
      },
    });
    console.log('Data updated:', response);
  } catch (error) {
    console.error('Error updating data in Google Sheets:', error);
  }
};
