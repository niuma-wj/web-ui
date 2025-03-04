import CryptoJS from 'crypto-js';

export default {
    // 加密
    encrypt(word, keyStr) {
        keyStr = keyStr ? keyStr : 'Lc1Zi8481lfH0F72';
        var key = CryptoJS.enc.Utf8.parse(keyStr);
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var iv = CryptoJS.enc.Utf8.parse('OkxNe6vsRD1d3vUe');
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {iv:iv, mode:CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.toString();
    },
    
    // 解密
    decrypt(word, keyStr) {
        keyStr = keyStr ? keyStr : 'Lc1Zi8481lfH0F72';
        var key = CryptoJS.enc.Utf8.parse(keyStr);
        var iv = CryptoJS.enc.Utf8.parse('OkxNe6vsRD1d3vUe');
        var decrypt = CryptoJS.AES.decrypt(word, key, { iv:iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }
}
