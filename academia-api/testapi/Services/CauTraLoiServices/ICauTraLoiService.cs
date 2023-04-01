using System.Threading.Tasks;
using testapi.Entities;
using testapi.Models.API;
using testapi.Models.CauTraLoiModels;

namespace testapi.Services.CauTraLoiServices
{
    public interface ICauTraLoiService
    {
        Task<ApiResult<object>> DelCauTraLoi(int maCTL);
        Task<ApiResult<object>> EditCauTraLoi(int maCTL, ViewCauTraLoiModel cauTraLoi);
        Task<ApiResult<object>> GetCauTraLoi(int maCTL);
        Task<ApiResult<object>> PostCauTraLoi(ViewCauTraLoiModel cauTraLoi);
    }
}