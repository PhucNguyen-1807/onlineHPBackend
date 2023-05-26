const QUERY={
    "SELECT_LOGIN":'SELECT EXISTS(SELECT * FROM Login WHERE username= ? AND password=? ) AS Existing',
    "SELECT_KTNU" :'SELECT * FROM KichThuoc_NuocUong',
    "INSERT_MONAN" : 'INSERT INTO MonAn VALUES (?,?,?,?)',
    "INSERT_NUOCUONG" : 'INSERT INTO NuocUong VALUES (?)',
    "INSERT_KTNC" : 'INSERT INTO KichThuoc_NuocUong VALUES (?,?,?)',
    "SELECT_SERVING" : 'SELECT * FROM GioPhucVu_DoAn',
    "INSERT_DOAN": 'INSERT INTO DoAn VALUES (?,?)',
    "INSERT_SERVING" : 'INSERT INTO GioPhucVu_DoAn VALUES (?, ?,?)',
    "SELECT_MONAN_TENMON": "SELECT * FROM MonAn WHERE TenMon LIKE CONCAT('%', ?, '%')",
    "SELECT_MONAN_MAMON" : "SELECT *  FROM MonAn WHERE MaMon = ? ",
    "SELECT_SERVING_MADOAN": "SELECT *  FROM GioPhucVu_DoAn WHERE MaDoAn = ?",
    "SELECT_TONGSL_THANG" : "SELECT TongSL_Thang(?) AS sum",
    "SELECT_DOAN_MAMON" : "SELECT *  FROM DoAn WHERE MaMon = ?",
    "SELECT_KTNC_MANUOCUONG" : "SELECT *  FROM KichThuoc_NuocUong WHERE MaNuocUong =?",
    "CALL_THONGKEDOANHTHU" : "CALL ThongKeDoanhThu (?) "
}   

module.exports=QUERY