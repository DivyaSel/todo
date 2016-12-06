import moment from 'moment';

export class DateFormatValueConverter {
  
  toView(value,formatstr) {
    if(value === undefined || value === null){
      return;
    }
    return moment(value).utc().format(formatstr);
}
}