using System.Threading.Tasks;
using testapi.Entities;
using testapi.Models.API;
using testapi.Models.DonHangModels;
using testapi.Models.GioHangModels;
using testapi.Models.SaleModels;

namespace testapi.Services.GioHangServices
{
    public interface IGioHangService
    {
        Task<ApiResult<object>> DelCTHoaDon(int maDh, int maMh);
        Task<ApiResult<object>> DelHoaDon(int maDh);
        Task<ApiResult<object>> EditCTHoaDon(CTHoaDonModel cthd);
        Task<ApiResult<object>> EditHoaDon(int maDh, HoaDonModel hd);
        Task<ApiResult<object>> GetAllCTHoaDon(int maDh);
        Task<ApiResult<object>> GetAllHoaDon();
        Task<ApiResult<object>> PostCTHoaDon(CTHoaDonModel cthd);
        Task<ApiResult<object>> PostHD(HoaDonModel hd);
        Task<ApiResult<object>> PostGioHang(string email, GioHangModel giohang);
     
        Task<ApiResult<object>> GetAllGioHang(string email);
        Task<ApiResult<object>> DelGio(string email, int MaMH);
        Task<ApiResult<object>> GetMaGiamGia();
        Task<ApiResult<object>> GetAllMaGiamGia();
        Task<ApiResult<object>> PostHoaDon(string email, string Ma);
        Task<ApiResult<object>> HienThiMa(string ma);
        Task<ApiResult<object>> CountGioHang(string email);
        Task<ApiResult<object>> HoaDon1Ngay();
        //MASALE
        Task<ApiResult<object>> GetMa(string MaSale);
        Task<ApiResult<object>> EditMa(string maSale, SaleModel sale);
        Task<ApiResult<object>> DelMa(string maSale);
        Task<ApiResult<object>> PostMaSale(SaleModel sl);
        Task<ApiResult<object>> HoaDonHomNay();
        Task<ApiResult<object>> EditHoaDonTinhTrang(int maDh);
    }
}