using System.Collections.Generic;
using System.Threading.Tasks;
using testapi.Entities;
using testapi.Models.AdminModels.PostAllUser;
using testapi.Models.API;
using testapi.Models.MonHocModels;

namespace testapi.Services.AdminService
{
    public interface IAdminService
    {
        Task<ApiResult<object>> AdminGet5User();
        Task<ApiResult<object>> AdminGetAllUser();
        Task<ApiResult<object>> AdminGetUser(int MaSV);
        Task<ApiResult<object>> DelAdminUser(string maSV);
        Task<ApiResult<object>> postQuen(string email, string quyen);
        Task<ApiResult<object>> UpdateQuyen(string email, string quyen);
        Task<ApiResult<object>> UpdateUser(int MaSV, UserView user);
        Task<ApiResult<object>> UploadProduct(int maMh, MonHocModel mh);
        Task<ApiResult<object>> EditMon(int maMh, MonHocModel mh);
        Task<ApiResult<object>> GetAllQuyen();
    }
}