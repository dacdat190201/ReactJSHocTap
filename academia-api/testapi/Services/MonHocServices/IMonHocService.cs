using System.Collections.Generic;
using System.Threading.Tasks;
using testapi.Entities;
using testapi.Models.API;
using testapi.Models.ChuDeModels;
using testapi.Models.MonHocModels;

namespace testapi.Services.MonHocServices
{
    public interface IMonHocService
    {
        Task<ApiResult<object>> GetMonhoc(int MaMH);
        Task<ApiResult<object>> GetMonhocAll();
        Task<ApiResult<object>> GetAllChuDe();
        Task<ApiResult<object>> PostMonHoc(MonHocModel mh);
        Task<ApiResult<object>> DelMonhoc(int mamh);
        Task<ApiResult<object>> EditMonhoc(int maMH, MonHocModel monHoc);
        Task<ApiResult<object>> MonhocDetails(int MaMH);
        Task<ApiResult<object>> MonHocCauHoiDetails(int MaBH);
        Task<ApiResult<object>> Get8MonHoc();
        Task<ApiResult<object>> GetChuDe();
        Task<ApiResult<object>> Get1ChuDe(int MaChuDe);
        Task<ApiResult<object>> UpdateChuDe(int MaCD, ChuDeModel cd);
        Task<ApiResult<object>> PostChuDe(ChuDeModel mh);
        Task<ApiResult<object>> DelChuDe(int macd);
    }
}