using System;
using System.Collections.Generic;

namespace testapi.Entities
{
    public partial class Lichsuhoc
    {
        public string Id { get; set; }
        public int MaBh { get; set; }
        public string TrangThai { get; set; }

        public AspNetUsers IdNavigation { get; set; }
        public Baihoc MaBhNavigation { get; set; }
    }
}
