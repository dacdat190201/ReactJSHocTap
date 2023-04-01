using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using testapi.Models.DonHangModels;
using testapi.Models.GioHangModels;
using testapi.Models.SaleModels;
using testapi.Services.GioHangServices;

namespace testapi.Controllers.GioHang
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class GioHangController : ControllerBase
    {
        private IGioHangService _gioHangService;
        
        public GioHangController(IGioHangService gioHangService)
        {
            _gioHangService = gioHangService;
        }
       
        [HttpGet]
        public async Task<IActionResult> getAllHoaDon()
        {
            var data = await _gioHangService.GetAllHoaDon();
            if(data == null)
                return NotFound();
            return Ok(data);
        }

        //[HttpPost]
        //public async Task<IActionResult> PostHoaDon(string email)
        //{
        //    var data = await _gioHangService.PostHoaDon(email);
        //    if (data == null)
        //        return NotFound();
        //    return Ok(true);
        //}
        [HttpPost]
        public async Task<IActionResult> PostHoaDon(string email, string ma)
        {
            var data = await _gioHangService.PostHoaDon(email,ma);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> HienThiMa(string ma)
        {
            var data = await _gioHangService.HienThiMa(ma);
            if (data == null)
                return NotFound();
            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> deleteHoaDon(int maDh)
        {
            var data = await _gioHangService.DelHoaDon(maDh);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> editHoaDon(int maDh,[FromBody] HoaDonModel hd)
        {
            var data = await _gioHangService.EditHoaDon(maDh, hd);
            if (data == null)
                return NotFound();
            return Ok(data);
        }

        [HttpGet]
        public async Task<IActionResult> getAllCTHoaDon(int maDh)
        {
            var data = await _gioHangService.GetAllCTHoaDon(maDh);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> postCTHoaDon([FromBody] CTHoaDonModel cthd)
        {
            var data = await _gioHangService.PostCTHoaDon(cthd);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> deleteCTHoaDon(int maDh, int maMh)
        {
            var data = await _gioHangService.DelCTHoaDon(maDh, maMh);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> editCTHoaDon([FromBody] CTHoaDonModel cthd)
        {
            var data = await _gioHangService.EditCTHoaDon(cthd);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> PostGioHang(string email,GioHangModel gh)
        {
            var data = await _gioHangService.PostGioHang(email,gh);
            if (data == null)
                return NotFound();
            return Ok(true);
        }
        [HttpDelete]
        public async Task<IActionResult> DelGio(string email, int mamh)
        {
            var data = await _gioHangService.DelGio(email, mamh);
            if (data == null)
                return NotFound();
            return Ok(true);
        }
        [HttpGet]
        public async Task<IActionResult> GetGioHang(string email)
        {
            var data = await _gioHangService.GetAllGioHang(email);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> CountGioHang(string email)
        {
            var data = await _gioHangService.CountGioHang(email);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> HoaDon1Ngay()
        {
            var data = await _gioHangService.HoaDon1Ngay();
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> HoaDonHoNay()
        {
            var data = await _gioHangService.HoaDonHomNay();
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllMaSale()
        {
            var data = await _gioHangService.GetAllMaGiamGia();
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetMaGiamGia()
        {
            var data = await _gioHangService.GetMaGiamGia();
            if (data == null)
                return NotFound();
            return Ok(data);
            //tra ve DL thoi
        }
        [HttpGet]
        public async Task<IActionResult> GetMaSale(string MaSale)
        {
            var data = await _gioHangService.GetMa(MaSale);
            if (data == null)
                return NotFound();
            return Ok(data);
            //tra ve DL thoi
        }
        [HttpPut]
        public async Task<IActionResult> EditSale(string sale, [FromBody] SaleModel sl)
        {
            var data = await _gioHangService.EditMa(sale, sl);
            if (data == null)
                return NotFound();
            return Ok(data);

        }
        [HttpPut]
        public async Task<IActionResult> EditHoaDonTinhTrang(int maDh)
        {
            var data = await _gioHangService.EditHoaDonTinhTrang(maDh);
            if (data == null)
                return NotFound();
            return Ok(data);

        }
        [HttpPost]
        public async Task<IActionResult> PostSale([FromBody] SaleModel sl)
        {
            var data = await _gioHangService.PostMaSale(sl);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> DeleteSale(string sale)
        {
            var data = await _gioHangService.DelMa(sale);
            if (data == null)
                return NotFound();
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> PostHD([FromBody] HoaDonModel hd)
        {
            var data = await _gioHangService.PostHD(hd);
            if (data == null)
                return NotFound();
            return Ok(data);
        }

    }
}
