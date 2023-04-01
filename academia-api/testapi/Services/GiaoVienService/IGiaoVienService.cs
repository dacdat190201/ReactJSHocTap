using System.Collections.Generic;
using System.Threading.Tasks;
using testapi.Entities;
using testapi.Models.API;
using testapi.Models.GiaoVienModels;
using testapi.Models.LopHocModels;

namespace testapi.Services.GiaoVienService
{
    public interface IGiaoVienService
    {
        Task<ApiResult<object>> GetGiaoVienAll();
        Task<ApiResult<object>> TeamDetail(int MaGV);
        Task<ApiResult<object>> Get6GiaoVien();
        Task<ApiResult<object>> GetAllLopHoc();
        Task<ApiResult<object>> UpdateGiaoVien(int MaGv, GiaoVienModel gv);
        Task<ApiResult<object>> Update(int MaGv, GiaoVienModel gv);
        Task<ApiResult<object>> PostGiaoVien(GiaoVienModel gv);
        Task<ApiResult<object>> DelGV(int magv);
        Task<ApiResult<object>> GetLop(int MaLop);
        Task<ApiResult<object>> UpdateLopHoc(int ma, LopHocModel dt);
        Task<ApiResult<object>> PostLop(LopHocModel gv);
        Task<ApiResult<object>> DelLop(int ma);
    }
}
