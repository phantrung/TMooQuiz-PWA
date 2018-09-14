// import Identify from '../Helper/Identify';

import Identify from "../Helper/Identify";

const primary_color = Identify.getDataFromStoreage(Identify.LOCAL_STOREAGE,'primary_color');
export const configColor = {
    primary_color : primary_color ? primary_color :'#367fa9'
};
export const colorTranparent = {
    a100: "FF",
    a95: "F2",
    a90: "E6",
    a85: "D9",
    a80: "CC",
    a75: "BF",
    a70: "B3",
    a65: "A6",
    a60: "99",
    a55: "8C",
    a50: "80",
    a45: "73",
    a40: "66",
    a35: "59",
    a30: "4D",
    a25: "40",
    a20: "33",
    a15: "26",
    a10: "1A",
    a5: "0D",
    a0: "00"
};
