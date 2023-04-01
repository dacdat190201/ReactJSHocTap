using AutoMapper;
using testapi.Entities;
using testapi.Models.GiaoVienModels;
using testapi.Models.TeamModels;

namespace testapi.Mappings.TeamMapping
{
    public class TGiaoVienProfile : Profile
    {
        public TGiaoVienProfile()
        {
            CreateMap<Giaovien, TGiaoVienModels>().ReverseMap();
        }
    }
}
