using AutoMapper;
using testapi.Entities;
using testapi.Models.BaiHocModels;
using testapi.Models.DethiModels;

namespace testapi.Mappings
{
    public class DeThiProfile : Profile
    {
        public DeThiProfile() 
        {
            CreateMap<Dethi, DethiModel>().ReverseMap();
        }
    }
}
