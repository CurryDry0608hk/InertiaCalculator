'use strict';

let result = document.getElementById('resultArea');

function removeAllChildren(element) {
    while (element.firstChild) {
      // 子どもの要素があるかぎり削除
        element.removeChild(element.firstChild);
    }
}

function calculateButtonClicked() {
    removeAllChildren(result);

    result.insertAdjacentHTML('afterbegin', '<h2 style="text-align: center">↓計算結果↓</h2>')

    //情報取得
    let BPM = document.getElementById('BPM').value;
    let distanceNumer = document.getElementById('distanceNumer').value;
    let distanceDenom = document.getElementById('distanceDenom').value;
    let distance = distanceNumer / distanceDenom;
    let timeNumer = document.getElementById('timeNumer').value;
    let timeDenom = document.getElementById('timeDenom').value;
    let time = timeNumer / timeDenom;
    let direction = document.getElementById('direction').value;
    let numOfDiv = document.getElementById('numOfDiv').value;
    let easeType = document.getElementById('easeType').value;
    let easeRangeStart = document.getElementById('easeRangeStart').value;
    let easeRangeFinal = document.getElementById('easeRangeFinal').value;
    let easeRangeDiff = easeRangeFinal - easeRangeStart;
    let BPMRoundDigit = document.getElementById('BPMRoundDigit').value;
    let MEASUREsDenom = document.getElementById('MEASUREsDenom').value;

    //イージング計算式ここから↓

    function easeCal(x) {

        //linear
        if (easeType === 'linear') {
            return x;
        }

        //easeInSine
        if (easeType === 'easeInSine') {
            return 1 - Math.cos((x * Math.PI) / 2);
        }

        //easeOutSine
        if (easeType === 'easeOutSine') {
            return Math.sin((x * Math.PI) / 2);
        }

        //easeInOutSine
        if (easeType === 'easeInOutSine') {
            return -(Math.cos(Math.PI * x) - 1) / 2;
        }

        //easeInQuad
        if (easeType === 'easeInQuad') {
            return x * x;
        }

        //easeOutQuad
        if (easeType === 'easeOutQuad') {
            return 1 - (1 - x) * (1 - x);
        }

        //easeInOutQuad
        if (easeType === 'easeInOutQuad') {
            return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
        }

        //easeInCubic
        if (easeType === 'easeInCubic') {
            return x * x * x;
        }

        //easeOutCubic
        if (easeType === 'easeOutCubic') {
            return 1 - Math.pow(1 - x, 3);
        }

        //easeInOutCubic
        if (easeType === 'easeInOutCubic') {
            return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
        }

        //easeInQuart
        if (easeType === 'easeInQuart') {
            return x * x * x * x;
        }

        //easeOutQuart
        if (easeType === 'easeOutQuart') {
            return 1 - Math.pow(1 - x, 4);
        }

        //easeInOutQuart
        if (easeType === 'easeInOutQuart') {
            return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
        }

        //easeInQuint
        if (easeType === 'easeInQuint') {
            return x * x * x * x * x;
        }

        //easeOutQuint
        if (easeType === 'easeOutQuint') {
            return 1 - Math.pow(1 - x, 5);
        }

        //easeInOutQuint
        if (easeType === 'easeInOutQuint') {
            return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
        }

        //easeInExpo
        if (easeType === 'easeInExpo') {
            return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
        }

        //easeOutExpo
        if (easeType === 'easeOutExpo') {
            return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
        }

        //easeInOutExpo
        if (easeType === 'easeInOutExpo') {
            return x === 0
              ? 0
              : x === 1
              ? 1
              : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
              : (2 - Math.pow(2, -20 * x + 10)) / 2;
        }

        //easeInCirc
        if (easeType === 'easeInCirc') {
            return 1 - Math.sqrt(1 - Math.pow(x, 2));
        }

        //easeOutCirc
        if (easeType === 'easeOutCirc') {
            return Math.sqrt(1 - Math.pow(x - 1, 2));
        }

        //easeInOutCirc
        if (easeType === 'easeInOutCirc') {
            return x < 0.5
                ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
                : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
        }

        //easeInBack
        if (easeType === 'easeInBack') {
            const c1 = 1.70158;
            const c3 = c1 + 1;

            return c3 * x * x * x - c1 * x * x;
        }

        //easeOutBack
        if (easeType === 'easeOutBack') {
            const c1 = 1.70158;
            const c3 = c1 + 1;

            return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
        }

        //easeInOutBack
        if (easeType === 'easeInOutBack') {
            const c1 = 1.70158;
            const c2 = c1 * 1.525;

            return x < 0.5
              ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
              : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
        }

        //easeInElastic
        if (easeType === 'easeInElastic') {
            const c4 = (2 * Math.PI) / 3;

            return x === 0
              ? 0
              : x === 1
              ? 1
              : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
        }

        //easeOutElastic
        if (easeType === 'easeOutElastic') {
            const c4 = (2 * Math.PI) / 3;

            return x === 0
              ? 0
              : x === 1
              ? 1
              : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
        }

        //easeInOutElastic
        if (easeType === 'easeInOutElastic') {
            const c5 = (2 * Math.PI) / 4.5;

            return x === 0
              ? 0
              : x === 1
              ? 1
              : x < 0.5
              ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
              : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
        }

        //easeInBounce
        if (easeType === 'easeInBounce') {
            function easeOutBounce(x) {
                const n1 = 7.5625;
                const d1 = 2.75;
                
                if (x < 1 / d1) {
                    return n1 * x * x;
                } else if (x < 2 / d1) {
                    return n1 * (x -= 1.5 / d1) * x + 0.75;
                } else if (x < 2.5 / d1) {
                    return n1 * (x -= 2.25 / d1) * x + 0.9375;
                } else {
                    return n1 * (x -= 2.625 / d1) * x + 0.984375;
                }
            }
            return 1 - easeOutBounce(1 - x);
        }

        //easeOutBounce
        if (easeType === 'easeOutBounce') {
            const n1 = 7.5625;
            const d1 = 2.75;

            if (x < 1 / d1) {
                return n1 * x * x;
            } else if (x < 2 / d1) {
                return n1 * (x -= 1.5 / d1) * x + 0.75;
            } else if (x < 2.5 / d1) {
                return n1 * (x -= 2.25 / d1) * x + 0.9375;
            } else {
                return n1 * (x -= 2.625 / d1) * x + 0.984375;
            }
        }

        //easeInOutBounce
        if (easeType === 'easeInOutBounce') {
            function easeOutBounce(x) {
                const n1 = 7.5625;
                const d1 = 2.75;
                
                if (x < 1 / d1) {
                    return n1 * x * x;
                } else if (x < 2 / d1) {
                    return n1 * (x -= 1.5 / d1) * x + 0.75;
                } else if (x < 2.5 / d1) {
                    return n1 * (x -= 2.25 / d1) * x + 0.9375;
                } else {
                    return n1 * (x -= 2.625 / d1) * x + 0.984375;
                }
            }
            return x < 0.5
              ? (1 - easeOutBounce(1 - 2 * x)) / 2
              : (1 + easeOutBounce(2 * x - 1)) / 2;
        }
    
    }

    //イージング計算式ここまで↑

    //警告メッセージ
    if (BPM < 0) {
        alert('BPM値を負の数にすることは出来ません')
        removeAllChildren(result);
        return;
    }
    if (distanceNumer < 0 || distanceDenom < 0) {
        alert('移動距離を負の数にすることは出来ません')
        removeAllChildren(result);
        return;
    }
    if (timeNumer < 0 || timeDenom < 0) {
        alert('移動時間を負の数にすることは出来ません')
        removeAllChildren(result);
        return;
    }

    result.insertAdjacentHTML('beforeend', '<p style="text-align: center" title="私の個人的な感覚なので正確の情報ではないですが、大体分子が4桁になりだすとバグりだす可能性が高そうです。">※太鼓さん次郎にはMEASURE値の分母と分子の桁が大きくなると小節の長さがおかしくなるバグがあるので注意してください。</p>')
    result.insertAdjacentHTML('beforeend', '<p style="text-align: center">※また、MEASURE値を四捨五入で算出しているので実際の移動距離にズレがある可能性が高いです。</p>')


    
    //計算結果本文出力

    let easeBPMCriteria = BPM * distance * (timeDenom / timeNumer);
    let lengthOfABar = distance / numOfDiv;
    let easeValueCriteria = (easeCal(easeRangeFinal) - easeCal(easeRangeStart)) / numOfDiv;
    if (direction === 'left') {
        direction = 1;
    }   else if (direction === 'right') {
        direction = -1;
    }
    let totalSeconds = 0;
    let totalSecondsJiro = 0;

    for (let i = 1; i <=numOfDiv; i++) {
        let lastEaseTime = Number(easeRangeStart) + (easeRangeDiff * ((i - 1) / numOfDiv));
        let lastEaseValue = easeCal(lastEaseTime);
        let easeTime = Number(easeRangeStart) + (easeRangeDiff * (i / numOfDiv));
        let easeValue = easeCal(easeTime);
        let easeDisplacement = easeValue - lastEaseValue;
        let easeMagnification = easeDisplacement / easeValueCriteria;
        result.insertAdjacentHTML('beforeend', '#BPMCHANGE ' + ((Math.round((easeBPMCriteria * easeMagnification) * Math.pow(10, BPMRoundDigit)) / Math.pow(10, BPMRoundDigit)) * direction) + '<br>#MEASURE ' + (Math.round(lengthOfABar * easeMagnification * MEASUREsDenom) * direction) + '/' + MEASUREsDenom + '<br>0,<br>');
        let seconds = 240 / Math.abs(Math.round((easeBPMCriteria * easeMagnification) * Math.pow(10, BPMRoundDigit)) / Math.pow(10, BPMRoundDigit)) * (Math.abs(Math.round(lengthOfABar * easeMagnification * MEASUREsDenom)) / MEASUREsDenom);
        totalSeconds = totalSeconds + seconds;
        totalSecondsJiro = totalSecondsJiro + (Math.floor( seconds * Math.pow( 10, 3 ) ) / Math.pow( 10, 3 ));
        //console.log(totalSeconds);
        //console.log(totalSecondsJiro);
    }

    //DELAY
    let realSeconds = (240 / BPM) * time;

    //次郎の場合
    result.insertAdjacentHTML('beforeend', '<h4 style="text-align: center" title="太鼓さん次郎の場合の数値です">BPMCHANGEによるタイミングのズレ(秒)<br>※あくまで参考程度でお願いします。</h4>')
    let totalDelayJiro = realSeconds - totalSecondsJiro;
    totalDelayJiro = Math.round( totalDelayJiro * Math.pow( 10, 10 ) ) / Math.pow( 10, 10 );
    result.insertAdjacentHTML('beforeend', '<p style="text-align: center">' + totalDelayJiro + '</p>');

    //次郎以外の場合
    result.insertAdjacentHTML('beforeend', '<h4 style="text-align: center">MEASURE値の四捨五入によるタイミングのズレ(秒)<br>※太鼓さん次郎以外のシミュの場合です。</h4>')
    let totalDelay = realSeconds - totalSeconds;
    totalDelay = Math.round( totalDelay * Math.pow( 10, 10 ) ) / Math.pow( 10, 10 );
    result.insertAdjacentHTML('beforeend', '<p style="text-align: center">' + totalDelay + '</p>');

}
