let reshape = function(arr) {
  var obj = {};
  for (let i of arr) {
    obj[i.locations] = i.followersnumber;
  }
  let output = arr[0];
  output.locations = obj;
  delete output.followersnumber;
  console.log(output);
  return output;

};

module.exports = reshape;
