using System.Threading.Tasks;
using testapi.Models.API;

namespace testapi.Services.DeThiCauHoiServices
{
    public interface IDeThiCauHoiServices
    {
        Task<ApiResult<object>> GetCauHoiByMaDe(int maDe);
    }
}