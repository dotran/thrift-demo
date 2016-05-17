module.exports = reply = [];

var times = 100;

while (times > 0) {
  reply.push({
    id: times,
    name: "Params "+times,
    date: new Date().toISOString()
  });
  times--;
}
