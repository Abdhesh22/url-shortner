class UrlService {
  base62(id) {
    let str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    let num = id;

    if (num === 0) return "0=====";

    while (num > 0) {
      result = str[num % 62] + result;
      num = Math.floor(num / 62);
    }

    while (result.length < 7) {
      result += "=";
    }

    return result;
  }
}

module.exports = UrlService;
