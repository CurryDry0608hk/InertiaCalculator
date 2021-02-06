'use strict';

var result = document.getElementById('resultArea');

function removeAllChildren(element) {
    while (element.firstChild) {
      // 子どもの要素があるかぎり削除
        element.removeChild(element.firstChild);
    }
}

function calculateButtonClicked() {
    removeAllChildren(result);

    const resultHeader = document.createElement('h2');
    resultHeader.innerText = '↓計算結果↓';
    resultHeader.style="text-align: center";
    result.appendChild(resultHeader);

    //情報取得
    var BPM = document.getElementById('BPM').value;
    var distanceNumer = document.getElementById('distanceNumer').value;
    var distanceDenom = document.getElementById('distanceDenom').value;
    var timeNumer = document.getElementById('timeNumer').value;
    var timeDenom = document.getElementById('timeDenom').value;
    var plusOrMinus = document.getElementById('plusOrMinus').value;
    var upOrDown = document.getElementById('upOrDown').value;
    var NumberOfSpeedChanges = document.getElementById('NumberOfSpeedChanges').value;
    var BPMFloorDigit = document.getElementById('BPMFloorDigit').value;

    //警告メッセージ
    if (BPM < 0) {
        alert('BPM値を負の数にすることは出来ません！\n移動方向をマイナスにしたい場合は、正負の部分を変更してください。')
        removeAllChildren(result);
        return;
    }
    if (distanceNumer < 0 || distanceDenom < 0) {
        alert('移動距離を負の数にすることは出来ません！\n移動方向をマイナスにしたい場合は、正負の部分を変更してください。')
        removeAllChildren(result);
        return;
    }
    if (timeNumer < 0 || timeDenom < 0) {
        alert('移動時間を負の数にすることは出来ません！\n移動方向をマイナスにしたい場合は、正負の部分を変更してください。')
        removeAllChildren(result);
        return;
    }



    if (NumberOfSpeedChanges === '4Times') {
        
        //4段階

        //BPM
        var BPM4Times1 = BPM * (1 / 4) * ((distanceNumer / distanceDenom) * (16 / 15)) * (timeDenom / timeNumer);
        var BPM4Times2 = BPM * (2 / 4) * ((distanceNumer / distanceDenom) * (16 / 15)) * (timeDenom / timeNumer);
        var BPM4Times3 = BPM * (4 / 4) * ((distanceNumer / distanceDenom) * (16 / 15)) * (timeDenom / timeNumer);
        var BPM4Times4 = BPM * (8 / 4) * ((distanceNumer / distanceDenom) * (16 / 15)) * (timeDenom / timeNumer);

        //BPM切り捨て
        var BPM4Times1 = Math.floor( BPM4Times1 * Math.pow( 10, BPMFloorDigit ) ) / Math.pow( 10, BPMFloorDigit );
        var BPM4Times2 = Math.floor( BPM4Times2 * Math.pow( 10, BPMFloorDigit ) ) / Math.pow( 10, BPMFloorDigit );
        var BPM4Times3 = Math.floor( BPM4Times3 * Math.pow( 10, BPMFloorDigit ) ) / Math.pow( 10, BPMFloorDigit );
        var BPM4Times4 = Math.floor( BPM4Times4 * Math.pow( 10, BPMFloorDigit ) ) / Math.pow( 10, BPMFloorDigit );

        if (upOrDown === 'up') {
            
            //加速
            if (plusOrMinus === 'plus') {
                
                //正
                const resultBody = document.createElement('p');
                resultBody.innerText = 
                    '#BPMCHANGE ' + BPM4Times1 + '\n' +
                    '#MEASURE ' + distanceNumer + '/' + distanceDenom + '\n' +
                    '0\n' +
                    '#BPMCHANGE ' + BPM4Times2 + '\n' +
                    '00\n' +
                    '#BPMCHANGE ' + BPM4Times3 + '\n' +
                    '0000\n' +
                    '#BPMCHANGE ' + BPM4Times4 + '\n' +
                    '00000000,'
                result.appendChild(resultBody);

            }   else if (plusOrMinus === 'minus') {

                //負
                const resultBody = document.createElement('p');
                resultBody.innerText = 
                    '#BPMCHANGE -' + BPM4Times1 + '\n' +
                    '#MEASURE -' + distanceNumer + '/' + distanceDenom + '\n' +
                    '0\n' +
                    '#BPMCHANGE -' + BPM4Times2 + '\n' +
                    '00\n' +
                    '#BPMCHANGE -' + BPM4Times3 + '\n' +
                    '0000\n' +
                    '#BPMCHANGE -' + BPM4Times4 + '\n' +
                    '00000000,'
                result.appendChild(resultBody);

            }

        }   else if (upOrDown === 'down') {

            //減速
            if (plusOrMinus === 'plus') {
                
                //正
                const resultBody = document.createElement('p');
                resultBody.innerText = 
                    '#BPMCHANGE ' + BPM4Times4 + '\n' +
                    '#MEASURE ' + distanceNumer + '/' + distanceDenom + '\n' +
                    '00000000\n' +
                    '#BPMCHANGE ' + BPM4Times3 + '\n' +
                    '0000\n' +
                    '#BPMCHANGE ' + BPM4Times2 + '\n' +
                    '00\n' +
                    '#BPMCHANGE ' + BPM4Times1 + '\n' +
                    '0,'
                result.appendChild(resultBody);

            }   else {

                //負
                const resultBody = document.createElement('p');
                resultBody.innerText = 
                    '#BPMCHANGE -' + BPM4Times4 + '\n' +
                    '#MEASURE -' + distanceNumer + '/' + distanceDenom + '\n' +
                    '00000000\n' +
                    '#BPMCHANGE -' + BPM4Times3 + '\n' +
                    '0000\n' +
                    '#BPMCHANGE -' + BPM4Times2 + '\n' +
                    '00\n' +
                    '#BPMCHANGE -' + BPM4Times1 + '\n' +
                    '0,'
                result.appendChild(resultBody);

            }

        }

    }   else if (NumberOfSpeedChanges === '8Times') {

        //8段階

        //BPM
        var BPM8Times1 = BPM * (3 / 16) * ((distanceNumer / distanceDenom) * (128 / 105)) * (timeDenom / timeNumer);
        var BPM8Times2 = BPM * (4 / 16) * ((distanceNumer / distanceDenom) * (128 / 105)) * (timeDenom / timeNumer);
        var BPM8Times3 = BPM * (6 / 16) * ((distanceNumer / distanceDenom) * (128 / 105)) * (timeDenom / timeNumer);
        var BPM8Times4 = BPM * (8 / 16) * ((distanceNumer / distanceDenom) * (128 / 105)) * (timeDenom / timeNumer);
        var BPM8Times5 = BPM * (12 / 16) * ((distanceNumer / distanceDenom) * (128 / 105)) * (timeDenom / timeNumer);
        var BPM8Times6 = BPM * (16 / 16) * ((distanceNumer / distanceDenom) * (128 / 105)) * (timeDenom / timeNumer);
        var BPM8Times7 = BPM * (24 / 16) * ((distanceNumer / distanceDenom) * (128 / 105)) * (timeDenom / timeNumer);
        var BPM8Times8 = BPM * (32 / 16) * ((distanceNumer / distanceDenom) * (128 / 105)) * (timeDenom / timeNumer);

        //BPM切り捨て
        var BPM8Times1 = Math.floor( BPM8Times1 * Math.pow( 10, BPMFloorDigit ) ) / Math.pow( 10, BPMFloorDigit );
        var BPM8Times2 = Math.floor( BPM8Times2 * Math.pow( 10, BPMFloorDigit ) ) / Math.pow( 10, BPMFloorDigit );
        var BPM8Times3 = Math.floor( BPM8Times3 * Math.pow( 10, BPMFloorDigit ) ) / Math.pow( 10, BPMFloorDigit );
        var BPM8Times4 = Math.floor( BPM8Times4 * Math.pow( 10, BPMFloorDigit ) ) / Math.pow( 10, BPMFloorDigit );
        var BPM8Times5 = Math.floor( BPM8Times5 * Math.pow( 10, BPMFloorDigit ) ) / Math.pow( 10, BPMFloorDigit );
        var BPM8Times6 = Math.floor( BPM8Times6 * Math.pow( 10, BPMFloorDigit ) ) / Math.pow( 10, BPMFloorDigit );
        var BPM8Times7 = Math.floor( BPM8Times7 * Math.pow( 10, BPMFloorDigit ) ) / Math.pow( 10, BPMFloorDigit );
        var BPM8Times8 = Math.floor( BPM8Times8 * Math.pow( 10, BPMFloorDigit ) ) / Math.pow( 10, BPMFloorDigit );

        if (upOrDown === 'up') {

            //加速
            if (plusOrMinus === 'plus') {

                //正
                const resultBody = document.createElement('p');
                resultBody.innerText = 
                    '#BPMCHANGE ' + BPM8Times1 + '\n' +
                    '#MEASURE ' + distanceNumer + '/' + distanceDenom + '\n' +
                    '000\n' +
                    '#BPMCHANGE ' + BPM8Times2 + '\n' +
                    '0000\n' +
                    '#BPMCHANGE ' + BPM8Times3 + '\n' +
                    '000000\n' +
                    '#BPMCHANGE ' + BPM8Times4 + '\n' +
                    '00000000\n' +
                    '#BPMCHANGE ' + BPM8Times5 + '\n' +
                    '000000000000\n' +
                    '#BPMCHANGE ' + BPM8Times6 + '\n' +
                    '0000000000000000\n' +
                    '#BPMCHANGE ' + BPM8Times7 + '\n' +
                    '000000000000000000000000\n' +
                    '#BPMCHANGE ' + BPM8Times8 + '\n' +
                    '00000000000000000000000000000000,'
                result.appendChild(resultBody);

            }   else if (plusOrMinus === 'minus') {

                //負
                const resultBody = document.createElement('p');
                resultBody.innerText = 
                    '#BPMCHANGE -' + BPM8Times1 + '\n' +
                    '#MEASURE -' + distanceNumer + '/' + distanceDenom + '\n' +
                    '000\n' +
                    '#BPMCHANGE -' + BPM8Times2 + '\n' +
                    '0000\n' +
                    '#BPMCHANGE -' + BPM8Times3 + '\n' +
                    '000000\n' +
                    '#BPMCHANGE -' + BPM8Times4 + '\n' +
                    '00000000\n' +
                    '#BPMCHANGE -' + BPM8Times5 + '\n' +
                    '000000000000\n' +
                    '#BPMCHANGE -' + BPM8Times6 + '\n' +
                    '0000000000000000\n' +
                    '#BPMCHANGE -' + BPM8Times7 + '\n' +
                    '000000000000000000000000\n' +
                    '#BPMCHANGE -' + BPM8Times8 + '\n' +
                    '00000000000000000000000000000000,'
                result.appendChild(resultBody);

            }

        }   else if (upOrDown === 'down') {

            //減速
            if (plusOrMinus === 'plus') {

                //正
                const resultBody = document.createElement('p');
                resultBody.innerText = 
                    '#BPMCHANGE ' + BPM8Times8 + '\n' +
                    '#MEASURE ' + distanceNumer + '/' + distanceDenom + '\n' +
                    '00000000000000000000000000000000\n' +
                    '#BPMCHANGE ' + BPM8Times7 + '\n' +
                    '000000000000000000000000\n' +
                    '#BPMCHANGE ' + BPM8Times6 + '\n' +
                    '0000000000000000\n' +
                    '#BPMCHANGE ' + BPM8Times5 + '\n' +
                    '000000000000\n' +
                    '#BPMCHANGE ' + BPM8Times4 + '\n' +
                    '00000000\n' +
                    '#BPMCHANGE ' + BPM8Times3 + '\n' +
                    '000000\n' +
                    '#BPMCHANGE ' + BPM8Times2 + '\n' +
                    '0000\n' +
                    '#BPMCHANGE ' + BPM8Times1 + '\n' +
                    '000,'
                result.appendChild(resultBody);

            }   else if (plusOrMinus === 'minus') {

                //負
                const resultBody = document.createElement('p');
                resultBody.innerText = 
                    '#BPMCHANGE -' + BPM8Times8 + '\n' +
                    '#MEASURE -' + distanceNumer + '/' + distanceDenom + '\n' +
                    '00000000000000000000000000000000\n' +
                    '#BPMCHANGE -' + BPM8Times7 + '\n' +
                    '000000000000000000000000\n' +
                    '#BPMCHANGE -' + BPM8Times6 + '\n' +
                    '0000000000000000\n' +
                    '#BPMCHANGE -' + BPM8Times5 + '\n' +
                    '000000000000\n' +
                    '#BPMCHANGE -' + BPM8Times4 + '\n' +
                    '00000000\n' +
                    '#BPMCHANGE -' + BPM8Times3 + '\n' +
                    '000000\n' +
                    '#BPMCHANGE -' + BPM8Times2 + '\n' +
                    '0000\n' +
                    '#BPMCHANGE -' + BPM8Times1 + '\n' +
                    '000,'
                result.appendChild(resultBody);

            }

        }

    }

    //DELAY
    var resultDelay1 = document.createElement('h4');
    resultDelay1.innerText = 
            'BPMCHANGEによるタイミングのズレ(秒)\n' + 
            '※あくまで参考程度でお願いします。';
    resultDelay1.style="text-align: center";
    result.appendChild(resultDelay1);
           
    //4段階
    if (NumberOfSpeedChanges === '4Times') {
        var SecondsParBPMCHANGE = ((240 / BPM) * (timeNumer / (timeDenom * 4)));
        var resultDelay2 = (SecondsParBPMCHANGE - (Math.floor( SecondsParBPMCHANGE * Math.pow( 10, 3 ) ) / Math.pow( 10, 3 ))) * 4;
        var resultDelay2 = Math.round( resultDelay2 * Math.pow( 10, 10 ) ) / Math.pow( 10, 10 );
        var resultDelay3 = document.createElement('p');
        resultDelay3.innerText = resultDelay2;
        resultDelay3.style="text-align: center";
        result.appendChild(resultDelay3);
    
    //8段階
    }   else if (NumberOfSpeedChanges === '8Times') {
        var SecondsParBPMCHANGE = ((240 / BPM) * (timeNumer / (timeDenom * 8)));
        var resultDelay2 = (SecondsParBPMCHANGE - (Math.floor( SecondsParBPMCHANGE * Math.pow( 10, 3 ) ) / Math.pow( 10, 3 ))) * 8;
        var resultDelay2 = Math.round( resultDelay2 * Math.pow( 10, 10 ) ) / Math.pow( 10, 10 );
        var resultDelay3 = document.createElement('p');
        resultDelay3.innerText = resultDelay2;
        resultDelay3.style="text-align: center";
        result.appendChild(resultDelay3);

    }
    
}
