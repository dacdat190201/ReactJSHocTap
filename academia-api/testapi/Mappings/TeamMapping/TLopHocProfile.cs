using AutoMapper;
using testapi.Entities;
using testapi.Models.TeamModels;

namespace testapi.Mappings.TeamMapping
{
    public class TLopHocProfile : Profile
    {
        public TLopHocProfile()
        {
            CreateMap<Lophoc, TLopHocModels>().ReverseMap();
        }
    }
}
