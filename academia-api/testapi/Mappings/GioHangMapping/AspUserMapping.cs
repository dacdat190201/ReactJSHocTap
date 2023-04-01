using AutoMapper;
using testapi.Entities;
using testapi.Models.AspNetUsers;
using testapi.Models.UserModels;

namespace testapi.Mappings.GioHangMapping
{
    public class AspUserMapping : Profile
    {
        public AspUserMapping()
        {
            CreateMap<AspNetUsers, AspNetUsersModel>().ReverseMap();
        }
    }
}
