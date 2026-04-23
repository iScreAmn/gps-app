import * as XLSX from "xlsx-js-style";

/** Синий фон и белый текст для строки заголовков (строка 1). */
function applyHeaderRowStyle(worksheet) {
  const ref = worksheet["!ref"];
  if (!ref) {
    return;
  }
  const range = XLSX.utils.decode_range(ref);
  const style = {
    font: { bold: true, color: { rgb: "FFFFFF" }, name: "Calibri", sz: 11 },
    fill: { patternType: "solid", fgColor: { rgb: "2F5597" } },
    alignment: { horizontal: "center", vertical: "center", wrapText: true },
  };
  for (let c = range.s.c; c <= range.e.c; c += 1) {
    const addr = XLSX.utils.encode_cell({ r: 0, c });
    const cell = worksheet[addr];
    if (!cell) {
      continue;
    }
    cell.s = style;
  }
}

/**
 * @param {Array<{
 *   productName?: string;
 *   cleanCode: string;
 *   count?: number;
 *   timestamp: number;
 * }>} scans
 */
export function exportScansToExcel(scans) {
  if (!Array.isArray(scans) || scans.length === 0) {
    return;
  }

  const dataForExcel = scans.map((item) => ({
    "სახელი": item.productName || "—",
    "კოდი": item.cleanCode,
    "რაოდენობა": item.count ?? 1,
    "სკანირების თარიღი": new Date(item.timestamp).toLocaleString("ru-RU"),
  }));

  const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
  applyHeaderRowStyle(worksheet);

  const wscols = [
    { wch: 30 },
    { wch: 20 },
    { wch: 10 },
    { wch: 25 },
  ];
  worksheet["!cols"] = wscols;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Сканирования");

  const date = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(workbook, `scans_report_${date}.xlsx`);
}
