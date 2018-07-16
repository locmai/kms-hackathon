const URL = 'http://13.229.247.183:5000/api';
export const getAllQuestions = () => {
  return fetch(`${URL}/question/greeting`, {
    method: 'GET',
    // body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const sendMessage = body => {
  return fetch(`${URL}/question`, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
};

export const sendAudioFile = audio => {
  let formData = new FormData();
  formData.append('audioFile', audio);
  formData.append('fileName', 'AudioSample.raw');
  return fetch(`${URL}/speech`, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json'
    },
    body: formData
  });
};

export const getJobsList = async () => {
  return fetch(`${URL}/jobs`, {
    method: 'GET',
    // body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const importCV = body => {
  console.log('hihi', body);
  console.log('post file', body['file']);
  console.log('post filecheck', body['filecheck']);
  console.log('post filename', body['filename']);
  let data = new FormData();
  data.append('file', body['file']);
  data.append('filecheck', body['filecheck']);
  data.append('filename', body['filename']);
  console.log('Log data', data);
  return fetch(`${URL}/upload`, {
    method: 'POST', // or 'PUT'
    //headers: {
    //  'Content-Type': 'multipart/form-data'
    //},
    body: data
    //body: JSON.stringify(body)
  });
};
