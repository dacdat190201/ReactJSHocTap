using System.Collections.Generic;
using System.Threading.Tasks;
using testapi.Models.API;
using testapi.Models.BaiHocModels;
using testapi.Models.ChuongModels;

namespace testapi.Services.ChuongService
{
    public interface IChuongService
    {
        Task<ApiResult<object>> DelChuong(int maChuong);
        Task<ApiResult<object>> EditChuong(ViewChuongModel chuong);
        Task<ApiResult<object>> editListCauHoi(List<ViewChapterModel> lstChuong);
        Task<ApiResult<object>> GetAllChuong(int maMH);
        Task<ApiResult<object>> GetChuong(int MaChuong);
        Task<ApiResult<object>> GetDetailChuong(int MaChuong);
        Task<ApiResult<object>> postBaiHoc(BaiHocModel baiHoc);
        Task<ApiResult<object>> postChuong(ViewChuongModel chuong);
        Task<ApiResult<object>> postListChuong(List<ChapterModel> lstChuong, int maMH);
        Task<ApiResult<object>> GetViewChuong(int MaChuong);
    }
}