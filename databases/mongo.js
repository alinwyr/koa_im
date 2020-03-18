const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

let uri = ''
const {
  MONGO_USER: user,
  MONGO_PASSWORD: pass,
  MONGO_HOST: host,
  MONGO_PORT: port,
  MONGO_DB: db,
} = process.env
if(user && pass){
  uri = `mongodb://${user}:${pass}@${host}:${port}/${db}?authSource=admin`
}else{
  uri = `mongodb://${host}:${port}/${db}`
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
