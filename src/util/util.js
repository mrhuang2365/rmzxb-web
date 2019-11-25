import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export function exportExcel (workSheets, fileName) {
  /* generate workbook object from table */
  var wb = XLSX.utils.book_new()
  workSheets.forEach(item => {
    XLSX.utils.book_append_sheet(wb, item.ws, item.sheetName)
  })
  /* get binary string as output */
  var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
  try {
    FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), `${fileName}.xlsx`)
  } catch (e) {
    if (typeof console !== 'undefined') console.log(e, wbout)
  }
  return wbout
}
export function getWorkSheet (tableId) {
  return XLSX.utils.table_to_sheet(document.querySelector(`#${tableId}`))
}

export function exportExcelFromArrary (array, fileName) {
  var sheet = XLSX.utils.aoa_to_sheet(array)
  openDownloadDialog(sheet2blob(sheet), `${fileName}.xlsx`)
}
function openDownloadDialog (url, saveName) {
  if (typeof url === 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url) // 创建blob地址
  }
  var aLink = document.createElement('a')
  aLink.href = url
  aLink.download = saveName || '' // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
  var event
  if (window.MouseEvent) event = new MouseEvent('click')
  else {
    event = document.createEvent('MouseEvents')
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  }
  aLink.dispatchEvent(event)
}
function sheet2blob (sheet, sheetName) {
  sheetName = sheetName || 'sheet1'
  var workbook = {
    SheetNames: [sheetName],
    Sheets: {}
  }
  workbook.Sheets[sheetName] = sheet
  // 生成excel的配置项
  var wopts = {
    bookType: 'xlsx', // 要生成的文件类型
    bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    type: 'binary'
  }
  var wbout = XLSX.write(workbook, wopts)
  var blob = new Blob([s2ab(wbout)], {type:'application/octet-stream'})
  // 字符串转ArrayBuffer
  function s2ab (s) {
    var buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
    return buf
  }
  return blob
}
