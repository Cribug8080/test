/**
 *
 * @param url 图片路径
 * @param ext 图片格式
 * @param callback 结果回调
 */
function getUrlBase64(url, ext, callback) {
    var canvas = document.createElement("canvas");   //创建canvas DOM元素
    var ctx = canvas.getContext("2d");
    var img = new Image;
    img.crossOrigin = 'Anonymous';
    img.src = url;
    img.onload = function () {
        canvas.height = 60; //指定画板的高度,自定义
        canvas.width = 85; //指定画板的宽度，自定义
        ctx.drawImage(img, 0, 0, 60, 85); //参数可自定义
        var dataURL = canvas.toDataURL("image/" + ext);
        callback.call(this, dataURL); //回掉函数获取Base64编码
        canvas = null;
    };
}