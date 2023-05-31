import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1s', target: 1000 },
    { duration: '28s', target: 1000 },
    { duration: '1s', target: 0 },
  ],
};

const getTests = () => {
  const randomId = Math.round(Math.random() * 1000000);
  const questionResponse = http.get(`http://localhost:3000/qa/questions/?id=${randomId}&page=1&count=3`);

  if (questionResponse.status !== 200) {
    console.error('Error fetching questions');
  } else {
    console.log('Got questions successfully');
  }

  const answerResponse = http.get(`http://localhost:3000/qa/answers/?id=${randomId}&page=1&count=3`);

  if (answerResponse.status !== 200) {
    console.error('Error fetching answers');
  } else {
    console.log('Got answers successfully');
  }

  sleep(1);
};

export default getTests;
