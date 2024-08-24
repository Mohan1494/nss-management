// src/google.js

const CLIENT_ID = '877781895823-q43jb3ch4h9klm4s8ma7s9s345j2jvee.apps.googleusercontent.com'; // Replace with your actual client ID
const REDIRECT_URI = 'http://localhost:5173/docs'; // Replace with your actual redirect URI

// Generates the URL for OAuth authorization
export const getAuthUrl = () => {
  return `https://accounts.google.com/o/oauth2/v2/auth?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=https://www.googleapis.com/auth/drive.file`;
};

// Extracts the access token from the URL hash
export const getAccessTokenFromUrl = () => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return params.get('access_token');
};

// Fetches a list of files from Google Drive
export const fetchFiles = async (accessToken) => {
  try {
    const response = await fetch('https://www.googleapis.com/drive/v3/files', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch files');
    }
    const data = await response.json();
    return data.files;
  } catch (error) {
    console.error('Error fetching files:', error);
    return [];
  }
};

// Uploads a file to Google Drive
export const uploadFile = async (accessToken, file) => {
  try {
    const formData = new FormData();
    formData.append(
      'metadata',
      new Blob(
        [
          JSON.stringify({
            name: file.name,
            mimeType: file.type,
          }),
        ],
        { type: 'application/json' }
      )
    );
    formData.append('file', file);

    const response = await fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload file');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};
