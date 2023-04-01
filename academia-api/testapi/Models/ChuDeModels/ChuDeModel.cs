using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using testapi.Entities;
using testapi.Models.MonHocModels;

namespace testapi.Models.ChuDeModels
{
    public class ChuDeModel
    {
        public int MaChuDe { get; set; }
        public string TenChuDe { get; set; }
        public string Images { get; set; }
        public IFormFile File { get; set; }
        public List<MonHocModel> Monhoc { get; set; }
    }
}
