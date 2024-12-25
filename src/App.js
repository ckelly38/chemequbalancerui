import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import ElemBaseComp from "./ElemBaseComp";

//TITLE
//ADD TO CURRENT NEW REACTANT SET
//ELEMENT BASE ELEMENT BASE ... + .... -> ...
//
//REACTANTS -> PRODUCTS
//           =
//...
function App() {
  //elembase has element, base# but one reactant has a bunch of elements and bases
  //element, base#, num, type
  let initrobj = {"id": "r1_0", "element": "", "base": 1, "isreactant": true, "num": 1, "canrem": false};
  let initpobj = {"id": "p1_0", "element": "", "base": 1, "isreactant": false, "num": 1,
    "canrem": false};
  let [myelembasearr, setElembaseArr] = useState([initrobj, initpobj]);
  
  function isLetUndefined(val) { return (val === undefined); }
  function isLetUndefinedOrNull(val) { return (val === null || isLetUndefined(val)); }
  function isLetEmptyNullOrUndefined(val) { return (isLetUndefinedOrNull(val) || val.length < 1); }
  function letMustBeDefinedAndNotNull(val, varnm="varnm")
  {
    if (isLetEmptyNullOrUndefined(varnm)) return letMustBeDefinedAndNotNull(val, "varnm");
    //else;//do nothing
    if (isLetUndefinedOrNull(val)) throw new Error(varnm + " must be defined and not null!");
    else return true;
  }
  function letMustNotBeEmpty(val, varnm="varnm")
  {
    if (isLetEmptyNullOrUndefined(varnm)) return letMustNotBeEmpty(val, "varnm");
    //else;//do nothing
    if (isLetEmptyNullOrUndefined(val)) throw new Error(varnm + " must not be empty!");
    else return true;
  }
  function letMustBeEmpty(val, varnm="varnm")
  {
    if (isLetEmptyNullOrUndefined(varnm)) return letMustBeEmpty(val, "varnm");
    //else;//do nothing
    if (isLetEmptyNullOrUndefined(val)) return true;
    else throw new Error(varnm + " must be empty, null, or undefined!");
  }
  function letMustBeBoolean(val, varnm="varnm")
  {
    if (isLetEmptyNullOrUndefined(varnm)) return letMustBeBoolean(val, "varnm");
    //else;//do nothing
    letMustBeDefinedAndNotNull(val, "varnm");
    if (val === true || val === false) return true;
    else throw new Error(varnm + " must be boolean, but it was not!");
  }

  function getAllIndexesOf(qstr, mystr, offset = 0)
  {
    //console.log("qstr = " + qstr);
    //console.log("mystr = " + mystr);
    //console.log("offset = " + offset);
    if (isLetUndefinedOrNull(mystr))
    {
      if (isLetUndefinedOrNull(qstr)) return [0 + offset];
      else return [-1];
    }
    else
    {
      if (isLetUndefinedOrNull(qstr)) return [-1];
      else
      {
        if (isLetEmptyNullOrUndefined(mystr))
        {
          if (isLetEmptyNullOrUndefined(qstr)) return [0 + offset];
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
              let myoreslist = getAllIndexesOf(qstr, nwstr, offset + mystr.length - nwstr.length);
              //console.log("RESULTS:");
              //console.log("mystr = " + mystr);
              //console.log("nwstr = " + nwstr);
              //console.log("myreslist = ", myreslist);
              //console.log("myoreslist = ", myoreslist);

              if (isLetEmptyNullOrUndefined(myoreslist)) return myreslist;
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

  function testGetAllIndexesOf()
  {
    console.log("BEGIN TEST 1:");
    console.log(getAllIndexesOf("abc", "abc123abc456abcdeabc", 0));//[0, 6, 12, 17]
    console.log("BEGIN TEST 2:");
    console.log(getAllIndexesOf("abc", "123abc123abc456abcdeabc", 0));//[3, 9, 15, 20]
    //                                  01234567890123456789012
    //                                  0         1         2
  }

  function getMaxReactantOrProductsNum(myarr, usereactants)
  {
    letMustNotBeEmpty(myarr, "myarr");
    letMustBeBoolean(usereactants, "usereactants");
    
    let myrsorpsarr = myarr.filter((mval) => (mval.isreactant === usereactants));
    //this array will now have just the reactants or just the products
    //console.log("myrsorpsarr = ", myrsorpsarr);

    let mxnum = -1;
    for (let n = 0; n < myrsorpsarr.length; n++)
    {
      if (myrsorpsarr[n].num < 1)
      {
        throw new Error("illegal reactant or product number found and used here!");
      }
      //else;//do nothing

      if (n === 0) mxnum = myrsorpsarr[n].num;
      else
      {
        if (mxnum < myrsorpsarr[n].num) mxnum = myrsorpsarr[n].num;
        //else;//do nothing
      }
    }//end of n for loop
    //console.log("mxnum = " + mxnum);

    if (mxnum < 1) throw new Error("illegal value found and used for the maximum number!");
    else return mxnum;
  }
  function getMaxReactantsNum(myarr) { return getMaxReactantOrProductsNum(myarr, true); }
  function getMaxProductsNum(myarr) { return getMaxReactantOrProductsNum(myarr, false); }

  //SOME STATE METHODS

  function addItemToElemsArr(valobj)
  {
    letMustBeDefinedAndNotNull(valobj, "new-reactant-or-product");
    setElembaseArr([...myelembasearr, valobj]);
  }

  function addNewReactantOrProduct(myarr, usereactants)
  {
    letMustBeBoolean(usereactants, "usereactants");
    let mynwobj = {...initrobj};
    mynwobj.canrem = true;
    mynwobj.isreactant = usereactants;
    mynwobj.num = getMaxReactantOrProductsNum(myarr, usereactants) + 1;
    mynwobj.id = (usereactants ? "r" : "p") + mynwobj.num + "_0";
    console.log("mynwobj = ", mynwobj);
    addItemToElemsArr(mynwobj);
  }

  //null will be returned if the item was not found
  function getMyItem(midstr)
  {
    for (let n = 0; n < myelembasearr.length; n++)
    {
      if (myelembasearr[n].id === midstr) return myelembasearr[n];
      //else;//do nothing
    }
    return null;
  }

  function setMyItem(nval)
  {
    let mynwarr = myelembasearr.map((mobj) => {
      if (mobj.id === nval.id) return nval;
      else return mobj;
    });
    setElembaseArr(mynwarr);
  }

  function addNewReactantOrProductToOne(mynum, usereactants)
  {
    letMustBeBoolean(usereactants, "usereactants");
    
    let myropswithnum = myelembasearr.filter((mobj) =>
      (mobj.isreactant === usereactants && mobj.num === mynum));
    let mxidnum = -1;
    for (let n = 0; n < myropswithnum.length; n++)
    {
      let cmidstr = myropswithnum[n].id;
      let cnumstr = cmidstr.substring(cmidstr.indexOf("_") + 1);
      if (mxidnum < 0) mxidnum = Number(cnumstr);
      else
      {
        if (mxidnum < Number(cnumstr)) mxidnum = Number(cnumstr);
        else if (mxidnum === Number(cnumstr)) throw new Error("there are no duplicate ids allowed!");
        //else;//do nothing
      }
    }//end of n for loop
    console.log("mxidnum = " + mxidnum);

    if (mxidnum < 0)
    {
      throw new Error("negative numbers not allowed here for the idnum because it is an index!");
    }
    //else;//do nothing

    let mynwobj = {...initrobj};
    mynwobj.canrem = true;
    mynwobj.isreactant = usereactants;
    mynwobj.num = mynum;
    mynwobj.id = (usereactants ? "r" : "p") + mynwobj.num + "_" + (mxidnum + 1);
    console.log("mynwobj = ", mynwobj);
    addItemToElemsArr(mynwobj);
  }

  function removeLastReactantOrProduct(myarr, usereactants)
  {
    let mxnum = getMaxReactantOrProductsNum(myarr, usereactants);
    let mynwarr = myarr.filter((mobj) => !(mobj.isreactant === usereactants && mobj.num === mxnum));
    console.log("mynwarr = ", mynwarr);
    setElembaseArr(mynwarr);
  }

  function removeFromThisOne(idstr)
  {
    console.log("remidstr = " + idstr);
    letMustNotBeEmpty(idstr, "idstr");
    let mynwarr = myelembasearr.filter((mobj) => !(mobj.id === idstr));
    console.log("mynwarr = ", mynwarr);
    setElembaseArr(mynwarr);
  }


  //DISPLAY METHODS

  function getMyReactantsOrProductsFromArray(myarr, usereactants)
  {
    letMustNotBeEmpty(myarr, "myarr");
    letMustBeBoolean(usereactants, "usereactants");
    
    let myrsorpsarr = myarr.filter((mval) => (mval.isreactant === usereactants));
    //this array will now have just the reactants or just the products
    console.log("usereactants = " + usereactants);
    console.log("myrsorpsarr = ", myrsorpsarr);
    
    //we want to create ElemBaseComps as necessary and +s when necessary
    //ideally this list is sorted first before we continue
    //because those with the same "num": 1 will be rendered right next to each other...
    //ideally we know the max number first...
    let mxnum = -1;
    for (let n = 0; n < myrsorpsarr.length; n++)
    {
      if (myrsorpsarr[n].num < 1)
      {
        throw new Error("illegal reactant or product number found and used here!");
      }
      //else;//do nothing

      if (n === 0) mxnum = myrsorpsarr[n].num;
      else
      {
        if (mxnum < myrsorpsarr[n].num) mxnum = myrsorpsarr[n].num;
        //else;//do nothing
      }
    }//end of n for loop
    console.log("mxnum = " + mxnum);

    if (mxnum < 1) throw new Error("illegal value found and used for the maximum number!");
    //else;//do nothing

    for (let n = 1; n < mxnum + 1; n++)
    {
      let fndit = false;
      for (let k = 0; k < myrsorpsarr.length; k++)
      {
        if (myrsorpsarr[k].num === n)
        {
          fndit = true;
          break;
        }
        //else;//do nothing
      }
      if (fndit);
      else
      {
        throw new Error("the reactant or product numbers must be in sequence, " +
          "duplicates are allowed!");
      }
    }//end of n for loop
    console.log("the reactant or product numbers are all valid!");

    //the order does not matter, but having two of the same does
    let myreselems = [];
    for (let n = 1; n < mxnum + 1; n++)
    {
      //get all of them that have the same num
      let myobjsfcnum = myrsorpsarr.filter((mobj) => (mobj.num === n));
      let kynm = (usereactants ? "r" : "p") + n;
      let myelemsindiv = myobjsfcnum.map((mobj, mindx) => {
        let mfulkystr = "" + kynm + "_" + mindx;
        return (<ElemBaseComp midstr={mfulkystr} key={mfulkystr} getitem={getMyItem}
          showbtns={(mindx + 1 === myobjsfcnum.length)} canremthis={mobj.canrem} setitem={setMyItem}
          addtothis={addNewReactantOrProductToOne} remfromthis={removeFromThisOne} />);
      });
      myreselems.push(<div key={kynm} style={{display: "inline-block"}}>
        <input id={kynm + "coeff"} key={kynm + "coeff"} name={kynm + "coeff"} type="number" min="1"
          defaultValue="1" style={{width: "45px", resize: true}} />{myelemsindiv}</div>);
      if (n + 1 < mxnum + 1)
      {
        myreselems.push(<span key={kynm + "plus"} style={{display: "inline-block", fontSize: "40px"}}>
          {" + "}</span>);
      }
      //else;//do nothing
    }//end of n for loop
    console.log("myreselems = ", myreselems);

    return myreselems;
  }

  function genReactantsOrProductsDivs(myarr, usereactants)
  {
    letMustBeBoolean(usereactants, "usereactants");

    const mynm = (usereactants ? "reactant" : "product");
    return (<div id={mynm + "s"} style={{display: "inline-block"}}>
      {getMyReactantsOrProductsFromArray(myarr, usereactants)}</div>);
  }

  function genControlButtons(myarr, usereactants)
  {
    letMustBeBoolean(usereactants, "usereactants");

    const mynm = (usereactants ? "reactant" : "product");
    const cpnm = mynm.substring(0, 1).toUpperCase() + mynm.substring(1);
    const mxrorpnum = getMaxReactantOrProductsNum(myelembasearr, usereactants);
    return (<><button onClick={(event) => addNewReactantOrProduct(myelembasearr, usereactants)}
      type="button">Add A New {cpnm}</button>
      {(1 < mxrorpnum) ?
        <button onClick={(event) => removeLastReactantOrProduct(myelembasearr, usereactants)}
          type="button">Remove Last {cpnm}</button> : null}</>);
  }

  function genEquationOrCountRows(myelems, hnames, myelsis, myeleis, mybasis, mybaeis,
    useequrows, inconetimes=false)
  {
    letMustBeBoolean(useequrows, "useequrows");
    letMustBeBoolean(inconetimes, "inconetimes");

    //the first col is the element, then the reactants, then =, then the products
    let retzerolc = useequrows;//user preference includes the 0 * lc
    //let inconetimes = false;//user preference includes the 1 * lc
    const mytpstr = (useequrows ? "equ" : "bal");
    let mybdyrws = myelems.map((elem) => {
      console.log("elem = " + elem);

      if (isLetEmptyNullOrUndefined(elem)) return null;
      //else;//do nothing safe to proceed

      let mycolsonrw = hnames.map((hnm, mhindx) => {
        console.log("hnm = " + hnm);
        console.log("mhindx = " + mhindx);
        console.log("myelsis[" + mhindx + "] = ", myelsis[mhindx]);
        console.log("myeleis[" + mhindx + "] = ", myeleis[mhindx]);
        console.log("mybasis[" + mhindx + "] = ", mybasis[mhindx]);
        console.log("mybaeis[" + mhindx + "] = ", mybaeis[mhindx]);
        
        if (hnm === "->")
        {
          return (<td key={elem + mytpstr + "equals"} style={{border: "1px solid black"}}>=</td>);
        }
        else if (hnm === "elements")
        {
          return (<td key={elem + mytpstr + hnm} style={{border: "1px solid black"}}>{elem + ":"}</td>);
        }
        else
        {
          //the hnm is now in r or p _ num * elem base * ... + ...
          //r is reactants, p is products, num is the reactant number starting at 1
          //elem is the element and this will always be present
          //the * separates elem bases combos from the lc and others
          //the + separates the reactants (this will not be present in the hnm, but it goes up to it)
          //the base is a number, digits only, therefore if no digits are present base is 1
          //the base of 1 may still be present, but the setting above determines that
          //we want the base immediately after our element, and the lc
          //if our element is not present, then: 0 * lc or just 0
          let lcnm = hnm.substring(0, hnm.indexOf(" * "));//MAY NEED TO CHANGE FOR BALANCE ROWS
          console.log("lcnm = " + lcnm);

          let elemi = hnm.indexOf(elem);
          console.log("elemi = " + elemi);

          let iselemnotfnd = (elemi < 0 || hnm.length - 1 < elemi);
          let datastr = null;
          if (iselemnotfnd) datastr = (retzerolc ? "0 * " + lcnm : "0");
          else
          {
            //find the index on the list we can then get our base string
            //and then generate the data string without too much extra work
            let fndmyci = false;
            let myci = -1;
            for (let n = 0; n < myelsis[mhindx].length; n++)
            {
              if (myelsis[mhindx][n] === elemi)
              {
                fndmyci = true;
                myci = n;
                break;
              }
              //else;//do nothing
            }
            console.log("fndmyci = " + fndmyci);
            console.log("myci = " + myci);

            if (fndmyci)
            {
              if (myci < 0 || myelsis[mhindx].length - 1 < myci)
              {
                throw new Error("there was a problem setting the myci index because it claimed " +
                  "to be found, but the index value was invalid!");
              }
              //else;//do nothing safe to proceed
            }
            else throw new Error("there was a problem getting the element start indexes!");
            console.log("myelsis[" + mhindx + "][" + myci + "] = " + myelsis[mhindx][myci]);
            console.log("myeleis[" + mhindx + "][" + myci + "] = " + myeleis[mhindx][myci]);
            console.log("mybasis[" + mhindx + "][" + myci + "] = " + mybasis[mhindx][myci]);
            console.log("mybaeis[" + mhindx + "][" + myci + "] = " + mybaeis[mhindx][myci]);
            
            let mybasenumstr = null;
            if (mybasis[mhindx][myci] < 0 || hnm.length - 1 < mybasis[mhindx][myci]) mybasenumstr = "1";
            else mybasenumstr = hnm.substring(mybasis[mhindx][myci], mybaeis[mhindx][myci]);
            console.log("mybasenumstr = " + mybasenumstr);

            //NEEDS TO CHANGE FOR THE BALANCE ROWS
            if (mybasenumstr === "1")
            {
              if (inconetimes) datastr = mybasenumstr + " * " + lcnm;
              else datastr = lcnm;
            }
            else datastr = mybasenumstr + " * " + lcnm;
          }
          console.log("datastr = " + datastr);

          return (<td key={elem + mytpstr + hnm} style={{border: "1px solid black"}}>{datastr}</td>);
        }
      });
      console.log("mycolsonrw = ", mycolsonrw);
    
      return (<tr key={elem + mytpstr + "row"} style={{border: "1px solid black"}}>{mycolsonrw}</tr>);
    });
    console.log("mybdyrws = ", mybdyrws);
    console.log("mybdyrws.length = " + mybdyrws.length);
    console.log("myelems.length = " + myelems.length);
    console.log("myelems = ", myelems);

    return mybdyrws;
  }

  function genBalanceTable(myarr)
  {
    //the table will have a total number of reactants + number of products + 1 (equals) + 1 (elememts)
    //the number of columns will be the number of unique elements
    //these will be the equations only we will relace the name for the lc with ?
    //what if the number of reactants is more than 26? we will need to call it a_1
    //so we will arbitrarily do that for reactants r_1 for products p_1 etc.
    //which means we can pull the number from the object and isreactant or not
    //let varnm = (myobj.isreactant ? "r" : "p") + "_" + myobj.num;
    //for balancing these will use the values on the elements
    //let kynm = (myobj.isreactant ? "r" : "p") + myobj.num;varnm.split("_").join("");
    const mxrnum = getMaxReactantOrProductsNum(myarr, true);
    const mxpnum = getMaxReactantOrProductsNum(myarr, false);
    //const mxcols = mxrnum + mxpnum + 1 + 1;
    //names will be generated for the headers from the reactants
    //the first name will be elements
    //the second will be the reactants until ->
    //the ->
    //then the products
    //for the reactants and the products we will take the lcname * elem base * elem base * ... + ...
    const reactants = myarr.filter((mobj) => mobj.isreactant);
    const products = myarr.filter((mobj) => !mobj.isreactant);
    let reactantsbynum = [];
    let productsbynum = [];
    for (let c = 0; c < 2; c++)
    {
      let porrarr = ((c === 0) ? reactants : products);
      let nmx = ((c === 0) ? mxrnum : mxpnum) + 1;
      console.log("c = " + c);

      for (let n = 1; n < nmx; n++)
      {
        let mytempnumarr = [];
        for (let k = 0; k < porrarr.length; k++)
        {
          if (porrarr[k].num === n) mytempnumarr.push(porrarr[k]);
          //else;//do nothing
        }
        console.log("init mytempnumarr = ", mytempnumarr);

        mytempnumarr = mytempnumarr.sort((obja, objb) => {
          let aidstr = obja.id;
          let lpartaidstr = aidstr.substring(aidstr.indexOf("_") + 1);
          let anum = Number(lpartaidstr);
          let bidstr = objb.id;
          let lpartbidstr = bidstr.substring(bidstr.indexOf("_") + 1);
          let bnum = Number(lpartbidstr);
          return anum - bnum;
        });
        console.log("NEW mytempnumarr = ", mytempnumarr);

        if (c === 0) reactantsbynum.push(mytempnumarr);
        else productsbynum.push(mytempnumarr);
      }//end of n for loop
    }//end of c for loop
    console.log("reactantsbynum = ", reactantsbynum);
    console.log("productsbynum = ", productsbynum);


    //gets the header names and generates the header row here now

    let hnames = ["elements"];
    let addifbaseisone = false;//user preference includes the base if base is 1
    for (let c = 0; c < 2; c++)
    {
      let porrarr = ((c === 0) ? reactantsbynum : productsbynum);
      let nmx = ((c === 0) ? mxrnum : mxpnum) + 1;
      console.log("c = " + c);

      for (let n = 1; n < nmx; n++)
      {
        let lcnm = ((c === 0) ? "r" : "p") + "_" + n;
        let mystr = "" + lcnm + " * ";
        console.log("lcnm = " + lcnm);
        console.log("INIT mystr = " + mystr);
        console.log("porrarr[" + (n - 1) + "] = ", porrarr[n - 1]);

        for (let k = 0; k < porrarr[n - 1].length; k++)
        {
          console.log("porrarr[" + (n - 1) + "][" + k + "] = ", porrarr[n - 1][k]);
          
          mystr += porrarr[n - 1][k].element;
          if (Number(porrarr[n - 1][k].base) === 1 && !addifbaseisone);
          else if (Number(porrarr[n - 1][k].base) < 1)
          {
            throw new Error("illegal value found and used for the base! Base must be positive " +
              "and an integer!");
          }
          else mystr += " " + porrarr[n - 1][k].base;
          console.log("OLD mystr = " + mystr);

          if (k + 1 < porrarr[n - 1].length) mystr += " * ";
          //else;//do nothing
          console.log("NEW mystr = " + mystr);
        }//end of k for loop
        console.log("FINAL mystr = " + mystr);

        hnames.push(mystr);
      }//end of n for loop
      if (c === 0) hnames.push("->");
      //else;//do nothing
    }//end of c for loop
    const myhrw = (<tr style={{border: "1px solid black"}}>{hnames.map((nm) =>
      <th key={nm} style={{border: "1px solid black"}}>{nm}</th>)}</tr>);
    
    //get the list of unique elements now

    let myelems = [];
    for (let n = 0; n < myarr.length; n++)
    {
      let addit = true;
      for (let k = 0; k < myelems.length; k++)
      {
        if (myelems[k] === myarr[n].element)
        {
          addit = false;
          break;
        }
        //else;//do nothing
      }
      if (addit) myelems.push(myarr[n].element);
      //else;//do nothing
    }//end of n for loop
    console.log("myelems = ", myelems);
    console.log("myelems.length = " + myelems.length);


    //generate the equations for the elements here
    //need to show that they balance OR do not balance
    //need to add an option for solving it
    //ADD THE EQUATIONS ROWS,
    //THEN SHOW HOW MANY ARE ON EACH SIDE

    //we need to get where the elements start and end on header row
    //where do the bases start and end if present
    let myelsis = [];
    let myeleis = [];
    let mybasis = [];
    let mybaeis = [];
    hnames.forEach((hnm) => {
      console.log("hnm = " + hnm);

      let elsis = null;
      let eleis = null;
      let basis = null;
      let baeis = null;
      if (hnm === "->" || hnm === "elements");
      else
      {
        let lcnm = hnm.substring(0, hnm.indexOf(" * "));
        console.log("lcnm = " + lcnm);

        let multiindxs = getAllIndexesOf("*", hnm, 0);
        console.log("multiindxs = ", multiindxs);

        //now that we know where the multiplication signs are we can get the elements and the bases now
        //after the multiplication sign there is space and then the element starts
        //after that there is a space and then the base starts unless on the last one
        //if the last one has no base, there will be no space after the element ends
        //if we encounter an element, but no base the base is 1 inherently,
        //however for indexes, we are ignoring it

        elsis = [];
        eleis = [];
        basis = [];
        baeis = [];
        multiindxs.forEach((itemval) => {
          let mysi = ((itemval < 0) ? itemval : itemval + 2);
          elsis.push(mysi);
          if (mysi < 0)
          {
            eleis.push(-1);
            basis.push(-1);
            baeis.push(-1);
          }
          else
          {
            //get the space index after the start index...
            let fndei = false;
            let myei = -1;
            for (let i = mysi; i < hnm.length; i++)
            {
              if (hnm.charAt(i) === ' ')
              {
                fndei = true;
                myei = i;
                break;
              }
              //else;//do nothing
            }
            console.log("fndei = " + fndei);
            console.log("myei = " + myei);

            if (fndei)
            {
              if (myei < 0 || hnm.length - 1 < myei)
              {
                throw new Error("we claimed that the ei was found, but the value was invalid, " +
                  "either it was not set or we did not find it!");
              }
              //else;//do nothing
            }
            else
            {
              if (myei < 0 || hnm.length - 1 < myei);
              else
              {
                throw new Error("we claimed to not to have found the ei, but the value was valid, " +
                  "either it was set wrong or it was actually found!");
              }
            }

            if (fndei)
            {
              eleis.push(myei);
              //myei is space after that is * or a digit
              //if it is a digit, then this is out base
              //if it is the times, then this is not our base no base
              if (hnm.charAt(myei + 1) === '*')
              {
                basis.push(-1);
                baeis.push(-1);
              }
              else
              {
                basis.push(myei + 1);
                
                let mybei = -1;
                let fndmybei = false;
                for (let i = myei + 1; i < hnm.length; i++)
                {
                  if (hnm.charAt(i) === ' ')
                  {
                    mybei = i;
                    fndmybei = true;
                    break;
                  }
                  //else;//do nothing
                }
                if (fndmybei) baeis.push(mybei);
                else baeis.push(hnm.length);
              }
            }
            else
            {
              eleis.push(hnm.length);
              basis.push(-1);
              baeis.push(-1);
            }
          }
        });
      }
      console.log("elsis = ", elsis);
      console.log("eleis = ", eleis);
      console.log("basis = ", basis);
      console.log("baeis = ", baeis);

      myelsis.push(elsis);
      myeleis.push(eleis);
      mybasis.push(basis);
      mybaeis.push(baeis);
    });
    console.log("myelsis = ", myelsis);
    console.log("myeleis = ", myeleis);
    console.log("mybasis = ", mybasis);
    console.log("mybaeis = ", mybaeis);

    //generate the data rows here...
    let myequrws = genEquationOrCountRows(myelems, hnames, myelsis, myeleis, mybasis, mybaeis,
      true, false);
    let mybalrws = genEquationOrCountRows(myelems, hnames, myelsis, myeleis, mybasis, mybaeis,
      false, false);

    console.error("NOT DONE YET WITH GENERATING THE EQUATIONS AND SHOWING THE BALANCE!");
    
    return (<table style={{border: "1px solid black"}}>
      <thead style={{border: "1px solid black"}}>{myhrw}</thead>
      <tbody style={{border: "1px solid black"}}>{myequrws}{mybalrws}</tbody>
    </table>);
  }

  console.log("myelembasearr = ", myelembasearr);
  
  return (<div>
      <h1>Chem Equation Balancer APP</h1>
      <div>{genControlButtons(myelembasearr, true)}
      <span key={"equarrowa"} style={{display: "inline-block", fontSize: "20px"}}>{" -> "}</span>
        {genControlButtons(myelembasearr, false)}</div>
      <div id="equ" style={{display: "inline-block"}}>
        {genReactantsOrProductsDivs(myelembasearr, true)}
          <span key={"equarrowb"} style={{display: "inline-block", fontSize: "40px"}}>{" -> "}</span>
        {genReactantsOrProductsDivs(myelembasearr, false)}
      </div>
      {genBalanceTable(myelembasearr)}
    </div>);
}

export default App;
