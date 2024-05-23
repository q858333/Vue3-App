

export const getTime = ()=> {
    let time = '';
    let hours = new Date().getHours();
    if(hours<=9) {
        time = '早上';
    } else if(hours <=13){
        time = '中午';
    } else if (hours <= 18) {
        time = '下午';
    } else {
        time = '晚上';
    }

    return time;
}