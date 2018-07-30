import axios from 'axios';
import { SERVER_URL } from '../config';

export function getPhotos(manual_label = 0, page_num = 1, page_size = 100) {
  return axios({
    url: `${SERVER_URL}photo/list`,
    method: 'get',
    params: {
      page_num,
      page_size,
      manual_label
    },
    withCredentials: true
  });
}

export function featureAndAnswer() {
  return axios({
    url: `${SERVER_URL}feature/list`,
    method: 'get',
    withCredentials: true
  });
}

export function addFeature(pid,name,key) {
  return axios({
    url: `${SERVER_URL}feature/add_feature`,
    method: 'post',
    data: {
      pid,
      name,
      key
    },
    withCredentials: true
  });
}

export function addFeatureAnswer(feature_item_id, name) {
  return axios({
    url: `${SERVER_URL}feature/feature_answer`,
    method: 'post',
    data: {
      feature_item_id,
      name
    },
    withCredentials: true
  });
}

export function delFeatureAnswer(id) {
  return axios({
    url: `${SERVER_URL}feature/feature_answer`,
    method: 'delete',
    data: {
      id
    },
    withCredentials: true
  });
}

export function snedLabel(info) {
  return axios({
    url: `${SERVER_URL}feature/addphotofeature`,
    method: 'post',
    data:info,
    withCredentials: true
  });
}

export function getPhotoFeature(photo_id) {
  return axios({
    url: `${SERVER_URL}feature/photo_feature`,
    method: 'get',
    params: {
      photo_id
    },
    withCredentials: true
  });
}

export function getPointInfo(photo_id) {
  return axios({
    url: `${SERVER_URL}photo/point_info`,
    method: 'get',
    params: {
      photo_id
    },
    withCredentials: true
  });
}

export function addPointInfo(point_info, photo_id) {
  return axios({
    url: `${SERVER_URL}photo/point_info`,
    method: 'post',
    data: {
      point_info,
      photo_id
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
    // withCredentials: true
  });
}

export function getCommonImgToken() {
  return axios({
    url: 'http://diff.sharezdm.cn/index/getuploadtoken',
    method: 'get',
    withCredentials: true
  });
}

export function uploadToQiniu(formData) {
  return axios({
    url: 'http://upload.qiniup.com',
    method: 'post',
    data: formData
  });
}