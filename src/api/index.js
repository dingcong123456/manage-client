import axios from 'axios';
import { SERVER_URL } from '../config';

const LABEL_URL='http://47.101.184.42:5000/difftech/api/v0.1/';

const YIFAN_URL = 'http://diff.mobi:7777/';

export function getPhotos(is_labeled = 0, page_num = 1, page_size = 20) {
  return axios({
    url: `${YIFAN_URL}photo/list`,
    method: 'get',
    params: {
      page_num,
      page_size,
      is_labeled 
    }
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
    url: `${YIFAN_URL}photo/feature`,
    method: 'post',
    data:info
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

export function getUserDetail(username, feature_id, page, size) {
  return axios({
    url: `${LABEL_URL}features/listimg/${username}`,
    method: 'get',
    params: {
      feature_id,
      page,
      size
    },
    withCredentials: true
  });
}

export function getUsers() {
  return axios({
    url: `${LABEL_URL}features/summary`,
    method: 'get',
    withCredentials: true
  });
}

export function getFeatureByImgId(img_id) {
  return axios({
    url: `${LABEL_URL}features/imginfo/${img_id}`,
    method: 'get',
    withCredentials: true
  });
}

export function discardById(img_id, feature_id) {
  return axios({
    url: `${LABEL_URL}features/discard`,
    method: 'post',
    data: {
      img_id,
      feature_id
    },
    withCredentials: true
  });
}
