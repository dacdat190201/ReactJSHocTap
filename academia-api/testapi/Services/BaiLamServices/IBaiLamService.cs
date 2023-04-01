using System.Threading.Tasks;
using testapi.Models.API;
using testapi.Models.BaiLamModels;

namespace testapi.Services.BaiLamServices
{
    public interface IBaiLamService
    {
        Task<ApiResult<object>> getAllBaiLam();
        Task<ApiResult<object>> PostBaiLam(ViewBaiLamModel bailam);
        Task<ApiResult<object>> getBaiLam(int maKT);

    }
}