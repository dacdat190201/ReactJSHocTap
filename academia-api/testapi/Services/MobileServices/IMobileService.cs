using System.Collections.Generic;
using System.Threading.Tasks;
using testapi.Entities;
using testapi.Models.API;
using testapi.Models.MobileModels;

namespace testapi.Services.MobileServices
{
    public interface IMobileService
    {
        Task<ApiResult<object>> GetAllChuDe();
        Task<ApiResult<object>> GetMonHocBuy(int ChuDe, string email);
        Task<ApiResult<object>> GetMonHocChuDe(int ChuDe);
        Task<ApiResult<object>> getDetailChuong(int MaChuong);
        Task<ApiResult<object>> GetDeThiByMaMHMobile(int maMH);
        Task<ApiResult<object>> postListBaiLam(MobileListBaiLam lstBaiLam);
    }
}
