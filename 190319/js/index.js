// $(document).ready(function(){
//     document.documentElement.style.fontSize = $(window).width()/1920 + "px"
// })
$(document).ready(resizeHtmlFontSize)
$(window).resize(resizeHtmlFontSize);

function resizeHtmlFontSize() {// 绑定到窗口的这个事件中
  let designSize = 1920; // 设计图尺寸
  let html = document.documentElement;

  let wW = html.clientWidth;// 窗口宽度
  let rem = wW * 100 / designSize; 

  document.documentElement.style.fontSize = rem + 'px';
}