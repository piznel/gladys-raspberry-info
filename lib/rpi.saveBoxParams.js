const Promise = require('bluebird');
const shared = require('./rpi.shared.js');

module.exports = function saveBoxParams(id, params) {
  console.log('id', id)
  console.log('params', params.length)
  if (params && params.length > 1) {
    shared.box[id] = { params: params }
  } else {
    shared.box[id] = { params: [8080, 80, 443, 3306, 22] }
  }

  var box = {
    id: id,
    params: {
      port: shared.box[id].params
    }
  };

  return gladys.box.update(box)
    .then(function(box) {
      console.log(box[0])
      return Promise.resolve(JSON.parse(box[0].params))
    })
    .catch(function(err) {
      return Promise.reject(err)
    });
}