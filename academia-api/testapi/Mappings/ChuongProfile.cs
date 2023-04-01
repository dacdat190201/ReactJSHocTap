using AutoMapper;
using testapi.Entities;
using testapi.Models.ChuongModels;
using testapi.Models.MonHocModels;

namespace testapi.Mappings
{
    public class ChuongProfile:Profile
    {
        public ChuongProfile()
        {
            CreateMap<Chuong, ChuongModel>().ReverseMap();
        }
    }
}
