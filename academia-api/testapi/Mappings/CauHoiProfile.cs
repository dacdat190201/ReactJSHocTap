using AutoMapper;
using testapi.Entities;
using testapi.Models.BaiHocModels;
using testapi.Models.CauHoiModels;

namespace testapi.Mappings
{
    public class CauHoiProfile : Profile
    {
        public CauHoiProfile() {
            CreateMap<Cauhoi, CauHoiModel>().ReverseMap();
        }
    }
}
