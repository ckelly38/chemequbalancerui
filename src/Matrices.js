import commonclass from "./commonclass";

class Matrices
{
    static transpose(m)
    {
        //flip along dimensions....
        let cc = new commonclass();
        if (cc.isLetEmptyNullOrUndefined(m)) return null;
        else
        {
            //take this
            //[1, 2]    [1, 3, 5]    [1, 2, 3]    [1, 4, 7]
            //[3, 4] -> [2, 4, 6] or [4, 5, 6] -> [2, 5, 8]
            //[5, 6]                 [7, 8, 9]    [3, 6, 9]
            //max r is 3; max c is 2; 
            //for the square m[r][c] = m[c][r]
            if (m.length === m[0].length)
            {
                let nwm = m.map((cval) => cval.map((val) => 0));
                for (let r = 0; r < m.length; r++)
                {
                    for (let c = 0; c < m[r].length; c++) nwm[r][c] = m[c][r];
                }
                return nwm;
            }
            else
            {
                throw new Error("NOT DONE YET 12-26-2024!");
            }
        }
    }
    static testTranspose()
    {
        let mysqr = [];
        for (let n = 0; n < 3; n++)
        {
            let mytemparr = [];
            for (let k = 0; k < 3; k++) mytemparr.push((n + 1)*(k + 1));
            mysqr.push(mytemparr);
        }
        console.log("mysqr = ", mysqr);
        console.log(this.transpose(mysqr));

        let myom = [[1, 2], [3, 4], [5, 6]];
        console.log("myom = ", myom);
        
        let mytmyom = this.transpose(myom);
        console.log("mytmyom = ", mytmyom);
        console.log(this.transpose(mytmyom));
    }
}

export default Matrices;
