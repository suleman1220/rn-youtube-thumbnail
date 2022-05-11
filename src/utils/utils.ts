import { API_KEY } from '@env';
import { PART, TYPE, Q, MAX_RESULTS } from '../config/constants';

const getParams = (nextPageToken: any) => {
  return `key=${API_KEY}&part=${PART}&type=${TYPE}&q=${Q}&maxResults=${MAX_RESULTS}&pageToken=${nextPageToken}`;
};

export { getParams };
