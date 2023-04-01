using System;
using System.Collections.Generic;

namespace testapi.Entities
{
    public partial class Kiemtra
    {
        public Kiemtra()
        {
            Bailam = new HashSet<Bailam>();
        }

        public int MaKt { get; set; }
        public string TenKt { get; set; }
        public int? MaDe { get; set; }
        public int? Diem { get; set; }
        public string Thoigian { get; set; }
        public string Id { get; set; }

        public AspNetUsers IdNavigation { get; set; }
        public Dethi MaDeNavigation { get; set; }
        public ICollection<Bailam> Bailam { get; set; }
    }
}
