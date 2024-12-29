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
    static transpose(m, useobjsforlessthanthree=false)
    {
        //flip along dimensions....
        let cc = new commonclass();
        cc.letMustBeBoolean(useobjsforlessthanthree, "useobjsforlessthanthree");
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
            console.log("dims = ", dims);

            let nwm = null;
            let finuseobjinit = (useobjsforlessthanthree || !(dims.length < 3));
            if (dims[0] === dims[1].length)
            {
                //square matrix
                if (finuseobjinit) nwm = m.map((cval) => cval.map((val) => null));
                else nwm = m.map((cval) => cval.map((val) => 0));
                for (let r = 0; r < m.length; r++)
                {
                    for (let c = 0; c < m[r].length; c++) nwm[r][c] = m[c][r];
                }
            }
            else
            {
                //non-square matrix
                if (finuseobjinit) nwm = m[0].map((cval) => m.map((val) => null));
                else nwm = m[0].map((cval) => m.map((val) => 0));
                for (let r = 0; r < m.length; r++)
                {
                    for (let c = 0; c < m[r].length; c++) nwm[c][r] = m[r][c];
                }
            }
            return nwm;
        }
    }
    static testTranspose()
    {
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
        console.log(this.transpose(mysqr));
        console.log(this.identity([3, 3]));
        console.log(this.determinant(mysqr));//0

        let myom = [[1, 2], [3, 4], [5, 6]];
        console.log("myom = ", myom);
        console.log(this.dimensions(myom));
        console.log(this.identity([3, 2]));
        console.log(this.determinant(myom));//0
        
        let mytmyom = this.transpose(myom);
        console.log("mytmyom = ", mytmyom);
        console.log(this.dimensions(mytmyom));
        console.log(this.transpose(mytmyom));
        console.log(this.determinant(myom));//0

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
        let dims = this.dimensions(m);
        if (dims.length < 2) return m;
        //else;//do nothing

        //let myom = [[1, 2], [3, 4], [5, 6]];
        //[1, 2]
        //[3, 4]
        //[5, 6]
        if (userows) return m;
        else
        {
            let mycols = [];
            for (let c = 0; c < m[0].length; c++)
            {
                let mycol = [];
                for (let r = 0; r < m.length; r++) mycol.push(m[r][c]);
                mycols.push(mycol);
            }
            return mycols;
        }
    }

    static isRowTheSame(a, b, myrows)
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

    static doSomeOpOnAMatrix(m, opstr, num)
    {
        let opnum = -1;
        if (opstr === "*") opnum = 1;
        else if (opstr === "/") opnum = 2;
        else if (opstr === "+") opnum = 3;
        else if (opstr === "-") opnum = 4;
        else if (opstr === "%") opnum = 5;
        else if (opstr === "^") opnum = 6;
        else throw new Error("illegal operation string found!");

        if (opnum === 2 || opnum === 5)
        {
            if (num === 0) throw new Error("cannot divide by zero!");
            //else;//do nothing
        }
        //else;//do nothing

        let cc = new commonclass();
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
                if (dims.length === 1)
                {
                    let nwm = m.map((val) => {
                        if (opnum === 1) return val * num;
                        else if (opnum === 2) return val / num;
                        else if (opnum === 3) return val + num;
                        else if (opnum === 4) return val - num;
                        else if (opnum === 5) return val % num;
                        else if (opnum === 6) return Math.pow(val, num);
                        else throw new Error("illegal operation string found!");
                    });
                    return nwm;
                }
                else
                {
                    let nwm = m.map((marr) => marr.map((val) => {
                        if (opnum === 1) return val * num;
                        else if (opnum === 2) return val / num;
                        else if (opnum === 3) return val + num;
                        else if (opnum === 4) return val - num;
                        else if (opnum === 5) return val % num;
                        else if (opnum === 6) return Math.pow(val, num);
                        else throw new Error("illegal operation string found!");
                    }));
                    return nwm;
                }
            }
        }
        else
        {
            console.error("cannot do math because this has too big of dimensions!");
            return m;
        }
    }

    //matrix multiplication mulitply two matrices here... (NOT DONE YET)
    static multiply(a, b)
    {
        let cc = new commonclass();
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
        throw new Error("NOT DONE YET...!");
    }

    static canRowABeMultipliedByAConstantToGetRowB(a, b, myrows)
    {
        if (a === b) return true;
        //else;//do nothing

        //console.log(myrows[a]);
        //console.log(myrows[b]);
        
        let canrowabembyktogetb = true;
        let setc = true;
        let myconstant = 0;
        for (let c = 0; c < myrows[a].length; c++)
        {
            if (setc)
            {
                if (myrows[a][c] === 0);
                else
                {
                    myconstant = myrows[b][c] / myrows[a][c];
                    setc = false;
                    //console.log("myrows[" + b + "][" + c + "] = " + myrows[b][c]);
                    //console.log("myrows[" + a + "][" + c + "] = " + myrows[a][c]);
                    //console.log("myconstant = " + myconstant);
                }
            }
            else
            {
                if (myrows[a][c] * myconstant === myrows[b][c]);
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
            if (arr[n] === 0);
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
                                if (m[r][c] === 0);
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

    //opnum = 1 =, 2 <, 3 <=, 4 >, 5 =>
    static getNumberOfANumUnderOverAtOrMoreOnArr(r, num, arr, opnum)
    {
        console.log("r = " + r);
        console.log("num = " + num);
        console.log("arr = ", arr);
        if (r < 0) throw new Error("r is not allowed to be negative!");
        //else;//do nothing

        let cc = new commonclass();
        if (cc.isLetEmptyNullOrUndefined(arr)) return 0;
        else
        {
            let cnt = 0;
            for (let c = 0; c < arr[r].length; c++)
            {
                console.log("arr[" + r + "][" + c + "] = " + arr[r][c]);
                if (opnum === 1)
                {
                    if (arr[r][c] === num) cnt++;
                    //else;//do nothing
                }
                else if (opnum === 2)
                {
                    if (arr[r][c] < num) cnt++;
                    //else;//do nothing
                }
                else if (opnum === 3)
                {
                    if (arr[r][c] < num || arr[r][c] === num) cnt++;
                    //else;//do nothing
                }
                else if (opnum === 4)
                {
                    if (num < arr[r][c]) cnt++;
                    //else;//do nothing
                }
                else if (opnum === 5)
                {
                    if (num < arr[r][c] || arr[r][c] === num) cnt++;
                    //else;//do nothing
                }
                else throw new Error("illegal operation number found and used here!");
            }
            return cnt;
        }
    }
    //opnum = 1 =, 2 <, 3 <=, 4 >, 5 =>
    static getNumberOfANumOnArrWithDesiredOPStr(r, num, arr, opstr)
    {
        let opnum = -1;
        if (opstr === "=") opnum = 1;
        else if (opstr === "<") opnum = 2;
        else if (opstr === "<=") opnum = 3;
        else if (opstr === ">") opnum = 4;
        else if (opstr === "=>") opnum = 5;
        else throw new Error("illegal operation string found and used here!");
        return this.getNumberOfANumUnderOverAtOrMoreOnArr(r, num, arr, opnum);
    }
    static getNumberOfANumOnArr(r, num, arr) {
        return this.getNumberOfANumUnderOverAtOrMoreOnArr(r, num, arr, 1);
    }
    static getNumberOfNumsUnderNumOnArr(r, num, arr)
    {
        return this.getNumberOfANumUnderOverAtOrMoreOnArr(r, num, arr, 2);
    }
    static getNumberOfNumsAtOrUnderNumOnArr(r, num, arr)
    {
        return this.getNumberOfANumUnderOverAtOrMoreOnArr(r, num, arr, 3);
    }
    static getNumberOfNumsAboveNumOnArr(r, num, arr)
    {
        return this.getNumberOfANumUnderOverAtOrMoreOnArr(r, num, arr, 4);
    }
    static getNumberOfNumsAtOrAboveNumOnArr(r, num, arr)
    {
        return this.getNumberOfANumUnderOverAtOrMoreOnArr(r, num, arr, 5);
    }

    static determinant(m)
    {
        let cc = new commonclass();
        if (cc.isLetEmptyNullOrUndefined(m)) return 0;
        else
        {
            let dims = this.dimensions(m);
            console.log("m = ", m);
            console.log("dims = ", dims);

            if (dims.length < 3)
            {
                if (dims.length === 1) return m[0];
                //else;//do nothing safe to proceed below

                //is the matrix a square matrix, if so find it below return 0
                if (dims[0] === dims[1]);
                else return 0;//not a square matrix

                if (dims[0] === 2)
                {
                    //this is a 2 x 2 matrix determinant is: AD-BC
                    //[A, B][C, D]
                    return (m[0][0] * m[1][1]) - (m[0][1] * m[1][0]);
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
                console.log("mycols = ", mycols);
                console.log("myrows = ", myrows);

                //take some row r and go accross all of the columns comparing
                //the values against other rows
                for (let c = 0; c < mycols.length; c++)
                {
                    console.log("mycols[" + c + "] = ", mycols[c]);
                    if (this.doesRowOrColHaveAllZeros(mycols[c])) return 0;
                    //else;//do nothing
                    for (let k = c + 1; k < mycols.length; k++)
                    {
                        console.log("mycols[" + k + "] = ", mycols[k]);
                        if (this.isRowTheSame(c, k, mycols)) return 0;
                        //else;//do nothing
                        if (this.canRowABeMultipliedByAConstantToGetRowB(c, k, mycols)) return 0;
                        //else;//do nothing
                    }
                }
                for (let r = 0; r < myrows.length; r++)
                {
                    console.log("myrows[" + r + "] = ", myrows[r]);
                    if (this.doesRowOrColHaveAllZeros(myrows[r])) return 0;
                    //else;//do nothing
                    for (let k = r + 1; k < myrows.length; k++)
                    {
                        console.log("myrows[" + k + "] = ", myrows[k]);
                        if (this.isRowTheSame(r, k, myrows)) return 0;
                        //else;//do nothing
                        if (this.canRowABeMultipliedByAConstantToGetRowB(r, k, myrows)) return 0;
                        //else;//do nothing
                    }
                }
                
                //can one row or col be multiplied by a constant to get the other
                //if so determinant is zero.
                //handled above
                console.log("THE DETERMINANT IS NOT ZERO!");

                //if it is an identity or a diagnal matrix
                //then the determinant is the main diagnal multiplied by each other
                //otherwise proceed below
                if (this.isDiagnalMatrix(m))
                {
                    let myval = 1;
                    for (let r = 0; r < m.length; r++) myval *= m[r][r];
                    console.log("THIS IS A DIAGNAL MATRIX SO MULTIPLY MAIN DIAGNAL!");
                    console.log("myval = " + myval);
                    
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
                    this.getNumberOfANumOnArr(rindx, 0, myrows));
                let numonesonrws = myrows.map((arr, rindx) =>
                    this.getNumberOfANumOnArr(rindx, 1, myrows));
                let numzerosoncls = mycols.map((arr, rindx) =>
                    this.getNumberOfANumOnArr(rindx, 0, mycols));
                let numonesoncls = mycols.map((arr, rindx) =>
                    this.getNumberOfANumOnArr(rindx, 1, mycols));
                console.log("numzerosonrws = ", numzerosonrws);
                console.log("numonesonrws = ", numonesonrws);
                console.log("numzerosoncls = ", numzerosoncls);
                console.log("numonesoncls = ", numonesoncls);

                let numslessthantenonrws = myrows.map((arr, rindx) =>
                    this.getNumberOfANumOnArrWithDesiredOPStr(rindx, 10, myrows, "<"));
                let numslessthantenoncls = myrows.map((arr, rindx) =>
                    this.getNumberOfANumOnArrWithDesiredOPStr(rindx, 10, mycols, "<"));
                console.log("numslessthantenonrws = ", numslessthantenonrws);
                console.log("numslessthantenoncls = ", numslessthantenoncls);

                //if a row or column has 0s use it, next use 1, then the max under 10
                //then arbitrarily use the first row
                //if it has a zero, now need to pick the row or col with the most
                //same for 1s, then same for max under 10, then arbitrarily use the first row
                let zerofnd = false;
                for (let c = 0; c < numzerosonrws.length; c++)
                {
                    if (0 < numzerosonrws[c])
                    {
                        zerofnd = true;
                        break;
                    }
                    //else;//do nothing
                }
                let onefnd = false;
                for (let c = 0; c < numonesonrws.length; c++)
                {
                    if (0 < numonesonrws[c])
                    {
                        onefnd = true;
                        break;
                    }
                    //else;//do nothing
                }
                let numundrtenfnd = false;
                for (let c = 0; c < numslessthantenonrws.length; c++)
                {
                    if (0 < numslessthantenonrws[c])
                    {
                        numundrtenfnd = true;
                        break;
                    }
                    //else;//do nothing
                }
                console.log("zerofnd = " + zerofnd);
                console.log("onefnd = " + onefnd);
                console.log("numundrtenfnd = " + numundrtenfnd);

                if (zerofnd)
                {
                    //get the max on rows
                    //then the max on cols
                    //if one has more than the other use it
                    //if they are equal arbitrarily use row with the first zero found
                    let mxzerosfndonrws = -1;
                    let mxrwi = -1;
                    for (let c = 0; c < numzerosonrws.length; c++)
                    {
                        if (0 < numzerosonrws[c])
                        {
                            if (mxrwi < 0)
                            {
                                mxrwi = c;
                                mxzerosfndonrws = numzerosonrws[c];
                            }
                            else
                            {
                                if (mxzerosfndonrws < numzerosonrws[c])
                                {
                                    mxrwi = c;
                                    mxzerosfndonrws = numzerosonrws[c];
                                }
                                //else;//do nothing
                            }
                        }
                        //else;//do nothing
                    }//end of c for loop
                    console.log("mxzerosfndonrws = " + mxzerosfndonrws);
                    console.log("mxrwi = " + mxrwi);

                    if (mxrwi < 0 || numzerosonrws.length - 1 < mxrwi)
                    {
                        throw new Error("illegal index value found and used here for mxrwi!");
                    }
                    //else;//do nothing

                    let mxzerosfndoncls = -1;
                    let mxcli = -1;
                    for (let c = 0; c < numzerosoncls.length; c++)
                    {
                        if (0 < numzerosoncls[c])
                        {
                            if (mxcli < 0)
                            {
                                mxcli = c;
                                mxzerosfndoncls = numzerosoncls[c];
                            }
                            else
                            {
                                if (mxzerosfndoncls < numzerosoncls[c])
                                {
                                    mxcli = c;
                                    mxzerosfndoncls = numzerosoncls[c];
                                }
                                //else;//do nothing
                            }
                        }
                        //else;//do nothing
                    }//end of c for loop
                    console.log("mxzerosfndoncls = " + mxzerosfndoncls);
                    console.log("mxcli = " + mxcli);

                    if (mxcli < 0 || numzerosoncls.length - 1 < mxcli)
                    {
                        throw new Error("illegal index value found and used here for mxcli!");
                    }
                    //else;//do nothing

                    if (mxzerosfndonrws < mxzerosfndoncls)
                    {
                        userow = false;
                        mycl = mxcli;
                    }
                    else
                    {
                        userow = true;
                        myrw = mxrwi;
                    }
                }
                else
                {
                    if (onefnd)
                    {
                        let mxonesfndonrws = -1;
                        let mxrwi = -1;
                        for (let c = 0; c < numonesonrws.length; c++)
                        {
                            if (0 < numonesonrws[c])
                            {
                                if (mxrwi < 0)
                                {
                                    mxrwi = c;
                                    mxonesfndonrws = numonesonrws[c];
                                }
                                else
                                {
                                    if (mxonesfndonrws < numonesonrws[c])
                                    {
                                        mxrwi = c;
                                        mxonesfndonrws = numonesonrws[c];
                                    }
                                    //else;//do nothing
                                }
                            }
                            //else;//do nothing
                        }//end of c for loop
                        console.log("mxonesfndonrws = " + mxonesfndonrws);
                        console.log("mxrwi = " + mxrwi);

                        if (mxrwi < 0 || numonesonrws.length - 1 < mxrwi)
                        {
                            throw new Error("illegal index value found and used here for mxrwi!");
                        }
                        //else;//do nothing

                        let mxonesfndoncls = -1;
                        let mxcli = -1;
                        for (let c = 0; c < numonesoncls.length; c++)
                        {
                            if (0 < numonesoncls[c])
                            {
                                if (mxcli < 0)
                                {
                                    mxcli = c;
                                    mxonesfndoncls = numonesoncls[c];
                                }
                                else
                                {
                                    if (mxonesfndoncls < numonesoncls[c])
                                    {
                                        mxcli = c;
                                        mxonesfndoncls = numonesoncls[c];
                                    }
                                    //else;//do nothing
                                }
                            }
                            //else;//do nothing
                        }//end of c for loop
                        console.log("mxonesfndoncls = " + mxonesfndoncls);
                        console.log("mxcli = " + mxcli);

                        if (mxcli < 0 || numonesoncls.length - 1 < mxcli)
                        {
                            throw new Error("illegal index value found and used here for mxcli!");
                        }
                        //else;//do nothing

                        if (mxonesfndonrws < mxonesfndoncls)
                        {
                            userow = false;
                            mycl = mxcli;
                        }
                        else
                        {
                            userow = true;
                            myrw = mxrwi;
                        }
                    }
                    else
                    {
                        if (numundrtenfnd)
                        {
                            let mxnumsundertenfndonrws = -1;
                            let mxrwi = -1;
                            for (let c = 0; c < numslessthantenonrws.length; c++)
                            {
                                if (0 < numslessthantenonrws[c])
                                {
                                    if (mxrwi < 0)
                                    {
                                        mxrwi = c;
                                        mxnumsundertenfndonrws = numslessthantenonrws[c];
                                    }
                                    else
                                    {
                                        if (mxnumsundertenfndonrws < numslessthantenonrws[c])
                                        {
                                            mxrwi = c;
                                            mxnumsundertenfndonrws = numslessthantenonrws[c];
                                        }
                                        //else;//do nothing
                                    }
                                }
                                //else;//do nothing
                            }//end of c for loop
                            console.log("mxnumsundertenfndonrws = " + mxnumsundertenfndonrws);
                            console.log("mxrwi = " + mxrwi);

                            if (mxrwi < 0 || numslessthantenonrws.length - 1 < mxrwi)
                            {
                                throw new Error("illegal index value found and used here for mxrwi!");
                            }
                            //else;//do nothing

                            let mxnumsundertenfndoncls = -1;
                            let mxcli = -1;
                            for (let c = 0; c < numslessthantenoncls.length; c++)
                            {
                                if (0 < numslessthantenoncls[c])
                                {
                                    if (mxcli < 0)
                                    {
                                        mxcli = c;
                                        mxnumsundertenfndoncls = numslessthantenoncls[c];
                                    }
                                    else
                                    {
                                        if (mxnumsundertenfndoncls < numslessthantenoncls[c])
                                        {
                                            mxcli = c;
                                            mxnumsundertenfndoncls = numslessthantenoncls[c];
                                        }
                                        //else;//do nothing
                                    }
                                }
                                //else;//do nothing
                            }//end of c for loop
                            console.log("mxnumsundertenfndoncls = " + mxnumsundertenfndoncls);
                            console.log("mxcli = " + mxcli);

                            if (mxcli < 0 || numslessthantenoncls.length - 1 < mxcli)
                            {
                                throw new Error("illegal index value found and used here for mxcli!");
                            }
                            //else;//do nothing

                            if (mxnumsundertenfndonrws < mxnumsundertenfndoncls)
                            {
                                userow = false;
                                mycl = mxcli;
                            }
                            else
                            {
                                userow = true;
                                myrw = mxrwi;
                            }
                        }
                        else
                        {
                            //arbitrarily make a choice...
                            userow = true;
                            myrw = 0;
                        }
                    }
                }
                console.log("userow = " + userow);
                console.log("myrw = " + myrw);
                console.log("mycl = " + mycl);


                let mydval = 0;
                if (userow)
                {
                    if (myrw < 0) throw new Error("myrw is not allowed to be negative!");
                    //else;//do nothing

                    for (let c = 0; c < m[myrw].length; c++)
                    {
                        let cfval = this.getSignOfCofactor(myrw, c) * m[myrw][c] *
                            this.determinant(this.getMinor(m, myrw, c));
                        mydval += cfval;
                        console.log("cfval = " + cfval);
                        console.log("NEW mydval = " + mydval);
                    }
                }
                else
                {
                    if (mycl < 0) throw new Error("mycl is not allowed to be negative!");
                    //else;//do nothing

                    for (let r = 0; r < m.length; r++)
                    {
                        let cfval = this.getSignOfCofactor(r, mycl) * m[r][mycl] *
                            this.determinant(this.getMinor(m, r, mycl));
                        mydval += cfval;
                        console.log("cfval = " + cfval);
                        console.log("NEW mydval = " + mydval);
                    }
                }
                console.log("FINAL mydval = " + mydval);

                return mydval;
            }
            else return 0;//cannot do computations with this
        }
    }
    static testDeterminant()
    {
        let minim = [1];
        console.log(this.isDiagnalMatrix(minim));//true
        console.log(this.dimensions(minim));//[1]
        console.log(this.determinant(minim));//1

        let myom = [[1, 2], [3, 4], [5, 6]];
        console.log("myom = ", myom);
        console.log(this.dimensions(myom));
        console.log(this.determinant(myom));//0

        console.log(this.doSomeOpOnAMatrix(myom, "*", 2));
        console.log(this.doSomeOpOnAMatrix([1, 2, 3], "*", 2));
        //throw new Error("NEED TO TEST MATH ON WHOLE MATRIX RESULTS NOW!");

        let mytmom = this.transpose(myom);
        console.log("mytmom = ", mytmom);
        console.log(this.dimensions(mytmom));
        console.log(this.determinant(mytmom));//0

        let srwm = [[1, 2, 3], [4, 5, 6], [1, 2, 3]];
        console.log("srwm = ", srwm);
        console.log(this.determinant(srwm));//0

        let sclm = [[1, 4, 1], [2, 5, 2], [3, 6, 3]];
        console.log("sclm = ", sclm);
        console.log(this.determinant(sclm));//0

        let zrwm = [[0, 0, 0], [4, 5, 6], [1, 2, 3]];
        console.log("zrwm = ", zrwm);
        console.log(this.determinant(zrwm));//0

        let zclm = [[0, 4, 1], [0, 5, 2], [0, 6, 3]];
        console.log("zclm = ", zclm);
        console.log(this.determinant(zclm));//0

        let mcrwm = [[1, 2, 3], [4, 5, 6], [2, 4, 6]];
        console.log("mcrwm = ", mcrwm);
        console.log(this.determinant(mcrwm));//0

        let mcclm = [[1, 4, 2], [2, 5, 4], [3, 6, 6]];
        console.log("mcclm = ", mcclm);
        console.log(this.isDiagnalMatrix(mcclm));
        console.log(this.determinant(mcclm));//0

        let idm = this.identity([3, 3]);
        console.log("idm = ", idm);
        console.log(this.isDiagnalMatrix(idm));
        console.log(this.determinant(idm));//1

        let diagtst = [[3, 0, 0], [0, 3, 0], [0, 0, 3]];
        console.log("diagtst = ", diagtst);
        console.log(this.isDiagnalMatrix(diagtst));
        console.log(this.determinant(diagtst));//3*3*3=27

        this.testTranspose();
        
        //other tests
        throw new Error("NOT DONE YET...!");
    }
}

export default Matrices;
