const axios = require("axios")

const imgbbPostLink = "https://api.imgbb.com/1/upload&key=c0da0fd8e2f81e366f0e06c96e60c889"

const generateId = (_length) => {
    return Math.random().toString(36).substr(2, _length);
};

function uploadImage(img) {
    let body = new FormData()
    body.set('key', "c0da0fd8e2f81e366f0e06c96e60c889")
    body.append('image', img)

    return axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload',
      data: body
    })
  }

  module.exports = {
    generateId, uploadImage
} 