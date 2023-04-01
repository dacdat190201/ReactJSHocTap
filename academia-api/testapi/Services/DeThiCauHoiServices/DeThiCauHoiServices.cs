using AutoMapper;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security.Permissions;
using System.Threading.Tasks;
using testapi.Entities;
using testapi.Models.API;
using testapi.Models.DeThiCauHoiModels;
using testapi.Models.LopHocModels;

namespace testapi.Services.DeThiCauHoiServices
{
    public class DeThiCauHoiServices : IDeThiCauHoiServices
    {
        private readonly dbHocTapContext _context;
        private readonly IMapper _mapper;

        public DeThiCauHoiServices(dbHocTapContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ApiResult<object>> GetCauHoiByMaDe(int maDe)
        {
            try
            {
                var data = _context.Dethicauhoi
                .Include(t => t.MaChNavigation)
                .Where(t => t.MaDe == maDe).First();
                //var data = _context.Lophoc.Include(t => t.MaGvNavigation).Where(t=> t.MaLop == maDe).First();
                //var data = _context.Lophoc.Include(t =>t.MaGvNavigation).FirstOrDefault();

                var result = _mapper.Map<DeThiCauHoiModel>(data);

                return new ApiResult<object>(message: "true", data: new { result });
            }
            catch(Exception ex)
            {
                return new ApiResult<object>(message: "false", data: null);
            }
                       
        }
    }
}
