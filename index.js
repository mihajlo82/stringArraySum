let validCharacters = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-'];

//main sum function
const sum = (array) => {
    //empty array check
    if(array.length === 0 || array.length === 1 && array[0] === '') return 0;

    //check is parameter an array
    if(!checkIsArray(array)) return 0;

    //multi arr param error
    if(isMultiDimensionalArr(array)==='err') return 0;
    
    //default array dimension length
    let arrayDimensionLength = 1;


    //check is array multidemnsional
    let isMultiDimensional = isMultiDimensionalArr(array);    
 
    //check length of dimensions if it is more than 1 dimension
    if(isMultiDimensional){
        arrayDimensionLength = array.length;
    }

    //if array is single dimensional
    if(!isMultiDimensional){
        let totalSum = calculateSingleDimensionalArray(array);
        return totalSum;
    }else{
        let totalSum = calculateMultiDimensionalArray(array);
        return totalSum;
    }
}

//check is array multidimensional 
const isMultiDimensionalArr = array => {
    try{
        if(array[0].constructor === Array){
            return true;
        }else{
            return false;
        }
    }catch(Exception){
        return 'err';
    }
}


//is parameter instance of array
const checkIsArray = array => {
    if(array instanceof Array){
        return true;
    }else{
        return false;
    }
}


//main method for single dimensional array calculations
const calculateSingleDimensionalArray = array => {

    //extracting positions and how much to take 
    let takesArr = [];
    let positionsInArr = [];
    for(let i = 0; i < array.length; i++){

        let subArr = array[i];
        let takeCount=0;
        let takeInner = [];
        let innerPositions = [];
        for(let k = 0; k < subArr.length; k++){

            //if single elem is number character
            if(validCharacters.includes(subArr[k])){
                if(takeCount == 0){
                    innerPositions.push(k);
                }
                takeCount++;
                if(k == subArr.length -1){
                    takeInner.push(takeCount);
                }
            }else{
                if(takeCount !== 0){
                    if(takeCount == 0){
                        innerPositions.push(k);
                    }
                    takeInner.push(takeCount);
                }
                takeCount = 0;
            }  
        }
        positionsInArr.push(innerPositions);
        takesArr.push(takeInner);     
    }

    //extracting numbers based on positions above
    let extractedNumbers = [];
    for(let i = 0; i < array.length; i++){
        let numbersInRow = takesArr[i].length;
        let startPositions = positionsInArr[i];
        let takeCount = takesArr[i];


        //check if single number is in the row or more than one
        if(numbersInRow <= 1){
            let word = array[i];
            let extractedWord = word.substr(startPositions, takeCount);
            extractedNumbers.push(extractedWord)      
        }else{
            for(let m = 0; m < numbersInRow; m++){
              let word = array[i];
              let extractedWord = word.substr(startPositions[m], takeCount[m]);
              extractedNumbers.push(extractedWord);
            }
        }
    }

    
    //minus resovle
    let allPositiveAndNegativeNums = [];
    extractedNumbers.forEach(item => {
        
       //if consists negative sign
       if(item.includes('-')){
           //counter how many minuses is in each string
           let minusCounter = 0;
         
           //split each string that consist at least one minus sign in variable
           let itemArr = item.split('');

           //splitting by minus sign each string array 
           let splArr = item.split('-');

            //length of spltlted array itemArr variable
           let charLength = itemArr.length;

           //if length of splitted array is more than 1 filtering by -
           if(charLength > 1){
                itemArr.forEach(el => {
                    if(el === '-'){
                        minusCounter++;
                    }
                })

                //if first character is minus ant there is just one minus
                if(charLength > 1 && minusCounter === 1 && itemArr[0] === '-'){
                        allPositiveAndNegativeNums.push(item);
                }
                
                //cutting end minus if just one placed at the end 
                if(itemArr[charLength-1] === '-' && minusCounter === 1){
                    let newItemMin = 0;
                    newItemMin = item.slice(0,charLength-1);
                    allPositiveAndNegativeNums.push(newItemMin);
                }

                // 1 minus && legth > 2 && not start with minus first char
                if(minusCounter === 1 && charLength > 2 && itemArr[0] !== '-'){
                    let joindEls = splArr.join(',')
                    let joindEls2 = joindEls.split(',');

                    joindEls2.forEach((jin, index)=> {
                        if(index === 0){
                            allPositiveAndNegativeNums.push(jin);
                        }else{
                            allPositiveAndNegativeNums.push(`-${jin}`);

                        }
                    })
                }

                //more than one negative sign in arr
                if(minusCounter > 1){

                    let joindEls = splArr.join(',')
                    let joindEls2 = joindEls.split(',')

                    joindEls2.forEach( (jitem, index) => {
                        if(item !== '' || item !== undefined || item !== null){
                            
                            if(index===0){
                                if(item[0] === '-'){
                                   allPositiveAndNegativeNums.push(`-${jitem}`);
                                }else{
                                    allPositiveAndNegativeNums.push(`${jitem}`);
                                }
                            }else{
                                allPositiveAndNegativeNums.push(`-${jitem}`);
                            }

                        }
                    })
                }
            }else{

                //just one negative character
                allPositiveAndNegativeNums.push(0);
            }

       }else{
           //item doesnt have negative sign
           allPositiveAndNegativeNums.push(item);
       }
    })

    //cleaning minuses from arr
    let convertedAllNumbers = [];
    allPositiveAndNegativeNums.map( num => {
        if(num !== '-' ){
            convertedAllNumbers.push(parseInt(num));
        }
    });

     //resolve nans
    let finallArrWithNums = [];
    convertedAllNumbers.forEach(x=>{
         if(isNaN(x) || x===undefined || x === '' || x===null){
             finallArrWithNums.push(0);
         }else{
            finallArrWithNums.push(x);
         }
    })

    let totalSum  = finallArrWithNums.reduce((a, b) => a + b, 0);
    return totalSum;
}

//main method for multidimensional array calculations
const calculateMultiDimensionalArray = array => {
    let intNums = [];
    let multidemnesionalLength = array.length;
    
    for(let i =0; i < multidemnesionalLength; i++) {
        let checkIsMultiArr = isMultiDimensionalArr(array[i]);

        //if is single miltiple array item is not jagged
        if(!checkIsMultiArr){
            let num = calculateSingleDimensionalArray(array[i]);
            intNums.push(num);
        }else{
            let checkLengthJagged = array[i].length;
            let jaggedArr = array[i];
            for(let j = 0; j < checkLengthJagged; j++){
                let no = calculateSingleDimensionalArray(jaggedArr[j]);
                intNums.push(no);
            }
        }
    }

    let totalSum  = intNums.reduce((a, b) => a + b, 0);
    return totalSum;
}

// test email examples
let testArray = sum(['1', 'five', '2wenty', 'thr33']);
let testArray2 = sum([['1X2', 't3n'],['1024', '5', '64']])
console.log('Sum is: ' + testArray);
