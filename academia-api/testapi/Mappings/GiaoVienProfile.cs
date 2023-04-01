using AutoMapper;
using testapi.Entities;
using testapi.Models.BaiHocModels;
using testapi.Models.GiaoVienModels;

namespace testapi.Mappings
{
    public class GiaoVienProfile : Profile
    {
        public GiaoVienProfile()
        {
            CreateMap<Giaovien, GiaoVienModel>().ReverseMap();
        }
    }
}
