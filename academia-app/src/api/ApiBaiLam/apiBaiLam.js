import axios from "axios";
import axiosBaiLam from './axiosBaiLam'

const END_POINT = {
    GETALL: "GetAllBaiLam",
    POSTBaiLam: "PostBaiLam",
    GETTinhDiem: "tinhDiem",
    GETAllKiemTra :"GetAllKiemTra"
}

export const getAllBaiLamApi = () => {
    return axiosBaiLam.get(`${END_POINT.GETALL}`);
}

export const getAllKiemTraApi = () => {
    return axiosBaiLam.get(`${END_POINT.GETAllKiemTra}`);
}

export const postBaiLamApi = (bailam) => {
    return axiosBaiLam.post(`${END_POINT.POSTBaiLam}`, bailam);
}

export const getTinhDiemApi = (maKT) => {
    return axiosBaiLam.get(`${END_POINT.GETTinhDiem}?maKT=${maKT}`);
}