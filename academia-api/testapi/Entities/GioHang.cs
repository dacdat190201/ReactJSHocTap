using System;
using System.Collections.Generic;

namespace testapi.Entities
{
    public partial class Giohang
    {
        public int MaMh { get; set; }
        public string Id { get; set; }
        public DateTime? Ngaytao { get; set; }
        public string Tinhtrang { get; set; }

        public AspNetUsers IdNavigation { get; set; }
        public Monhoc MaMhNavigation { get; set; }
    }
}
