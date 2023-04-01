using System.Collections.Generic;
using System.Threading.Tasks;

namespace testapi.Services
{
    public interface IKhoaHocService
    {
        Task<List<bool>> GetAll();
    }
}
