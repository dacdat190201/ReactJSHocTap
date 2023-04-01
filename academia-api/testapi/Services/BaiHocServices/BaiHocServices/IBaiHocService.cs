using System.Threading.Tasks;
using testapi.Models.API;
using testapi.Models.BaiHocModels;

namespace testapi.Services.BaiHocServices
{
    public interface IBaiHocService
    {
        Task<ApiResult<object>> DelBaiHoc(int maBH);
        Task<ApiResult<object>> EditBaiHoc(BaiHocModel baiHoc);
        Task<ApiResult<object>> GetAllBaiHoc(int maChuong);
        Task<ApiResult<object>> GetBaiHoc(int maBH);
        Task<ApiResult<object>> postBaiHoc(BaiHocModel baiHoc);
    }
}