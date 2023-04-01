using System.Threading.Tasks;
using testapi.Models.API;
using testapi.Models.DethiModels;

namespace testapi.Services.DeThiServices
{
    public interface IDeThiService
    {
        Task<ApiResult<object>> delDeThi(int maDe);
        Task<ApiResult<object>> editDeThi(int maDe, ViewDeThiModel deThi);
        Task<ApiResult<object>> GetAllDeThi();
        Task<ApiResult<object>> GetAllDeThiByMaMH(int maMH);
        Task<ApiResult<object>> GetDeThiByMaDe(int maDe);
        Task<ApiResult<object>> GetDeThiByMaMH(int maMH);
        Task<ApiResult<object>> GetDeThiByMaMHMobile(int maMH);
        Task<ApiResult<object>> postDeThi(ViewDeThiModel deThi);
        Task<ApiResult<object>> GetDeThiByMa(int ma, int loai);
    }
}