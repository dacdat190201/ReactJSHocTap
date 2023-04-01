using System;
using System.Collections.Generic;

namespace testapi.Entities
{
    public partial class Dethicauhoi
    {
        public int MaCh { get; set; }
        public int MaDe { get; set; }

        public Cauhoi MaChNavigation { get; set; }
        public Dethi MaDeNavigation { get; set; }
    }
}
