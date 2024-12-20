import http from './http.js';

export default function getContentList() {
  return (http.get('/contents', {
  }));
}