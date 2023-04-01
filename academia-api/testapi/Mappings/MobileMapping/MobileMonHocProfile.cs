using AutoMapper;
using testapi.Entities;
using testapi.Models.MobileModels;

namespace testapi.Mappings.MobileMapping
{
    public class MobileMonHocProfile : Profile
    {
        public MobileMonHocProfile()
        {
            CreateMap<Monhoc, MobileMonHocModel>().ReverseMap();
        }

    }
}
