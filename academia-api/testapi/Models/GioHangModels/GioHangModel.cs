using System;
using testapi.Entities;
using testapi.Models.MonHocModels;

namespace testapi.Models.GioHangModels
{
    public class GioHangModel
    {
        public int MaMh { get; set; }
        public string Id { get; set; }
        public DateTime? Ngaytao { get; set; }
        public string TinhTrang { get; set; }

        public MonHocModel MaMhNavigation { get; set; }

    }
}
