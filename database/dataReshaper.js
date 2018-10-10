let reshape = function(arr) {
  var obj = {};
  for (let i of arr) {
    if(i.locations === undefined || null){
      delete arr[i.locations]
    } else {
    obj[i.locations] = i.followersnumber;
    }
  }
  let output = arr[0];
  output.locations = obj;
  return output;

};




module.exports = reshape;
