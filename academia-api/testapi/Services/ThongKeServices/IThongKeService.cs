using System.Threading.Tasks;
using testapi.Models.API;

namespace testapi.Services.ThongKeServices
{
    public interface IThongKeService
    {
        Task<ApiResult<object>> getDoanhThuNam();
        Task<ApiResult<object>> getDoanhThuNgay();
        Task<ApiResult<object>> getDoanhThuNgayByChuDe(int MaChuDe);
        Task<ApiResult<object>> getDoanhThuQuy(int quy, int nam);
        Task<ApiResult<object>> getDoanhThuQuyByChuDe(int quy, int nam, int MaChuDe);
        Task<ApiResult<object>> getDoanhThuThang();
        Task<ApiResult<object>> getDoanhThuThangByChuDe(int thang, int nam, int MaChuDe);
        Task<ApiResult<object>> getThongKeNgay();
        Task<ApiResult<object>> getThongKeQuy(int quy, int nam);
        Task<ApiResult<object>> getThongKeThang(int thang, int nam);
        Task<ApiResult<object>> getThongKeAll();
        Task<ApiResult<object>> getThongKeByChuDe(int maChuDe);
    }
}