using System;
using System.Collections.Generic;

namespace testapi.Entities
{
    public partial class Cauhoi
    {
        public Cauhoi()
        {
            Bailam = new HashSet<Bailam>();
            Cautraloi = new HashSet<Cautraloi>();
            Dethicauhoi = new HashSet<Dethicauhoi>();
        }

        public int MaCh { get; set; }
        public string TenCauHoi { get; set; }
        public string DapAn { get; set; }
        public string LoaiCauHoi { get; set; }
        public string GiaiThich { get; set; }
        public int? Type { get; set; }

        public ICollection<Bailam> Bailam { get; set; }
        public ICollection<Cautraloi> Cautraloi { get; set; }
        public ICollection<Dethicauhoi> Dethicauhoi { get; set; }
    }
}
