using AutoMapper;
using testapi.Entities;
using testapi.Models.DeThiCauHoiModels;
using testapi.Models.LopHocModels;

namespace testapi.Mappings
{
    public class DeThiCauHoiProfile : Profile
    {
        public DeThiCauHoiProfile()
        {
            CreateMap<Dethicauhoi, DeThiCauHoiModel>()
                .ForMember(src => src.CauHoi, des => des.MapFrom(src => src.MaChNavigation)).ReverseMap();           
        }
    }
}
