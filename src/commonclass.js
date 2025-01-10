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
    this.letMustBeDefinedAndNotNull(val, varnm);
    if (val === true || val === false) return true;
    else throw new Error(varnm + " must be boolean, but it was not!");
  }

  isNotANumber(deflet) { return (this.isLetUndefinedOrNull(deflet) || isNaN(deflet)); }

  letmustbeanumber(deflet, vnm="var")
  {
    this.letMustBeDefinedAndNotNull(vnm, "vnm");

    if (this.isNotANumber(deflet)) throw new Error(vnm + " must be a number, but it was not!");
    //else;//do nothing
  }

  bothListsMustBeTheSameSize(lista, listb, listanm="lista", listbnm="listb")
  {
    this.letMustNotBeEmpty(listanm, "lista name");
    this.letMustNotBeEmpty(listbnm, "listb name");

    const errmsg = "" + listanm + " and " + listbnm + " must both be the same size!";
    if (this.isLetUndefinedOrNull(lista))
    {
      if (this.isLetUndefinedOrNull(listb));
      else throw new Error(errmsg);
    }
    else
    {
      if (this.isLetUndefinedOrNull(listb)) throw new Error(errmsg);
      else
      {
        if (lista.length === listb.length);
        else throw new Error(errmsg);
      }
    }
  }

  //IS STRING INDEX OR NUM VALID METHODS

  //both max and min are included
  isNumInvalid(num, minnum, maxnum)
  {
    this.letmustbeanumber(num, "num");
    this.letmustbeanumber(minnum, "minnum");
    this.letmustbeanumber(maxnum, "maxnum");
    return (num < minnum || maxnum < num);
  }

  stringIndexIsInvalid(indx, mstr, minvindx = 0)
  {
    this.letMustBeDefinedAndNotNull(mstr, "mstr");
    return this.isNumInvalid(indx, minvindx, mstr.length - 1);
  }

  stringIndexOfIsInvalid(querystr, mstr, minvindx = 0)
  {
    this.letMustBeDefinedAndNotNull(mstr, "mstr");
    this.letMustBeDefinedAndNotNull(querystr, "querystr");
    this.letmustbeanumber(minvindx, "minvindx");
    return this.stringIndexIsInvalid(mstr.indexOf(querystr), mstr, minvindx);
  }

  letNumMustBeValid(num, minnum, maxnum)
  {
    if (this.isNumInvalid(num, minnum, maxnum))
    {
      throw new Error("the number must be valid, but it was not!");
    }
    else return true;
  }

  letNumMustBeInvalid(num, minnum, maxnum)
  {
    if (this.isNumInvalid(num, minnum, maxnum)) return true;
    else throw new Error("the number must not be valid, but it was!");
  }

  letStringIndexMustBeValid(strindx, str, minvindx = 0)
  {
    if (this.stringIndexIsInvalid(strindx, str, minvindx)) 
    {
      throw new Error("the string index must be valid, but it was not!");
    }
    else return true;
  }

  letStringIndexMustBeInvalid(strindx, str, minvindx = 0)
  {
    if (this.stringIndexIsInvalid(strindx, str, minvindx)) return true;
    else throw new Error("the string index must not be valid, but it was!");
  }

  //SOME BASIC STRING OPERATION METHODS AND TYPE OF CHARACTER METHODS

  isDigit(mchar)
  {
    this.letMustBeDefinedAndNotNull(mchar, "mchar");
    
    if (mchar.length === 1)
    {
      if (mchar === '0' || mchar === '1' || mchar === '2' || mchar === '3' || mchar === '4' ||
        mchar === '5' || mchar === '6' || mchar === '7' || mchar === '8' || mchar === '9')
      {
        return true;
      }
      else return false;
    }
    else throw new Error("not a character!");
  }

  mylower(mstr)
  {
    return (this.isLetUndefinedOrNull(mstr) ? null : ((mstr.length < 1) ? "" : mstr.toLowerCase()));
  }

  myupper(mstr)
  {
    return (this.isLetUndefinedOrNull(mstr) ? null : ((mstr.length < 1) ? "" : mstr.toUpperCase()));
  }

  myisupper(mstr)
  {
    return (this.isLetEmptyNullOrUndefined(mstr) ? true : (mstr === this.myupper(mstr)));
  }
  myislower(mstr)
  {
    return (this.isLetEmptyNullOrUndefined(mstr) ? true : (mstr === this.mylower(mstr)));
  }

  isLetter(mstr)
  {
    if (this.isLetEmptyNullOrUndefined(mstr)) return false;
    else
    {
      if (mstr.length === 1);
      else return false;

      const myalpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const myochr = mstr.toUpperCase();
      const mci = myalpha.indexOf(myochr);
      if (mci < 0 || myalpha.length < mci || myalpha.length === mci) return false;
      else return true;
    }
  }

  isalnum(mstr) { return (this.isLetter(mstr) || this.isDigit(mstr)); }

  //it must include the starting index given
  //-1 will be returned if the string is empty
  //an error will be thrown if there is no number found at the given index
  getNumStartOrEndIndexGivenTheOther(mystr, numsorei, isstart, igspcs = false)
  {
    this.letMustBeBoolean(igspcs, "igspcs");
    this.letMustBeBoolean(isstart, "isstart");
    this.letmustbeanumber(numsorei, "numsorei");
    if (this.isLetEmptyNullOrUndefined(mystr)) return -1;
    //else;//do nothing

    const delta = (isstart ? 1 : -1);
    for (let i = numsorei; ((0 < i || i === 0) && i < mystr.length); i += delta)
    {
      if (this.isDigit(mystr.charAt(i)));
      else
      {
        if (i === numsorei) throw new Error("it must be a number at the numsorei, but it was not!");
        else
        {
          let retnow = ((mystr.charAt(i) === ' ' && igspcs) ? false : true);
          if (retnow) return (isstart ? i : i + 1);
          //else;//do nothing
        }
      }
    }
    return (isstart ? mystr.length : 0);
  }
  getNumEndIndexGivenStart(mystr, numsi, igspcs = false)
  {
    return this.getNumStartOrEndIndexGivenTheOther(mystr, numsi, true, igspcs);
  }
  //inclusive ei
  getNumStartIndexGivenEnd(mystr, numei, igspcs = false)
  {
    return this.getNumStartOrEndIndexGivenTheOther(mystr, numei, false, igspcs);
  }

  //it must include the starting index given
  //an error will be thrown if there is no number found at the given index
  getNumGivenStartOrEndIndex(mystr, numsorei, isstart, igspcs = false)
  {
    this.letMustNotBeEmpty(mystr, "mystr");
    this.letMustBeBoolean(igspcs, "igspcs");
    this.letmustbeanumber(numsorei, "numsorei");
    this.letStringIndexMustBeValid(numsorei, mystr, 0);

    //console.log("mystr = " + mystr);
    //console.log("numsorei = " + numsorei);
    //console.log("isstart = " + isstart);
    //console.log("igspcs = " + igspcs);

    let osorei = this.getNumStartOrEndIndexGivenTheOther(mystr, numsorei, isstart, igspcs);
    //console.log("osorei = " + osorei);

    this.letStringIndexMustBeValid(osorei, mystr, 0);

    let numsi = (isstart ? numsorei : osorei);
    let numei = (isstart ? osorei : numsorei);
    //console.log("numsi = " + numsi);
    //console.log("numei = " + numei);
    
    let mynumstr = null;
    if (numei + 1 < mystr.length) mynumstr = mystr.substring(numsi, numei + 1);
    else if (numei + 1 === mystr.length) mynumstr = mystr.substring(numsi);
    else throw new Error("illegal num end index found and used here!");
    //console.log("mynumstr = " + mynumstr);
    
    let mynum = Number(mynumstr);
    //console.log("mynum = " + mynum);

    return mynum;
  }
  getNumGivenEndIndex(mystr, numei, igspcs = false)
  {
    return this.getNumGivenStartOrEndIndex(mystr, numei, false, igspcs);
  }
  getNumGivenStartIndex(mystr, numsi, igspcs = false)
  {
    return this.getNumGivenStartOrEndIndex(mystr, numsi, true, igspcs);
  }

  //-1 will be returned if the string is empty or not found
  //strsi is the starting index used and this works forwards
  getNumStartIndex(mystr, strsi = 0)
  {
    this.letmustbeanumber(strsi, "strsi");
    if (strsi < 0) return this.getNumStartIndex(mystr, 0);
    //else;//do nothing
    if (this.isLetEmptyNullOrUndefined(mystr)) return -1;
    //else;//do nothing

    for (let i = strsi; i < mystr.length; i++)
    {
      if (this.isDigit(mystr.charAt(i))) return i;
      //else;//do nothing
    }
    return -1;
  }
  //-1 will be returned if the string is empty or not found
  //strsi is the starting index used and this works backwards
  //the end index is exclusive
  getNumEndIndex(mystr, strsi = 0)
  {
    this.letmustbeanumber(strsi, "strsi");
    if (this.isLetEmptyNullOrUndefined(mystr)) return -1;
    //else;//do nothing
    if (strsi < 0) return this.getNumEndIndex(mystr, mystr.length - 1);
    //else;//do nothing

    let useex = true;
    for (let i = strsi; ((i === 0 || 0 < i) && i < mystr.length); i--)
    {
      if (this.isDigit(mystr.charAt(i))) return (useex ? i + 1 : i);
      //else;//do nothing
    }
    return -1;
  }
  //calls the two above
  getNumStartOrEndIndex(mystr, usestart, strsi = 0)
  {
    this.letMustBeBoolean(usestart, "usestart");
    return (usestart ? this.getNumStartIndex(mystr, strsi) : this.getNumEndIndex(mystr, strsi));
  }

  hasNoDigitsInString(mystr) { return (this.getNumStartIndex(mystr, 0) < 0); }

  testGetNumStartOrEndIndexGivenOther()
  {
    let mytempdoctext = "013294790237809";// asldfjkasldjflkasdjfkljsdalkf
    //                   012345678901234
    //                   0         1
    console.log(this.getNumStartIndexGivenEnd(mytempdoctext, 14, false));//0
    console.log(this.getNumEndIndexGivenStart(mytempdoctext, 0, false));//15
    
    mytempdoctext = "013294790237809 asldfjkasldjflkasdjfkljsdalkf";
    console.log(this.getNumEndIndex(mytempdoctext, mytempdoctext.length - 1));

    mytempdoctext = "asldfjkasldjflkasdjfkljsdalkf 013294790237809";
    console.log(this.getNumStartIndex(mytempdoctext, 0));
  }

  getAllNumbersFromTheString(mystr, strsi = 0, addnumsi = 0, igspcs = false)
  {
    this.letMustBeBoolean(igspcs, "igspcs");
    this.letmustbeanumber(strsi, "strsi");
    this.letmustbeanumber(addnumsi, "addnumsi");
    if (addnumsi < 0) return this.getAllNumbersFromTheString(mystr, strsi, 0, igspcs);
    //else;//do nothing
    if (this.isLetEmptyNullOrUndefined(mystr)) return null;
    //else;//do nothing

    //console.log("mystr = " + mystr);
    //console.log("strsi = " + strsi);
    this.letStringIndexMustBeValid(strsi, mystr, 0);

    let numsi = this.getNumStartIndex(mystr, strsi);
    if (numsi < 0) return null;
    else
    {
      let numei = this.getNumEndIndexGivenStart(mystr, numsi, igspcs);
      let mynumstr = mystr.substring(numsi, numei);
      let myretarr = [{"num": Number(mynumstr), "si": addnumsi + numsi, "ei": addnumsi + numei,
        "value": mynumstr}];
      if (numei < mystr.length)
      {
        let mytempretarr = this.getAllNumbersFromTheString(mystr, numei, addnumsi, igspcs);
        if (this.isLetEmptyNullOrUndefined(mytempretarr));
        else mytempretarr.forEach((itemobj) => myretarr.push(itemobj));
      }
      //else;//do nothing
      return myretarr;
    }
  }

  testGetAllNumbersFromTheString()
  {
    console.log(this.getAllNumbersFromTheString("05-04-2024", 0, false));
  }

  //SPLIT METHODS

  //precondition: mystring and mydelim indexs come from the same string and correspond
  mySplit(mystr, mydlimis, mydelimlens)
  {
    //console.log("INSIDE OF MY-SPLIT():");
    //console.log("mystr = " + mystr);
    //console.log("mydlimis = ", mydlimis);
    //console.log("mydelimlens = ", mydelimlens);
    this.bothListsMustBeTheSameSize(mydlimis, mydelimlens, "mydlimis", "mydelimlens");

    let retarr = [];
    if (this.isLetEmptyNullOrUndefined(mydlimis)) retarr.push(mystr);
    else
    {
      for (let n = 0; n < mydelimlens.length; n++)
      {
        this.letmustbeanumber(mydelimlens[n], "mydelimlens[" + n + "]");
        if (mydelimlens[n] < 0)
        {
          throw new Error("invalid length (" + mydelimlens[n] + ") found for the delimeter!");
        }
        //else;//do nothing
      }

      for (let n = 0; n < mydlimis.length; n++)
      {
        if (n === 0)
        {
          let fpart = mystr.substring(0, mydlimis[0]);
          if (this.isLetEmptyNullOrUndefined(fpart));
          else retarr.push(fpart);
        }
        else
        {
          //console.log("si = " + (mydlimis[n - 1] + mydelimlens[n - 1]));
          //console.log("ei = " + mydlimis[n]);
          //console.log(mystr.substring(mydlimis[n - 1] + mydelimlens[n - 1], mydlimis[n]));
          let fpart = mystr.substring(mydlimis[n - 1] + mydelimlens[n - 1], mydlimis[n]);
          if (this.isLetEmptyNullOrUndefined(fpart));
          else retarr.push(fpart);
        }
        if (n + 1 === mydlimis.length)
        {
          let fpart = mystr.substring(mydlimis[n] + mydelimlens[n]);
          if (this.isLetEmptyNullOrUndefined(fpart));
          else retarr.push(fpart);
        }
        //else;//do nothing
      }
    }
    //console.log(retarr);
    return retarr;
  }
  mySplitMain(mystr, mydlimis, cdelimlen)
  {
    if (this.isLetUndefinedOrNull(mydlimis)) return [mystr];
    else return this.mySplit(mystr, mydlimis, mydlimis.map((val) => cdelimlen));
  }

  //removes all of the delimeter from the string and combines the remaining parts into a new string
  mySplitAndJoin(delimstr, mystr)
  {
    let mydelimis = this.getAllIndexesOf(delimstr, mystr, false);
    //often not found in any format, so a shortcut might be safe
    let mydelimsplitarr = this.mySplitMain(mystr, mydelimis, delimstr.length);
    //console.log("mydelimsplitarr = " + mydelimsplitarr);

    let nwfmtstr = mydelimsplitarr.join("");
    //console.log("nwfmtstr = " + nwfmtstr);

    return nwfmtstr;
  }

  replaceAllOfAWithBOnTheString(mystr, qstr, repstr)
  {
    if (this.isLetEmptyNullOrUndefined(mystr)) return null;
    else
    {
      if (this.isLetEmptyNullOrUndefined(qstr)) return mystr;
      else
      {
        if (this.isLetUndefinedOrNull(repstr)) return mystr.split(qstr).join("");
        else return ((qstr === repstr) ? mystr : mystr.split(qstr).join(repstr));
      }
    }
  }

  testMySplit()
  {
    let mylwrtxt = "this is a very long string of text with data and numbers!";
    //              0123456789012345678901234567890123456789012345678901234567
    //              0         1         2         3         4         5
    //console.log(this.mySplitMain(mylwrtxt, [4, 9, 19, 29, 39, 48], -1));
    //error invalid delimeter length
    console.log(this.mySplit(mylwrtxt, [4, 9, 19, 29, 39, 48], [2, 1, 1, 3, 1, 2]));
    console.log(this.mySplitMain(mylwrtxt, [4, 9, 19, 29, 39, 48], 0));
    console.log(this.mySplitMain(mylwrtxt, [4, 9, 19, 29, 39, 48], 1));
    console.log(this.mySplitAndJoin(" ", mylwrtxt));
    //this.mySplitMain(mylwrtxt, all indexes of delimeter, length of delimeter)
    console.log(this.mySplitAndJoin("z", mylwrtxt));
    console.log(mylwrtxt.split("z"));
    console.log(mylwrtxt.split(" "));
    console.log(mylwrtxt.split(" ").join(""));
  }

  //a permutation generator where each dial can have different mins and maxs
  //they could also be the same
  //returns a string array with numbers separated by spaces like so: 0 0, 0 1, 1 0, 1 1
  //cdnum is dial num index which is the index on the maxs and the mins
  //to call to start call with total num dials - 1: on the given example it will be called with 4 - 1 = 3
  //let us say we have a min array all at 0
  //let us say we have a max array like this: [1, 1, 2, 1]; the max for dial cdni=2 is 2
  //the dial when written out will that will a b c d will be c dial
  permutationGeneratorWithMinsAndMaxs(cdnum, minsperdials, maxsperdials, basestr="")
  {
    if (this.isLetUndefinedOrNull(basestr))
    {
      return this.permutationGeneratorWithMinsAndMaxs(cdnum, minsperdials, maxsperdials, "");
    }
    //else;//do nothing

    //console.log("cdnum = " + cdnum);
    //console.log("minsperdials = ", minsperdials);//in test case 4 0s: [0, 0, 0, 0]
    //console.log("maxsperdials = ", maxsperdials);//in test case 2 1s a 2 and a 1 [1, 1, 2, 1]
    //console.log("basestr = " + basestr);

    this.letmustbeanumber(cdnum, "cdnum");
    if (cdnum < 0) throw new Error("cdnum must be at least 0!");
    //else;//do nothing

    this.bothListsMustBeTheSameSize(minsperdials, maxsperdials, "minsperdials", "maxsperdials");
    if (this.isLetEmptyNullOrUndefined(minsperdials)) return basestr;
    //else;//do nothing

    //error check maxs and mins and if there is a problem swap them
    let neednwmxmns = false;
    for (let n = 0; n < minsperdials.length; n++)
    {
      this.letmustbeanumber(minsperdials[n]);
      this.letmustbeanumber(maxsperdials[n]);

      if (maxsperdials[n] < minsperdials[n])
      {
        //need to create a new array and swap out the values then return with correct values enforced...
        //if (neednwmxmns);
        //else console.log("need new maxs and mins!");
        neednwmxmns = true;
      }
      //else;//do nothing
    }

    if (neednwmxmns)
    {
      let nwmns = [];
      let nwmxs = [];
      for (let n = 0;  n < minsperdials.length; n++)
      {
        if (maxsperdials[n] < minsperdials[n])
        {
          nwmns.push(maxsperdials[n]);
          nwmxs.push(minsperdials[n]);
        }
        else
        {
          nwmxs.push(maxsperdials[n]);
          nwmns.push(minsperdials[n]);
        }
      }

      return this.permutationGeneratorWithMinsAndMaxs(cdnum, nwmns, nwmxs, basestr);
    }
    //else;//do nothing safe to proceed
    //console.log("after error checking!");

    //3 2 1 0 DIAL NUMBERS:
    //0 0 0 0
    //0 0 0 1
    //0 0 1 0
    //0 0 1 1
    //0 0 2 0
    //0 0 2 1
    //0 1 0 0
    //0 1 0 1
    //0 1 1 0
    //0 1 1 1
    //0 1 2 0
    //0 1 2 1
    //1 0 0 0
    //1 0 0 1
    //1 0 1 0
    //1 0 1 1
    //1 0 2 0
    //1 0 2 1
    //1 1 0 0
    //1 1 0 1
    //1 1 1 0
    //1 1 1 1
    //1 1 2 0
    //1 1 2 1

    //numdials is at least 2
    //with 2
    //0 0
    //0 1
    //1 0
    //1 1
    //
    //with 3
    //0 0 0
    //0 0 1
    //0 1 0
    //0 1 1
    //1 0 0
    //1 0 1
    //1 1 0
    //1 1 1
    
    //how do we separate the dials, we use spaces
    //take returned by the first dial 0, 1 prepend the first item of the second dial to it
    //then prepend the nth item of the second dial to the returned by the first
    //0 0, 0 1, 1 0, 1 1

    //take the first item in the nth dial and prepend it to the n-1 dial result
    //initial call numdials = 2, basestr = "", min = 0, max = 1
    //the next calls here numdials = 1, basestr = "0 ", min = 0, max = 1
    //the next calls here numdials = 1, basestr = "1 ", min = 0, max = 1
    //...
    //the next calls here numdials = 1, basestr = "max ", min = 0, max = 1
    //
    //initial call numdials = 3, basestr = "", min = 0, max = 1
    //the next calls here numdials = 2, basestr = "0 ", min = 0, max = 1
    //the next calls here numdials = 2, basestr = "1 ", min = 0, max = 1
    //...
    //the next calls here numdials = 2, basestr = "max ", min = 0, max = 1

    const minnum = minsperdials[minsperdials.length - cdnum - 1];
    const maxnum = maxsperdials[minsperdials.length - cdnum - 1];
    //console.log("minnum = " + minnum);
    //console.log("maxnum = " + maxnum);

    let restrarr = [];
    for (let n = minnum; n < maxnum + 1; n++)
    {
      if (0 < cdnum)
      {
        let tempstrarr = this.permutationGeneratorWithMinsAndMaxs(cdnum - 1, minsperdials, maxsperdials,
          "" + basestr + n + " ");
        //console.log("tempstrarr = ", tempstrarr);

        for (let x = 0; x < tempstrarr.length; x++) restrarr.push(tempstrarr[x]);
      }
      else if (cdnum === 0)
      {
        //console.log("n = " + n);
        restrarr.push("" + basestr + n);
      }
      else throw new Error("illegal value found and used for cdnum here!");
    }//end of n for loop
    //console.log("restrarr = ", restrarr);
    
    return restrarr;
  }
  permutationGenerator(numdials, basestr="", minnum = 0, maxnum = 1)
  {
    this.letmustbeanumber(numdials, "numdials");
    this.letmustbeanumber(minnum, "minnum");
    this.letmustbeanumber(maxnum, "maxnum");

    //console.log("numdials = " + numdials);
    //console.log("basestr = " + basestr);
    //console.log("minnum = " + minnum);
    //console.log("maxnum = " + maxnum);
    if (this.isLetUndefinedOrNull(basestr))
    {
      return this.permutationGenerator(numdials, "", minnum, maxnum);
    }
    if (maxnum < minnum) return this.permutationGenerator(numdials, basestr, maxnum, minnum);
    if (numdials < 1) return null;
    else
    {
      let mins = [];
      for (let n = 0; n < numdials; n++) mins.push(minnum);
      let maxs = [];
      for (let n = 0; n < numdials; n++) maxs.push(maxnum);
      return this.permutationGeneratorWithMinsAndMaxs(numdials - 1, mins, maxs, "");
    }
  }

  testPermutationGenerator()
  {
    for (let n = 4; (0 < n || n === 0); n--) console.log(this.permutationGenerator(n, "", 0, 1));
    console.log(this.permutationGeneratorWithMinsAndMaxs(3, [0, 0, 0, 0], [1, 1, 2, 1], ""));
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
