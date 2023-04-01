using System;
using System.Collections.Generic;

namespace testapi.Entities
{
    public partial class Giaovien
    {
        public Giaovien()
        {
            Lophoc = new HashSet<Lophoc>();
        }

        public int MaGv { get; set; }
        public string TenGv { get; set; }
        public string Sdt { get; set; }
        public DateTime? Ngaysinh { get; set; }
        public string Email { get; set; }
        public string Diachi { get; set; }
        public string HinhAnhGv { get; set; }

        public ICollection<Lophoc> Lophoc { get; set; }
    }
}
