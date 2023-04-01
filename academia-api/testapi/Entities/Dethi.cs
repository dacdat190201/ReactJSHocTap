using System;
using System.Collections.Generic;

namespace testapi.Entities
{
    public partial class Dethi
    {
        public Dethi()
        {
            Dethicauhoi = new HashSet<Dethicauhoi>();
            Kiemtra = new HashSet<Kiemtra>();
        }

        public int MaDe { get; set; }
        public int? MaBh { get; set; }
        public int? MaChuong { get; set; }
        public int? MaMh { get; set; }
        public string TenDeThi { get; set; }
        public int? Thoigian { get; set; }
        public int? Soluong { get; set; }

        public Baihoc MaBhNavigation { get; set; }
        public Chuong MaChuongNavigation { get; set; }
        public Monhoc MaMhNavigation { get; set; }
        public ICollection<Dethicauhoi> Dethicauhoi { get; set; }
        public ICollection<Kiemtra> Kiemtra { get; set; }
    }
}
