
function FixedNumber(num, digits) {
    let ori_str = num + '';
    if (ori_str.length < digits) {
        return String(Math.pow(10, digits - ori_str.length)).split("1")[1] + ori_str;
    }
    else {
        return ori_str;
    }
}
for (let i = 0; i < 900; i++) {
    // console.log(FixedNumber(i, 3));

    console.log(String.fromCodePoint(`0x1f${FixedNumber(i, 3)}`));
}