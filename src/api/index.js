import axios from 'axios';
import { SERVER_URL } from '../config';

export function getPhotos(is_label = 0, page_num = 1, page_size = 15) {
  return axios({
    url: `${SERVER_URL}photo`,
    method: 'get',
    params: {
      page_num,
      page_size,
      is_label
    },
    withCredentials: true
  });
}

export function analyzefacepro(url){
  return axios({
    url: 'http://diff.sharezdm.cn/index/analyzefacepro',
    method: 'post',
    data: {
      image_url: url
    },
    withCredentials: true
  });
}