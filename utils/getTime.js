let getTime = new Date();

class GeyTime {
  constructor() {}
  dateNow() {
    let date = `${getTime.getFullYear()}-${this.appendZero(
      getTime.getMonth() + 1
    )}-${this.appendZero(getTime.getDate())}`;
    return date;
  }
  timeNow() {
    let time = `${this.appendZero(getTime.getHours())}:${this.appendZero(
      getTime.getMinutes()
    )}`;
    return time;
  }
  appendZero(obj) {
    if (obj < 10) {
      return "0" + obj;
    } else {
      return obj;
    }
  }
}

module.exports = new GeyTime();
