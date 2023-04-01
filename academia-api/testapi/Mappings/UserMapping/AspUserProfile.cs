using AutoMapper;
using testapi.Entities;
using testapi.Models.BaiHocModels;
using testapi.Models.UserModels;

namespace testapi.Mappings.UserMapping
{
    public class AspUserProfile : Profile
    {
        public AspUserProfile()
        {
            CreateMap<AspNetUsers, AspNetUserModel>().ReverseMap();
        }
    }
}
