using System;

namespace testapi.Models.SaleModels
{
    public class SaleModel
    {
        public string MaSale { get; set; }
        public string TenSale { get; set; }
        public string MoTa { get; set; }
        public int? DieuKien { get; set; }
        public int? SoLuong { get; set; }
        public DateTime? NgayHetHan { get; set; }
        public int? SoTienGiam { get; set; }
    }
}
