// sort使用
export function compare(property,secproperty) {
  return function (a, b) {
    var value1 = a[property][secproperty];
    var value2 = b[property][secproperty];
    return value2 - value1;
  }
}

// 闭包函数，每次执行让歌单增加length条数据
export function conbination(arr,length){
  var firstIndex=0
  var lastIndex=length

  var arrResult=[]
  return function(){
    // 下面这行代码原本目的是每次执行让歌单增加length条数据，但这样刷新到后面，请求参数会越来越大，最后请求不成功
    // 所以改成每次执行只逐步取length条数据比如第一次执行取0-200条，第二次取200-400条，以此类推
    // 固定请求参数为length，然后在song.vue里面完成请求后再拼接歌曲数据，效果确实可以
    // arrResult=arrResult.concat(arr.slice(firstIndex,lastIndex))
    arrResult=arr.slice(firstIndex,lastIndex)
    firstIndex=firstIndex+length
    lastIndex=lastIndex+length
    return arrResult
  }
}

export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
   fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
   'M+': date.getMonth() + 1,
   'd+': date.getDate(),
   'h+': date.getHours(),
   'm+': date.getMinutes(),
   's+': date.getSeconds()
  };
  for (let k in o) {
   if (new RegExp(`(${k})`).test(fmt)) {
    let str = o[k] + '';
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
   }
  }
  return fmt;
 };
 
 function padLeftZero (str) {
  return ('00' + str).substr(str.length);
 };

//  export function NumIsInArr(index,arr){
//   let flag=false
//   for(let i=0;i<arr.length;i++){
//     if(index==arr[i]){
//       flag=true
//       break;
//     }
//   }
//   return flag
//  }

