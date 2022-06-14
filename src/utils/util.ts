import dayjs from 'dayjs';
import * as XLSX from 'xlsx';

export const formatDate = (value: string) => {
  return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
};



/*
*
* 数据
*
* 字段和对应值
*
* 表名
*
* */
export const handleExportAll = (nowdata, entozh,title='全部信息') => {


  const json = nowdata.map((item) => {
    return Object.keys(item).reduce((newData, key) => {
      const newKey = entozh[key] || key;
      newData[newKey] = item[key];
      return newData;
    }, {});
  });


  const sheet = XLSX.utils.json_to_sheet(json);

  openDownloadDialog(sheet2blob(sheet, undefined), `${title}.xlsx`);

};
const openDownloadDialog = (url, saveName) => {
  if (typeof url == 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url); // 创建blob地址
  }
  var aLink = document.createElement('a');
  aLink.href = url;
  aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
  var event;
  if (window.MouseEvent) event = new MouseEvent('click');
  else {
    event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  }
  aLink.dispatchEvent(event);
};
const sheet2blob = (sheet, sheetName) => {
  sheetName = sheetName || 'sheet1';
  var workbook = {
    SheetNames: [sheetName],
    Sheets: {}
  };
  workbook.Sheets[sheetName] = sheet; // 生成excel的配置项

  var wopts = {
    bookType: 'xlsx', // 要生成的文件类型
    bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    type: 'binary'
  };
  var wbout = XLSX.write(workbook, wopts);
  var blob = new Blob([s2ab(wbout)], {
    type: 'application/octet-stream'
  }); // 字符串转ArrayBuffer
  function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

  return blob;
};
