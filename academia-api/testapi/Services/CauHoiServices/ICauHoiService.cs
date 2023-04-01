using System.Collections.Generic;
using System.Threading.Tasks;
using testapi.Entities;
using testapi.Models.API;
using testapi.Models.CauHoiModels;

namespace testapi.Services.CauHoiServices
{
    public interface ICauHoiService
    {
        Task<ApiResult<object>> GetAllCauHoi();
        Task<ApiResult<object>> DelCauHoi(int maCh);
        Task<ApiResult<object>> EditCauHoi(int maCh, ViewCauHoiModel cauHoi);
        Task<ApiResult<object>> GetCauHoi(int maCh);
        Task<ApiResult<object>> PostCauHoi(ViewCauHoiModel cauHoi);
        Task<ApiResult<object>> GetNewCauHoi();
        Task<ApiResult<object>> postListCauHoi(List<QuestionModel> lstCauHoi, int maDe);
      
        Task<ApiResult<object>> editListCauHoi(List<ViewQuestionModel> lstCauHoi, int maDe);
    }
}