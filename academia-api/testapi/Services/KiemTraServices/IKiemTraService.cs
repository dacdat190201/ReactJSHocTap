using System.Threading.Tasks;
using testapi.Models.API;
using testapi.Models.KiemTraModels;

namespace testapi.Services.KiemTraServices
{
    public interface IKiemTraService
    {
        Task<ApiResult<object>> GetAllKiemTra();
        Task<ApiResult<object>> GetKiemTra(int maKT);
        Task<ApiResult<object>> postKiemTra(string email, ViewKiemTraModel kiemTra);
        Task<ApiResult<object>> tinhDiem(int maKT, string thoiGian);
        Task<ApiResult<object>> getXepHangUser(int maMH, string email);
        Task<ApiResult<object>> getXepHang(int maMH);
        Task<ApiResult<object>> getXepHangByMa(int ma, int loai);
    }
}