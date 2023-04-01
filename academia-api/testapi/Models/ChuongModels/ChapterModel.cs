using System.Collections.Generic;
using testapi.Models.BaiHocModels;

namespace testapi.Models.ChuongModels
{
    public class ChapterModel
    {
        public string TenChuong { get; set; }
        public List<LessonModel> BaiHoc { get; set; }
    }
}
