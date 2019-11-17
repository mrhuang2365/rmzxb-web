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
