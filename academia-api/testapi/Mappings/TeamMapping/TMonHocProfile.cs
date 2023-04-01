using AutoMapper;
using testapi.Entities;
using testapi.Models.MonHocModels;
using testapi.Models.TeamModels;

namespace testapi.Mappings.TeamMapping
{
    public class TMonHocProfile : Profile
    {
        public TMonHocProfile()
        {
            CreateMap<Monhoc, TMonHocModels>().ReverseMap();
        }
    }
}
