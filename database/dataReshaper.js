const reshape = function (arr) {
  const obj = {};
  for (let i of arr) {
    if (i.locations === undefined || null) {
      delete arr[i.locations];
    } else {
      obj[i.locations] = i.followersnumber;
    }
  }
  const output = arr[0];
  output.locations = obj;
  return output;
};

module.exports = reshape;
