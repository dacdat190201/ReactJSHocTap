using System;
using System.Collections.Generic;

namespace testapi.Entities
{
    public partial class Cautraloi
    {
        public int MaCtl { get; set; }
        public int? MaCh { get; set; }
        public string CauA { get; set; }
        public string CauB { get; set; }
        public string CauC { get; set; }
        public string CauD { get; set; }

        public Cauhoi MaChNavigation { get; set; }
    }
}
