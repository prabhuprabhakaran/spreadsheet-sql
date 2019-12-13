export class Jsonp {
  data: any;
  constructor(data: any) {
    this.data = data;
  }
  toJson() {
    var response = this.data
      .replace(/.*\n(google\.visualization\.Query\.setResponse\()/g, '')
      .replace(/\);\s*$/, '');
    var googleResult = JSON.parse(response);

    var jsonResult = [];
    var col = googleResult.table.cols.length;
    var row = googleResult.table.rows.length;

    for (var i = 0; i < row; i++) {
      var item = {};
      for (var j = 0; j < col; j++) {
        if (googleResult.table.cols[j].label) {
          if (googleResult.table.rows[i].c[j]) {
            item[googleResult.table.cols[j].label] =
              googleResult.table.rows[i].c[j].v;
          } else {
            item[googleResult.table.cols[j].label] = null;
          }
        }
      }
      jsonResult[i] = item;
    }
    return jsonResult;
  }
}
