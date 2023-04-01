import axiosDeThi from "./axiosDeThi";

const END_POINT = {
    GETALL: "GetAllDeThi",
    GETDeThiByMaDe: "GetDeThiByMaDe"
}

export const getAllDeThiApi = () => {
    return axiosDeThi.get(`${END_POINT.GETALL}`);
}
export const getDeThiByMaDeApi = (MaDe) => {
    return axiosDeThi.get(`${END_POINT.GETDeThiByMaDe}?maDe=${MaDe}`);
}