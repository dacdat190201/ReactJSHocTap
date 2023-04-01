using System.Threading.Tasks;
using testapi.Entities;
using testapi.Models.AdminModels.PostAllUser;
using testapi.Models.API;

namespace testapi.Services.UserSevice
{
    public interface IUserSevice
    {
        Task<ApiResult<object>> MonhocByUser(string email);
        Task<ApiResult<object>> ProfileUser(string email);
        Task<ApiResult<object>> UploadImages(string email, UserView user);
        Task<ApiResult<object>> EditUser(string email, UserView user);
    }
}