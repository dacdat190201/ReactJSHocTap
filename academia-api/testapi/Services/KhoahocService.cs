using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using testapi.Entities;

namespace testapi.Services
{
    public class KhoahocService : IKhoaHocService
    {
        private readonly dbHocTapContext _context;
        public KhoahocService(dbHocTapContext context)
        {
            _context = context;
        }
        public async Task<List<bool>> GetAll()
        {
            try
            {
                // entity
                var data = await _context.Monhoc.AsNoTracking().ToListAsync();

                //mapping tới view model

                return new List<bool>();
            }
            catch (System.Exception ex)
            {

                throw;
            }
        }
    }
}
