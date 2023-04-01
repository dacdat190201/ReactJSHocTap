using AutoMapper;
using testapi.Entities;
using testapi.Models.MonHocModels;

namespace testapi.Mappings
{
    public class MHProfile : Profile
    {
        public MHProfile()
        {
            CreateMap<Monhoc, MonHocModel>().ReverseMap();
        }
    }
}
