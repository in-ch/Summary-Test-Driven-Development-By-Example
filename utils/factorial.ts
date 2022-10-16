export const factorial = (num:number):number=> {
    let total = 1;
    for(let i = num; i>0; i--){
        // console.log(`total : ${total}, i : ${i}`);
        total = total * i;
    }
    return total;
}
