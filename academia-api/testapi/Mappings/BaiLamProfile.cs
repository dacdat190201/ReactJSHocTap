using AutoMapper;
using testapi.Entities;
using testapi.Models.BaiHocModels;
using testapi.Models.BaiLamModels;

namespace testapi.Mappings
{
    public class BaiLamProfile :Profile
    {
        public BaiLamProfile()
        {
            CreateMap<Bailam, BaiLamModel>().ReverseMap();
        }
    }
}
