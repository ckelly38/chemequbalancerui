class commonclass {
  isLetUndefined(val) { return (val === undefined); }
  isLetUndefinedOrNull(val) { return (val === null || this.isLetUndefined(val)); }
  isLetEmptyNullOrUndefined(val) { return (this.isLetUndefinedOrNull(val) || val.length < 1); }
  letMustBeDefinedAndNotNull(val, varnm="varnm")
  {
    if (this.isLetEmptyNullOrUndefined(varnm)) return this.letMustBeDefinedAndNotNull(val, "varnm");
    //else;//do nothing
    if (this.isLetUndefinedOrNull(val)) throw new Error(varnm + " must be defined and not null!");
    else return true;
  }
  letMustNotBeEmpty(val, varnm="varnm")
  {
    if (this.isLetEmptyNullOrUndefined(varnm)) return this.letMustNotBeEmpty(val, "varnm");
    //else;//do nothing
    if (this.isLetEmptyNullOrUndefined(val)) throw new Error(varnm + " must not be empty!");
    else return true;
  }
  letMustBeEmpty(val, varnm="varnm")
  {
    if (this.isLetEmptyNullOrUndefined(varnm)) return this.letMustBeEmpty(val, "varnm");
    //else;//do nothing
    if (this.isLetEmptyNullOrUndefined(val)) return true;
    else throw new Error(varnm + " must be empty, null, or undefined!");
  }
  letMustBeBoolean(val, varnm="varnm")
  {
    if (this.isLetEmptyNullOrUndefined(varnm)) return this.letMustBeBoolean(val, "varnm");
    //else;//do nothing
    this.letMustBeDefinedAndNotNull(val, "varnm");
    if (val === true || val === false) return true;
    else throw new Error(varnm + " must be boolean, but it was not!");
  }

  getAllIndexesOf(qstr, mystr, offset = 0)
  {
    //console.log("qstr = " + qstr);
    //console.log("mystr = " + mystr);
    //console.log("offset = " + offset);
    if (this.isLetUndefinedOrNull(mystr))
    {
      if (this.isLetUndefinedOrNull(qstr)) return [0 + offset];
      else return [-1];
    }
    else
    {
      if (this.isLetUndefinedOrNull(qstr)) return [-1];
      else
      {
        if (this.isLetEmptyNullOrUndefined(mystr))
        {
          if (this.isLetEmptyNullOrUndefined(qstr)) return [0 + offset];
          else return [-1];
        }
        else
        {
          if (qstr === mystr) return [0 + offset];
          else
          {
            let myindx = mystr.indexOf(qstr);
            //console.log("myindx = " + myindx);

            if (myindx < 0) return [-1];
            else
            {
              //the strings are both not empty and not null
              //the index is at least 0
              //take the first one, then remove it from the string + add offset
              let myreslist = [myindx + offset];
              let nwstr = mystr.substring(myindx + qstr.length);
              let myoreslist = this.getAllIndexesOf(qstr, nwstr, offset + mystr.length - nwstr.length);
              //console.log("RESULTS:");
              //console.log("mystr = " + mystr);
              //console.log("nwstr = " + nwstr);
              //console.log("myreslist = ", myreslist);
              //console.log("myoreslist = ", myoreslist);

              if (this.isLetEmptyNullOrUndefined(myoreslist)) return myreslist;
              else
              {
                let mynwres = [myindx + offset];
                myoreslist.forEach((item) => {
                  if (item < 0);
                  else mynwres.push(item);
                });
                //console.log("FINAL LIST: mynwres = ", mynwres);
                
                return mynwres;
              }
            }
          }
        }
      }
    }
  }

  testGetAllIndexesOf()
  {
    console.log("BEGIN TEST 1:");
    console.log(this.getAllIndexesOf("abc", "abc123abc456abcdeabc", 0));//[0, 6, 12, 17]
    console.log("BEGIN TEST 2:");
    console.log(this.getAllIndexesOf("abc", "123abc123abc456abcdeabc", 0));//[3, 9, 15, 20]
    //                                  01234567890123456789012
    //                                  0         1         2
  }
}

export default commonclass;
