class ShortUrlService {
    constructor(id) {
        this.id = id;
    }

    base62() {
        let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        let num = this.id;

        if (num === 0) return '0=====';

        while (num > 0) {
            result = str[num % 62] + result;
            num = Math.floor(num / 62);
        }

        while(result.length < 7){
            result += '=';
        }

        return result;
    }
}