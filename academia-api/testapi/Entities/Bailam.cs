using System;
using System.Collections.Generic;

namespace testapi.Entities
{
    public partial class Bailam
    {
        public int MaBl { get; set; }
        public int? MaCh { get; set; }
        public string DapAn { get; set; }
        public int? MaKt { get; set; }

        public Cauhoi MaChNavigation { get; set; }
        public Kiemtra MaKtNavigation { get; set; }
    }
}
