import axios from 'axios';
import { SERVER_URL } from '../config';

const LABEL_URL='http://101.132.175.224:5000/difftech/api/v0.1/'

export function getPhotos(is_label = 0, page_num = 1, page_size = 20) {
  return axios({
    url: `${SERVER_URL}photo/photo_list`,
    method: 'get',
    params: {
      page_num,
      page_size,
      is_label
    },
    withCredentials: true
  });
}

export function getTrainPhotos(manual_label = 0, page_num = 1, page_size = 20) {
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



export function isSignIn() {
  return axios({
    url: `${LABEL_URL}features/issignin`,
    method: 'get',
    withCredentials: true
  });
}

export function login(username, password) {
  return axios({
    url: `${LABEL_URL}features/login`,
    method: 'post',
    data: {
      username,
      password
    },
    withCredentials: true
  });
}

export function getImgByFeatureId(feature_id) {
  return axios({
    url: `${LABEL_URL}features/${feature_id}`,
    method: 'get',
    withCredentials: true
  });
}

export function snedPoint(img_id, feature_id, info) {
  return axios({
    url: `${LABEL_URL}features/submit`,
    method: 'post',
    data: {
      img_id,
      feature_id,
      info
    },
    withCredentials: true
  });
}

export function getCount(username) {
  return axios({
    url: `${LABEL_URL}features/stats/${username}`,
    method: 'get',
    withCredentials: true
  });
}