using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using testapi.Services.ThongKeServices;

namespace testapi.Controllers.AdminController
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class ThongKeController : ControllerBase
    {
        private readonly IThongKeService _thongKeService;

        public ThongKeController(IThongKeService thongKeService)
        {
            _thongKeService = thongKeService;
        }
        [HttpGet]
        public async Task<IActionResult> GetDoanhThuNgay()
        {
            var data = await _thongKeService.getDoanhThuNgay();
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetDoanhThuThang()
        {
            var data = await _thongKeService.getDoanhThuThang();
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetDoanhThuQuy(int quy, int nam)
        {
            var data = await _thongKeService.getDoanhThuQuy(quy, nam);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetDoanhThuNam()
        {
            var data = await _thongKeService.getDoanhThuNam();
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetDoanhThuNgayByChuDe(int maChuDe)
        {
            var data = await _thongKeService.getDoanhThuNgayByChuDe(maChuDe);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetDoanhThuThangByChuDe(int thang, int nam, int maChuDe)
        {
            var data = await _thongKeService.getDoanhThuThangByChuDe(thang, nam, maChuDe);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetDoanhThuQuyByChuDe(int quy, int nam, int maChuDe)
        {
            var data = await _thongKeService.getDoanhThuQuyByChuDe(quy, nam, maChuDe);
            if (data == null)
                return NotFound();
            return Ok(data);
        }

        [HttpGet]
        public async Task<IActionResult> GetThongKeAll()
        {
            var data = await _thongKeService.getThongKeAll();
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetThongKeByChuDe(int maChuDe)
        {
            var data = await _thongKeService.getThongKeByChuDe(maChuDe);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetThongKeNgay()
        {
            var data = await _thongKeService.getThongKeNgay();
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetThongKeThang(int thang, int nam)
        {
            var data = await _thongKeService.getThongKeThang(thang, nam);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetThongKeQuy(int quy, int nam)
        {
            var data = await _thongKeService.getThongKeQuy(quy, nam);
            if (data == null)
                return NotFound();
            return Ok(data);
        }

    }
    
}
