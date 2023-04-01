using System.Collections.Generic;
using testapi.Models.BaiHocModels;

namespace testapi.Models.ChuongModels
{
    public class ViewChapterModel
    {
        public int MaChuong { get; set; }        
        public string TenChuong { get; set; }

        public List<ViewLessonModel> BaiHoc { get; set; }
    }
}
