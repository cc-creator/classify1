import ccTflite from "../native/Tflite";
import RNFS from "react-native-fs";

const rnfsPath = RNFS.DocumentDirectoryPath;const setup_path = rnfsPath + '/setup.text';
RNFS.exists(setup_path).then(res => {
    if(!res){
        RNFS.writeFile(setup_path,'1@CPU','utf8').then(res => {
            ccTflite.ccloadModel('my_model3.tflite','my_lables2.txt',1,'CPU')
                .then(res => console.log(res))
            global.variables = {ccTflite: ccTflite,numThread: 1,device: 'CPU',userToken: false,userId: '',ip: 'http://192.168.43.143:8080',account: '',name:'',signature: '',avatar: '',background: ''}
        })
    }else{
        RNFS.readFile(setup_path).then(res => {
            let temp = res.split('@')
            ccTflite.ccloadModel('my_model3.tflite','my_lables2.txt',Number(temp[0]),temp[1])
                .then(res => console.log(res))
            global.variables = {ccTflite: ccTflite,numThread: Number(temp[0]),device: temp[1],userToken: false,userId: '',ip: 'http://192.168.43.143:8080',account: '',name:'',signature: '',avatar: '',background: ''}
        })
    }
})


/*
无线局域网：192.168.43.143
本地： 192.168.195.1*/
