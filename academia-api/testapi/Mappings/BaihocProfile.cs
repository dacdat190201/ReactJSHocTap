using AutoMapper;
using testapi.Entities;
using testapi.Models.BaiHocModels;
using testapi.Models.ChuongModels;

namespace testapi.Mappings
{
    public class BaihocProfile : Profile
    {
        public BaihocProfile()
        {
            CreateMap<Baihoc, BaiHocModel>().ReverseMap();
        }
    }
}
