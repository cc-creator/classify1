import ccTflite from "../native/Tflite";

ccTflite.ccloadModel('my_model3.tflite','my_lables2.txt',1)
    .then(res => console.log(res))

global.variables = {ccTflite: ccTflite,userToken: false,userId: '',ip: 'http://192.168.43.143:8080',account: '',name:'',signature: '',avatar: '',background: ''}


/*
无线局域网：192.168.43.143
本地： 192.168.195.1*/
