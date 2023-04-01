using AutoMapper;
using testapi.Entities;
using testapi.Models.MonHocModels;
using testapi.Models.UserModels;

namespace testapi.Mappings.UserMapping
{
    public class MonHocProfile : Profile
    {
        public MonHocProfile() {
            CreateMap<Monhoc, MonHocModel>().ReverseMap();
        }
    }
}
