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

        let mynbytm = [1, 2, 3];
        console.log("mynbytm = ", mynbytm);
        console.log(this.dimensions(mynbytm));
        console.log(this.determinant(mynbytm));//0

        let mytnbytm = this.transpose(mynbytm);
        console.log("mytnbytm = ", mytnbytm);
        console.log(this.dimensions(mytnbytm));
        console.log(this.determinant(mytnbytm));//0
        console.log(this.transpose(mytnbytm));
        console.log("ABOVE SHOULD BE THE SAME AS: mynbytm = ", mynbytm);

        let mydummynum = [1];
        console.log(this.transpose(mydummynum));//[1]
        console.log(this.dimensions(mydummynum));//[1]
        console.log(this.determinant(mydummynum));//1

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
                //added rounding to account for the rounding error so the inverse of a matrix
                //can be closer to being accurate
                if (dims.length === 1)
                {
                    let nwm = m.map((val) => {
                        if (opnum === 1)
                        {
                            return this.mul(val, num);
                            //return (Math.round(this.mul(val, num) * 10000) / 10000);
                        }
                        else if (opnum === 2)
                        {
                            return (val / num);
                            //return (Math.round((val / num) * 10000) / 10000);
                        }
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
                        if (opnum === 1)
                        {
                            return this.mul(val, num);
                            //return (Math.round(this.mul(val, num) * 10000) / 10000);
                        }
                        else if (opnum === 2)
                        {
                            return (val / num);//return (Math.round((val / num) * 10000) / 10000);
                        }
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

    //matrix multiplication mulitply two matrices here...
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
        
        let dimsa = this.dimensions(a);
        let dimsb = this.dimensions(b);
        console.log("a = ", a);
        console.log("b = ", b);
        console.log("dimsa = ", dimsa);
        console.log("dimsb = ", dimsb);

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
            console.log("a is a matrix with " + numrsa + " rows and " + numcsa + " cols!");
            console.log("b is a matrix with " + numrsb + " rows and " + numcsb + " cols!");

            if (numcsa === numrsb)
            {
                console.log("initially can multiply!");
            }
            else
            {
                //cannot multiply
                console.log("initially cannot multiply! Might be able to multiply a " +
                    "transpose of a 1D array otherwise cannot multiply!");
                if (dimsa.length === 1)
                {
                    if (numrsa === numrsb) return this.multiply(this.transpose(a), b);
                    //else;//do nothing
                }
                //else;//do nothing
                if (dimsb.length === 1)
                {
                    if (numcsa === numcsb) return this.multiply(a, this.transpose(b));
                    //else;//do nothing
                }
                //else;//do nothing

                //handle the scalar multiplication here
                if (numrsa === 1 && numcsa === 1)
                {
                    if (numrsb === 1 && numcsb === 1) return [this.mul(a[0], b[0])];
                    else return this.doSomeOpOnAMatrix(b, "*", a[0]);
                }
                else
                {
                    if (numrsb === 1 && numcsb === 1) return this.doSomeOpOnAMatrix(a, "*", b[0]);
                    //else;//do nothing
                }
                
                throw new Error("cannot multiply these matrices or not by a legal transpose of " +
                    "a 1D array!");
            }
            console.log("can mutliply these matrices!");

            let resnumrs = numrsa;
            let resnumcs = numcsb;
            console.log("resmatrix is a matrix with " + resnumrs + " rows and " + resnumcs + " cols!");
            
            //initialize the new matrix
            let resm = [];
            if (1 < resnumrs)
            {
                for (let r = 0; r < resnumrs; r++)
                {
                    let myrwarr = [];
                    for (let c = 0; c < resnumcs; c++) myrwarr.push(0);
                    resm.push(myrwarr);
                }
            }
            else for (let c = 0; c < resnumcs; c++) resm.push(0);

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
                                console.log("a[" + ra + "][" + rb + "] = " + a[ra][rb]);
                                console.log("b[" + rb + "][" + cb + "] = " + b[rb][cb]);
                                console.log("mulitplied = " + this.mul(a[ra][rb], b[rb][cb]));
                                console.log("OLD resm[" + ra + "][" + cb + "] = " + resm[ra][cb]);
                                
                                resm[ra][cb] += this.mul(a[ra][rb], b[rb][cb]);
                                console.log("NEW resm[" + ra + "][" + cb + "] = " + resm[ra][cb]);
                            }//end of rb = ca
                        }
                        else
                        {
                            //dimsb.length is 1
                            console.log("a[" + ra + "][0] = " + a[ra][0]);
                            console.log("b[" + cb + "] = " + b[cb]);
                            console.log("mulitplied = " + this.mul(a[ra][0], b[cb]));
                            console.log("OLD resm[" + ra + "][" + cb + "] = " + resm[ra][cb]);
                            
                            resm[ra][cb] += this.mul(a[ra][0], b[cb]);
                            console.log("NEW resm[" + ra + "][" + cb + "] = " + resm[ra][cb]);
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
                        console.log("a[" + rb + "] = " + a[rb]);
                        console.log("b[" + rb + "][" + cb + "] = " + b[rb][cb]);
                        console.log("mulitplied = " + this.mul(a[rb], b[rb][cb]));
                        console.log("OLD resm[" + cb + "] = " + resm[cb]);
                        
                        resm[cb] += this.mul(a[rb], b[rb][cb]);
                        console.log("NEW resm[" + cb + "] = " + resm[cb]);
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
        console.log(this.multiply([2], mygentbytm));//[2, 4, 6], [8, 10, 12], [14, 16, 18];
        console.log(this.multiply(this.identity([3, 3]), mygentbytm));//mygentbytm
        
        let mytbytwom = [[7, 8], [9, 10], [11, 12]];
        let mytwobytm = [[1, 2, 3], [4, 5, 6]];
        console.log(this.multiply(mytwobytm, mytbytwom));//[58, 64], [139, 154]
        
        let mytbyfr = [[13, 9, 7, 15], [8, 7, 4, 6], [6, 4, 0, 3]];
        console.log(this.multiply([3, 4, 2], mytbyfr));//[83, 63, 37, 75]
        console.log(this.multiply([1, 2, 3], [[4], [5], [6]]));//[32]
        console.log(this.multiply([[4], [5], [6]], [1, 2, 3]));//[[4, 8, 12], [5, 10, 15], [6, 12, 18]]
        
        //throw new Error("NOT DONE YET...!");
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
                    c = -1;
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
        //console.log("r = " + r);
        //console.log("num = " + num);
        //console.log("arr = ", arr);
        if (r < 0) throw new Error("r is not allowed to be negative!");
        //else;//do nothing

        let cc = new commonclass();
        if (cc.isLetEmptyNullOrUndefined(arr)) return 0;
        else
        {
            let cnt = 0;
            for (let c = 0; c < arr[r].length; c++)
            {
                //console.log("arr[" + r + "][" + c + "] = " + arr[r][c]);
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

    //this errors out if not a 2D matrix
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


    //HELPER METHODS FOR GETTING THE DETERMINANT (FOR PICKING WHERE TO START)

    static maxItemsFoundOnMyArray(myarr)
    {
        let cc = new commonclass();
        cc.letMustNotBeEmpty(myarr, "myarr");

        let mxnumfnd = -1;
        let mxrorci = -1;
        for (let c = 0; c < myarr.length; c++)
        {
            if (0 < myarr[c])
            {
                if (mxrorci < 0)
                {
                    mxrorci = c;
                    mxnumfnd = myarr[c];
                }
                else
                {
                    if (mxnumfnd < myarr[c])
                    {
                        mxrorci = c;
                        mxnumfnd = myarr[c];
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

    static getUseRowAndColIndexsInfo(rwarr, clarr, basenmforarrs="mxnumfndon")
    {
        let cc = new commonclass();
        if (cc.isLetEmptyNullOrUndefined(basenmforarrs))
        {
            return this.getUseRowAndColIndexsInfo(rwarr, clarr, "mxnumfndon");
        }
        //else;//do nothing

        let userow = true;
        let mycl = -1;
        let myrw = -1;
        let mymxitemsonarrzerosrw = this.maxItemsFoundOnMyArray(rwarr);
        let mxnumfndonrws = mymxitemsonarrzerosrw.maxnumfound;
        let mxrwi = mymxitemsonarrzerosrw.maxroworcoli;
        console.log(basenmforarrs + "rws = " + mxnumfndonrws);
        console.log("mxrwi = " + mxrwi);

        let mymxitemsonarrzeroscl = this.maxItemsFoundOnMyArray(clarr);
        let mxnumfndoncls = mymxitemsonarrzeroscl.maxnumfound;
        let mxcli = mymxitemsonarrzeroscl.maxroworcoli;
        console.log(basenmforarrs + "cls = " + mxnumfndoncls);
        console.log("mxcli = " + mxcli);

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
                if (dims.length === 1) return ((dims[0] === 1) ? m[0] : 0);
                //else;//do nothing safe to proceed below

                //is the matrix a square matrix, if so find it below return 0
                if (dims[0] === dims[1]);
                else return 0;//not a square matrix

                if (dims[0] === 2)
                {
                    //this is a 2 x 2 matrix determinant is: AD-BC
                    //[A, B][C, D]
                    return this.mul(m[0][0], m[1][1]) - this.mul(m[0][1], m[1][0]);
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
                for (let n = 0; n < 2; n++)
                {
                    let myarr = ((n === 0) ? mycols : myrows);
                    let mytpstr = ((n === 0) ? "mycols" : "myrows");
                    for (let rorc = 0; rorc < myarr.length; rorc++)
                    {
                        console.log(mytpstr + "[" + rorc + "] = ", myarr[rorc]);
                        if (this.doesRowOrColHaveAllZeros(myarr[rorc])) return 0;
                        //else;//do nothing
                        for (let k = rorc + 1; k < myarr.length; k++)
                        {
                            console.log(mytpstr + "[" + k + "] = ", myarr[k]);
                            if (this.areTwoRowsOrColsTheSame(rorc, k, myarr)) return 0;
                            //else;//do nothing
                            if (this.canRowABeMultipliedByAConstantToGetRowB(rorc, k, myarr)) return 0;
                            //else;//do nothing
                        }
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
                console.log("zerofnd = " + zerofnd);
                console.log("onefnd = " + onefnd);
                console.log("numundrtenfnd = " + numundrtenfnd);

                if (zerofnd)
                {
                    //get the max on rows
                    //then the max on cols
                    //if one has more than the other use it
                    //if they are equal arbitrarily use row with the first zero found
                    //index is valid this was already checked
                    let myuserwclobj = this.getUseRowAndColIndexsInfo(numzerosonrws,
                        numzerosoncls, "mxzerosfndon");
                    userow = myuserwclobj.userow;
                    myrw = myuserwclobj.myrw;
                    mycl = myuserwclobj.mycl;
                }
                else
                {
                    if (onefnd)
                    {
                        let myuserwclobj = this.getUseRowAndColIndexsInfo(numonesonrws,
                            numonesoncls, "mxonesfndon");
                        userow = myuserwclobj.userow;
                        myrw = myuserwclobj.myrw;
                        mycl = myuserwclobj.mycl;
                    }
                    else
                    {
                        if (numundrtenfnd)
                        {
                            let myuserwclobj = this.getUseRowAndColIndexsInfo(numslessthantenonrws,
                                numslessthantenoncls, "mxnumsundertenfndon");
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
                        let cfval = this.mul(this.mul(this.getSignOfCofactor(myrw, c), m[myrw][c]),
                            this.determinant(this.getMinor(m, myrw, c)));
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
                        let cfval = this.mul(this.mul(this.getSignOfCofactor(r, mycl), m[r][mycl]),
                            this.determinant(this.getMinor(m, r, mycl)));
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
        this.testMuliply();
    }

    //returns null when determinant is zero, but error will be printed out to the console
    static inverse(m)
    {
        let cc = new commonclass();
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

            let mydet = this.determinant(m);
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
            console.log("myidentitym = ", myidentitym);

            let isidm = true;
            for (let r = 0; r < m.length; r++)
            {
                for (let c = 0; c < m[r].length; c++)
                {
                    if (m[r][c] === myidentitym[r][c]);
                    else
                    {
                        isidm = false;
                        break;
                    }
                }
                if (isidm);
                else break;
            }
            console.log("isidm = " + isidm);

            if (isidm) return m;
            //else;//do nothing proceed below


            //create a matrix of cofactors
            //then transpose the matrix of cofactors
            //then multiply that by 1/(determinant of the original matrix)
            let mofcofactors = null;
            if (mydims[0] === 2 && mydims[1] === 2) 
            {
                let nwb = ((m[0][1] === 0) ? 0 : this.mul(-1, m[0][1]));
                let nwc = ((m[1][0] === 0) ? 0 : this.mul(-1, m[1][0]));
                mofcofactors = [[m[1][1], nwb], [nwc, m[0][0]]];
            }
            else
            {
                mofcofactors = m.map((marr, rindx) => marr.map((val, cindx) => {
                    let detminr = this.determinant(this.getMinor(m, rindx, cindx));
                    return this.mul(this.getSignOfCofactor(rindx, cindx), detminr);
                }));
                mofcofactors = this.transpose(mofcofactors);
            }
            return this.doSomeOpOnAMatrix(mofcofactors, "/", mydet);
        }
    }
    static testInverse()
    {
        this.testDeterminant();

        console.log(this.inverse([1]));
        
        let myorigtwobytwo = [[-3, 4], [2, -1]];
        console.log("myorigtwobytwo = ", myorigtwobytwo);

        let myinvtwobytwo = this.inverse(myorigtwobytwo);
        console.log("myinvtwobytwo = ", myinvtwobytwo);
        //[[1/5 or 0.2, 2/5 or 0.4], [3/5 or 0.6, 4/5 or 0.8]]
        console.log(this.inverse(myinvtwobytwo));
        console.log("THE ABOVE SHOULD BE EQUAL TO: myorigtwobytwo = ", myorigtwobytwo);
        
        let myorigtbyt = [[1, 1, 1], [1, 2, 2], [2, 3, 4]];
        console.log("myorigtbyt = ", myorigtbyt);

        let myinvorigtbyt = this.inverse(myorigtbyt);//[2, -1, 0], [0, 2, -1], [-1, -1, 1]
        console.log("myinvorigtbyt = ", myinvorigtbyt);
        console.log(this.inverse(myinvorigtbyt));
        console.log("ABOVE SHOULD BE EQUAL TO: myorigtbyt = ", myorigtbyt);

        console.log(this.inverse(this.identity([3, 3])));//should be the same
        //same for all diagnal matrices I think
        
        let diagtst = [[3, 0, 0], [0, 3, 0], [0, 0, 3]];
        console.log("diagtst = ", diagtst);
        console.log(this.isDiagnalMatrix(diagtst));
        
        let myinvdiagtest = this.inverse(diagtst);
        console.log("myinvdiagtest = ", myinvdiagtest);

        console.log(this.inverse(myinvdiagtest));
        console.log("THE ABOVE SHOULD BE EQUAL TO: diagtst = ", diagtst);
        
        //throw new Error("NOT DONE YET...!");
    }

    static SolveViaMatrixInverse(a, bans)
    {
        //ax=b -> x=b/a=(a^(-1))*b -> 1/a=a^(-1)=a_inverse a*(a^(-1)) = IDENTITY -> IDENTITY * x = x
        let cc = new commonclass();
        cc.letMustNotBeEmpty(a, "a");
        cc.letMustNotBeEmpty(bans, "bans");
        let myres = this.multiply(this.inverse(a), bans);
        console.log("MYRES_AX=B = ", myres);

        let myfracs = myres.map((val) => this.toFrac(val));
        console.log("myfracs = ", myfracs);

        //take all denominators get their GCFs
        //then multiply by them to get integers
        //then return
        //if the GCF of all denominators is 1, then just multiply them all together
        //that will be the LCM. Then multiply all numerators by it.
        let mynumrs = [];
        let mydenoms = [];
        myfracs.forEach((val) => {
            mynumrs.push(val[0]);
            mydenoms.push(val[1]);
        });
        let mylcd = this.mainLCM(mydenoms);
        console.log("mylcd = " + mylcd);

        let myints = mynumrs.map((val, indx) => ((mylcd / mydenoms[indx]) * val));
        console.log("myints = " + myints);

        return {"ans": myres, "myintans": myints, "mydenoms": mydenoms, "mynumerators": mynumrs};
    }
    static testSolveViaInverse()
    {
        //hangs the browser on toFrac
        //console.log(this.SolveViaMatrixInverse([[1, 2, 3], [3, 5, 7], [4, -3, 2]], [5, 7, 9]));
        console.log(this.SolveViaMatrixInverse([[2, 0, -2], [0, 2, -1], [1, 0, 0]], [0, 0, 1]));
        throw new Error("NOT DONE YET...!");
    }

    static gcf(a, b)
    {
        //https://www.cuemath.com/numbers/gcf-greatest-common-factor/
        //console.log("GCF OF a = " + a + " AND b = " + b + ":");
        if (b === a) return a;
        else if (a === 0 || b === 0) return 0;
        else if (a === 1 || b === 1) return 1;
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

    //https://stackoverflow.com/questions/23575218/convert-decimal-number-to-fraction-in-javascript-or-closest-fraction
    //https://stackoverflow.com/questions/14002113/how-to-simplify-a-decimal-into-the-smallest-possible-fraction
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

    static CramersRule(a, bans)
    {
        console.log("a = ", a);
        console.log("bans = ", bans);

        let mydet = this.determinant(a);
        console.log("mydet = ", mydet);

        if (mydet === 0)
        {
            console.error("this has no inverse, the determinant is zero. Therefore the " +
                "system has infinitely many solutions or no solution!");
            return null;
        }
        //else;//do nothing safe to proceed

        //now to solve for x we need to substitute the answer matrix into each column
        //then get that determinant and divide by main determinant for each x
        let mynumerators = a[0].map((val) => 0);
        let myans = a[0].map((val, cindx) => {
            let nwdet = this.determinant(this.replaceAColWith(a, bans, cindx));
            let nwans = Math.round((nwdet / mydet) * 1000) / 1000;
            mynumerators[cindx] = nwdet;
            console.log("ans[" + cindx + "] = " + nwans);
            return nwans;
        });
        //need to reduce the numerator by the GCF of the DENOMINATOR
        //2/4 -> 1/2, 4/4 -> 1/1
        //we can keep all of the numerators only (we multiplied by the denominator)
        //but then we need to divide by the GCF
        //OR WE CAN REDUCE ALL OF THE FRACTIONS AND MULTIPLY BY THE LCM
        //THE LCM BEING ALL OF THE REDUCED DENOMINATORS MULTIPLIED TOGETHER
        console.log("mynumerators = ", mynumerators);

        let mymngcf = this.mainGCF(mynumerators);
        let mynewnums = mynumerators.map((val) => val /= mymngcf);
        console.log("mynewnums = ", mynewnums);

        return {"ans": myans, "myintans": mynewnums, "mydet": mydet, "mynumerators": mynumerators};
    }
    static testCramersRule()
    {
        console.log(this.CramersRule([[1, 2, 3], [3, 5, 7], [4, -3, 2]], [5, 7, 9]));
        console.log(this.CramersRule([[2, 0, -2], [0, 2, -1], [1, 0, 0]], [0, 0, 1]));
    }
}

export default Matrices;
