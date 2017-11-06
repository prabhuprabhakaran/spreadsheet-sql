import {AbstractSpreadSheet} from './AbstractSpreadsheet';
import * as utils from './Utils';

export class PublicSpreadsheet extends AbstractSpreadSheet{

  constructor(spreadsheetKey: string, worksheetName: string) {
    super();
    this.spreadsheetKey = spreadsheetKey;
    this.worksheetName = worksheetName;
  }

  query(query: string) {
    query = encodeURIComponent(query);

    return this.promisifiedGoogleRequest(`https://spreadsheets.google.com/tq?headers=1&key=${this.spreadsheetKey}&sheet=${this.worksheetName}&tq=${query}&tqx=out:csv`)
      .then((body) => {
        return utils.csv2json(body);
      });
  }
}