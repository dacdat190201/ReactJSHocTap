using AutoMapper;
using testapi.Entities;
using testapi.Models.GiaoVienModels;
using testapi.Models.LopHocModels;

namespace testapi.Mappings
{
    public class LophocProfile : Profile
   {
        public LophocProfile()
        {
            CreateMap<Lophoc, LopHocModel>()
                .ForMember(src => src.GiaoVien, desc => desc.MapFrom(src=>src.MaGvNavigation)).ReverseMap();
        }
    }
}
