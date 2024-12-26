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
function App() {
  //elembase has element, base# but one reactant has a bunch of elements and bases
  //element, base#, num, type
  let initrobj = {"id": "r1_0", "element": "", "base": 1, "isreactant": true, "num": 1, "canrem": false};
  let initpobj = {"id": "p1_0", "element": "", "base": 1, "isreactant": false, "num": 1,
    "canrem": false};
  let initrlcobj = {"num": 1, "isreactant": true, "lcval": 1};
  let initplcobj = {"num": 1, "isreactant": false, "lcval": 1};
  let [myelembasearr, setElembaseArr] = useState([initrobj, initpobj]);
  let [mylcs, setMyLCs] = useState([initrlcobj, initplcobj]);//lcs
  let [lockedbases, setLockedBases] = useState(false);
  let [areallequsbalanced, setAllEqusBalanced] = useState(true);
  let [balerrfnd, setBalErrorFound] = useState(false);
  const cc = new commonclass();

  console.log(Matrices.testTranspose());
  
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
    console.log("mynwobj = ", mynwobj);

    let mynwlcitem = {...initrlcobj};
    mynwlcitem.isreactant = usereactants;
    mynwlcitem.num = mynwobj.num;
    console.log("mynwlcitem = ", mynwlcitem);
    
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

    let mynwlcsarr = mylcs.filter((mobj) => !(mobj.isreactant === usereactants && mobj.num === mxnum));
    console.log("mynwlcsarr = ", mynwlcsarr);
    setMyLCs(mynwlcsarr);
    setElembaseArr(mynwarr);
  }

  function removeFromThisOne(idstr)
  {
    console.log("remidstr = " + idstr);
    cc.letMustNotBeEmpty(idstr, "idstr");
    let mynwarr = myelembasearr.filter((mobj) => !(mobj.id === idstr));
    console.log("mynwarr = ", mynwarr);
    setElembaseArr(mynwarr);
  }


  //DISPLAY METHODS

  function getMyReactantsOrProductsFromArray(myarr, usereactants)
  {
    cc.letMustNotBeEmpty(myarr, "myarr");
    cc.letMustBeBoolean(usereactants, "usereactants");
    
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
          addtothis={addNewReactantOrProductToOne} remfromthis={removeFromThisOne}
          islocked={lockedbases} />);
      });
      let mylcitem = getMyLCItem(n, usereactants);
      console.log("mylcitem = ", mylcitem);

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
    useequrows, inconetimes=false)
  {
    console.log("hnm = " + hnm);
    console.log("mhindx = " + mhindx);
    console.log("myelsis[" + mhindx + "] = ", myelsis[mhindx]);
    console.log("myeleis[" + mhindx + "] = ", myeleis[mhindx]);
    console.log("mybasis[" + mhindx + "] = ", mybasis[mhindx]);
    console.log("mybaeis[" + mhindx + "] = ", mybaeis[mhindx]);
    
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
      console.log("lcnm = " + lcnm);
      console.log("lcval = " + lcval);

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

        if (useequrows)
        {
          if (mybasenumstr === "1") datastr = (inconetimes ? (mybasenumstr + " * " + lcnm) : lcnm);
          else datastr = mybasenumstr + " * " + lcnm;
        }
        else datastr = "" + ((mybasenumstr === "1") ? lcval : (Number(mybasenumstr) * lcval));
      }
      console.log("datastr = " + datastr);

      return datastr;
    }
  }

  function genEquationOrCountRows(myelems, hnames, myelsis, myeleis, mybasis, mybaeis,
    useequrows, inconetimes=false)
  {
    cc.letMustBeBoolean(useequrows, "useequrows");
    cc.letMustBeBoolean(inconetimes, "inconetimes");

    //the first col is the element, then the reactants, then =, then the products
    //let retzerolc = useequrows;//user preference includes the 0 * lc
    //let inconetimes = false;//user preference includes the 1 * lc
    const mytpstr = (useequrows ? "equ" : "bal");
    let mybdyrws = myelems.map((elem) => {
      console.log("elem = " + elem);

      if (cc.isLetEmptyNullOrUndefined(elem)) return null;
      //else;//do nothing safe to proceed

      let mycolsonrw = hnames.map((hnm, mhindx) => {
        console.log("hnm = " + hnm);
        console.log("mhindx = " + mhindx);
        console.log("myelsis[" + mhindx + "] = ", myelsis[mhindx]);
        console.log("myeleis[" + mhindx + "] = ", myeleis[mhindx]);
        console.log("mybasis[" + mhindx + "] = ", mybasis[mhindx]);
        console.log("mybaeis[" + mhindx + "] = ", mybaeis[mhindx]);
        
        let datastr = getDataForAnEquationOrCountRow(hnm, elem, mhindx,
          myelsis, myeleis, mybasis, mybaeis, useequrows, inconetimes);
        console.log("datastr = " + datastr);
        
        const colnmtype = ((hnm === "->") ? "equals" : hnm);
        console.log("colnmtype = " + colnmtype);

        return (<td key={elem + mytpstr + colnmtype} style={{border: "1px solid black"}}>
          {datastr}</td>);
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

  function genDataOnEquationRowsOnly(myelems, hnames, myelsis, myeleis, mybasis, mybaeis,
    useequrows, inconetimes=false)
  {
    cc.letMustBeBoolean(useequrows, "useequrows");
    cc.letMustBeBoolean(inconetimes, "inconetimes");

    //the first col is the element, then the reactants, then =, then the products
    //let retzerolc = useequrows;//user preference includes the 0 * lc
    //let inconetimes = false;//user preference includes the 1 * lc
    let mydatarwsontble = myelems.map((elem) => {
      console.log("elem = " + elem);

      if (cc.isLetEmptyNullOrUndefined(elem)) return null;
      //else;//do nothing safe to proceed

      let mydatacellsonrw = hnames.map((hnm, mhindx) => {
        console.log("hnm = " + hnm);
        console.log("mhindx = " + mhindx);
        console.log("myelsis[" + mhindx + "] = ", myelsis[mhindx]);
        console.log("myeleis[" + mhindx + "] = ", myeleis[mhindx]);
        console.log("mybasis[" + mhindx + "] = ", mybasis[mhindx]);
        console.log("mybaeis[" + mhindx + "] = ", mybaeis[mhindx]);
        
        let datastr = getDataForAnEquationOrCountRow(hnm, elem, mhindx,
          myelsis, myeleis, mybasis, mybaeis, useequrows, inconetimes);
        console.log("datastr = " + datastr);
        
        return datastr;
      });
      console.log("mydatacellsonrw = ", mydatacellsonrw);
    
      return mydatacellsonrw;
    });
    console.log("mydatarwsontble = ", mydatarwsontble);
    console.log("mydatarwsontble.length = " + mydatarwsontble.length);
    console.log("myelems.length = " + myelems.length);
    console.log("myelems = ", myelems);

    return mydatarwsontble;
  }

  function getElementAndBaseStartAndEndIndexes(hnames)
  {
    cc.letMustNotBeEmpty(hnames, "hnames");

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

        let multiindxs = cc.getAllIndexesOf("*", hnm, 0);
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

    return {"myelsis": myelsis, "myeleis": myeleis, "mybasis": mybasis, "mybaeis": mybaeis,};
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

  function genEquationsTable(myarr)
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
    const {reactants, products, reactantsbynum, productsbynum} =
      getReactantsAndProductsByNumArrays(myarr, mxrnum, mxpnum);
    //console.log("reactants = ", reactants);
    //console.log("products = ", products);
    //console.log("reactantsbynum = ", reactantsbynum);
    //console.log("productsbynum = ", productsbynum);

    //gets the header names and generates the header row here now
    let addifbaseisone = false;//user preference includes the base if base is 1
    const hnames = getHeaderNamesForEquTable(reactantsbynum, productsbynum, mxrnum, mxpnum,
      addifbaseisone);
    const myhrw = (<tr key="equtablehdrrw" style={{border: "1px solid black"}}>{hnames.map((nm) =>
      <th key={nm} style={{border: "1px solid black"}}>{nm}</th>)}</tr>);
    
    //get the list of unique elements now
    const myelems = getUniqueElementNamesOnlyArray(myarr);
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
    const myequrws = genEquationOrCountRows(myelems, hnames, myelsis, myeleis, mybasis, mybaeis,
      true, inconetimes);//useequrws, inconetimes
    const mybalrws = genEquationOrCountRows(myelems, hnames, myelsis, myeleis, mybasis, mybaeis,
      false, inconetimes);

    return (<table style={{border: "1px solid black"}}>
      <thead style={{border: "1px solid black"}}>{myhrw}</thead>
      <tbody style={{border: "1px solid black"}}>{myequrws}{mybalrws}</tbody>
    </table>);
  }

  function genBalanceTable(elembsarr)
  {
    const mxrnum = getMaxReactantOrProductsNum(elembsarr, true);
    const mxpnum = getMaxReactantOrProductsNum(elembsarr, false);

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
      false, inconetimes);
    console.log("mydatrws = ", mydatrws);

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
    if (mydatrws.length === 1)
    {
      if (cc.isLetEmptyNullOrUndefined(mydatrws[0])) gettherws = false;
      //else;//get them
    }
    //else;//get them
    if (gettherws)
    {
      mybdyrws = mydatrws.map((rarr) => {
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
        console.log("mytonleft = " + mytonleft);
        console.log("mytonright = " + mytonright);
  
        let isbalanced = (mytonleft === mytonright);
        console.log("isbalanced = " + isbalanced);
  
        if (isbalanced);
        else
        {
          if (allbal) allbal = false;
          //else;//do nothing
        }
        console.log("allbal = " + allbal);

        noonezeroerrorfnd = (noonezeroerrorfnd || (mytonleft < 1 && 0 < mytonright) ||
          (mytonright < 1 && 0 < mytonleft));
        console.log("noonezeroerrorfnd = " + noonezeroerrorfnd);
  
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
    <p>the equation is <b>{(allbal ? "balanced!" : "not balanced!")}</b></p>
    {noonezeroerrorfnd ? (<p style={{color: "red"}}><b>{"Although having no elements on both the " +
      "products and the reactants is technically valid, having an amount on one side, but nothing " +
      "on the other is not valid!"}
      </b></p>) : null}
    {allbal ? (<p>{"Now you can multiply or divide the LCs by any scalar constant and you will get " +
      "another solution. CHEMICAL EQUATIONS HAVE INFINITELY MANY SOLUTIONS."}</p>) : null}
    </div>);
  }

  console.log("myelembasearr = ", myelembasearr);
  console.log("mylcs = ", mylcs);
  console.log("areallequsbalanced = " + areallequsbalanced);
  console.log("balerrfnd = " + balerrfnd);
  
  return (<div>
      <h1>Chem Equation Balancer APP</h1>
      <div>{genControlButtons(myelembasearr, true)}
        <span key={"equarrowa"} style={{display: "inline-block", fontSize: "20px"}}>{" -> "}</span>
          {genControlButtons(myelembasearr, false)}
        <button style={{marginLeft: "10px"}} onClick={(event) => setLockedBases(!lockedbases)}>
          {lockedbases ? "un": ""}lock bases!</button>
        {((areallequsbalanced || !lockedbases || balerrfnd) ? null :
          (<button onClick={null}>Solve It!</button>))}
      </div>
      <div id="equ" style={{display: "inline-block"}}>
        {genReactantsOrProductsDivs(myelembasearr, true)}
          <span key={"equarrowb"} style={{display: "inline-block", fontSize: "40px"}}>{" -> "}</span>
        {genReactantsOrProductsDivs(myelembasearr, false)}
      </div>
      <br />
      <br />
      {genEquationsTable(myelembasearr)}
      <br />
      {genBalanceTable(myelembasearr, mylcs)}
    </div>);
}

export default App;
