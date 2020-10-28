const moment = require("moment");

exports.formatDate = (date, dateFormat = "LL") =>
  date && moment(date).format(dateFormat);
