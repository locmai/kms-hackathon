const URL = 'http://192.168.33.72:5000/api';
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
  const data = new FormData();
  data.append('file', body['file']);
  data.append('filename', body['filename']);
  return fetch(`${URL}/upload`, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
    //body: JSON.stringify(body)
  });
};
