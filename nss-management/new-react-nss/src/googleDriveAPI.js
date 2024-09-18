const DRIVE_CLIENT_ID = import.meta.env.VITE_GOOGLE_DRIVE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_GOOGLE_DRIVE_REDIRECT_URI;
const SCOPE = import.meta.env.VITE_GOOGLE_DRIVE_SCOPE;

// Generates the URL for OAuth authorization
export const getAuthUrl = () => {
  return `https://accounts.google.com/o/oauth2/v2/auth?response_type=token&client_id=${DRIVE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;
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
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch files: ${response.statusText}`);
    }

    const data = await response.json();
    return data.files || [];
  } catch (error) {
    console.error('Error fetching files:', error);
    return [];
  }
};

// Uploads a file to Google Drive
export const uploadFile = async (accessToken, file, folderId) => {
  try {
    const metadata = {
      name: file.name,
      mimeType: file.type,
      parents: [folderId], // Specify the folder ID where the file will be uploaded
    };

    const formData = new FormData();
    formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    formData.append('file', file);

    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload file: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

// Signs out the user by clearing the access token
export const signOutUser = () => {
  window.location.href = '/'; // Redirect to the homepage or login page
  window.localStorage.removeItem('access_token'); // Optionally, remove any stored tokens in localStorage or sessionStorage
};
