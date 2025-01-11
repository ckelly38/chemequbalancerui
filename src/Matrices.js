import commonclass from "./commonclass";

class Matrices
{
    static getCurrentLevelArrayLengths(arr)
    {
        let cc = new commonclass();
        if (cc.isLetEmptyNullOrUndefined(arr)) return null;
        else
        {
            let arrlens = null;
            arr.forEach((val) => {
                if (cc.isLetUndefinedOrNull(val));
                else
                {
                    if (val instanceof Array)
                    {
                        if (cc.isLetUndefinedOrNull(arrlens)) arrlens = [];
                        //else;//do nothing
                        arrlens.push(val.length);
                    }
                    //else;//do nothing
                }
            });
            //console.log("arrlens = ", arrlens);

            return arrlens;
        }
    }

    static areCurrentArrayLengthsTheSame(arr)
    {
        let cc = new commonclass();
        let clvldims = this.getCurrentLevelArrayLengths(arr);
        if (cc.isLetEmptyNullOrUndefined(clvldims)) return true;
        else
        {
            let mdim = -1;
            let aremdimsthesame = true;
            for (let n = 0; n < clvldims.length; n++)
            {
                if (n === 0) mdim = clvldims[n];
                else
                {
                    if (clvldims[n] === mdim);
                    else return false;
                }
            }
            return aremdimsthesame;
        }
    }

    static dimensions(m)
    {
        //let m = [[[], [], []],[[], [], []],[[], [], []]];
        //m.length = a; m[0].length = b, m[0][0].length = c
        //the dimensions we want are [a, b, c];
        //if all dimensions at the current level are the same we add one,
        //then we check to see if it is an array present
        //otherwise return null;
        
        let cc = new commonclass();
        if (cc.isLetEmptyNullOrUndefined(m)) return null;
        else
        {
            if (m instanceof Array)
            {
                let mydims = [m.length];
                //console.log("INIT m = ", m);
                //console.log("INIT mydims = ", mydims);

                if (this.areCurrentArrayLengthsTheSame(m))
                {
                    if (cc.isLetUndefinedOrNull(m[0]));
                    else
                    {
                        if (m[0] instanceof Array)
                        {
                            mydims.push(m[0].length);
                            let myodims = this.dimensions(m[0]);
                            //console.log("OLD mydims = ", mydims);
                            //console.log("myodims = ", myodims);
                            
                            if (cc.isLetEmptyNullOrUndefined(myodims));
                            else
                            {
                                myodims.forEach((val, mindx) => {
                                    if (mindx < 1);
                                    else mydims.push(val);
                                });
                            }
                            //console.log("NEW mydims = ", mydims);
                        }
                        //else;//do nothing
                    }
                }
                //else;//do nothing
                //console.log("ORIG m = ", m);
                //console.log("FINAL mydims = ", mydims);
                return mydims;
            }
            else return null;
        }
    }

    static transpose(m, usenums=false, useobjsforlessthanthree=false)
    {
        //flip along dimensions....
        let cc = new commonclass();
        cc.letMustBeBoolean(useobjsforlessthanthree, "useobjsforlessthanthree");
        cc.letMustBeBoolean(usenums, "usenums");
        if (cc.isLetEmptyNullOrUndefined(m)) return null;
        else
        {
            //take this
            //[1, 2]    [1, 3, 5]    [1, 2, 3]    [1, 4, 7]
            //[3, 4] -> [2, 4, 6] or [4, 5, 6] -> [2, 5, 8]
            //[5, 6]                 [7, 8, 9]    [3, 6, 9]
            //max r is 3; max c is 2; 
            //for the square m[r][c] = m[c][r]
            let dims = this.dimensions(m);
            //console.log("dims = ", dims);

            let nwm = null;
            let finuseobjinit = (useobjsforlessthanthree || !(dims.length < 3));
            if (dims.length < 2)
            {
                if (dims[0] === 1) return m;
                else nwm = m.map((val) => [val]);//this is a 1D array like [1, 2, 3]
            }
            else
            {
                if (dims[0] === dims[1])
                {
                    //square matrix
                    if (finuseobjinit) nwm = m.map((cval) => cval.map((val) => null));
                    else nwm = m.map((cval) => cval.map((val) => (usenums ? 0 : "0")));
                    for (let r = 0; r < m.length; r++)
                    {
                        for (let c = 0; c < m[r].length; c++) nwm[r][c] = m[c][r];
                    }
                }
                else
                {
                    //non-square matrix
                    if (finuseobjinit) nwm = m[0].map((cval) => m.map((val) => null));
                    else nwm = m[0].map((cval) => m.map((val) => (usenums ? 0 : "0")));
                    for (let r = 0; r < m.length; r++)
                    {
                        for (let c = 0; c < m[r].length; c++) nwm[c][r] = m[r][c];
                    }
                }
            }
            return nwm;
        }
    }
    static transposeNumsOrFractions(m, usenums, useobjsforlessthanthree=false)
    {
        return this.transpose(m, usenums, useobjsforlessthanthree);
    }
    static transposeNums(m, useobjsforlessthanthree=false)
    {
        return this.transposeNumsOrFractions(m, true, useobjsforlessthanthree);
    }
    static transposeFractions(m, useobjsforlessthanthree=false)
    {
        return this.transposeNumsOrFractions(m, false, useobjsforlessthanthree);
    }
    static testTranspose()
    {
        let usenums = true;
        let mysqr = [];
        let cntr = 1;
        for (let n = 0; n < 3; n++)
        {
            let mytemparr = [];
            for (let k = 0; k < 3; k++)
            {
                mytemparr.push(cntr);
                cntr++;
            }
            mysqr.push(mytemparr);
        }
        console.log("mysqr = ", mysqr);
        console.log(this.dimensions(mysqr));
        console.log(this.transposeNumsOrFractions(mysqr, usenums));
        console.log(this.identity([3, 3]));
        console.log(this.determinant(mysqr, usenums));//0

        let myom = [[1, 2], [3, 4], [5, 6]];
        console.log("myom = ", myom);
        console.log(this.dimensions(myom));
        console.log(this.identity([3, 2]));
        console.log(this.determinant(myom, usenums));//0
        
        let mytmyom = this.transpose(myom);
        console.log("mytmyom = ", mytmyom);
        console.log(this.dimensions(mytmyom));
        console.log(this.transposeNumsOrFractions(mytmyom, usenums));
        console.log(this.determinant(myom, usenums));//0

        let mynbytm = [1, 2, 3];
        console.log("mynbytm = ", mynbytm);
        console.log(this.dimensions(mynbytm));
        console.log(this.determinant(mynbytm, usenums));//0

        let mytnbytm = this.transposeNumsOrFractions(mynbytm, usenums);
        console.log("mytnbytm = ", mytnbytm);
        console.log(this.dimensions(mytnbytm));
        console.log(this.determinant(mytnbytm, usenums));//0
        console.log(this.transposeNumsOrFractions(mytnbytm, usenums));
        console.log("ABOVE SHOULD BE THE SAME AS: mynbytm = ", mynbytm);

        let mydummynum = [1];
        console.log(this.transposeNumsOrFractions(mydummynum, usenums));//[1]
        console.log(this.dimensions(mydummynum));//[1]
        console.log(this.determinant(mydummynum, usenums));//1

        let dimsstrmtst = [["1", "2"], ["3", "4"], ["5", "6"]];
        console.log("dimsstrmtst = ", dimsstrmtst);
        console.log(this.dimensions(dimsstrmtst));

        //this.testIdentity();
        //throw new Error("NEED TO CHECK THE RESULTS NOW!");
    }

    static identity(dimsarr)
    {
        let cc = new commonclass();
        if (cc.isLetEmptyNullOrUndefined(dimsarr)) return null;
        else
        {
            let mymxdim = -1;
            if (dimsarr.length === 1) mymxdim = dimsarr[0];
            else
            {
                if (dimsarr[1] < dimsarr[0]) mymxdim = dimsarr[0];
                else mymxdim = dimsarr[1];
            }
            if (mymxdim < 1) throw new Error("the dimensions cannot be zero!");
            //else;//do nothing

            if (dimsarr.length < 3)
            {
                //this is easy
                //we will return the max since identity matrix must always be square
                if (dimsarr.length === 1 || mymxdim === 1) return [1];
                else
                {
                    let mynwarr = [];
                    for (let n = 0; n < mymxdim; n++)
                    {
                        let mytemparr = [];
                        for (let k = 0; k < mymxdim; k++) mytemparr.push(((n === k) ? 1 : 0));
                        mynwarr.push(mytemparr);
                    }
                    return mynwarr;
                }
            }
            else
            {
                //this is difficult
                //for 3 plus use empty array for 1 and null for 0
                if (mymxdim === 1) return [[]];
                else
                {
                    let mynwarr = [];
                    for (let n = 0; n < mymxdim; n++)
                    {
                        let mytemparr = [];
                        for (let k = 0; k < mymxdim; k++) mytemparr.push(((n === k) ? [] : null));
                        mynwarr.push(mytemparr);
                    }
                    return mynwarr;
                }
            }
        }
    }
    static testIdentity()
    {
        console.log(this.identity([2, 2]));
        console.log(this.identity([3, 3]));//[[1, 0, 0], [0, 1, 0], [0, 0, 1]]
        console.log(this.identity([2, 3]));//same as above
    }

    static getRowsOrCols(m, userows)
    {
        let cc = new commonclass();
        if (cc.isLetEmptyNullOrUndefined(m)) return null;
        //else;//do nothing
        //let myom = [[1, 2], [3, 4], [5, 6]];
        let dims = this.dimensions(m);
        if (userows || dims.length < 2) return m;
        else return m[0].map((val, cindx) => m.map((marr, rindx) => marr[cindx]));
    }

    static areTwoRowsOrColsTheSame(a, b, myrows)
    {
        if (a === b) return true;
        //else;//do nothing

        //console.log(myrows[a]);
        //console.log(myrows[b]);
        
        let isthisrowthesame = true;
        for (let c = 0; c < myrows[a].length; c++)
        {
            if (myrows[a][c] === myrows[b][c]);
            else
            {
                isthisrowthesame = false;
                break;
            }
        }
        //console.log("isthisrowthesame = " + isthisrowthesame);

        return isthisrowthesame;
    }

    static mul(a, b) { return ((a === 0 || b === 0) ? 0 : a * b); }
    //returns null if the fraction f is null otherwise returns a numerator, denominator in an array
    static getNumeratorAndDenominatorFromFraction(f)
    {
        let cc = new commonclass();
        if (cc.isLetEmptyNullOrUndefined(f)) return null;
        else
        {
            let mydelimi = f.indexOf("/");
            if (mydelimi < 0 || f.length - 1 < mydelimi) return [Number(f), 1];
            else
            {
                let mynumdenomarr = f.split("/").map((val) => Number(val));
                if (mynumdenomarr[0] === mynumdenomarr[1]) return [1, 1];
                if (mynumdenomarr[1] < 0)
                {
                    let oldnum = mynumdenomarr[0];
                    let mynwnum = mynumdenomarr[0] * (-1);
                    let mynwdenom = mynumdenomarr[1] * (-1);
                    if (mynwnum === mynwdenom) return [1, 1];
                    else if (oldnum === mynwdenom) return [-1, 1];
                    else return [mynwnum, mynwdenom];
                }
                else return mynumdenomarr;
            }
        }
    }
    static getNumerator(f) {
        let cc = new commonclass();
        let mynumdarr = this.getNumeratorAndDenominatorFromFraction(f);
        cc.letMustNotBeEmpty(mynumdarr, "mynumdarr");
        return mynumdarr[0];
    }
    static getDenominator(f) {
        let cc = new commonclass();
        let mynumdarr = this.getNumeratorAndDenominatorFromFraction(f);
        cc.letMustNotBeEmpty(mynumdarr, "mynumdarr");
        return mynumdarr[1];
    }
    static flipFraction(f)
    {
        let cc = new commonclass();
        let mynumdarr = this.getNumeratorAndDenominatorFromFraction(f);
        cc.letMustNotBeEmpty(mynumdarr, "mynumdarr");
        return "" + mynumdarr[1] + "/" + mynumdarr[0];
    }
    static convertFractionToDecimal(f)
    {
        let cc = new commonclass();
        let mynumdarr = this.getNumeratorAndDenominatorFromFraction(f);
        cc.letMustNotBeEmpty(mynumdarr, "mynumdarr");
        return mynumdarr[0] / mynumdarr[1];
    }
    static multiplyTwoFractions(a, b)
    {
        let cc = new commonclass();
        if (cc.isLetEmptyNullOrUndefined(a))
        {
            if (cc.isLetEmptyNullOrUndefined(b)) return null;
            else return b;
        }
        else
        {
            if (cc.isLetEmptyNullOrUndefined(b)) return a;
            else
            {
                let mynumda = this.getNumeratorAndDenominatorFromFraction(a);
                let mynumdb = this.getNumeratorAndDenominatorFromFraction(b);
                let mynwnumr = this.mul(mynumda[0], mynumdb[0]);
                let mynwdenom = this.mul(mynumda[1], mynumdb[1]);
                if (mynwdenom === 0) throw new Error("cannot divide by zero!");
                else if (mynwdenom === 1) return "" + mynwnumr;
                else if (mynwdenom === -1) return "" + this.mul(-1, mynwnumr);
                else if (mynwnumr === mynwdenom) return "1";
                else if (mynwnumr === (mynwdenom * (-1))) return "-1";
                else if (mynwdenom < 0) return "" + (mynwnumr * (-1)) + "/" + (mynwdenom * (-1));
                else return "" + mynwnumr + "/" + mynwdenom;
            }
        }
    }
    static addOrSubtractTwoFractions(a, b, useadd)
    {
        let cc = new commonclass();
        cc.letMustNotBeEmpty(a, "a");
        cc.letMustNotBeEmpty(b, "b");
        cc.letMustBeBoolean(useadd, "useadd");
        //we have two fractions
        //we cannot directly just add them first we need a common denominator
        //get the LCM of them
        //A/B +or- C/D get LCM of B AND D, this is the denominator in the final answer
        //then need the new numerators before we do the operation
        let mynumdenomarra = this.getNumeratorAndDenominatorFromFraction(a);
        let mynumdenomarrb = this.getNumeratorAndDenominatorFromFraction(b);
        let mylcm = this.lcm(mynumdenomarra[1], mynumdenomarrb[1]);
        if (mylcm === 0) throw new Error("cannot divide by zero!");
        else
        {
            let nwnuma = (mylcm / mynumdenomarra[1]) * mynumdenomarra[0];
            let nwnumb = (mylcm / mynumdenomarrb[1]) * mynumdenomarrb[0];
            let finnum = (useadd ? nwnuma + nwnumb : nwnuma - nwnumb);
            return ((mylcm === 1) ? "" + finnum : "" + finnum + "/" + mylcm);
        }
    }
    static addTwoFractions(a, b) { return this.addOrSubtractTwoFractions(a, b, true); }
    static subtractTwoFractions(a, b) { return this.addOrSubtractTwoFractions(a, b, false); }
    static powFractions(a, b)
    {
        let cc = new commonclass();
        cc.letMustNotBeEmpty(a, "a");
        cc.letMustNotBeEmpty(b, "b");
        //both are fractions
        //val is to the power of num
        //val is (a/b)^(c/d) = (a^same power)/(b^same power)
        //do that then return the result
        let mynumdenomarrval = this.getNumeratorAndDenominatorFromFraction(a);
        let mydecnum = this.convertFractionToDecimal(b);
        return "" + Math.pow(mynumdenomarrval[0], mydecnum) + "/" +
            Math.pow(mynumdenomarrval[1], mydecnum);
    }

    static getOPNumFromString(opstr)
    {
        //opnum = 1 =, 2 <, 3 <=, 4 >, 5 =>
        //opnum = 1 *, 2 /, 3 +, 4 -, 5 %, 6 ^
        let opnum = -1;
        if (opstr === "*" || opstr === "=") opnum = 1;
        else if (opstr === "/" || opstr === "<") opnum = 2;
        else if (opstr === "+" || opstr === "<=") opnum = 3;
        else if (opstr === "-" || opstr === ">") opnum = 4;
        else if (opstr === "%" || opstr === "=>") opnum = 5;
        else if (opstr === "^") opnum = 6;
        else throw new Error("illegal operation string found!");
        return opnum;
    }

    static doSomeOpOnValByNum(val, num, opnum, valusenums, numisnum)
    {
        let cc = new commonclass();
        cc.letMustBeBoolean(valusenums, "valusenums");
        cc.letMustBeBoolean(numisnum, "numisnum");
        //console.log("val = " + val);
        //console.log("num = " + num);
        //console.log("opnum = " + opnum);
        //console.log("valusenums = " + valusenums);
        //console.log("numisnum = " + numisnum);

        if (opnum === 1)
        {
            if (valusenums === numisnum)
            {
                if (numisnum)
                {
                    return this.mul(val, num);
                    //return (Math.round(this.mul(val, num) * 10000) / 10000);
                }
                else return this.multiplyTwoFractions(val, num);//both fractions call that
            }
            else
            {
                //one is a fraction, the other is not
                //convert the one to a fraction then multiply the two fractions
                let mytwofractsres = this.multiplyTwoFractions((valusenums ? "" + val : val),
                    (numisnum ? "" + num : num));
                return (valusenums ? this.convertFractionToDecimal(mytwofractsres) : mytwofractsres);
            }
        }
        else if (opnum === 2)
        {
            if (valusenums === numisnum)
            {
                if (numisnum)
                {
                    return (val / num);
                    //return (Math.round((val / num) * 10000) / 10000);
                }
                else
                {
                    //both are fractions...
                    //we want to multiply val by 1 over num
                    //to do this we actually want to flip num's numerator and denominators
                    return this.multiplyTwoFractions(val, this.flipFraction(num));
                }
            }
            else
            {
                //one is a fraction and the other is not...
                //convert the one to a fraction then multiply the two fractions
                let mynwfr = (numisnum ? "" + num : num);
                let mytwofractsres = this.multiplyTwoFractions((numisnum ? val : "" + val),
                    this.flipFraction(mynwfr));
                return (valusenums ? this.convertFractionToDecimal(mytwofractsres) :
                    mytwofractsres);
            }
        }
        else if (opnum === 3 || opnum === 4)
        {
            if (valusenums === numisnum)
            {
                if (numisnum) return ((opnum === 3) ? val + num : val - num);
                else return this.addOrSubtractTwoFractions(val, num, (opnum === 3));
            }
            else
            {
                //must convert the one that is not a fraction to a fraction before we can begin
                //then we repeat above
                let nwnum = (numisnum ? "" + num : num);
                let nwval = (valusenums ? "" + val : val);
                let mytwofractsres = this.addOrSubtractTwoFractions(nwval, nwnum, (opnum === 3));
                return (valusenums ? this.convertFractionToDecimal(mytwofractsres) :
                    mytwofractsres);
            }
        }
        else if (opnum === 5)
        {
            //modular division we need numbers not fractions
            //our end result will need to be converted back into whatever the matrix was storing
            if (valusenums === numisnum)
            {
                if (numisnum) return val % num;
                else
                {
                    //we have two fractions and we need decimals
                    //the modular operation only works on decimals
                    //so we will first need to convert to decimals
                    //then we will need to convert our result to fractions again OR
                    //OR THE CELL VALUE WILL LOOK SOMETHING LIKE THIS WITHOUT BEING EVALUATED:
                    //(a/b) % (c/d)
                    //BUT WHEN WE GO GO TO GET THE DETERMINANT AND COME ACROSS THAT
                    //IT WILL NEED EVALUATED
                    //I THINK WE WILL EVALUATE NOW INSTEAD AND
                    //JUST LET THE ROUNDING ERROR PROPAGATE THROUGH
                    let mydecnuma = this.convertFractionToDecimal(val);
                    let mydecnumb = this.convertFractionToDecimal(num);
                    return "" + (mydecnuma % mydecnumb);
                }
            }
            else
            {
                //one is a fraction and one is a decimal, but see above
                //convert both to decimals
                //then do it
                //return result in correct type
                let nwnum = (numisnum ? num : this.convertFractionToDecimal(num));
                let nwval = (valusenums ? val : this.convertFractionToDecimal(val));
                return (valusenums ? (nwval % nwnum) : "" + (nwval % nwnum));
            }
        }
        else if (opnum === 6)
        {
            //pow we can do separately with fractions
            if (valusenums === numisnum)
            {
                return (numisnum ? Math.pow(val, num) : this.powFractions(val, num));
            }
            else
            {
                //one is a fraction and one is not
                //first convert to fractions
                //then do it
                let nwnum = (numisnum ? "" + num : num);
                let nwval = (valusenums ? "" + val : val);
                let mytwofractsres = this.powFractions(nwval, nwnum);
                return (valusenums ? this.convertFractionToDecimal(mytwofractsres) : mytwofractsres); 
            }
        }
        else throw new Error("illegal operation string found!");
    }
    static testDoSomeOpOnVals()
    {
        let fracsm = [["1/2", "1/3", "1/4"], ["1/8", "1/6", "1/7"], ["1/27", "1/9", "1/16"]];
        let decm = [[2, 3, 4], [8, 6, 7], [27, 9, 16]];
        let myops = ["*", "/", "+", "-", "%", "^"];
        let num = 2;
        let numisnum = true;
        let valusenums = false;
        for (let k = 0; k < 2; k++)
        {
            console.log("BEGIN MAJOR TEST NUMBER " + (k + 1) + "!");
            let m = ((k === 0) ? fracsm : decm);
            valusenums = (k === 1);
            for (let n = 0; n < 2; n++)
            {
                console.log("m = ", m);
                console.log("n = " + n);
                if (n === 0)
                {
                    num = 2;
                    numisnum = true;
                }
                else
                {
                    num = "1/2";
                    numisnum = false;
                }
                console.log("valusenums = " + valusenums);
                console.log("numisnum = " + numisnum);
                console.log("num = " + num);
    
                myops.forEach((opstr) => {
                    console.log("BEGIN OP " + opstr + "!");
                    let opnum = this.getOPNumFromString(opstr);
                    for (let r = 0; r < m.length; r++)
                    {
                        for (let c = 0; c < m[r].length; c++)
                        {
                            console.log(this.doSomeOpOnValByNum(m[r][c], num, opnum,
                                valusenums, numisnum));
                        }
                    }
                    console.log("DONE WITH OP!");
                    console.log("KEEP IN MIND THE RESULT MUST USE NUMBERS IS: " + valusenums);
                });
                console.log("DONE WITH TEST NUMBER " + (n + 1) + "!");
            }//end of n for loop
            console.log("DONE WITH MAJOR TEST NUMBER " + (k + 1) + "!");
        }//end of k for loop
        //throw new Error("NOT DONE YET WITH THE OPS TESTS!");
    }


    //NOTE: if the matrix stores fractions, but num is a decimal,
    //mixing these can have undesired consequences
    static doSomeOpOnAMatrix(m, opstr, num, usenums, numisnum)
    {
        let cc = new commonclass();
        cc.letMustBeBoolean(numisnum, "numisnum");
        cc.letMustBeBoolean(usenums, "usenums");
        cc.letMustNotBeEmpty(opstr, "opstr");

        let opnum = this.getOPNumFromString(opstr);
        if (opnum === 2 || opnum === 5)
        {
            if ((numisnum && num === 0) || (!numisnum && num === "0"))
            {
                throw new Error("cannot divide by zero!");
            }
            //else;//do nothing
        }
        //else;//do nothing

        if (cc.isLetEmptyNullOrUndefined(m)) return null;
        //else;//do nothing

        let dims = this.dimensions(m);
        //console.log("dims = ", dims);

        if (dims.length < 3)
        {
            if (dims.length < 1)
            {
                console.error("cannot do math because this has too small of dimensions!");
                return m;
            }
            else
            {
                //dims.length === 1 or dims.length === 2
                //added rounding to account for the rounding error so the inverse of a matrix
                //can be closer to being accurate
                if (dims.length === 1)
                {
                    return m.map((val) => this.doSomeOpOnValByNum(val, num, opnum, usenums, numisnum));
                }
                else
                {
                    return m.map((marr) => marr.map((val) =>
                        this.doSomeOpOnValByNum(val, num, opnum, usenums, numisnum)));
                }
            }
        }
        else
        {
            console.error("cannot do math because this has too big of dimensions!");
            return m;
        }
    }

    //matrix multiplication mulitply two matrices here...
    static multiply(a, b, usenums)
    {
        let cc = new commonclass();
        cc.letMustBeBoolean(usenums, "usenums");
        if (cc.isLetEmptyNullOrUndefined(a) || cc.isLetEmptyNullOrUndefined(b))
        {
            throw new Error("cannot multiply two matrices if one is null or empty!");
        }
        //else;//do nothing

        //can only multiply if the dimensions are similar
        //let a be an ra x ca and b be rb x cb matrices
        //1 row x 3 cols and a 3 rows x 3 cols can be multiplied
        //(as long as there is a match with a 1 x k and a k x k, you can)
        //a can only be multiplied to b if the number of cols on a === the number of rows on b
        //then we do the dot product
        //2r x 3c times 3r x 2c = 2r x 2c (remaining)
        //[a, b, c]   [g, h]   [ag+bi+ck, ah+bj+cl]
        //[d, e, f] x [i, j] = [dg+ei+fk, dh+ej+fl]
        //            [k, l]
        //2r x 3c times 3r x 3c = 2r x 3c (remaining)
        //[a, b, c]   [g, h, i]   [ag+bj+cm, ah+bk+cn, ai+bl+co]
        //[d, e, f] x [j, k, l] = [dg+ej+fm, dh+ek+fn, di+el+fo]
        //            [m, n, o]
        
        let dimsa = this.dimensions(a);
        let dimsb = this.dimensions(b);
        //console.log("a = ", a);
        //console.log("b = ", b);
        //console.log("dimsa = ", dimsa);
        //console.log("dimsb = ", dimsb);

        cc.letMustNotBeEmpty(dimsa, "dimsa");
        cc.letMustNotBeEmpty(dimsb, "dimsb");

        //if can, then do else error
        if (dimsa.length < 3 && dimsa.length < 3)
        {
            //if length is 1, it is a 1xdims[0] value, meaning 1 row x ca cols
            //if length is 2, then it is rxc where the r is the first dimension and c is the second
            //we will also create a new matrix of resultant dimensions
            let numrsa = 0;
            let numrsb = 0;
            let numcsa = 0;
            let numcsb = 0;
            if (dimsa.length === 1)
            {
                numrsa = 1;
                numcsa = dimsa[0];
            }
            else
            {
                numrsa = dimsa[0];
                numcsa = dimsa[1];
            }
            if (dimsb.length === 1)
            {
                numrsb = 1;
                numcsb = dimsb[0];
            }
            else
            {
                numrsb = dimsb[0];
                numcsb = dimsb[1];
            }
            //console.log("a is a matrix with " + numrsa + " rows and " + numcsa + " cols!");
            //console.log("b is a matrix with " + numrsb + " rows and " + numcsb + " cols!");

            if (numcsa === numrsb)
            {
                //console.log("initially can multiply!");
            }
            else
            {
                //cannot multiply
                //console.log("initially cannot multiply! Might be able to multiply a " +
                //    "transpose of a 1D array otherwise cannot multiply!");
                if (dimsa.length === 1)
                {
                    if (numrsa === numrsb)
                    {
                        return this.multiply(this.transposeNumsOrFractions(a, usenums), b, usenums);
                    }
                    //else;//do nothing
                }
                //else;//do nothing
                if (dimsb.length === 1)
                {
                    if (numcsa === numcsb)
                    {
                        return this.multiply(a, this.transposeNumsOrFractions(b, usenums), usenums);
                    }
                    //else;//do nothing
                }
                //else;//do nothing

                //handle the scalar multiplication here
                if (numrsa === 1 && numcsa === 1)
                {
                    if (numrsb === 1 && numcsb === 1)
                    {
                        if (usenums) return [this.mul(a[0], b[0])];
                        else return [this.multiplyTwoFractions(a[0], b[0])];
                    }
                    else return this.doSomeOpOnAMatrix(b, "*", a[0], usenums, usenums);
                }
                else
                {
                    if (numrsb === 1 && numcsb === 1)
                    {
                        return this.doSomeOpOnAMatrix(a, "*", b[0], usenums, usenums);
                    }
                    //else;//do nothing
                }
                
                throw new Error("cannot multiply these matrices or not by a legal transpose of " +
                    "a 1D array!");
            }
            //console.log("can multiply these matrices!");

            let resnumrs = numrsa;
            let resnumcs = numcsb;
            //console.log("resmatrix is a matrix with " + resnumrs + " rows and " + resnumcs + 
            //  " cols!");
            
            //initialize the new matrix
            let resm = [];
            if (1 < resnumrs)
            {
                for (let r = 0; r < resnumrs; r++)
                {
                    let myrwarr = [];
                    for (let c = 0; c < resnumcs; c++) myrwarr.push((usenums ? 0 : "0"));
                    resm.push(myrwarr);
                }
            }
            else for (let c = 0; c < resnumcs; c++) resm.push((usenums ? 0 : "0"));

            //col in a = row in b indexes
            //row in a = row in res indexes
            //col in b = col in res indexes
            if (1 < resnumrs)
            {
                for (let ra = 0; ra < a.length; ra++)
                {
                    for (let cb = 0; cb < numcsb; cb++)
                    {
                        if (1 < dimsb.length)
                        {
                            for (let rb = 0; rb < b.length; rb++)
                            {
                                //console.log("a[" + ra + "][" + rb + "] = " + a[ra][rb]);
                                //console.log("b[" + rb + "][" + cb + "] = " + b[rb][cb]);
                                
                                let myresopval = this.doSomeOpOnValByNum(a[ra][rb], b[rb][cb],
                                    1, usenums, usenums);
                                //console.log("mulitplied = " + myresopval);
                                //console.log("OLD resm[" + ra + "][" + cb + "] = " + resm[ra][cb]);
                                
                                if (usenums) resm[ra][cb] += myresopval;
                                else resm[ra][cb] = this.addTwoFractions(resm[ra][cb], myresopval);
                                //console.log("NEW resm[" + ra + "][" + cb + "] = " + resm[ra][cb]);
                            }//end of rb = ca
                        }
                        else
                        {
                            //dimsb.length is 1
                            //console.log("a[" + ra + "][0] = " + a[ra][0]);
                            //console.log("b[" + cb + "] = " + b[cb]);
                            let myresopval = this.doSomeOpOnValByNum(a[ra][0], b[cb],
                                1, usenums, usenums);
                            //console.log("mulitplied = " + myresopval);
                            //console.log("OLD resm[" + ra + "][" + cb + "] = " + resm[ra][cb]);
                            
                            if (usenums) resm[ra][cb] += myresopval;
                            else resm[ra][cb] = this.addTwoFractions(resm[ra][cb], myresopval);
                            //console.log("NEW resm[" + ra + "][" + cb + "] = " + resm[ra][cb]);
                        }
                    }//end of cb
                }//end of ra
            }
            else
            {
                //resnumrs is 1
                for (let cb = 0; cb < numcsb; cb++)
                {
                    for (let rb = 0; rb < b.length; rb++)
                    {
                        //console.log("a[" + rb + "] = " + a[rb]);
                        //console.log("b[" + rb + "][" + cb + "] = " + b[rb][cb]);
                        let myresopval = this.doSomeOpOnValByNum(a[rb], b[rb][cb],
                            1, usenums, usenums);
                        //console.log("mulitplied = " + myresopval);
                        //console.log("OLD resm[" + cb + "] = " + resm[cb]);
                        
                        if (usenums) resm[cb] += myresopval;
                        else resm[cb] = this.addTwoFractions(resm[cb], myresopval);
                        //console.log("NEW resm[" + cb + "] = " + resm[cb]);
                    }//end of rb = ca
                }//end of cb
            }
            console.log("FINAL resm = ", resm);

            return resm;
        }
        else throw new Error("cannot multiply these matrices!");
    }
    static testMuliply()
    {
        let mygentbytm = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        let usenums = true;
        console.log(this.multiply([2], mygentbytm, usenums));//[2, 4, 6], [8, 10, 12], [14, 16, 18];
        console.log(this.multiply(this.identity([3, 3]), mygentbytm, usenums));//mygentbytm
        
        let mytbytwom = [[7, 8], [9, 10], [11, 12]];
        let mytwobytm = [[1, 2, 3], [4, 5, 6]];
        console.log(this.multiply(mytwobytm, mytbytwom, usenums));//[58, 64], [139, 154]
        
        let mytbyfr = [[13, 9, 7, 15], [8, 7, 4, 6], [6, 4, 0, 3]];
        console.log(this.multiply([3, 4, 2], mytbyfr, usenums));//[83, 63, 37, 75]
        console.log(this.multiply([1, 2, 3], [[4], [5], [6]], usenums));//[32]
        console.log(this.multiply([[4], [5], [6]], [1, 2, 3], usenums));
        //[[4, 8, 12], [5, 10, 15], [6, 12, 18]]
        
        //throw new Error("NOT DONE YET...!");
    }

    static canRowABeMultipliedByAConstantToGetRowB(a, b, myrows, usenums)
    {
        let cc = new commonclass();
        cc.letMustBeBoolean(usenums, "usenums");
        
        if (a === b) return true;
        //else;//do nothing
        
        cc.letMustNotBeEmpty(myrows, "myrows");

        //console.log(myrows[a]);
        //console.log(myrows[b]);
        
        let canrowabembyktogetb = true;
        let setc = true;
        let myconstant = 0;
        for (let c = 0; c < myrows[a].length; c++)
        {
            if (setc)
            {
                if (myrows[a][c] === 0 || myrows[a][c] === "0");
                else
                {
                    if (usenums) myconstant = myrows[b][c] / myrows[a][c];
                    else
                    {
                        let mynumdenomarr = this.getNumeratorAndDenominatorFromFraction(myrows[a][c]);
                        myconstant = this.multiplyTwoFractions(myrows[b][c],
                            "" + mynumdenomarr[0] + "/" + mynumdenomarr[1]);
                    }
                    setc = false;
                    //console.log("myrows[" + b + "][" + c + "] = " + myrows[b][c]);
                    //console.log("myrows[" + a + "][" + c + "] = " + myrows[a][c]);
                    //console.log("myconstant = " + myconstant);
                    c = -1;
                }
            }
            else
            {
                let isamatch = false;
                if (usenums) isamatch = (myrows[a][c] * myconstant === myrows[b][c]);
                else
                {
                    isamatch = (this.multiplyTwoFractions(myrows[a][c], myconstant) === myrows[b][c]);
                }
                if (isamatch);
                else
                {
                    canrowabembyktogetb = false;
                    break;
                }
            }
        }//end of c for loop
        //console.log("canrowabembyktogetb = " + canrowabembyktogetb);

        return canrowabembyktogetb;
    }

    static doesRowOrColHaveAllZeros(arr)
    {
        let cc = new commonclass();
        if (cc.isLetEmptyNullOrUndefined(arr)) return false;
        //else;//do nothing
        for (let n = 0; n < arr.length; n++)
        {
            if (arr[n] === 0 || arr[n] === "0");
            else return false;
        }
        return true;
    }

    static isDiagnalMatrix(m)
    {
        let cc = new commonclass();
        //if (cc.isLetUndefinedOrNull(m)) return false;
        //else if (m.length < 1) return true;
        if (cc.isLetEmptyNullOrUndefined(m)) return false;
        else
        {
            let dims = this.dimensions(m);
            //console.log("m = ", m);
            //console.log("dims = ", dims);

            if (dims.length < 3)
            {
                if (dims.length === 1) return (m.length === 1);
                else
                {
                    for (let r = 0; r < m.length; r++)
                    {
                        for (let c = 0; c < m[r].length; c++)
                        {
                            if (r === c);
                            else
                            {
                                if (m[r][c] === 0 || m[r][c] === "0");
                                else return false;
                            }
                        }
                    }
                    return true;
                }
            }
            else return false;//cannnot tell
        }
    }

    static getMinor(m, r, c)
    {
        //[1, 2, 3] let us say r = 0 and c = 1
        //[4, 5, 6]
        //[7, 8, 9]

        //the minor of a 2x2 is a 1x1; the minor of 1x1 = null
        let cc = new commonclass();
        if (r < 0 || c < 0) throw new Error("both r and c cannot be negative!");
        //else;//do nothing
        if (cc.isLetEmptyNullOrUndefined(m)) return null;
        //else;//do nothing
        let dims = this.dimensions(m);
        //console.log("m = ", m);
        //console.log("r = " + r);
        //console.log("c = " + c);
        //console.log("dims = ", dims);

        if (dims.length < 2 || 2 < dims.length) return null;
        //else;//do nothing proceed below

        if (dims[0] === dims[1])
        {
            if (dims[0] === 1) return null;
            //else;//do nothing
        }
        else return null;

        let myminor = [];
        for (let myr = 0; myr < m.length; myr++)
        {
            if (myr === r) continue;
            //else;//do nothing

            let mytemparr = [];
            for (let myc = 0; myc < m[myr].length; myc++)
            {
                if (myc === c);
                else mytemparr.push(m[myr][myc]);
            }
            myminor.push(mytemparr);
        }
        return myminor;
    }

    //returns -1 or 1
    static getSignOfCofactor(r, c)
    {
        if (r < 0 || c < 0) throw new Error("both r and c cannot be negative!");
        else return ((((r + 1) + (c + 1)) % 2 === 0) ? 1 : -1);
    }

    //IS EFFECTED BY WHAT IS STORED IN THE MATRIX
    //opnum = 1 =, 2 <, 3 <=, 4 >, 5 =>
    static getNumberOfANumUnderOverAtOrMoreOnArr(r, num, arr, opnum, usenums)
    {
        //console.log("r = " + r);
        //console.log("num = " + num);
        //console.log("arr = ", arr);
        //console.log("usenums = ", usenums);
        if (r < 0) throw new Error("r is not allowed to be negative!");
        //else;//do nothing

        let cc = new commonclass();
        cc.letMustBeBoolean(usenums, "usenums");
        if (cc.isLetEmptyNullOrUndefined(arr)) return 0;
        else
        {
            let cnt = 0;
            for (let c = 0; c < arr[r].length; c++)
            {
                //console.log("arr[" + r + "][" + c + "] = " + arr[r][c]);
                let myfdecnum = (usenums ? arr[r][c] : this.convertFractionToDecimal(arr[r][c]));
                if (opnum === 1)
                {
                    if (myfdecnum === num) cnt++;
                    //else;//do nothing
                }
                else if (opnum === 2)
                {
                    if (myfdecnum < num) cnt++;
                    //else;//do nothing
                }
                else if (opnum === 3)
                {
                    if (myfdecnum < num || myfdecnum === num) cnt++;
                    //else;//do nothing
                }
                else if (opnum === 4)
                {
                    if (num < myfdecnum) cnt++;
                    //else;//do nothing
                }
                else if (opnum === 5)
                {
                    if (num < myfdecnum || myfdecnum === num) cnt++;
                    //else;//do nothing
                }
                else throw new Error("illegal operation number found and used here!");
            }
            return cnt;
        }
    }
    //opnum = 1 =, 2 <, 3 <=, 4 >, 5 =>
    static getNumberOfANumOnArrWithDesiredOPStr(r, num, arr, opstr, usenums)
    {
        return this.getNumberOfANumUnderOverAtOrMoreOnArr(r, num, arr,
            this.getOPNumFromString(opstr), usenums);
    }
    static getNumberOfANumOnArr(r, num, arr, usenums) {
        return this.getNumberOfANumUnderOverAtOrMoreOnArr(r, num, arr, 1, usenums);
    }
    static getNumberOfNumsUnderNumOnArr(r, num, arr, usenums)
    {
        return this.getNumberOfANumUnderOverAtOrMoreOnArr(r, num, arr, 2, usenums);
    }
    static getNumberOfNumsAtOrUnderNumOnArr(r, num, arr, usenums)
    {
        return this.getNumberOfANumUnderOverAtOrMoreOnArr(r, num, arr, 3, usenums);
    }
    static getNumberOfNumsAboveNumOnArr(r, num, arr, usenums)
    {
        return this.getNumberOfANumUnderOverAtOrMoreOnArr(r, num, arr, 4, usenums);
    }
    static getNumberOfNumsAtOrAboveNumOnArr(r, num, arr, usenums)
    {
        return this.getNumberOfANumUnderOverAtOrMoreOnArr(r, num, arr, 5, usenums);
    }

    //this errors out if not a 2D matrix
    //NOT EFFECTED BY WHAT IS STORED IN THE MATRIX
    static replaceARowOrColWith(m, nclorrw, rorci, subcols)
    {
        //if matrix is not a 2d matrix, this errors out
        if (rorci < 0) throw new Error("rorci must not be negative!");
        //else;//do nothing

        let cc = new commonclass();
        cc.letMustNotBeEmpty(m, "m");
        cc.letMustBeBoolean(subcols, "subcols");
        let mydims = this.dimensions(m);
        if (mydims.length < 2) throw new Error("this must be at minimum a 2D matrix!");
        //else;//do nothing

        if (subcols)
        {
            //replacing a col
            if (nclorrw.length === mydims[1]);
            else throw new Error("the col was not the same length as the matrix column!");

            //[1, 2, 3]    [1, [12], 3] brackets added around answer to show where it is only
            //[4, 5, 6] to [4, [7], 6]  brackets are not going to be present in result
            //[7, 8, 9]    [7, [20], 9]

            return m.map((marr, rindx) => marr.map((val, cindx) => {
                return ((cindx === rorci) ? nclorrw[rindx] : val);
            }));
        }
        else
        {
            //replacing a row
            if (nclorrw.length === mydims[0]);
            else throw new Error("the row was not the same length as the matrix row!");
            return m.map((marr, rindx) => ((rindx === rorci) ? nclorrw : marr));
        }
    }
    static replaceARowWith(m, nclorrw, rorci) {
        return this.replaceARowOrColWith(m, nclorrw, rorci, false);
    }
    static replaceAColWith(m, nclorrw, rorci) {
        return this.replaceARowOrColWith(m, nclorrw, rorci, true);
    }
    static testReplaceColOrRow()
    {
        let m = [[2, 0, -2], [0, 2, -1], [1, 0, 0]];
        let mans = [[0], [0], [1]];
        console.log("m = ", m);
        console.log("mans = ", mans);
        console.log(this.replaceAColWith(m, mans, 0));
        //throw new Error("NOT DONE YET...!"); 
    }


    //HELPER METHODS FOR GETTING THE DETERMINANT (FOR PICKING WHERE TO START)
    //THESE ARE ALL EFFECTED BY WHAT IS STORED ON THE MATRIX

    static maxItemsFoundOnMyArray(myarr, usenums)
    {
        let cc = new commonclass();
        cc.letMustNotBeEmpty(myarr, "myarr");
        cc.letMustBeBoolean(usenums, "usenums");

        let mxnumfnd = -1;
        let mxrorci = -1;
        for (let c = 0; c < myarr.length; c++)
        {
            let mydecnum = (usenums ? myarr[c] : this.convertFractionToDecimal(myarr[c]));
            if (0 < mydecnum)
            {
                if (mxrorci < 0)
                {
                    mxrorci = c;
                    mxnumfnd = mydecnum;
                }
                else
                {
                    if (mxnumfnd < mydecnum)
                    {
                        mxrorci = c;
                        mxnumfnd = mydecnum;
                    }
                    //else;//do nothing
                }
            }
            //else;//do nothing
        }//end of c for loop
        //console.log("mxnumfnd = " + mxnumfnd);
        //console.log("mxrorci = " + mxrorci);

        if (mxrorci < 0 || myarr.length - 1 < mxrorci)
        {
            throw new Error("illegal index value found and used here for mxrorci!");
        }
        //else;//do nothing

        return {"maxnumfound": mxnumfnd, "maxroworcoli": mxrorci};
    }

    static getUseRowAndColIndexsInfo(rwarr, clarr, usenums, basenmforarrs="mxnumfndon")
    {
        let cc = new commonclass();
        cc.letMustBeBoolean(usenums, "usenums");
        if (cc.isLetEmptyNullOrUndefined(basenmforarrs))
        {
            return this.getUseRowAndColIndexsInfo(rwarr, clarr, usenums, "mxnumfndon");
        }
        //else;//do nothing

        let userow = true;
        let mycl = -1;
        let myrw = -1;
        let mymxitemsonarrzerosrw = this.maxItemsFoundOnMyArray(rwarr, usenums);
        let mxnumfndonrws = mymxitemsonarrzerosrw.maxnumfound;
        let mxrwi = mymxitemsonarrzerosrw.maxroworcoli;
        //console.log(basenmforarrs + "rws = " + mxnumfndonrws);
        //console.log("mxrwi = " + mxrwi);

        let mymxitemsonarrzeroscl = this.maxItemsFoundOnMyArray(clarr, usenums);
        let mxnumfndoncls = mymxitemsonarrzeroscl.maxnumfound;
        let mxcli = mymxitemsonarrzeroscl.maxroworcoli;
        //console.log(basenmforarrs + "cls = " + mxnumfndoncls);
        //console.log("mxcli = " + mxcli);

        if (mxnumfndonrws < mxnumfndoncls)
        {
            userow = false;
            mycl = mxcli;
        }
        else
        {
            userow = true;
            myrw = mxrwi;
        }
        return {"userow": userow, "myrw": myrw, "mycl": mycl};
    }

    static determinant(m, usenums)
    {
        let cc = new commonclass();
        cc.letMustBeBoolean(usenums, "usenums");
        if (cc.isLetEmptyNullOrUndefined(m)) return (usenums ? 0 : "0");
        else
        {
            let dims = this.dimensions(m);
            //console.log("m = ", m);
            //console.log("dims = ", dims);

            if (dims.length < 3)
            {
                if (dims.length === 1) return ((dims[0] === 1) ? m[0] : 0);
                //else;//do nothing safe to proceed below

                //is the matrix a square matrix, if so find it below return 0
                if (dims[0] === dims[1]);
                else return (usenums ? 0 : "0");//not a square matrix

                if (dims[0] === 2)
                {
                    //this is a 2 x 2 matrix determinant is: AD-BC
                    //[A, B][C, D]
                    if (usenums) return this.mul(m[0][0], m[1][1]) - this.mul(m[0][1], m[1][0]);
                    else
                    {
                        return this.subtractTwoFractions(this.multiplyTwoFractions(m[0][0], m[1][1]),
                            this.multiplyTwoFractions(m[0][1], m[1][0]));
                    }
                }
                //else proceed this is where it gets interesting

                //if the matrix contains the same row or column or
                //one row or col can be multiplied by some constant to get another
                //then zero OR A ROW OR COL OF ALL ZEROS.
                //[1, 2, 3]    [1, 4, 1]
                //[4, 5, 6] OR [2, 5, 2]
                //[1, 2, 3]    [3, 6, 3]

                let mycols = this.getRowsOrCols(m, false);
                let myrows = this.getRowsOrCols(m, true);
                //console.log("mycols = ", mycols);
                //console.log("myrows = ", myrows);

                //take some row r and go accross all of the columns comparing
                //the values against other rows
                for (let n = 0; n < 2; n++)
                {
                    let myarr = ((n === 0) ? mycols : myrows);
                    let mytpstr = ((n === 0) ? "mycols" : "myrows");
                    for (let rorc = 0; rorc < myarr.length; rorc++)
                    {
                        //console.log(mytpstr + "[" + rorc + "] = ", myarr[rorc]);
                        if (this.doesRowOrColHaveAllZeros(myarr[rorc])) return (usenums ? 0 : "0");
                        //else;//do nothing
                        for (let k = rorc + 1; k < myarr.length; k++)
                        {
                            //console.log(mytpstr + "[" + k + "] = ", myarr[k]);
                            if (this.areTwoRowsOrColsTheSame(rorc, k, myarr))
                            {
                                return (usenums ? 0 : "0");
                            }
                            //else;//do nothing
                            if (this.canRowABeMultipliedByAConstantToGetRowB(rorc, k, myarr, usenums))
                            {
                                return (usenums ? 0 : "0");
                            }
                            //else;//do nothing
                        }
                    }
                }
                
                //can one row or col be multiplied by a constant to get the other
                //if so determinant is zero.
                //handled above
                //console.log("THE DETERMINANT IS NOT ZERO!");

                //if it is an identity or a diagnal matrix
                //then the determinant is the main diagnal multiplied by each other
                //otherwise proceed below
                if (this.isDiagnalMatrix(m))
                {
                    let myval = (usenums ? 1 : "1");
                    for (let r = 0; r < m.length; r++)
                    {
                        if (usenums) myval *= m[r][r];
                        else myval = this.multiplyTwoFractions(myval, m[r][r]);
                    }
                    //console.log("THIS IS A DIAGNAL MATRIX SO MULTIPLY MAIN DIAGNAL!");
                    //console.log("myval = " + myval);
                    
                    return myval;
                }
                //else;//do nothing proceed below
                //done with step 1

                //handle the worst case here...
                //choose a row or col with the most zeros in it, then 1s, then arbitrarily choose one
                //then we move over this entire row or col doing the following:
                //
                //a cofactor is found by its sign (if (r + c) % 2 === 1 -> -1 otherwise positive 1)
                //and by the determinant of the minor
                //the minor is all numbers not on our row and column
                //and by our value at row and col
                //1. this.getSignOfCofactor(r, c) *
                //2. m[r][c] *
                //3. this.determinant(this.getMinor(m, r, c));
                //ADD TO THE ORIGINAL VALUE

                //actually choose what to use here
                let userow = true;
                let myrw = -1;
                let mycl = -1;
                
                //figure out how many zeros are in the rows
                //then the cols, then same for 1s.
                let numzerosonrws = myrows.map((arr, rindx) =>
                    this.getNumberOfANumOnArr(rindx, 0, myrows, usenums));
                let numonesonrws = myrows.map((arr, rindx) =>
                    this.getNumberOfANumOnArr(rindx, 1, myrows, usenums));
                let numzerosoncls = mycols.map((arr, rindx) =>
                    this.getNumberOfANumOnArr(rindx, 0, mycols, usenums));
                let numonesoncls = mycols.map((arr, rindx) =>
                    this.getNumberOfANumOnArr(rindx, 1, mycols, usenums));
                //console.log("numzerosonrws = ", numzerosonrws);
                //console.log("numonesonrws = ", numonesonrws);
                //console.log("numzerosoncls = ", numzerosoncls);
                //console.log("numonesoncls = ", numonesoncls);

                let numslessthantenonrws = myrows.map((arr, rindx) =>
                    this.getNumberOfANumOnArrWithDesiredOPStr(rindx, 10, myrows, "<", usenums));
                let numslessthantenoncls = myrows.map((arr, rindx) =>
                    this.getNumberOfANumOnArrWithDesiredOPStr(rindx, 10, mycols, "<", usenums));
                //console.log("numslessthantenonrws = ", numslessthantenonrws);
                //console.log("numslessthantenoncls = ", numslessthantenoncls);

                //if a row or column has 0s use it, next use 1, then the max under 10
                //then arbitrarily use the first row
                //if it has a zero, now need to pick the row or col with the most
                //same for 1s, then same for max under 10, then arbitrarily use the first row
                let zerofnd = false;
                let onefnd = false;
                let numundrtenfnd = false;
                for (let n = 0; n < 3; n++)
                {
                    let myarr = ((n === 0) ? numzerosonrws :
                        ((n === 1) ? numonesonrws : numslessthantenonrws));
                    for (let c = 0; c < myarr.length; c++)
                    {
                        if (0 < myarr[c])
                        {
                            if (n === 0) zerofnd = true;
                            else if (n === 1) onefnd = true;
                            else numundrtenfnd = true;
                            break;
                        }
                        //else;//do nothing
                    }
                }
                //console.log("zerofnd = " + zerofnd);
                //console.log("onefnd = " + onefnd);
                //console.log("numundrtenfnd = " + numundrtenfnd);

                if (zerofnd)
                {
                    //get the max on rows
                    //then the max on cols
                    //if one has more than the other use it
                    //if they are equal arbitrarily use row with the first zero found
                    //index is valid this was already checked
                    let myuserwclobj = this.getUseRowAndColIndexsInfo(numzerosonrws,
                        numzerosoncls, true, "mxzerosfndon");
                    userow = myuserwclobj.userow;
                    myrw = myuserwclobj.myrw;
                    mycl = myuserwclobj.mycl;
                }
                else
                {
                    if (onefnd)
                    {
                        let myuserwclobj = this.getUseRowAndColIndexsInfo(numonesonrws,
                            numonesoncls, true, "mxonesfndon");
                        userow = myuserwclobj.userow;
                        myrw = myuserwclobj.myrw;
                        mycl = myuserwclobj.mycl;
                    }
                    else
                    {
                        if (numundrtenfnd)
                        {
                            let myuserwclobj = this.getUseRowAndColIndexsInfo(numslessthantenonrws,
                                numslessthantenoncls, true, "mxnumsundertenfndon");
                            userow = myuserwclobj.userow;
                            myrw = myuserwclobj.myrw;
                            mycl = myuserwclobj.mycl;
                        }
                        else
                        {
                            //arbitrarily make a choice...
                            userow = true;
                            myrw = 0;
                        }
                    }
                }
                //console.log("userow = " + userow);
                //console.log("myrw = " + myrw);
                //console.log("mycl = " + mycl);
                //console.log("m = ", m);
                //console.log("this = ", this);


                let mydval = (usenums ? 0 : "0");
                let myfunc = (usenums ? this.mul : this.multiplyTwoFractions);
                let mycontxt = this;
                if (userow)
                {
                    if (myrw < 0) throw new Error("myrw is not allowed to be negative!");
                    //else;//do nothing

                    for (let c = 0; c < m[myrw].length; c++)
                    {
                        //sign of cofactor is int; myrw and c are ints;
                        //the values store in the matrix are not necessarily fractions
                        let mysignval = this.getSignOfCofactor(myrw, c);
                        let finsignval = (usenums ? mysignval : "" + mysignval);
                        //console.log("finsignval = " + finsignval);

                        let cfval = myfunc.call(mycontxt, myfunc.call(mycontxt, finsignval, m[myrw][c]),
                                this.determinant(this.getMinor(m, myrw, c), usenums));
                        if (usenums) mydval += cfval;
                        else mydval = this.addTwoFractions(mydval, cfval); 
                        //console.log("cfval = " + cfval);
                        //console.log("NEW mydval = " + mydval);
                    }
                }
                else
                {
                    if (mycl < 0) throw new Error("mycl is not allowed to be negative!");
                    //else;//do nothing

                    for (let r = 0; r < m.length; r++)
                    {
                        let mysignval = this.getSignOfCofactor(r, mycl);
                        let finsignval = (usenums ? mysignval : "" + mysignval);
                        //console.log("finsignval = " + finsignval);

                        let cfval = myfunc.call(mycontxt, myfunc.call(mycontxt, finsignval, m[r][mycl]),
                                this.determinant(this.getMinor(m, r, mycl), usenums));
                        if (usenums) mydval += cfval;
                        else mydval = this.addTwoFractions(mydval, cfval); 
                        //console.log("cfval = " + cfval);
                        //console.log("NEW mydval = " + mydval);
                    }
                }
                //console.log("FINAL mydval = " + mydval);

                return mydval;
            }
            else return (usenums ? 0 : "0");//cannot do computations with this
        }
    }
    static testDeterminant()
    {
        let minim = [1];
        let usenums = true;
        console.log(this.isDiagnalMatrix(minim));//true
        console.log(this.dimensions(minim));//[1]
        console.log(this.determinant(minim, usenums));//1

        let myom = [[1, 2], [3, 4], [5, 6]];
        let numisnum = true;
        console.log("myom = ", myom);
        console.log(this.dimensions(myom));
        console.log(this.determinant(myom, usenums));//0

        console.log(this.doSomeOpOnAMatrix(myom, "*", 2, usenums, numisnum));
        console.log(this.doSomeOpOnAMatrix([1, 2, 3], "*", 2, usenums, numisnum));
        //throw new Error("NEED TO TEST MATH ON WHOLE MATRIX RESULTS NOW!");

        let mytmom = this.transposeNumsOrFractions(myom, usenums);
        console.log("mytmom = ", mytmom);
        console.log(this.dimensions(mytmom));
        console.log(this.determinant(mytmom, usenums));//0

        let srwm = [[1, 2, 3], [4, 5, 6], [1, 2, 3]];
        console.log("srwm = ", srwm);
        console.log(this.determinant(srwm, usenums));//0

        let sclm = [[1, 4, 1], [2, 5, 2], [3, 6, 3]];
        console.log("sclm = ", sclm);
        console.log(this.determinant(sclm, usenums));//0

        let zrwm = [[0, 0, 0], [4, 5, 6], [1, 2, 3]];
        console.log("zrwm = ", zrwm);
        console.log(this.determinant(zrwm, usenums));//0

        let zclm = [[0, 4, 1], [0, 5, 2], [0, 6, 3]];
        console.log("zclm = ", zclm);
        console.log(this.determinant(zclm, usenums));//0

        let mcrwm = [[1, 2, 3], [4, 5, 6], [2, 4, 6]];
        console.log("mcrwm = ", mcrwm);
        console.log(this.determinant(mcrwm, usenums));//0

        let mcclm = [[1, 4, 2], [2, 5, 4], [3, 6, 6]];
        console.log("mcclm = ", mcclm);
        console.log(this.isDiagnalMatrix(mcclm));
        console.log(this.determinant(mcclm, usenums));//0

        let idm = this.identity([3, 3]);
        console.log("idm = ", idm);
        console.log(this.isDiagnalMatrix(idm));
        console.log(this.determinant(idm, usenums));//1

        let diagtst = [[3, 0, 0], [0, 3, 0], [0, 0, 3]];
        console.log("diagtst = ", diagtst);
        console.log(this.isDiagnalMatrix(diagtst));
        console.log(this.determinant(diagtst, usenums));//3*3*3=27

        this.testTranspose();
        this.testMuliply();
    }

    //returns null when determinant is zero, but error will be printed out to the console
    static inverse(m, usenums)
    {
        let cc = new commonclass();
        cc.letMustBeBoolean(usenums, "usenums");
        if (cc.isLetEmptyNullOrUndefined(m)) throw new Error("matrix cannot be empty!");
        else
        {
            let mydims = this.dimensions(m);
            if (mydims.length === 1)
            {
                if (m.length === 1) return m;
                //else;//do nothing
            }
            //else;//do nothing

            let mydet = this.determinant(m, usenums);
            if (mydet === 0)
            {
                console.error("this has no inverse, the determinant is zero. Therefore the " +
                    "system has infinitely many solutions or no solution!");
                return null;
            }
            //else;//do nothing safe to proceed

            //dims are assumed to be length 2 from now on
            
            //if this is the same as the identity return it
            let myidentitym = this.identity(mydims);
            //console.log("myidentitym = ", myidentitym);

            let isidm = true;
            for (let r = 0; r < m.length; r++)
            {
                for (let c = 0; c < m[r].length; c++)
                {
                    let ismatch = false;
                    if (usenums) ismatch = (m[r][c] === myidentitym[r][c]);
                    else ismatch = (this.convertFractionToDecimal(m[r][c]) === myidentitym[r][c]);
                    if (ismatch);
                    else
                    {
                        isidm = false;
                        break;
                    }
                }
                if (isidm);
                else break;
            }
            //console.log("isidm = " + isidm);

            if (isidm) return m;
            //else;//do nothing proceed below


            //create a matrix of cofactors
            //then transpose the matrix of cofactors
            //then multiply that by 1/(determinant of the original matrix)
            let mofcofactors = null;
            if (mydims[0] === 2 && mydims[1] === 2) 
            {
                let nwb = (usenums ? this.mul(-1, m[0][1]) : this.multiplyTwoFractions("-1", m[0][1]));
                let nwc = (usenums ? this.mul(-1, m[1][0]) : this.multiplyTwoFractions("-1", m[1][0]));
                mofcofactors = [[m[1][1], nwb], [nwc, m[0][0]]];
            }
            else
            {
                let myfunc = (usenums ? this.mul : this.multiplyTwoFractions);
                let mycontxt = this;
                mofcofactors = m.map((marr, rindx) => marr.map((val, cindx) => {
                    let detminr = this.determinant(this.getMinor(m, rindx, cindx), usenums);
                    let mysignval = this.getSignOfCofactor(rindx, cindx);
                    return myfunc.call(mycontxt, (usenums ? mysignval : "" + mysignval), detminr);
                }));
                mofcofactors = this.transposeNumsOrFractions(mofcofactors, usenums);
            }
            return this.doSomeOpOnAMatrix(mofcofactors, "/", mydet, usenums, usenums);
        }
    }
    static testInverse()
    {
        this.testDeterminant();

        let usenums = true;
        console.log(this.inverse([1], usenums));
        
        let myorigtwobytwo = [[-3, 4], [2, -1]];
        console.log("myorigtwobytwo = ", myorigtwobytwo);

        let myinvtwobytwo = this.inverse(myorigtwobytwo, usenums);
        console.log("myinvtwobytwo = ", myinvtwobytwo);
        //[[1/5 or 0.2, 2/5 or 0.4], [3/5 or 0.6, 4/5 or 0.8]]
        console.log(this.inverse(myinvtwobytwo, usenums));
        console.log("THE ABOVE SHOULD BE EQUAL TO: myorigtwobytwo = ", myorigtwobytwo);
        
        let myorigtbyt = [[1, 1, 1], [1, 2, 2], [2, 3, 4]];
        console.log("myorigtbyt = ", myorigtbyt);

        let myinvorigtbyt = this.inverse(myorigtbyt, usenums);//[2, -1, 0], [0, 2, -1], [-1, -1, 1]
        console.log("myinvorigtbyt = ", myinvorigtbyt);
        console.log(this.inverse(myinvorigtbyt, usenums));
        console.log("ABOVE SHOULD BE EQUAL TO: myorigtbyt = ", myorigtbyt);

        console.log(this.inverse(this.identity([3, 3]), usenums));//should be the same
        console.log(this.inverse([["1", "0", "0"], ["0", "1", "0"], ["0", "0", "1"]], false));
        
        let diagtst = [[3, 0, 0], [0, 3, 0], [0, 0, 3]];
        console.log("diagtst = ", diagtst);
        console.log(this.isDiagnalMatrix(diagtst));
        
        let myinvdiagtest = this.inverse(diagtst, usenums);
        console.log("myinvdiagtest = ", myinvdiagtest);

        console.log(this.inverse(myinvdiagtest, usenums));
        console.log("THE ABOVE SHOULD BE EQUAL TO: diagtst = ", diagtst);
        
        //throw new Error("NOT DONE YET...!");
    }


    //https://www.cuemath.com/numbers/gcf-greatest-common-factor/
    //NOTE: the lcm method was based off of this GCF method
    //this may not be the most efficient GCF method, but it is pretty close
    //it handles a few base cases that the others do not, and it also switches the parameters
    //that is basically the only difference
    static gcf(a, b)
    {
        //console.log("GCF OF a = " + a + " AND b = " + b + ":");
        if (b === a) return a;
        else if (a === 0 || b === 0) return 0;
        else if (a === 1 || b === 1 || a === -1 || b === -1) return 1;
        else if (a < 0) return this.gcf(a * (-1), b);
        else if (b < 0) return this.gcf(a, b * (-1));
        else
        {
            if (a < b)
            {
                let rem = b % a;
                return ((rem === 0) ? a : this.gcf(a, rem));//rem is not zero //a % rem
            }
            else return this.gcf(b, a);
        }
    }
    static mainGCF(arr)
    {
        let cc = new commonclass();
        cc.letMustNotBeEmpty(arr, "arr");

        //remove the duplicates...
        let mynwarr = [];
        for (let n = 0; n < arr.length; n++)
        {
            let addit = true;
            for (let k = 0; k < mynwarr.length; k++)
            {
                if (mynwarr[k] === arr[n])
                {
                    addit = false;
                    break;
                }
                //else;//do nothing
            }
            if (addit) mynwarr.push(arr[n]);
            //else;//do nothing
        }
        //console.log("CALLED mainGCF with mynwarr = ", mynwarr);

        if (mynwarr.length === 1) return mynwarr[0];
        else
        {
            let mygcfval = this.gcf(mynwarr[0], mynwarr[1]);
            if (mynwarr.length === 2) return mygcfval;
            //else;//do nothing proceed below

            //length is at least 3
            //get the gcf of the first two
            //then use that gcf and the next number and so on...
            //use the new array here
            //the recursion can stop if GCF IS 1 because it will not be any bigger.
            //provided that these numbers are not the same
            if (mygcfval === 0) return 0;
            else if (mygcfval === 1) return 1;
            else return this.mainGCF([mygcfval, ...mynwarr.filter((val, indx) => (1 < indx))]);
        }
    }
    static testGCF()
    {
        console.log("THE GCF OF 60 AND 60 IS: " + this.gcf(60, 60));//60
        console.log("THE GCF OF 30 AND 42 IS: " + this.gcf(30, 42));//6
        console.log("THE GCF OF 18 AND 27 IS: " + this.gcf(18, 27));//9
        console.log("THE GCF OF 60 AND 90 IS: " + this.gcf(60, 90));//30
        console.log("THE GCF OF 360 AND 198 IS: " + this.gcf(360, 198));//18
        console.log("THE GCF OF 198 AND 360 IS: " + this.gcf(198, 360));//18
        console.log("THE GCF OF 0 AND 4 IS: " + this.gcf(0, 4));//0
        console.log("THE GCF OF 4 AND 0 IS: " + this.gcf(4, 0));//0
        
        let myarr = [4, 2, 4];
        console.log("THE GCF OF " + myarr + " IS: " + this.mainGCF(myarr));
        
        let myoarr = [2, 3, 5];
        console.log("THE GCF OF " + myoarr + " IS: " + this.mainGCF(myoarr));

        let mybarr = [126, 162, 180];//18
        console.log("THE GCF OF " + mybarr + " IS: " + this.mainGCF(mybarr));
    }

    static lcm(a, b)
    {
        if (a === 0 || b === 0) return 0;
        else if (a === 1) return b;
        else if (b === 1) return a;
        else return ((a / this.gcf(a, b)) * b);
    }
    static mainLCM(arr)
    {
        let cc = new commonclass();
        cc.letMustNotBeEmpty(arr, "arr");

        //remove the duplicates...
        let mynwarr = [];
        for (let n = 0; n < arr.length; n++)
        {
            let addit = true;
            for (let k = 0; k < mynwarr.length; k++)
            {
                if (mynwarr[k] === arr[n])
                {
                    addit = false;
                    break;
                }
                //else;//do nothing
            }
            if (addit) mynwarr.push(arr[n]);
            //else;//do nothing
        }
        //console.log("CALLED mainLCM with mynwarr = ", mynwarr);

        if (mynwarr.length === 1) return mynwarr[0];
        else
        {
            let mylcmval = this.lcm(mynwarr[0], mynwarr[1]);
            if (mynwarr.length === 2) return mylcmval;
            //else;//do nothing proceed below

            //length is at least 3
            //get the gcf of the first two
            //then use that gcf and the next number and so on...
            //use the new array here
            //the recursion can stop if GCF IS 1 because it will not be any bigger.
            //provided that these numbers are not the same
            if (mylcmval === 0) return 0;
            else
            {
                let myfilarr = mynwarr.filter((val, indx) => (1 < indx));
                return this.mainLCM(((mylcmval === 1) ? myfilarr : [mylcmval, ...myfilarr]));
            }
        }
    }
    static testLCM()
    {
        console.log("THE LCM OF 60 AND 60 IS: " + this.lcm(60, 60));//60
        console.log("THE LCM OF 30 AND 42 IS: " + this.lcm(30, 42));//210
        console.log("THE LCM OF 18 AND 27 IS: " + this.lcm(18, 27));//54
        console.log("THE LCM OF 60 AND 90 IS: " + this.lcm(60, 90));//180
        console.log("THE LCM OF 360 AND 198 IS: " + this.lcm(360, 198));//3960
        console.log("THE LCM OF 198 AND 360 IS: " + this.lcm(198, 360));//3960
        console.log("THE LCM OF 0 AND 4 IS: " + this.lcm(0, 4));//0
        console.log("THE LCM OF 4 AND 0 IS: " + this.lcm(4, 0));//0
        
        let myarr = [4, 2, 4];//4
        console.log("THE LCM OF " + myarr + " IS: " + this.mainLCM(myarr));
        
        let myoarr = [2, 3, 5];//30
        console.log("THE LCM OF " + myoarr + " IS: " + this.mainLCM(myoarr));

        let mybarr = [126, 162, 180];//11340
        console.log("THE LCM OF " + mybarr + " IS: " + this.mainLCM(mybarr));
    }

    //https://stackoverflow.com/questions/23575218/
    //convert-decimal-number-to-fraction-in-javascript-or-closest-fraction
    //https://stackoverflow.com/questions/14002113/
    //how-to-simplify-a-decimal-into-the-smallest-possible-fraction
    //returns null in the event of failing to get what we need
    static toFrac(num) {
        let i = 1;
        let retnum = 0;
        while (true) {
            if (num * i % 1 === 0) {
                retnum = num * i;
                break;
            }
            // For exceptions, tuned down MAX value a bit
            if (i > 9000000000000000) return null;//throw new Error("cannot convert to fraction!");
            //else;//do nothing
            i++;
        }
        return [retnum, i];
    }
    static testToFraction()
    {
        console.log(this.toFrac(0.25));//1/4 or 1, 4
        console.log(this.toFrac(0.5));//1/2 or 1, 2
        console.log(this.toFrac(0.75));//3/4 or 3, 4
        console.log(this.toFrac(0));//0/1 or 0, 1 or just 0
        console.log(this.toFrac(0.125));//1/8 or 1, 8
        console.log(this.toFrac(0.375));//3/8 or 3, 8
        console.log(this.toFrac(0.3));//3/10
        console.log(this.toFrac(1.0/3.0));//1/3
        console.log(this.toFrac(0.175));//7/40
        console.log(this.toFrac(2.175));//87/40
        //console.log(this.toFrac(Math.round((0.1+0.2) * 1000) / 1000));//3/10
        //throw new Error("NOT DONE YET!");
    }

    //SOLVING METHODS BELOW ARE EFFECTED BY WHAT IS STORED IN THE MATRIX

    static SolveViaMatrixInverse(a, bans, usenums)
    {
        //ax=b -> x=b/a=(a^(-1))*b -> 1/a=a^(-1)=a_inverse a*(a^(-1)) = IDENTITY -> IDENTITY * x = x
        console.log("a = ", a);
        console.log("bans = ", bans);
        console.log("usenums = " + usenums);

        let cc = new commonclass();
        cc.letMustNotBeEmpty(a, "a");
        cc.letMustNotBeEmpty(bans, "bans");
        cc.letMustBeBoolean(usenums, "usenums");
        
        let mynwarr = (usenums ? a.map((arr) => arr.map((val) => "" + val)) : a);
        let mynwbans = null;
        if (usenums)
        {
            let mybansdims = this.dimensions(bans);
            console.log("mybansdims = ", mybansdims);

            if (mybansdims.length < 3)
            {
                if (mybansdims.length === 2) mynwbans = bans.map((arr) => arr.map((val) => "" + val));
                else mynwbans = bans.map((val) => "" + val);
            }
            else throw new Error("illegal dimensions found for the answer array!");
        }
        else mynwbans = bans;
        let resusenums = false;
        let myres = this.multiply(this.inverse(mynwarr, resusenums), mynwbans, resusenums);
        console.log("a = ", a);
        console.log("bans = ", bans);
        console.log("resusenums = " + resusenums);
        console.log("usenums = " + usenums);
        console.log("MYRES_AX=B = ", myres);

        let myresdims = this.dimensions(myres);
        console.log("myresdims = ", myresdims);

        let bresarr = null;
        if (myresdims.length < 3)
        {
            bresarr = ((myresdims.length === 1) ? myres : myres.map((marr) => marr[0]));
        }
        else throw new Error("invalid resulting dimensions for the matrix inverse!");
        console.log("bresarr = ", bresarr);

        let myfracs = bresarr;
        //may hang the browser if used
        //let myfracs = (usenums ? bresarr.map((val) => this.toFrac(val)) : bresarr);
        console.log("myfracs = ", myfracs);

        //throw new Error("NEED TO DO SOMETHING HERE FOR THE MOMENT!");

        //take all denominators get their GCFs
        //then multiply by them to get integers
        //then return
        //if the GCF of all denominators is 1, then just multiply them all together
        //that will be the LCM. Then multiply all numerators by it.
        let mynumrs = [];
        let mydenoms = [];
        myfracs.forEach((val) => {
            //if (usenums)
            //{
            //    mynumrs.push(val[0]);
            //    mydenoms.push(val[1]);
            //}
            //else
            //{
                let myfracnumdenomobj = this.getNumeratorAndDenominatorFromFraction(val);
                mynumrs.push(myfracnumdenomobj[0]);
                mydenoms.push(myfracnumdenomobj[1]);
            //}
        });
        let mylcd = this.mainLCM(mydenoms);
        console.log("mylcd = " + mylcd);

        let myints = mynumrs.map((val, indx) => ((mylcd / mydenoms[indx]) * val));
        console.log("NEW myints = " + myints);
        
        let mygcf = this.mainGCF(myints);
        console.log("mygcf = " + mygcf);

        myints = myints.map((val) => val /= mygcf);
        console.log("FINAL myints = " + myints);
        console.log("DONE WITH SOLVE VIA MATRIX INVERSE NOW!");

        return {"ans": myres, "myintans": myints, "mydenoms": mydenoms, "mynumerators": mynumrs};
    }
    static testSolveViaInverse()
    {
        let usenums = true;
        let otherm = [[1, 2, 3], [3, 5, 7], [4, -3, 2]];//hangs the browser on toFrac
        console.log(this.SolveViaMatrixInverse(otherm, [5, 7, 9], usenums));
        let waterm = [[2, 0, -2], [0, 2, -1], [1, 0, 0]];
        console.log(this.SolveViaMatrixInverse(waterm, [0, 0, 1], usenums));
        //let myotherm = [[2, 0, 0, -1, 0, 0, 0], 
        //    [2, 0, -1, 0, 0, 0, 0],
        //    [6, 0, -3, 0, 0, 0, 0],
        //    [0, 1, -1, 0, 0, 0, 0],
        //    [0, 1, 0, -1, 1, 0, 0],
        //    [1, 0, 0, 0, 0, 2, 0],
        //    [0, 2, 0, 0, 0, 0, 3]];
        //console.log(this.SolveViaMatrixInverse(myotherm, [0, 0, 0, 0, 0, 0, 1], usenums));
        let myotherm = [[1, 0, 0, -1], [0, 1, -1, 0], [0, 1, 0, -1], [1, 0, 0, 0]];
        console.log(this.SolveViaMatrixInverse(myotherm, [0, 0, 0, 1], usenums));
        throw new Error("NOT DONE YET...!");
    }

    //STILL WANT INTEGER ANSWERS

    static CramersRule(a, bans, usenums)
    {
        console.log("a = ", a);
        console.log("bans = ", bans);

        let mydet = this.determinant(a, usenums);
        console.log("mydet = ", mydet);

        if (mydet === 0)
        {
            console.error("this has no inverse, the determinant is zero. Therefore the " +
                "system has infinitely many solutions or no solution!");
            return null;
        }
        //else;//do nothing safe to proceed

        let bdims = this.dimensions(bans);
        console.log("bdims = ", bdims);

        let barr = null;
        if (bdims.length < 3) barr = ((bdims.length === 1) ? bans : bans.map((marr) => marr[0]));
        else throw new Error("the answer matrix has an invalid dimension length for Cramer's Rule!");
        console.log("barr = ", barr);

        //now to solve for x we need to substitute the answer matrix into each column
        //then get that determinant and divide by main determinant for each x
        let mynumerators = a[0].map((val) => 0);
        let myans = a[0].map((val, cindx) => {
            let nwdet = this.determinant(this.replaceAColWith(a, barr, cindx), usenums);
            let nwans = null;
            if (usenums) nwans = Math.round((nwdet / mydet) * 1000) / 1000;
            else nwans = this.multiplyTwoFractions(nwdet, this.flipFraction(mydet));
            mynumerators[cindx] = nwdet;
            console.log("ans[" + cindx + "] = " + nwans);
            return nwans;
        });
        console.log("a = ", a);
        console.log("bans = ", bans);
        console.log("mydet = ", mydet);
        console.log("bdims = ", bdims);
        console.log("myans = ", myans);
        console.log("usenums = " + usenums);
        //need to reduce the numerator by the GCF of the DENOMINATOR
        //2/4 -> 1/2, 4/4 -> 1/1
        //we can keep all of the numerators only (we multiplied by the denominator)
        //but then we need to divide by the GCF
        //OR WE CAN REDUCE ALL OF THE FRACTIONS AND MULTIPLY BY THE LCM
        //THE LCM BEING ALL OF THE REDUCED DENOMINATORS MULTIPLIED TOGETHER
        console.log("mynumerators = ", mynumerators);

        let mydecnumerators = null;
        if (usenums) mydecnumerators = mynumerators;
        else mydecnumerators = mynumerators.map((val) => this.convertFractionToDecimal(val));
        console.log("mydecnumerators = ", mydecnumerators);

        let mymngcf = this.mainGCF(mydecnumerators);
        let mynewnums = mydecnumerators.map((val) => val /= mymngcf);
        console.log("mynewnums = ", mynewnums);
        console.log("DONE WITH CRAMER'S RULE NOW!");

        return {"ans": myans, "myintans": mynewnums, "mydet": mydet, "mynumerators": mydecnumerators};
    }
    static testCramersRule()
    {
        let usenums = true;
        let otherdecm = [[1, 2, 3], [3, 5, 7], [4, -3, 2]];
        console.log(this.CramersRule(otherdecm, [5, 7, 9], usenums));
        let otherfracm = otherdecm.map((marr) => marr.map((val) => "" + val));
        console.log(this.CramersRule(otherfracm, ["5", "7", "9"], usenums));
        //throw new Error("NOT DONE YET...!");
        let waterdecm = [[2, 0, -2], [0, 2, -1], [1, 0, 0]];
        console.log(this.CramersRule(waterdecm, [0, 0, 1], usenums));
        let waterfracsm = waterdecm.map((marr) => marr.map((val) => "" + val));
        console.log(this.CramersRule(waterfracsm, ["0", "0", "1"], false));
        //throw new Error("NOT DONE YET...!");
    }
}

export default Matrices;
