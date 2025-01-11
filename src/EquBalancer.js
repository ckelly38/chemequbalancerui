import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import ElemBaseComp from "./ElemBaseComp";
import commonclass from './commonclass';
import Matrices from './Matrices';

//TITLE
//ADD TO CURRENT NEW REACTANT SET
//ELEMENT BASE ELEMENT BASE ... + .... -> ...
//
//REACTANTS -> PRODUCTS
//           =
//...
function EquBalancer({equnum=1}) {
  //elembase has element, base# but one reactant has a bunch of elements and bases
  //element, base#, num, type
  let initrobj = {"id": "r1_0", "element": "", "base": 1, "isreactant": true, "num": 1,
    "canrem": false};
  let initpobj = {"id": "p1_0", "element": "", "base": 1, "isreactant": false, "num": 1,
    "canrem": false};
  let initrlcobj = {"num": 1, "isreactant": true, "lcval": 1};
  let initplcobj = {"num": 1, "isreactant": false, "lcval": 1};
  let [myelembasearr, setElembaseArr] = useState([initrobj, initpobj]);
  let [mylcs, setMyLCs] = useState([initrlcobj, initplcobj]);//lcs
  let [lockedbases, setLockedBases] = useState(false);
  let [areallequsbalanced, setAllEqusBalanced] = useState(true);
  let [balerrfnd, setBalErrorFound] = useState(false);
  let [mytextequ, setMyTextEqu] = useState("");
  const cc = new commonclass();
  
  let runmtests = false;
  if (runmtests)
  {
    Matrices.testDoSomeOpOnVals();
    //Matrices.testTranspose();//handled in testDeterminant
    Matrices.testDeterminant();
    Matrices.testInverse();
    //console.log(Matrices.multiplyTwoFractions("2/2", "-2/2"));//2/2*2/-2=4/-4=-1
    Matrices.testCramersRule();
    Matrices.testGCF();
    Matrices.testLCM();
    Matrices.testToFraction();
    Matrices.testReplaceColOrRow();
    Matrices.testSolveViaInverse();
  }
  //else;//do nothing
  
  
  function getMaxReactantOrProductsNum(myarr, usereactants)
  {
    cc.letMustNotBeEmpty(myarr, "myarr");
    cc.letMustBeBoolean(usereactants, "usereactants");
    
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

  function getMyLCItem(num, usereactants)
  {
    cc.letMustBeBoolean(usereactants, "usereactants");
    cc.letMustBeDefinedAndNotNull(num, "num");
    if (num < 1)
    {
      throw new Error("illegal value found and used for the num here! It must be at least one!");
    }
    //else;//do nothing

    if (cc.isLetEmptyNullOrUndefined(mylcs)) return null;
    else
    {
      for (let n = 0; n < mylcs.length; n++)
      {
        if (Number(mylcs[n].num) === Number(num) && mylcs[n].isreactant === usereactants)
        {
          return mylcs[n];
        }
        //else;//do nothing
      }
      return null;
    }
  }

  function setLCItem(nobj)
  {
    cc.letMustBeDefinedAndNotNull(nobj);
    let mynwlcs = mylcs.map((lcobj) => {
      return ((lcobj.isreactant === nobj.isreactant && lcobj.num === nobj.num) ? nobj : lcobj);
    });
    setMyLCs(mynwlcs);
  }

  function addItemToLCOrElemsArr(valobj, uselcs)
  {
    cc.letMustBeBoolean(uselcs, "uselcs");
    cc.letMustBeDefinedAndNotNull(valobj, (uselcs ? "new-lc-obj" :  "new-reactant-or-product"));
    if (uselcs) setMyLCs([...mylcs, valobj]);
    else setElembaseArr([...myelembasearr, valobj]);
  }
  function addLCItemToLCSArr(valobj) { addItemToLCOrElemsArr(valobj, true); }
  function addItemToElemsArr(valobj) { addItemToLCOrElemsArr(valobj, false); }

  function addNewReactantOrProduct(myarr, usereactants)
  {
    cc.letMustBeBoolean(usereactants, "usereactants");
    let mynwobj = {...initrobj};
    mynwobj.canrem = true;
    mynwobj.isreactant = usereactants;
    mynwobj.num = getMaxReactantOrProductsNum(myarr, usereactants) + 1;
    mynwobj.id = (usereactants ? "r" : "p") + mynwobj.num + "_0";
    //console.log("mynwobj = ", mynwobj);

    let mynwlcitem = {...initrlcobj};
    mynwlcitem.isreactant = usereactants;
    mynwlcitem.num = mynwobj.num;
    //console.log("mynwlcitem = ", mynwlcitem);
    
    if (lockedbases) setLockedBases(false);
    //else;//do nothing
    addItemToElemsArr(mynwobj);
    addLCItemToLCSArr(mynwlcitem);
  }

  //null will be returned if the item was not found
  function getMyItem(midstr)
  {
    if (cc.isLetEmptyNullOrUndefined(midstr)) return null;
    //else;//do nothing
    for (let n = 0; n < myelembasearr.length; n++)
    {
      if (myelembasearr[n].id === midstr) return myelembasearr[n];
      //else;//do nothing
    }
    return null;
  }

  function setMyItem(nval)
  {
    let mynwarr = myelembasearr.map((mobj) => ((mobj.id === nval.id) ? nval : mobj));
    setElembaseArr(mynwarr);
  }

  function addNewReactantOrProductToOne(mynum, usereactants)
  {
    cc.letMustBeBoolean(usereactants, "usereactants");
    
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
    //console.log("mxidnum = " + mxidnum);

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
    //console.log("mynwobj = ", mynwobj);
    addItemToElemsArr(mynwobj);
  }

  function removeLastReactantOrProduct(myarr, usereactants)
  {
    let mxnum = getMaxReactantOrProductsNum(myarr, usereactants);
    let mynwarr = myarr.filter((mobj) => !(mobj.isreactant === usereactants && mobj.num === mxnum));
    //console.log("mynwarr = ", mynwarr);

    let mynwlcsarr = mylcs.filter((mobj) => !(mobj.isreactant === usereactants && mobj.num === mxnum));
    //console.log("mynwlcsarr = ", mynwlcsarr);
    setMyLCs(mynwlcsarr);
    setElembaseArr(mynwarr);
  }

  function removeFromThisOne(idstr)
  {
    //console.log("remidstr = " + idstr);
    cc.letMustNotBeEmpty(idstr, "idstr");
    let mynwarr = myelembasearr.filter((mobj) => !(mobj.id === idstr));
    //console.log("mynwarr = ", mynwarr);
    setElembaseArr(mynwarr);
  }


  //DISPLAY METHODS

  function getMyReactantsOrProductsFromArray(myarr, usereactants)
  {
    cc.letMustNotBeEmpty(myarr, "myarr");
    cc.letMustBeBoolean(usereactants, "usereactants");
    
    let myrsorpsarr = myarr.filter((mval) => (mval.isreactant === usereactants));
    //this array will now have just the reactants or just the products
    //console.log("usereactants = " + usereactants);
    //console.log("myrsorpsarr = ", myrsorpsarr);
    
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
    //console.log("mxnum = " + mxnum);

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
    //console.log("the reactant or product numbers are all valid!");

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
          addtothis={addNewReactantOrProductToOne} remfromthis={removeFromThisOne}
          islocked={lockedbases} />);
      });
      let mylcitem = getMyLCItem(n, usereactants);
      //console.log("mylcitem = ", mylcitem);

      cc.letMustBeDefinedAndNotNull(mylcitem, "mylcitem");

      myreselems.push(<div key={kynm} style={{display: "inline-block"}}>
        <input id={kynm + "coeff"} key={kynm + "coeff"} name={kynm + "coeff"} type="number" min="1"
          value={mylcitem.lcval} style={{width: "45px", resize: true}}
          onChange={(event) => {
            let nitem = {...mylcitem};
            nitem.lcval = Number(event.target.value);
            setLCItem(nitem);
          }} />{myelemsindiv}</div>);
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
    cc.letMustBeBoolean(usereactants, "usereactants");

    const mynm = (usereactants ? "reactant" : "product");
    return (<div id={mynm + "s"} style={{display: "inline-block"}}>
      {getMyReactantsOrProductsFromArray(myarr, usereactants)}</div>);
  }

  function genControlButtons(myarr, usereactants)
  {
    cc.letMustBeBoolean(usereactants, "usereactants");

    const mynm = (usereactants ? "reactant" : "product");
    const cpnm = mynm.substring(0, 1).toUpperCase() + mynm.substring(1);
    const mxrorpnum = getMaxReactantOrProductsNum(myelembasearr, usereactants);
    return (<><button onClick={(event) => addNewReactantOrProduct(myelembasearr, usereactants)}
      type="button">Add A New {cpnm}</button>
      {(1 < mxrorpnum) ?
        <button onClick={(event) => removeLastReactantOrProduct(myelembasearr, usereactants)}
          type="button">Remove Last {cpnm}</button> : null}</>);
  }

  function getDataForAnEquationOrCountRow(hnm, elem, mhindx, myelsis, myeleis, mybasis, mybaeis,
    useequrows, usemtrxrows, inconetimes=false)
  {
    //console.log("hnm = " + hnm);
    //console.log("mhindx = " + mhindx);
    //console.log("myelsis[" + mhindx + "] = ", myelsis[mhindx]);
    //console.log("myeleis[" + mhindx + "] = ", myeleis[mhindx]);
    //console.log("mybasis[" + mhindx + "] = ", mybasis[mhindx]);
    //console.log("mybaeis[" + mhindx + "] = ", mybaeis[mhindx]);
    
    if (hnm === "->") return "=";
    else if (hnm === "elements") return "" + elem + ":";
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
      let retzerolc = useequrows;//user preference includes the 0 * lc
      let lcnm = hnm.substring(0, hnm.indexOf(" * "));
      let lcval = getMyLCItem(Number(lcnm.substring(lcnm.indexOf("_") + 1)),
        (lcnm.charAt(0) === 'r' || lcnm.charAt(0) === 'R')).lcval;
      //console.log("lcnm = " + lcnm);
      //console.log("lcval = " + lcval);

      let elemi = hnm.indexOf(elem);
      //console.log("elemi = " + elemi);

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
        //console.log("fndmyci = " + fndmyci);
        //console.log("myci = " + myci);

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
        //console.log("myelsis[" + mhindx + "][" + myci + "] = " + myelsis[mhindx][myci]);
        //console.log("myeleis[" + mhindx + "][" + myci + "] = " + myeleis[mhindx][myci]);
        //console.log("mybasis[" + mhindx + "][" + myci + "] = " + mybasis[mhindx][myci]);
        //console.log("mybaeis[" + mhindx + "][" + myci + "] = " + mybaeis[mhindx][myci]);
        
        let mybasenumstr = null;
        if (mybasis[mhindx][myci] < 0 || hnm.length - 1 < mybasis[mhindx][myci]) mybasenumstr = "1";
        else mybasenumstr = hnm.substring(mybasis[mhindx][myci], mybaeis[mhindx][myci]);
        //console.log("mybasenumstr = " + mybasenumstr);

        if (useequrows)
        {
          if (mybasenumstr === "1") datastr = (inconetimes ? (mybasenumstr + " * " + lcnm) : lcnm);
          else datastr = mybasenumstr + " * " + lcnm;
        }
        else
        {
          if (usemtrxrows) datastr = "" + ((mybasenumstr === "1") ? "1" : (Number(mybasenumstr)));
          else datastr = "" + ((mybasenumstr === "1") ? lcval : (Number(mybasenumstr) * lcval));
        }
      }
      console.log("datastr = " + datastr);

      return datastr;
    }
  }

  function genEquationOrCountRows(myelems, hnames, myelsis, myeleis, mybasis, mybaeis,
    useequrows, usemtrixrows, inconetimes=false)
  {
    cc.letMustBeBoolean(useequrows, "useequrows");
    cc.letMustBeBoolean(usemtrixrows, "usemtrixrows");
    cc.letMustBeBoolean(inconetimes, "inconetimes");

    //the first col is the element, then the reactants, then =, then the products
    //let retzerolc = useequrows;//user preference includes the 0 * lc
    //let inconetimes = false;//user preference includes the 1 * lc
    const mytpstr = (useequrows ? "equ" : "bal");
    let mybdyrws = myelems.map((elem) => {
      //console.log("elem = " + elem);

      if (cc.isLetEmptyNullOrUndefined(elem)) return null;
      //else;//do nothing safe to proceed

      let mycolsonrw = hnames.map((hnm, mhindx) => {
        //console.log("hnm = " + hnm);
        //console.log("mhindx = " + mhindx);
        //console.log("myelsis[" + mhindx + "] = ", myelsis[mhindx]);
        //console.log("myeleis[" + mhindx + "] = ", myeleis[mhindx]);
        //console.log("mybasis[" + mhindx + "] = ", mybasis[mhindx]);
        //console.log("mybaeis[" + mhindx + "] = ", mybaeis[mhindx]);
        
        let datastr = getDataForAnEquationOrCountRow(hnm, elem, mhindx,
          myelsis, myeleis, mybasis, mybaeis, useequrows, usemtrixrows, inconetimes);
        //console.log("datastr = " + datastr);
        
        const colnmtype = ((hnm === "->") ? "equals" : hnm);
        //console.log("colnmtype = " + colnmtype);

        return (<td key={elem + mytpstr + colnmtype} style={{border: "1px solid black"}}>
          {datastr}</td>);
      });
      //console.log("mycolsonrw = ", mycolsonrw);
    
      return (<tr key={elem + mytpstr + "row"} style={{border: "1px solid black"}}>{mycolsonrw}</tr>);
    });
    console.log("mybdyrws = ", mybdyrws);
    console.log("mybdyrws.length = " + mybdyrws.length);
    //console.log("myelems.length = " + myelems.length);
    //console.log("myelems = ", myelems);

    return mybdyrws;
  }

  function genDataOnEquationRowsOnly(myelems, hnames, myelsis, myeleis, mybasis, mybaeis,
    useequrows, usemtrixrows, inconetimes=false)
  {
    cc.letMustBeBoolean(useequrows, "useequrows");
    cc.letMustBeBoolean(usemtrixrows, "usemtrixrows");
    cc.letMustBeBoolean(inconetimes, "inconetimes");

    //the first col is the element, then the reactants, then =, then the products
    //let retzerolc = useequrows;//user preference includes the 0 * lc
    //let inconetimes = false;//user preference includes the 1 * lc
    let mydatarwsontble = myelems.map((elem) => {
      //console.log("elem = " + elem);

      if (cc.isLetEmptyNullOrUndefined(elem)) return null;
      //else;//do nothing safe to proceed

      let mydatacellsonrw = hnames.map((hnm, mhindx) => {
        //console.log("hnm = " + hnm);
        //console.log("mhindx = " + mhindx);
        //console.log("myelsis[" + mhindx + "] = ", myelsis[mhindx]);
        //console.log("myeleis[" + mhindx + "] = ", myeleis[mhindx]);
        //console.log("mybasis[" + mhindx + "] = ", mybasis[mhindx]);
        //console.log("mybaeis[" + mhindx + "] = ", mybaeis[mhindx]);
        
        let datastr = getDataForAnEquationOrCountRow(hnm, elem, mhindx,
          myelsis, myeleis, mybasis, mybaeis, useequrows, usemtrixrows, inconetimes);
        //console.log("datastr = " + datastr);
        
        return datastr;
      });
      //console.log("mydatacellsonrw = ", mydatacellsonrw);
    
      return mydatacellsonrw;
    });
    console.log("mydatarwsontble = ", mydatarwsontble);
    console.log("mydatarwsontble.length = " + mydatarwsontble.length);
    //console.log("myelems.length = " + myelems.length);
    //console.log("myelems = ", myelems);

    return mydatarwsontble;
  }

  //NOT DONE YET PROBLEMS WITH SOME EQUATIONS LIKE
  //AGNO3 + KCL -> KNO3 + AGCl (balanced by itself, but set first LC=2, then this fails)
  function genMatrixAndAnsMatrix(mtopdatobj)
  {
    //console.log("mtopdatobj = ", mtopdatobj);
    cc.letMustBeDefinedAndNotNull(mtopdatobj, "mtopdatobj");

    const mydatrws = mtopdatobj.mtrixdatrws;
    const myelembsarr = mtopdatobj.elembsarr;
    const myuelems = mtopdatobj.myelems;
    //console.log("mydatrws = ", mydatrws);
    //console.log("myelembsarr = ", myelembsarr);
    //console.log("myuelems = ", myuelems);
    
    cc.letMustNotBeEmpty(myelembsarr, "myelembsarr");
    cc.letMustNotBeEmpty(myuelems, "myuelems");
    cc.letMustNotBeEmpty(mydatrws, "mydatrws");

    //filter out the elements and anything after the equals stick a - infront of it
    //if it already has a minus, then remove it
    //then convert to numbers maybe?
    //we also need to add a row to it with 1 and then the rest are zeros
    //this will be our initial matrix
    //our answer matrix will be a r x 1 col array of all zeros with a 1 after it
    
    let myequri = -1;
    let mynwstrm = mydatrws.map((crwarr, rindx) => {
      let mynwarr = [];
      crwarr.forEach((val, cindx) => {
        //console.log("cindx = ", cindx);
        //console.log("val = " + val);
        //console.log("myequri = " + myequri);
        if (cindx === 0);
        else
        {
          if (val === "=") myequri = cindx;
          else
          {
            if (myequri < 0 || cindx < myequri) mynwarr.push(val);
            else
            {
              if (myequri < cindx)
              {
                if (val === "0") mynwarr.push("0");
                else mynwarr.push((val.charAt(0) === '-') ? val.substring(1) : "-" + val);
              }
              else throw new Error("case should have already been handled!");
            }
          }
        }
      });
      return mynwarr;
    });
    //may not display correct results
    //console.log("INIT mynwstrm = ", mynwstrm);

    let mydims = Matrices.dimensions(mynwstrm);
    //console.log("mydims = ", mydims);

    let issqrm = true;
    let dimsdiff = 0;
    let hasmorecols = false;
    let hasmorerows = false;
    if (mydims.length < 3)
    {
      if (mydims.length === 2)
      {
        if (mydims[0] === mydims[1]);
        else
        {
          if (mydims[0] < mydims[1])
          {
            dimsdiff = mydims[1] - mydims[0];
            hasmorecols = true;
            hasmorerows = false;
          }
          else
          {
            dimsdiff = mydims[0] - mydims[1];
            hasmorecols = false;
            hasmorerows = true;
          }
          issqrm = false;
        }
      }
      else
      {
        if (mydims[0] === 1);
        else issqrm = false;
      }
    }
    else throw new Error("invalid dimensions found and used for the matrix!");
    if (issqrm);
    else console.warn("this is not a square matrix!");
    //console.log("hasmorecols = " + hasmorecols);
    //console.log("hasmorerows = " + hasmorerows);
    //console.log("dimsdiff = " + dimsdiff);

    //if the number of rows is less than the number of columns
    //IE less equations than unknowns, we need more equations
    //in this case add a row with 1 and the rest 0s for each of the diff
    //then set equal to 1 and the ans will all have 0s other than this one
    //if it is more than one, do that for the first one, then for the second one 0 1 the rest 0s
    //and the answ will have all 0s other than these which will have 1s or maybe inc?
    //
    //if the number of cols is less than the number of rows
    //IE less unknowns than equations
    //we can remove x number of equations as needed and risk the determinant of zero
    //OR we can add cols as needed to get the determinant to not be zero
    //however, on these cols, we want the result to be zero or to cancel themselves or to be equal
    //but enough to get a non-zero determinant

    //do something here to attempt to correct the dimensions and turn it into a square matrix
    console.error("NEED TO DO SOMETHING HERE TO FIX THE GENERATION OF THE MATRIX!");

    let myansstrm = mynwstrm.map((val) => ["0"]);
    if (issqrm);
    else
    {
      //our initial matrix for: AgNO3 + KCl -> KNO3 + AgCl
      //(we made the first LC 2, note equ with all LCs = 1 is balanced)
      //RULE: you must ignore all LCs when generating the matrix for balancing
      //
      //Ag: [1 0 0 -1]
      //N:  [1 0 -1 0] -| DROP THESE TWO ROWS
      //O:  [3 0 -3 0] -|
      //K:  [0 1 -1 0]
      //Cl: [0 1 0 -1]
      //   *[1 0 0 0] THEN SET EQUAL TO DOWN [0, 0, 0, 1] THEN IT WILL YEILD THE CORRECT ANSWERS
      //
      //IF I DROP ALL NO3s IN THIS, THEN ADD 1 followed by k zeros and set equal to k zeros and a 1
      //THEN IT YIELDS THE CORRECT ANSWERS. PROVIDED THE LCS ARE IGNORED.
      //
      //AgNO3 + KCl + X -> KNO3 + AgCl + X
      //
      //NO CLUE IN THIS CASE
      //
      //
      //H2 + O2 -> H20
      //[2 0 -2]
      //[0 2 -1]
      //
      //to that add
      //[1 0 0]

      if (hasmorerows)
      {
        //need to drop to get COL - 1
        //how to figure out which rows to drop
        //if a molecule is treated as an element, IE not separated out
        //then we drop the entire molecule THE ROWS THAT MAKE IT UP...
        //for a molecule to be treated as an element it must remain in tact on the other side
        //however, for it to be ruled out of the matrix, its parts must not be present anywhere else
        //
        //NOTE: ALTHOUGH OFTEN WRITTEN RIGHT NEXT TO EACH OTHER, THEY DO NOT HAVE TO BE.
        //AgNO3 + KCl -> AgCl + KNO3
        //NAgO3 + KCl -> AgCl + NKO3
        //NAgO3 + ClK -> AgCl + NKO3
        //NAgO3 + ClK -> ClAg + NKO3
        //THE ABOVE EQUATIONS ARE THE SAME.
        //HOWEVER:
        //AgON3 + KCl -> AgCl + KNO3
        //IS NOT THE SAME AS ABOVE BECAUSE AN ELEMENT AND A BASE GOT SPLIT UP WHICH IS ILLEGAL.
        //
        //THE NO3 IS A MOLECULE TECHNICALLY THE O3 IS A MOLECULE TOO
        //BUT THE NO3 MOLECULE IS NOT BROKEN APART ON THE OTHER SIDE
        //NOR IS IT ON THE SAME SIDE.
        //NOR ARE THERE ANY OTHER PARTS OF IT PRESENT IN OTHER REACTANTS OR PRODUCTS.
        //THEREFORE, THIS DOES NOT EFFECT THE LINEAR ALGEBRA WHATSOEVER AND CAN BE RULED OUT.

        //FOR EACH UNIQUE ELEMENT ON THE EQUATION:
        //IS THE EQUATION A COMPOSITION OR DECOMPOSITION? IE DOES ONE SIDE ONLY HAVE ONE?
        //IF THE ANSWER IS YES, THEN NONE CAN BE SEPARATED OUT. ERROR OUT.
        //IF THE ANSWER IS NO, THEN SOME MIGHT BE ABLE TO BE SEPARATED OUT.
        //IS PRESENT ON MULTIPLE REACTANTS OR PRODUCTS?
        //IF THE ANSWER IS NO, THEN THESE MIGHT BE ABLE TO BE SEPARATED OUT.
        //IF THE ANSWER IS YES, THEN THESE CANNOT BE SEPARATED OUT.
        //ON THE ONES THAT CAN STILL BE SEPARATED OUT:
        //IF THE BASES ARE DIFFERENT, THEN THESE CANNOT BE SEPARATED OUT.
        //OTHERWISE THEN THESE CAN BE SEPARATED OUT.
        //AgNO3 + KCl -> AgCl + KNO3 (SWAP EQU)
        //Ag: r1, p1
        //N: r1, p2
        //O: r1, p2
        //K: r2, p2
        //Cl: r2, p1

        //H2 + O2 -> H2O (COMP/DECOM EQU)
        //H: r1, p1
        //O: r2, p1

        //elembasearray has the information we want
        //need the unique elements list
        const iscompequ = (mtopdatobj.mxpnum === 1);
        const isdecompequ = (mtopdatobj.mxrnum === 1);
        //console.log("iscompequ = " + iscompequ);
        //console.log("isdecompequ = " + isdecompequ);

        if (iscompequ || isdecompequ)
        {
          //this is a compostion or decomposition equation
          //less likely to produce this kind of matrix
          //but if it does, we cannot solve it
          //cannot remove any rows
          let myerrmsg = "cannot solve due to zero determinant because cannot remove any row from " +
            "the matrix and we have too many rows than cols!";
          //console.error(myerrmsg);
          throw new Error(myerrmsg);
        }
        //else;//do nothing
        //console.log("myelembsarr = ", myelembsarr);
        //console.log("myuelems = ", myuelems);

        //now see if we may be able to drop it
        let canpossiblydropit = [];
        let numcandrop = 0;
        let elembsobjsbyuelms = myuelems.map((val) => {
          let mymollocs = [];
          let isrfnd = false;
          let ispfnd = false;
          myelembsarr.forEach((elembobjval) => {
            if (elembobjval.element === val)
            {
              mymollocs.push(elembobjval);
              if (isrfnd);
              else
              {
                if (elembobjval.isreactant) isrfnd = true;
                //else;//do nothing
              }
              if (ispfnd);
              else
              {
                if (elembobjval.isreactant);
                else ispfnd = true;
              }
            }
            //else;//do nothing
          });
          cc.letMustNotBeEmpty(mymollocs, "mymollocs");
          if (mymollocs.length < 1) throw new Error("the array must have at least 2 items on it!");
          else
          {
            if (isrfnd && ispfnd)
            {
              let initcandrop = (mymollocs.length === 2);
              //can drop if the bases are the same and there are only two of them.
              if (initcandrop)
              {
                initcandrop = (mymollocs[0].base === mymollocs[1].base);
                if (initcandrop) numcandrop++;
                //else;//do nothing
              }
              //else;//do nothing
              canpossiblydropit.push(initcandrop);
              return mymollocs;
            }
            else
            {
              throw new Error("at least one must be a reactant and at least one must be a product!");
            }
          }
        });
        //console.log("elembsobjsbyuelms = ", elembsobjsbyuelms);
        //console.log("canpossiblydropit = ", canpossiblydropit);
        //console.log("numcandrop = " + numcandrop);

        const numrwstodrop = mydims[0] - (mydims[1] - 1);
        //console.log("numrwstodrop = " + numrwstodrop);
        //console.log("OLD mynwstrm = ", mynwstrm);

        //need to figure out which rows to drop
        let mydrpris = [];
        if (numcandrop === numrwstodrop)
        {
          //only add the indexes for the ones that are true
          canpossiblydropit.forEach((ditval, ditindx) => {
            if (ditval) mydrpris.push(ditindx);
            //else;//do nothing
          });
        }
        else if (numcandrop < numrwstodrop)
        {
          //the most we can drop are less than the number that we must drop
          //so we cannot drop a certain amount of that
          //maybe a very big problem here
          throw new Error("we cannot drop the number of rows that we need to drop!");
        }
        else
        {
          //numrwstodrop < numcandrop
          //the number that we need to drop is less than the number that we can drop
          //this is good
          //do we just drop the first k rows arbitrarily?
          //-what if that yields a determinant of zero?
          //-Do we go back to this matrix, and then choose different rows to drop and then resolve?
        }
        if (mydrpris.length === numrwstodrop);//safe to proceed
        else throw new Error("we have not eliminated the correct number of rows!");

        //once we have these...
        mynwstrm = mynwstrm.filter((myarr, myrwi) => {
          for (let k = 0; k < mydrpris.length; k++)
          {
            if (mydrpris[k] === myrwi) return false;
            //else;//do nothing
          }
          return true;
        });
      }
      //else;//do nothing

      mynwstrm.push(mynwstrm[0].map((val, cindx) => ((cindx === 0) ? "1" : "0")));
      myansstrm.push(["1"]);
    }
    //console.log("mynwstrm = ", mynwstrm);
    //console.log("myansstrm = ", myansstrm);

    let mynumm = mynwstrm.map((rwarr) => rwarr.map((val) => Number(val)));
    let mynumansm = myansstrm.map((rwarr) => rwarr.map((val) => Number(val)));
    //console.log("mynumm = ", mynumm);
    //console.log("mynumansm = ", mynumansm);

    return {"mynumstringmatrix": mynwstrm, "myanswerstringmatrix": myansstrm,
      "mynummatrix": mynumm, "myanswernummatrix": mynumansm};
  }

  function genPartialMatrix(mtopdatobj)
  {
    console.log("mtopdatobj = ", mtopdatobj);
    cc.letMustBeDefinedAndNotNull(mtopdatobj, "mtopdatobj");

    const mydatrws = mtopdatobj.mtrixdatrws;
    const myelembsarr = mtopdatobj.elembsarr;
    const myuelems = mtopdatobj.myelems;
    console.log("mydatrws = ", mydatrws);
    console.log("myelembsarr = ", myelembsarr);
    console.log("myuelems = ", myuelems);
    
    cc.letMustNotBeEmpty(myelembsarr, "myelembsarr");
    cc.letMustNotBeEmpty(myuelems, "myuelems");
    cc.letMustNotBeEmpty(mydatrws, "mydatrws");

    //filter out the elements and anything after the equals stick a - infront of it
    //if it already has a minus, then remove it
    //then convert to numbers maybe?
    //we also need to add a row to it with 1 and then the rest are zeros
    //this will be our initial matrix
    //our answer matrix will be a r x 1 col array of all zeros with a 1 after it
    
    let myequri = -1;
    let mynwstrm = mydatrws.map((crwarr, rindx) => {
      let mynwarr = [];
      crwarr.forEach((val, cindx) => {
        //console.log("cindx = ", cindx);
        //console.log("val = " + val);
        //console.log("myequri = " + myequri);
        if (cindx === 0);
        else
        {
          if (val === "=") myequri = cindx;
          else
          {
            if (myequri < 0 || cindx < myequri) mynwarr.push(val);
            else
            {
              if (myequri < cindx)
              {
                if (val === "0") mynwarr.push("0");
                else mynwarr.push((val.charAt(0) === '-') ? val.substring(1) : "-" + val);
              }
              else throw new Error("case should have already been handled!");
            }
          }
        }
      });
      return mynwarr;
    });
    console.log("INIT mynwstrm = ", mynwstrm);

    let mydims = Matrices.dimensions(mynwstrm);
    console.log("mydims = ", mydims);

    let issqrm = true;
    let dimsdiff = 0;
    let hasmorecols = false;
    let hasmorerows = false;
    if (mydims.length < 3)
    {
      if (mydims.length === 2)
      {
        if (mydims[0] === mydims[1]);
        else
        {
          if (mydims[0] < mydims[1])
          {
            dimsdiff = mydims[1] - mydims[0];
            hasmorecols = true;
            hasmorerows = false;
          }
          else
          {
            dimsdiff = mydims[0] - mydims[1];
            hasmorecols = false;
            hasmorerows = true;
          }
          issqrm = false;
        }
      }
      else
      {
        if (mydims[0] === 1);
        else issqrm = false;
      }
    }
    else throw new Error("invalid dimensions found and used for the matrix!");
    if (issqrm);
    else console.warn("this is not a square matrix!");
    console.log("hasmorecols = " + hasmorecols);
    console.log("hasmorerows = " + hasmorerows);
    console.log("dimsdiff = " + dimsdiff);

    //if the number of rows is less than the number of columns
    //IE less equations than unknowns, we need more equations
    //in this case add a row with 1 and the rest 0s for each of the diff
    //then set equal to 1 and the ans will all have 0s other than this one
    //if it is more than one, do that for the first one, then for the second one 0 1 the rest 0s
    //and the answ will have all 0s other than these which will have 1s or maybe inc?
    //
    //if the number of cols is less than the number of rows
    //IE less unknowns than equations
    //we can remove x number of equations as needed and risk the determinant of zero
    //OR we can add cols as needed to get the determinant to not be zero
    //however, on these cols, we want the result to be zero or to cancel themselves or to be equal
    //but enough to get a non-zero determinant

    let myansstrm = mynwstrm.map((val) => ["0"]);
    if (issqrm);
    else
    {
      //our initial matrix for: AgNO3 + KCl -> KNO3 + AgCl
      //(we made the first LC 2, note equ with all LCs = 1 is balanced)
      //RULE: you must ignore all LCs when generating the matrix for balancing
      //
      //Ag: [1 0 0 -1]
      //N:  [1 0 -1 0] -| DROP THESE TWO ROWS
      //O:  [3 0 -3 0] -|
      //K:  [0 1 -1 0]
      //Cl: [0 1 0 -1]
      //   *[1 0 0 0] THEN SET EQUAL TO DOWN [0, 0, 0, 1] THEN IT WILL YEILD THE CORRECT ANSWERS
      //
      //IF I DROP ALL NO3s IN THIS, THEN ADD 1 followed by k zeros and set equal to k zeros and a 1
      //THEN IT YIELDS THE CORRECT ANSWERS. PROVIDED THE LCS ARE IGNORED.
      //
      //AgNO3 + KCl + X -> KNO3 + AgCl + X
      //
      //NO CLUE IN THIS CASE
      //
      //
      //H2 + O2 -> H20
      //[2 0 -2]
      //[0 2 -1]
      //
      //to that add
      //[1 0 0]

      if (hasmorerows)
      {
        //need to drop to get COL - 1
        //how to figure out which rows to drop
        //if a molecule is treated as an element, IE not separated out
        //then we drop the entire molecule THE ROWS THAT MAKE IT UP...
        //for a molecule to be treated as an element it must remain in tact on the other side
        //however, for it to be ruled out of the matrix, its parts must not be present anywhere else
        //
        //NOTE: ALTHOUGH OFTEN WRITTEN RIGHT NEXT TO EACH OTHER, THEY DO NOT HAVE TO BE.
        //AgNO3 + KCl -> AgCl + KNO3
        //NAgO3 + KCl -> AgCl + NKO3
        //NAgO3 + ClK -> AgCl + NKO3
        //NAgO3 + ClK -> ClAg + NKO3
        //THE ABOVE EQUATIONS ARE THE SAME.
        //HOWEVER:
        //AgON3 + KCl -> AgCl + KNO3
        //IS NOT THE SAME AS ABOVE BECAUSE AN ELEMENT AND A BASE GOT SPLIT UP WHICH IS ILLEGAL.
        //
        //THE NO3 IS A MOLECULE TECHNICALLY THE O3 IS A MOLECULE TOO
        //BUT THE NO3 MOLECULE IS NOT BROKEN APART ON THE OTHER SIDE
        //NOR IS IT ON THE SAME SIDE.
        //NOR ARE THERE ANY OTHER PARTS OF IT PRESENT IN OTHER REACTANTS OR PRODUCTS.
        //THEREFORE, THIS DOES NOT EFFECT THE LINEAR ALGEBRA WHATSOEVER AND CAN BE RULED OUT.

        //FOR EACH UNIQUE ELEMENT ON THE EQUATION:
        //IS THE EQUATION A COMPOSITION OR DECOMPOSITION? IE DOES ONE SIDE ONLY HAVE ONE?
        //IF THE ANSWER IS YES, THEN NONE CAN BE SEPARATED OUT. ERROR OUT.
        //IF THE ANSWER IS NO, THEN SOME MIGHT BE ABLE TO BE SEPARATED OUT.
        //IS PRESENT ON MULTIPLE REACTANTS OR PRODUCTS?
        //IF THE ANSWER IS NO, THEN THESE MIGHT BE ABLE TO BE SEPARATED OUT.
        //IF THE ANSWER IS YES, THEN THESE CANNOT BE SEPARATED OUT.
        //ON THE ONES THAT CAN STILL BE SEPARATED OUT:
        //IF THE BASES ARE DIFFERENT, THEN THESE CANNOT BE SEPARATED OUT.
        //OTHERWISE THEN THESE CAN BE SEPARATED OUT.
        //AgNO3 + KCl -> AgCl + KNO3 (SWAP EQU)
        //Ag: r1, p1
        //N: r1, p2
        //O: r1, p2
        //K: r2, p2
        //Cl: r2, p1

        //H2 + O2 -> H2O (COMP/DECOM EQU)
        //H: r1, p1
        //O: r2, p1

        //elembasearray has the information we want
        //need the unique elements list
        const iscompequ = (mtopdatobj.mxpnum === 1);
        const isdecompequ = (mtopdatobj.mxrnum === 1);
        console.log("iscompequ = " + iscompequ);
        console.log("isdecompequ = " + isdecompequ);

        if (iscompequ || isdecompequ)
        {
          //this is a compostion or decomposition equation
          //less likely to produce this kind of matrix
          //but if it does, we cannot solve it
          //cannot remove any rows
          let myerrmsg = "cannot solve due to zero determinant because cannot remove any row from " +
            "the matrix and we have too many rows than cols!";
          //console.error(myerrmsg);
          throw new Error(myerrmsg);
        }
        //else;//do nothing
        console.log("myelembsarr = ", myelembsarr);
        console.log("myuelems = ", myuelems);

        //now see if we may be able to drop it
        let canpossiblydropit = [];
        let numcandrop = 0;
        let elembsobjsbyuelms = myuelems.map((val) => {
          let mymollocs = [];
          let isrfnd = false;
          let ispfnd = false;
          myelembsarr.forEach((elembobjval) => {
            if (elembobjval.element === val)
            {
              mymollocs.push(elembobjval);
              if (isrfnd);
              else
              {
                if (elembobjval.isreactant) isrfnd = true;
                //else;//do nothing
              }
              if (ispfnd);
              else
              {
                if (elembobjval.isreactant);
                else ispfnd = true;
              }
            }
            //else;//do nothing
          });
          cc.letMustNotBeEmpty(mymollocs, "mymollocs");
          if (mymollocs.length < 1) throw new Error("the array must have at least 2 items on it!");
          else
          {
            if (isrfnd && ispfnd)
            {
              let initcandrop = (mymollocs.length === 2);
              //can drop if the bases are the same and there are only two of them.
              if (initcandrop)
              {
                initcandrop = (mymollocs[0].base === mymollocs[1].base);
                if (initcandrop) numcandrop++;
                //else;//do nothing
              }
              //else;//do nothing
              canpossiblydropit.push(initcandrop);
              return mymollocs;
            }
            else
            {
              throw new Error("at least one must be a reactant and at least one must be a product!");
            }
          }
        });
        console.log("elembsobjsbyuelms = ", elembsobjsbyuelms);
        console.log("canpossiblydropit = ", canpossiblydropit);
        console.log("numcandrop = " + numcandrop);

        const numrwstodrop = mydims[0] - (mydims[1] - 1);
        console.log("numrwstodrop = " + numrwstodrop);
        console.log("OLD mynwstrm = ", mynwstrm);//will be the original matrix then
        
        if (numcandrop < numrwstodrop)
        {
          //the most we can drop are less than the number that we must drop
          //so we cannot drop a certain amount of that
          //maybe a very big problem here
          throw new Error("we cannot drop the number of rows that we need to drop!");
        }
        //else;//do nothing these cases will be handled by the solver

        //these are partial matrices
        return {"ispartial": true, "numrowstodrop": numrwstodrop,
          "rowsthatcanbedroped": canpossiblydropit, "numrowscandrop": numcandrop,
          "mynumstringmatrix": mynwstrm, "myanswerstringmatrix": myansstrm
        };
      }
      //else;//do nothing

      //gen last row of both matrices
      mynwstrm.push(mynwstrm[0].map((val, cindx) => ((cindx === 0) ? "1" : "0")));
      myansstrm.push(["1"]);
    }
    console.log("mynwstrm = ", mynwstrm);
    console.log("myansstrm = ", myansstrm);

    let mynumm = mynwstrm.map((rwarr) => rwarr.map((val) => Number(val)));
    let mynumansm = myansstrm.map((rwarr) => rwarr.map((val) => Number(val)));
    console.log("mynumm = ", mynumm);
    console.log("mynumansm = ", mynumansm);

    return {"ispartial": false, "numrowstodrop": 0,
          "rowsthatcanbedroped": mynwstrm.map((val) => false), "numrowscandrop": 0,
      "mynumstringmatrix": mynwstrm, "myanswerstringmatrix": myansstrm,
      "mynummatrix": mynumm, "myanswernummatrix": mynumansm};
  }

  function solverMain(parmatrixobj, useminv=false)
  {
    cc.letMustBeBoolean(useminv, "useminv");
    cc.letMustBeDefinedAndNotNull(parmatrixobj, "parmatrixobj");

    //need to generate the matrix
    //the problem is the matrix generator will in one case need to be trial and error
    //we also need access to the top data object to generate the matrix
    //then we will need to process the results
    //need some sort of list of combinations we have tried
    //need some list of combinations to try
    //we need to remove a certain number of rows
    //we have a certain number of rows, we only have certain rows we can remove
    //let us say we have total number of rows totalrows and of this we want to remove k rows
    //where k is an integer less than totalrows and k is at least zero
    //say 5 total and remove 2 and can remove all of them:
    //[[1, 2], [1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 5], [3, 4], [3, 5], [4, 5]]
    //this is some sort of permutation because it is without replacement
    //we have k we want to remove, these would be the number of dials,
    //we have the dial absolute max = totalrows and the dial absolute min = 1
    //the dial min and max values will actually be the minimum valid to remove
    //and the maximum valid to be removed
    //but our dials for removal have only set valid values
    //to enforce that if it contains a number that is not valid, then remove it from list
    //
    //now for our solver the first one to be solved is the solution
    //all others are ignored, if any errors, treated as unsolveable and move on to the next one
    //if none of them solve it, then error out with no solution.
    
    //what if we do not need to remove any then perhaps combos will be empty
    //in that case we want it to run through once, use the matrix, ignore combo matrix gen,
    //and get what we want, but if it errors out, throw no solution or just throw it...

    const ispartial = parmatrixobj.ispartial;
    const maxnumrows = parmatrixobj.mynumstringmatrix.length;
    let combos = null;
    if (ispartial)
    {
      //get the information to call the combo generator here
      //"numrowstodrop": numrwstodrop, (NUMBER OF DIALS)
      //"rowsthatcanbedroped": canpossiblydropit, "numrowscandrop": numcandrop
      //THE OTHERS WILL HELP SET THE MINS AND MAXS ON THE COMBO GENERATOR
      
      const numrowstodrop = parmatrixobj.numrowstodrop;//NUM DIALS
      const numrowscandrop = parmatrixobj.numrowscandrop;
      if (numrowstodrop === numrowscandrop)
      {
        //only add the indexes for the ones that are true
        combos = [];
        let mycombo = [];
        parmatrixobj.canpossiblydropit.forEach((ditval, ditindx) => {
          if (ditval) mycombo.push(ditindx);//may need to add 1 here if abs min on dials is 1
          //else;//do nothing
        });
        combos.push(mycombo);
      }
      else if (numrowscandrop < numrowstodrop)
      {
        throw new Error("we cannot drop the number of rows that we need to drop! " +
          "The partial matrix generator should have caught this!");
      }
      else
      {
        //need to determine our dial mins and maxs
        //eventually will call the permutation generator here
        let dialmin = -1;
        let dialmax = -1;
        let fnddialmin = false;
        for (let n = 0; n < parmatrixobj.rowsthatcanbedroped.length; n++)
        {
          if (parmatrixobj.rowsthatcanbedroped[n])
          {
            fnddialmin = true;
            dialmin = n;
            break;
          }
          //else;//do nothing
        }
        let fnddialmax = false;
        for (let n = parmatrixobj.rowsthatcanbedroped.length - 1;
          (0 < n || n === 0) && n < parmatrixobj.rowsthatcanbedroped.length; n--)
        {
          if (parmatrixobj.rowsthatcanbedroped[n])
          {
            fnddialmax = true;
            dialmax = n;
            break;
          }
          //else;//do nothing
        }
        console.log("fnddialmin = " + fnddialmin);
        console.log("fnddialmax = " + fnddialmax);
        console.log("dialmin = " + dialmin);
        console.log("dialmax = " + dialmax);

        if (fnddialmin && fnddialmax)
        {
          if (dialmax < 0 || dialmin < 0 || maxnumrows - 1 < dialmax || maxnumrows - 1 < dialmin)
          {
            throw new Error("invalid dial min or max was found and used here!");
          }
          //else;//do nothing
        }
        else throw new Error("either the dial min or the dial max did not get set!");
        let mytempcombos = cc.permutationGenerator(numrowstodrop, "", dialmin, dialmax);
        console.log("mytempcombos = ", mytempcombos);

        mytempcombos.forEach((val) => {
          //console.log("val = " + val);
          
          let mynumobjs = cc.getAllNumbersFromTheString(val);
          //console.log("mynumobjs = ", mynumobjs);

          let mycombo = mynumobjs.map((cmbval) => cmbval.num);
          //console.log("mycombo = ", mycombo);

          //need to check to see if the combo is valid
          let cmbisvalid = true;
          let usednums = [];
          for (let n = 0; n < mycombo.length; n++)
          {
            if (mycombo[n] < 0 || maxnumrows - 1 < mycombo[n])
            {
              cmbisvalid = false;
              break;
            }
            else
            {
              if (parmatrixobj.rowsthatcanbedroped[mycombo[n]])
              {
                let addit = true;
                for (let k = 0; k < usednums.length; k++)
                {
                  if (usednums[k] === mycombo[n])
                  {
                    addit = false;
                    break;
                  }
                  //else;//do nothing
                }
                if (addit) usednums.push(mycombo[n]);
                else
                {
                  cmbisvalid = false;
                  break;
                }
              }
              else
              {
                cmbisvalid = false;
                break;
              }
            }
          }
          //console.log("cmbisvalid = " + cmbisvalid);

          if (cmbisvalid)
          {
            if (cc.isLetUndefinedOrNull(combos)) combos = [];
            //else;//do nothing
            let addit = cc.isLetEmptyNullOrUndefined(combos);
            for (let k = 0; k < combos.length; k++)
            {
              //if these can be arranged to match each other, then same combination
              //if they both have the same numbers on them, then same combination
              //if they are the same combination, then do not add it
              //console.log("combos[" + k + "] = ", combos[k]);
              //console.log("mycombo = ", mycombo);

              let finaddit = true;
              for (let c = 0; c < combos[k].length; c++)
              {
                //console.log("looking for combos[" + k + "][" + c + "] = " + combos[k][c]);

                let fndit = false;
                for (let r = 0; r < mycombo.length; r++)
                {
                  if (mycombo[r] === combos[k][c])
                  {
                    fndit = true;
                    break;
                  }
                  //else;//do nothing
                }
                //console.log("fndit = " + fndit);

                if (fndit)
                {
                  if (c + 1 < combos[k].length);
                  else
                  {
                    finaddit = false;
                    addit = false;
                    break;
                  }
                }
                else
                {
                  addit = true;
                  break;
                }
              }//end of c for loop
              //console.log("finaddit = " + finaddit);

              if (finaddit);
              else break;
            }//end of k for loop
            //console.log("addit = " + addit);

            if (addit) combos.push(mycombo);
            //else;//do nothing
          }
          //else;//do nothing
        });
        //console.log("combos = ", combos);
      }
    }
    //else;//do nothing
    console.log("FINAL combos = ", combos);
    
    const hasnocombos = cc.isLetEmptyNullOrUndefined(combos);
    const nmax = (hasnocombos ? 1 : combos.length);
    const usestrs = false;//actually dictated by if fractions are stored or numbers directly
    for (let n = 0; n < nmax; n++)
    {
      //get the combination generate the matrix then attempt to solve it
      let currentcombo = (hasnocombos ? null : combos[n]);
      console.log("currentcombo = ", currentcombo);

      let myresobj = null;
      try
      {
        let a = null;
        let b = null;
        if (ispartial)
        {
          if (hasnocombos) break;
          else
          {
            //then gen a and b matrices and proceed below
            console.log("the original matrix is: ", parmatrixobj.mynumstringmatrix);
            console.log("the original answer matrix is: ", parmatrixobj.myanswerstringmatrix);

            //once we have these...
            let mynwnumstrm = parmatrixobj.mynumstringmatrix.filter((myarr, myrwi) => {
              for (let k = 0; k < currentcombo.length; k++)
              {
                if (currentcombo[k] === myrwi) return false;
                //else;//do nothing
              }
              return true;
            });
            //gen last row of both matrices
            mynwnumstrm.push(mynwnumstrm[0].map((val, cindx) => ((cindx === 0) ? "1" : "0")));
            let mynwansm = parmatrixobj.myanswerstringmatrix.filter((marr, myrwi) => {
              for (let k = 0; k < currentcombo.length; k++)
                {
                  if (currentcombo[k] === myrwi) return false;
                  //else;//do nothing
                }
                return true;
            });
            mynwansm.push(["1"]);
            console.log("FINAL mynwnumstrm = ", mynwnumstrm);
            console.log("FINAL mynwansm = ", mynwansm);

            let mynumm = mynwnumstrm.map((rwarr) => rwarr.map((val) => Number(val)));
            let mynumansm = mynwansm.map((rwarr) => rwarr.map((val) => Number(val)));
            console.log("mynumm = ", mynumm);
            console.log("mynumansm = ", mynumansm);

            a = (usestrs ? mynwnumstrm : mynumm);
            b = (usestrs ? mynwansm : mynumansm);
          }
        }
        else
        {
          a = (usestrs ? parmatrixobj.mynumstringmatrix : parmatrixobj.mynummatrix);
          b = (usestrs ? parmatrixobj.myanswerstringmatrix : parmatrixobj.myanswernummatrix);
        } 
        myresobj = (useminv ? Matrices.SolveViaMatrixInverse(a, b, !usestrs) :
          Matrices.CramersRule(a, b, !usestrs));
        console.log("myresobj = ", myresobj);
        console.warn("a solution was found!");
      }
      catch(err)
      {
        if (hasnocombos) console.error("the only matrix used was not the solution!");
        else
        {
          console.error("the combo used was ", currentcombo);
          console.error("that combo was not the solution because it resulted in an error!");
        }
        console.error(err);
        myresobj = null;
      }
      console.log("myresobj = ", myresobj);

      if (cc.isLetEmptyNullOrUndefined(myresobj));
      else
      {
        console.log("mylcs = ", mylcs);
        //return {"ans": myres, "myintans": myints, "mydenoms": mydenoms, "mynumerators": mynumrs};
        //return {"ans": myans, "myintans": mynewnums, "mydet": mydet, "mynumerators": mynumerators};
        //cramers rule has mydet key (whatever it returns a number), minv has mydenoms (array) key
        //but the only thing we are actually interested in is myintans
        //as this holds what the lcs need to be

        //take this and set the LCS with the results
        //myresobj.myintans
        //mylcs, setMyLCs
        //the results are in order of the reactants then the products
        //so if we can determine what order the lcs are currently in, we can set them
        //if I know how many are in the reactants and how many are in the products,
        //then I can split the array and set them more or less
        let numrs = 0;
        let numps = 0;
        let rlcobjs = [];
        let plcobjs = [];
        mylcs.forEach((lcobj) => {
          if (lcobj.isreactant)
          {
            numrs++;
            rlcobjs.push(lcobj);
          }
          else
          {
            numps++;
            plcobjs.push(lcobj);
          }
        });
        console.log("numrs = " + numrs);
        console.log("numps = " + numps);
        console.log("rlcobjs = ", rlcobjs);
        console.log("plcobjs = ", plcobjs);
        
        if (numrs + numps === mylcs.length && mylcs.length === myresobj.myintans.length);
        else throw new Error("illegal number of lcs or answers found!");

        //the lcs can now be mapped and set
        let mynwlcs = rlcobjs.map((robj) => {
          let mynwrobj = {...robj};
          mynwrobj.lcval = myresobj.myintans[robj.num - 1];
          return mynwrobj;
        });
        plcobjs.forEach((pobj) => {
          let mynwpobj = {...pobj};
          mynwpobj.lcval = myresobj.myintans[numrs + pobj.num - 1];
          mynwlcs.push(mynwpobj);
        });
        console.log("mynwlcs = ", mynwlcs);

        setMyLCs(mynwlcs);
        if (areallequsbalanced);
        else setAllEqusBalanced(true);
        if (balerrfnd) setBalErrorFound(false);
        //else;//do nothing
        return mynwlcs;
      }
    }//end of n for loop
    throw new Error("no solution found!");
  }

  function solveTheSystem(matrixobj, useminv=false)
  {
    cc.letMustBeBoolean(useminv, "useminv");
    cc.letMustBeDefinedAndNotNull(matrixobj, "matrixobj");
    
    let usestrs = false;//actually dictated by if fractions are stored or numbers directly
    let a = (usestrs ? matrixobj.mynumstringmatrix : matrixobj.mynummatrix);
    let b = (usestrs ? matrixobj.myanswerstringmatrix : matrixobj.myanswernummatrix);
    let myresobj = (useminv ? Matrices.SolveViaMatrixInverse(a, b, !usestrs) :
      Matrices.CramersRule(a, b, !usestrs));
    console.log("myresobj = ", myresobj);
    console.log("mylcs = ", mylcs);
    //return {"ans": myres, "myintans": myints, "mydenoms": mydenoms, "mynumerators": mynumrs};
    //return {"ans": myans, "myintans": mynewnums, "mydet": mydet, "mynumerators": mynumerators};
    //cramers rule has mydet key (whatever it returns a number), minv has mydenoms (array) key
    //but the only thing we are actually interested in is myintans
    //as this holds what the lcs need to be

    //take this and set the LCS with the results
    //myresobj.myintans
    //mylcs, setMyLCs
    //the results are in order of the reactants then the products
    //so if we can determine what order the lcs are currently in, we can set them
    //if I know how many are in the reactants and how many are in the products,
    //then I can split the array and set them more or less
    let numrs = 0;
    let numps = 0;
    let rlcobjs = [];
    let plcobjs = [];
    mylcs.forEach((lcobj) => {
      if (lcobj.isreactant)
      {
        numrs++;
        rlcobjs.push(lcobj);
      }
      else
      {
        numps++;
        plcobjs.push(lcobj);
      }
    });
    console.log("numrs = " + numrs);
    console.log("numps = " + numps);
    console.log("rlcobjs = ", rlcobjs);
    console.log("plcobjs = ", plcobjs);
    
    if (numrs + numps === mylcs.length && mylcs.length === myresobj.myintans.length);
    else throw new Error("illegal number of lcs or answers found!");

    //the lcs can now be mapped and set
    let mynwlcs = rlcobjs.map((robj) => {
      let mynwrobj = {...robj};
      mynwrobj.lcval = myresobj.myintans[robj.num - 1];
      return mynwrobj;
    });
    plcobjs.forEach((pobj) => {
      let mynwpobj = {...pobj};
      mynwpobj.lcval = myresobj.myintans[numrs + pobj.num - 1];
      mynwlcs.push(mynwpobj);
    });
    console.log("mynwlcs = ", mynwlcs);

    setMyLCs(mynwlcs);
    if (areallequsbalanced);
    else setAllEqusBalanced(true);
    if (balerrfnd) setBalErrorFound(false);
    //else;//do nothing
    return mynwlcs;
  }

  function getElementAndBaseStartAndEndIndexes(hnames)
  {
    cc.letMustNotBeEmpty(hnames, "hnames");

    let myelsis = [];
    let myeleis = [];
    let mybasis = [];
    let mybaeis = [];
    hnames.forEach((hnm) => {
      //console.log("hnm = " + hnm);

      let elsis = null;
      let eleis = null;
      let basis = null;
      let baeis = null;
      if (hnm === "->" || hnm === "elements");
      else
      {
        let lcnm = hnm.substring(0, hnm.indexOf(" * "));
        //console.log("lcnm = " + lcnm);

        let multiindxs = cc.getAllIndexesOf("*", hnm, 0);
        //console.log("multiindxs = ", multiindxs);

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
            //console.log("fndei = " + fndei);
            //console.log("myei = " + myei);

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
      //console.log("elsis = ", elsis);
      //console.log("eleis = ", eleis);
      //console.log("basis = ", basis);
      //console.log("baeis = ", baeis);

      myelsis.push(elsis);
      myeleis.push(eleis);
      mybasis.push(basis);
      mybaeis.push(baeis);
    });
    console.log("myelsis = ", myelsis);
    console.log("myeleis = ", myeleis);
    console.log("mybasis = ", mybasis);
    console.log("mybaeis = ", mybaeis);

    return {"myelsis": myelsis, "myeleis": myeleis, "mybasis": mybasis, "mybaeis": mybaeis};
  }

  function getReactantsAndProductsByNumArrays(myarr, mxrnum, mxpnum)
  {
    cc.letMustNotBeEmpty(myarr, "my-elements-arr");
    cc.letMustBeDefinedAndNotNull(mxrnum, "mxrnum");
    cc.letMustBeDefinedAndNotNull(mxpnum, "mxpnum");

    const reactants = myarr.filter((mobj) => mobj.isreactant);
    const products = myarr.filter((mobj) => !mobj.isreactant);
    let reactantsbynum = [];
    let productsbynum = [];
    for (let c = 0; c < 2; c++)
    {
      let porrarr = ((c === 0) ? reactants : products);
      let nmx = ((c === 0) ? mxrnum : mxpnum) + 1;
      //console.log("c = " + c);

      for (let n = 1; n < nmx; n++)
      {
        let mytempnumarr = [];
        for (let k = 0; k < porrarr.length; k++)
        {
          if (porrarr[k].num === n) mytempnumarr.push(porrarr[k]);
          //else;//do nothing
        }
        //console.log("init mytempnumarr = ", mytempnumarr);

        mytempnumarr = mytempnumarr.sort((obja, objb) => {
          let anum = Number(obja.id.substring(obja.id.indexOf("_") + 1));
          let bnum = Number(objb.id.substring(objb.id.indexOf("_") + 1));
          return anum - bnum;
        });
        //console.log("NEW mytempnumarr = ", mytempnumarr);

        if (c === 0) reactantsbynum.push(mytempnumarr);
        else productsbynum.push(mytempnumarr);
      }//end of n for loop
    }//end of c for loop
    console.log("reactantsbynum = ", reactantsbynum);
    console.log("productsbynum = ", productsbynum);

    return {"reactants": reactants, "products": products,
      "reactantsbynum" : reactantsbynum, "productsbynum" : productsbynum};
  }

  function getHeaderNamesForEquTable(reactantsbynum, productsbynum, mxrnum, mxpnum,
    addifbaseisone=false)
  {
    let hnames = ["elements"];
    for (let c = 0; c < 2; c++)
    {
      let porrarr = ((c === 0) ? reactantsbynum : productsbynum);
      let nmx = ((c === 0) ? mxrnum : mxpnum) + 1;
      //console.log("c = " + c);

      for (let n = 1; n < nmx; n++)
      {
        let lcnm = ((c === 0) ? "r" : "p") + "_" + n;
        let mystr = "" + lcnm + " * ";
        //console.log("lcnm = " + lcnm);
        //console.log("INIT mystr = " + mystr);
        //console.log("porrarr[" + (n - 1) + "] = ", porrarr[n - 1]);

        for (let k = 0; k < porrarr[n - 1].length; k++)
        {
          //console.log("porrarr[" + (n - 1) + "][" + k + "] = ", porrarr[n - 1][k]);
          
          mystr += porrarr[n - 1][k].element;
          if (Number(porrarr[n - 1][k].base) === 1 && !addifbaseisone);
          else if (Number(porrarr[n - 1][k].base) < 1)
          {
            throw new Error("illegal value found and used for the base! Base must be positive " +
              "and an integer!");
          }
          else mystr += " " + porrarr[n - 1][k].base;
          //console.log("OLD mystr = " + mystr);

          if (k + 1 < porrarr[n - 1].length) mystr += " * ";
          //else;//do nothing
          //console.log("NEW mystr = " + mystr);
        }//end of k for loop
        //console.log("FINAL mystr = " + mystr);

        hnames.push(mystr);
      }//end of n for loop
      if (c === 0) hnames.push("->");
      //else;//do nothing
    }//end of c for loop
    return hnames;
  }

  function getUniqueElementNamesOnlyArray(myarr)
  {
    cc.letMustNotBeEmpty(myarr, "data-arr-of-element-objs");

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

    return myelems;
  }

  function getTopDataObject(elembsarr)
  {
    const mxrnum = getMaxReactantOrProductsNum(elembsarr, true);
    const mxpnum = getMaxReactantOrProductsNum(elembsarr, false);
    //const mxcols = mxrnum + mxpnum + 1 + 1;
    //names will be generated for the headers from the reactants
    //the first name will be elements
    //the second will be the reactants until ->
    //the ->
    //then the products
    //for the reactants and the products we will take the lcname * elem base * elem base * ... + ...
    const {reactants, products, reactantsbynum, productsbynum} =
      getReactantsAndProductsByNumArrays(elembsarr, mxrnum, mxpnum);
    //console.log("reactants = ", reactants);
    //console.log("products = ", products);
    //console.log("reactantsbynum = ", reactantsbynum);
    //console.log("productsbynum = ", productsbynum);

    //gets the header names and generates the header row here now
    let addifbaseisone = false;//user preference includes the base if base is 1
    const hnames = getHeaderNamesForEquTable(reactantsbynum, productsbynum, mxrnum, mxpnum,
      addifbaseisone);
    
    //get the list of unique elements now
    const myelems = getUniqueElementNamesOnlyArray(elembsarr);
    //console.log("myelems = ", myelems);
    //console.log("myelems.length = " + myelems.length);


    //generate the equations for the elements here
    //need to show that they balance OR do not balance
    //need to add an option for solving it
    //ADD THE EQUATIONS ROWS,
    //THEN SHOW HOW MANY ARE ON EACH SIDE

    //we need to get where the elements start and end on header row
    //where do the bases start and end if present
    const {myelsis, myeleis, mybasis, mybaeis} = getElementAndBaseStartAndEndIndexes(hnames);
    //console.log("myelsis = ", myelsis);
    //console.log("myeleis = ", myeleis);
    //console.log("mybasis = ", mybasis);
    //console.log("mybaeis = ", mybaeis);

    //generate the data rows here...
    let inconetimes = false;//in the equations include 1 * lcnum if the base is 1
    let mydatrws = genDataOnEquationRowsOnly(myelems, hnames, myelsis, myeleis, mybasis, mybaeis,
      false, false, inconetimes);//useequrows, usematrixrows, inconetimes
    console.log("mydatrws = ", mydatrws);
    
    let mtrixdatrws = genDataOnEquationRowsOnly(myelems, hnames, myelsis, myeleis, mybasis, mybaeis,
      false, true, inconetimes);//useequrows, usematrixrows, inconetimes
    console.log("mtrixdatrws = ", mtrixdatrws);

    return {"elembsarr": elembsarr, "reactants": reactants, "products": products,
      "mxrnum": mxrnum, "mxpnum": mxpnum, "reactantsbynum": reactantsbynum,
      "productsbynum": productsbynum, "addifbaseisone": addifbaseisone, "hnames": hnames,
      "myelems": myelems, "myelsis": myelsis, "myeleis": myeleis, "mybasis": mybasis,
      "mybaeis": mybaeis, "inconetimes": inconetimes, "mydatrws": mydatrws, "mtrixdatrws": mtrixdatrws
    };
  }

  function genEquationsTable(mytopdataobj)
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
    //console.log("mytopdataobj = ", mytopdataobj);
    cc.letMustBeDefinedAndNotNull(mytopdataobj, "mytopdataobj");

    const myhrw = (<tr key="equtablehdrrw" style={{border: "1px solid black"}}>{
      mytopdataobj.hnames.map((nm) =>
        <th key={nm} style={{border: "1px solid black"}}>{nm}</th>)}</tr>);

    //generate the data rows here...
    const usemtrixrows = false;
    const myequrws = genEquationOrCountRows(mytopdataobj.myelems, mytopdataobj.hnames,
      mytopdataobj.myelsis, mytopdataobj.myeleis, mytopdataobj.mybasis, mytopdataobj.mybaeis,
      true, usemtrixrows, mytopdataobj.inconetimes);//useequrws, usemtrixrows, inconetimes
    const mybalrws = genEquationOrCountRows(mytopdataobj.myelems, mytopdataobj.hnames,
      mytopdataobj.myelsis, mytopdataobj.myeleis, mytopdataobj.mybasis, mytopdataobj.mybaeis,
      false, usemtrixrows, mytopdataobj.inconetimes);

    return (<table style={{border: "1px solid black"}}>
      <thead style={{border: "1px solid black"}}>{myhrw}</thead>
      <tbody style={{border: "1px solid black"}}>{myequrws}{mybalrws}</tbody>
    </table>);
  }

  function genBalanceTable(mytopdataobj)
  {
    //console.log("mytopdataobj = ", mytopdataobj);
    cc.letMustBeDefinedAndNotNull(mytopdataobj, "mytopdataobj");

    //generate the data rows here...
    //console.log("mytopdataobj.mydatrws = ", mytopdataobj.mydatrws);

    //the new headers we want are elements, total on left, total on right, is blanced
    const nwhdrs = ["elements", "total on left", "total on right", "is balanced"];
    const myhrw = (<tr key="baltablehdrrw" style={{border: "1px solid black"}}>{nwhdrs.map((nm) => {
      let kynm = ((nm === "elements") ? "" + nm + "_baltble" : nm);
      return (<th key={kynm} style={{border: "1px solid black"}}>{nm}</th>);
    })}</tr>);

    let allbal = true;
    let noonezeroerrorfnd = false;
    let mybdyrws = null;
    let gettherws = true;
    if (mytopdataobj.mydatrws.length === 1)
    {
      if (cc.isLetEmptyNullOrUndefined(mytopdataobj.mydatrws[0])) gettherws = false;
      //else;//get them
    }
    //else;//get them
    if (gettherws)
    {
      mybdyrws = mytopdataobj.mydatrws.map((rarr) => {
        if (cc.isLetEmptyNullOrUndefined(rarr)) return null;
        //else;//do nothing
        
        let mytonleft = 0;
        let mytonright = 0;
        let fndequls = false;
        for (let n = 1; n < rarr.length; n++)
        {
          if (rarr[n] === "=")
          {
            if (fndequls)
            {
              throw new Error("equals was already found, but it should only be present once!");
            }
            else fndequls = true;
          }
          else
          {
            //these will be numbers
            if (fndequls) mytonright += Number(rarr[n]);
            else mytonleft += Number(rarr[n]);
          }
        }//end of n for loop
        //console.log("mytonleft = " + mytonleft);
        //console.log("mytonright = " + mytonright);
  
        let isbalanced = (mytonleft === mytonright);
        //console.log("isbalanced = " + isbalanced);
  
        if (isbalanced);
        else
        {
          if (allbal) allbal = false;
          //else;//do nothing
        }
        //console.log("allbal = " + allbal);

        noonezeroerrorfnd = (noonezeroerrorfnd || (mytonleft < 1 && 0 < mytonright) ||
          (mytonright < 1 && 0 < mytonleft));
        //console.log("noonezeroerrorfnd = " + noonezeroerrorfnd);
  
        return(<tr key={rarr[0] + "bal_tblerw"} style={{border: "1px solid black"}}>
          <td key={rarr[0] + "bal_element"} style={{border: "1px solid black"}}>{rarr[0]}</td>
          <td key={rarr[0] + "bal_onleft"} style={{border: "1px solid black"}}>{mytonleft}</td>
          <td key={rarr[0] + "bal_onright"} style={{border: "1px solid black"}}>{mytonright}</td>
          <td key={rarr[0] + "bal_elisbalanced"} style={{border: "1px solid black"}}>
            {"" + isbalanced}</td>
        </tr>);
      });
    }
    //else;//do nothing
    console.log("mybdyrws = ", mybdyrws);
    console.log("allbal = " + allbal);
    console.log("noonezeroerrorfnd = " + noonezeroerrorfnd);
    if (areallequsbalanced === allbal);
    else setAllEqusBalanced(allbal);
    if (balerrfnd === noonezeroerrorfnd);
    else setBalErrorFound(noonezeroerrorfnd);
    
    return (<div><table style={{border: "1px solid black"}}>
      <thead style={{border: "1px solid black"}}>{myhrw}</thead>
      <tbody style={{border: "1px solid black"}}>{mybdyrws}</tbody>
    </table>
    <p>The equation is <b>{(allbal ? "balanced!" : "not balanced!")}</b></p>
    {noonezeroerrorfnd ? (<p style={{color: "red"}}><b>{"Although having no elements on both the " +
      "products and the reactants is technically valid, having an amount on one side, but nothing " +
      "on the other is not valid!"}
      </b></p>) : null}
    {allbal ? (<p>{"Now you can multiply or divide the LCs by any scalar constant and you will get " +
      "another solution. CHEMICAL EQUATIONS HAVE INFINITELY MANY SOLUTIONS."}</p>) : null}
    </div>);
  }

  function getFinalIndexesOfWithAndNoSpaces(myqrynospcs, mystr)
  {
    const myoqry = " " + myqrynospcs + " ";
    let myindxswithspcs = cc.getAllIndexesOf(myoqry, mystr, 0);
    let myindxsnospcs = cc.getAllIndexesOf(myqrynospcs, mystr, 0);
    console.log("myindxswithspcs = ", myindxswithspcs);
    console.log("myindxsnospcs = ", myindxsnospcs);

    let myindxsonlyswithspc = null;
    let finindxs = null;
    let finindxslens = null;
    if (cc.isLetEmptyNullOrUndefined(myindxsnospcs));
    else
    {
      myindxsonlyswithspc = myindxsnospcs.map((mpval) => {
        if (cc.isLetEmptyNullOrUndefined(myindxswithspcs)) return false;
        if (mpval < 0 || mystr.length - 1 < mpval) return false;
        for (let k = 0; k < myindxswithspcs.length; k++)
        {
          if (myindxswithspcs[k] + 1 === mpval) return true;
          //else;//do nothing
        }
        return false;
      });
      //console.log("myindxsonlyswithspc = ", myindxsonlyswithspc);

      finindxs = myindxsnospcs.map((pval, mpi) => {
        if (myindxsonlyswithspc[mpi]) return pval - 1;
        else return pval;
      });
      finindxslens = myindxsnospcs.map((pval, mpi) => {
        if (myindxsonlyswithspc[mpi]) return myqrynospcs.length + 2;
        else
        {
          if (pval < 0 || mystr.length - 1 < pval) return 0;
          else return myqrynospcs.length;
        }
      });
    }
    console.log("myindxsonlyswithspc = ", myindxsonlyswithspc);
    console.log("finindxs = ", finindxs);
    console.log("finindxslens = ", finindxslens);

    return {"finindxs": finindxs, "finindxslens": finindxslens,
      "myindxsonlyswithspc": myindxsonlyswithspc, "myindxswithspcs": myindxswithspcs,
      "myindxsnospcs": myindxsnospcs, "myqrynospcs": myqrynospcs, "myoqry": myoqry, "mystr": mystr};
  }

  function getElemBasesFromSectStr(sectstr, sectstri, psi)
  {
    //now get my elements and bases for this string
    console.log("sectstr = " + sectstr);
    console.log("sectstri = " + sectstri);
    console.log("psi = " + psi);

    if (sectstri < 0 || psi < 0) throw new Error("sectstri and psi must be at least 0!");
    //else;//do nothing

    const isreactant = (sectstri < psi);
    console.log("isreactant = " + isreactant);

    //the capital letters indicate the start of a new element
    //the lowercase letters are part of the element
    //use mylower and myislower and myupper and myisupper methods for casing
    //use the isLetter method
    //
    //if it is a digit, then it is a base or starting lc
    //immediately starting the string can only be a capital letter (no lc num val) or
    //(a digit if lc num val is present only)
    //if not then not valid and error out
    //the string will not include spaces or tabs or new lines etc.

    //the num corresponds with the sectstri
    //specifically num = sectstri + 1 if and only if sectstri < psi
    //else num = sectstri - psi + 1
    //the id string is generated by r or p num _ how many in that reactant
    //the num is the number overall or current reactant number
    //the only one we cannot remove is the first reactant and the first product
    //let initrobj = {"id": "r1_0", "element": "", "base": 1, "isreactant": true, "num": 1,
    //"canrem": false};
    //initrlcobj = {"num": 1, "isreactant": true, "lcval": 1};
    const rorpnum = ((sectstri < psi) ? sectstri + 1 : sectstri - psi + 1);
    console.log("rorpnum = " + rorpnum);

    const myidbasestr = (isreactant ? "r" : "p") + rorpnum + "_";
    console.log("myidbasestr = " + myidbasestr);

    //if the first character of the section string is a digit, then get the number
    //this number is the leading coefficient value otherwise use 1.
    let mylcval = 1;
    let islcvalonstr = false;
    if (cc.isDigit("" + sectstr.charAt(0)))
    {
      //get the number here...
      islcvalonstr = true;
      mylcval = cc.getNumGivenStartIndex(sectstr, 0, false);
    }
    else
    {
      //mylcval = 1
      if (cc.myisupper("" + sectstr.charAt(0)));
      else throw new Error("invalid starting character found and used here!");
    }
    if (mylcval < 1) mylcval = 1;
    //else;//do nothing
    let myinitrlcobj = {"num": rorpnum, "isreactant": isreactant, "lcval": mylcval};
    console.log("islcvalonstr = " + islcvalonstr);
    console.log("myinitrlcobj = ", myinitrlcobj);

    let elemsis = [];
    for (let i = 0; i < sectstr.length; i++)
    {
      if (cc.isalnum("" + sectstr.charAt(i)))
      {
        if (cc.isDigit("" + sectstr.charAt(i)) || sectstr.charAt(i) === ' ');
        else
        {
          if (cc.myisupper("" + sectstr.charAt(i))) elemsis.push(i);
          //else;//do nothing
        }
      }
      else throw new Error("invalid character found on the string!");
    }
    console.log("elemsis = ", elemsis);
    
    let elemeis = elemsis.map((val) => {
      if (val < 0) return val;
      else
      {
        for (let i = val; i < sectstr.length; i++)
        {
          //console.log("sectstr.charAt(" + i + ") = " + sectstr.charAt(i));
          if (cc.isLetter("" + sectstr.charAt(i)))
          {
            if (cc.myisupper("" + sectstr.charAt(i)))
            {
              if (val === i);
              else return i;
            }
            //else;//do nothing lowercase letter
          }
          else return i;
        }
        return sectstr.length;
      }
    });
    console.log("elemeis = ", elemeis);

    let baseeis = [];
    let basesis = elemeis.map((val, indx) => {
      //get the end index if the next character is a digit, this is a base start index
      if (val < sectstr.length)
      {
        if (cc.isDigit("" + sectstr.charAt(val)))
        {
          //get the end index
          let mybei = -1;
          for (let i = val; i < sectstr.length; i++)
          {
            if (cc.isDigit("" + sectstr.charAt(i)));
            else
            {
              mybei = i;
              break;
            }
          }
          if (mybei < 0) mybei = sectstr.length;
          //else;//do nothing
          baseeis.push(mybei);
          return val;
        }
        else
        {
          baseeis.push(-1);
          return -1;
        }
      }
      else
      {
        baseeis.push(-1);
        return -1;
      }
    });
    console.log("basesis = ", basesis);
    console.log("baseeis = ", baseeis);

    //do other stuff to generate the returned objects...
    let myelembasearrfequ = elemsis.map((val, indx) => {
      let mybasenum = 1;
      if (basesis[indx] < 0 || sectstr.length - 1 < basesis[indx]);
      else
      {
        let basenumstr = sectstr.substring(basesis[indx], baseeis[indx]);
        mybasenum = Number(basenumstr);
      }
      let mycanrem = (!(rorpnum === 1 && indx < 1));
      let myelmobj = {"id": myidbasestr + indx, "element": sectstr.substring(val, elemeis[indx]),
        "base": mybasenum, "isreactant": isreactant, "num": rorpnum, "canrem": mycanrem};
      return myelmobj;
    });
    console.log("myelembasearrfequ = ", myelembasearrfequ);

    return {"nwelembasearr": myelembasearrfequ, "elemsis": elemsis, "elemeis": elemeis,
      "basesis": basesis, "baseeis": baseeis, "mylcobj": myinitrlcobj, "lcpresent": islcvalonstr,
      "sectstr": sectstr, "sectstri": sectstri, "psi": psi
    };
  }

  function setMyInitialStateFromEqu(mynwequtxt)
  {
    //take the equtxt and generate the lcs objects
    //all we need to do is take the num is, these are the bases unless in front of plus
    //or the first one or in front of the arrow
    //let us say we have AgNO3 in this case, case matters
    //uppercase starts their own elements + indicates new rorp -> starts of ps
    //start of string = start of rs
    //spaces will be ignored
    console.log("mynwequtxt = " + mynwequtxt);
    //get all indexes of +s
    //get the arrow index
    //it will either be space + space or just +
    //it will either be space -> space or just ->

    let myplusindxsobj = getFinalIndexesOfWithAndNoSpaces("+", mynwequtxt);
    console.log("myplusindxsobj = ", myplusindxsobj);

    let myarrowindxsobj = getFinalIndexesOfWithAndNoSpaces("->", mynwequtxt);
    console.log("myplusindxsobj = ", myplusindxsobj);
    console.log("myarrowindxsobj = ", myarrowindxsobj);
    
    //now we have our plusses as the delimeters
    //we have their lengths for the delimeters
    //make sure that one and only one arrow is found and the index is not invalid
    //plusses do not have to be found

    cc.letMustNotBeEmpty(myarrowindxsobj.finindxs);
    if (1 < myarrowindxsobj.finindxs.length)
    {
      //invalid and should not set state should not continue
      console.error("the equation is not valid!");
      return null;
    }
    //else;//do nothing
    let myarrowindx = myarrowindxsobj.finindxs[0];
    if (myarrowindx < 0 || mynwequtxt.length - 1 < myarrowindx)
    {
      //invalid and should not set state should not continue
      console.error("the arrow index was invalid!");
      console.error("the equation is not valid!");
      return null;
    }
    //else;//do nothing

    let numplusbfrarrow = 0;
    if (cc.isLetEmptyNullOrUndefined(myplusindxsobj.finindxs));
    else
    {
      //need to go over these here...
      for (let k = 0; k < myplusindxsobj.finindxs.length; k++)
      {
        if (myplusindxsobj.finindxs[k] < myarrowindx)
        {
          if (myplusindxsobj.finindxslens[k] === myplusindxsobj.myqrynospcs.length ||
            myplusindxsobj.finindxslens[k] === myplusindxsobj.myqrynospcs.length + 2)
          {
            numplusbfrarrow++;
          }
          //else;//do nothing length is not valid
        }
        //else;//do nothing
      }
    }
    console.log("numplusbfrarrow = " + numplusbfrarrow);

    //if numplusbfrarrow is zero then first delim is arrow and only one index is before it
    //else if more than zero then numsectsbeforearrow = numplusbfrarrow + 1
    //if secti < numsectsbfrarw then reactant else product
    const numsectsbfrarw = numplusbfrarrow + 1;
    console.log("numsectsbfrarw = " + numsectsbfrarw);
    

    //now we know our delimeters are valid
    //we now need to combine them
    //the arrows will go somewhere in the middle of all of the plusses if there are plusses
    //then we will have the delimeters and their lengths ready

    //now all we have to do is split the string at those delimeters
    //then each section will be of element and bases
    //we will also need to know where the arrow is
    //because this indicates where the products start
    //
    //then we can use use a case check to get the elements
    //the bases if not existing will be 1
    //otherwise they are what is given
    //once we generate all of our state variables we set it
    
    
    //note on the final list only one arrow must be present
    //now take these two arrays figure out where all of them are
    //the arrow indexs will be inside of the spc arrow spc ones
    //the arrow indexes will need to be adjusted to get the start of that
    //once we take this, we will be able to build our delims
    //then we can split it out and get the elements from a sections

    let mydelimis = [];
    let mydelimlens = [];
    if (cc.isLetEmptyNullOrUndefined(myplusindxsobj.finindxs))
    {
      mydelimis = myarrowindxsobj.finindxs;
      mydelimlens = myarrowindxsobj.finindxslens;
    }
    else
    {
      if (myplusindxsobj.finindxs.length < 2)
      {
        if (myplusindxsobj.finindxs[0] < myarrowindx)
        {
          mydelimis.push(myplusindxsobj.finindxs[0]);
          mydelimlens.push(myplusindxsobj.finindxslens[0]);
          //push arrow
          mydelimis.push(myarrowindx);
          mydelimlens.push(myarrowindxsobj.finindxslens[0]);
        }
        else
        {
          //push arrow
          mydelimis.push(myarrowindx);
          mydelimlens.push(myarrowindxsobj.finindxslens[0]);
          mydelimis.push(myplusindxsobj.finindxs[0]);
          mydelimlens.push(myplusindxsobj.finindxslens[0]);
        }
      }
      else
      {
        myplusindxsobj.finindxs.forEach((val, indx) => {
          if (val < myarrowindx)
          {
            //val is before arrow
            if (indx + 1 < myplusindxsobj.finindxs.length)
            {
              if (myarrowindx < myplusindxsobj.finindxs[indx + 1])
              {
                //val < arrow < nextval
                //push val then arrow
                mydelimis.push(val);
                mydelimlens.push(myplusindxsobj.finindxslens[indx]);
                //push arrow
                mydelimis.push(myarrowindx);
                mydelimlens.push(myarrowindxsobj.finindxslens[0]);
              }
              else
              {
                //val < nextval < arrow
                //ignore arrow only push val
                mydelimis.push(val);
                mydelimlens.push(myplusindxsobj.finindxslens[indx]);
              }
            }
            else
            {
              //push val, then arrow
              mydelimis.push(val);
              mydelimlens.push(myplusindxsobj.finindxslens[indx]);
              //push arrow
              mydelimis.push(myarrowindx);
              mydelimlens.push(myarrowindxsobj.finindxslens[0]);
            }
          }
          else
          {
            //myarrowindx < val
            mydelimis.push(val);
            mydelimlens.push(myplusindxsobj.finindxslens[indx]);
          }
        });
      }
    }
    console.log("mydelimis = ", mydelimis);
    console.log("mydelimlens = ", mydelimlens);

    let mysectstrs = cc.mySplit(mynwequtxt, mydelimis, mydelimlens);
    console.log("mysectstrs = ", mysectstrs);

    let myelembasefequstrdataobjs = mysectstrs.map((val, secti) =>
      getElemBasesFromSectStr(val, secti, numsectsbfrarw));
    console.log("myelembasefequstrdataobjs = ", myelembasefequstrdataobjs);

    //build the final elembasearr
    //build the lcs
    //then set the new state
    let myfinnwlcs = [];
    let myfinnwelembasearr = [];
    myelembasefequstrdataobjs.forEach((myobj, mindx) => {
      console.log("myobj = ", myobj);
      //console.log(myobj.nwelembasearr);
      //console.log(myobj.mylcobj);
      myobj.nwelembasearr.forEach((elembobj) => myfinnwelembasearr.push(elembobj));
      myfinnwlcs.push(myobj.mylcobj);
    });
    console.log("myfinnwlcs = ", myfinnwlcs);
    console.log("myfinnwelembasearr = ", myfinnwelembasearr);

    setElembaseArr(myfinnwelembasearr);
    setMyLCs(myfinnwlcs);
    setMyTextEqu(mynwequtxt);
    if (lockedbases);
    else setLockedBases(true);
  }

  function genEquTextFrom(elembsarr, lcsarr)
  {
    //take the lcs and the elembsarr and generate the equtext
    let myequ = "";
    let incbaseone = false;//userpref
    let inclcone = false;//userpref
    //if the elembasearr is guaranteed in order generating the string is easy
    let mysrtedembsarr = elembsarr.map((valobj) => valobj);
    mysrtedembsarr = mysrtedembsarr.sort((a, b) => {
      if (a.isreactant === b.isreactant)
      {
        //both reactants or both products
        //if the a num is less than b num a is less than b
        if (a.num === b.num)
        {
          //the number is the same
          //get the number from the id string after the underscore
          //this is an index and these will not be the same
          let aidindxnum = Number(a.id.substring(a.id.indexOf("_") + 1));
          let bidindxnum = Number(b.id.substring(b.id.indexOf("_") + 1));
          if (aidindxnum === bidindxnum) return 0;//should never happen
          else return ((aidindxnum < bidindxnum) ? -1 : 1);
        }
        else return ((a.num < b.num) ? -1 : 1);//the number is not the same
      }
      else return ((a.isreactant) ? -1 : 1);
    });
    console.log("mysrtedembsarr = ", mysrtedembsarr);
    console.log("lcsarr = ", lcsarr);

    //need to handle the LCS
    let addlc = true;
    mysrtedembsarr.forEach((valobj, mindx) => {
      console.log("valobj = ", valobj);
      //{"id": "r1_0", "element": "", "base": 1, "isreactant": true, "num": 1,
      //"canrem": false}
      if (addlc)
      {
        //do something here for the lcs
        //get the lc val for the reactant and num
        let mylcobj = null
        for (let n = 0; n < lcsarr.length; n++)
        {
          if (lcsarr[n].isreactant === valobj.isreactant)
          {
            if (lcsarr[n].num === valobj.num)
            {
              mylcobj = lcsarr[n];
              break;
            }
            //else;//do nothing
          }
          //else;//do nothing
        }
        console.log("mylcobj = ", mylcobj);
        cc.letMustBeDefinedAndNotNull(mylcobj, "mylcobj");

        if (mylcobj.lcval === 1)
        {
          if (inclcone) myequ += "1";
          //else;//do nothing
        }
        else myequ += "" + mylcobj.lcval;
        addlc = false;
      }
      //else;//do nothing
      let myresstr = "" + valobj.element;
      if (valobj.base === 1)
      {
        if (incbaseone) myresstr += "1";
        //else;//do nothing
      }
      else myresstr += valobj.base;
      myequ += "" + myresstr;
      if (mindx + 1 < mysrtedembsarr.length)
      {
        if (mysrtedembsarr[mindx + 1].isreactant === valobj.isreactant)
        {
          if (mysrtedembsarr[mindx + 1].num === valobj.num);
          else
          {
            myequ += " + ";
            addlc = true;
          }
        }
        else myequ += " -> ";
      }
      //else;//do nothing
      console.log("NEW myequ = " + myequ);
    });
    console.log("FINAL myequ = " + myequ);

    return myequ;
  }


  console.log("myelembasearr = ", myelembasearr);
  console.log("mylcs = ", mylcs);
  console.log("areallequsbalanced = " + areallequsbalanced);
  console.log("balerrfnd = " + balerrfnd);

  let mytopdataobj = getTopDataObject(myelembasearr);
  console.log("mytopdataobj = ", mytopdataobj);
  console.log("mytextequ = " + mytextequ);
  
  let useminv = true;
  return (<div>
      <h1>Equation #{equnum}</h1>
      <div>{genControlButtons(myelembasearr, true)}
        <span key={"equarrowa"} style={{display: "inline-block", fontSize: "20px"}}>{" -> "}</span>
          {genControlButtons(myelembasearr, false)}
        <button style={{marginLeft: "10px"}} onClick={(event) => {
          if (lockedbases);
          else setMyTextEqu(genEquTextFrom(myelembasearr, mylcs));
          setLockedBases(!lockedbases);
        }}>
          {lockedbases ? "un": ""}lock bases!</button>
        {((areallequsbalanced || !lockedbases || balerrfnd) ? null :
          (<button onClick={(event) => solverMain(genPartialMatrix(mytopdataobj), useminv)}>
            Solve It!</button>))}
      </div>
      <br />
      <div id="equalltextinput">
        <textarea id="myequinput" name="myequinput" defaultValue={genEquTextFrom(myelembasearr, mylcs)}
          style={{fontSize: "20px", minWidth: "300px", minHeight: "25px"}} onBlur={(event) => {
            let mynwequtxt = event.target.value;
            setMyInitialStateFromEqu(mynwequtxt);
          }} />
      </div>
      <div id="equ" style={{display: "inline-block"}}>
        {genReactantsOrProductsDivs(myelembasearr, true)}
          <span key={"equarrowb"} style={{display: "inline-block", fontSize: "40px"}}>{" -> "}</span>
        {genReactantsOrProductsDivs(myelembasearr, false)}
      </div>
      <br />
      <br />
      {genEquationsTable(mytopdataobj)}
      <br />
      {genBalanceTable(mytopdataobj)}
    </div>);
}

export default EquBalancer;
