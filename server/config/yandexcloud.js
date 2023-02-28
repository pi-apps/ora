import EasyYandexS3 from 'easy-yandex-s3';
let s3 = new EasyYandexS3["default"]({
    auth: {
      accessKeyId: '',
      secretAccessKey: '',
    },
    Bucket: '',
    debug: false, 
  });
  export default s3;