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
        return (<ElemBaseComp midstr={mfulkystr} key={mfulkystr}
          showbtns={(mindx + 1 === myobjsfcnum.length)}
          canremthis={mobj.canrem}
          getitem={getMyItem}
          setitem={setMyItem}
          addtothis={addNewReactantOrProductToOne}
          remfromthis={removeFromThisOne} />);
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
    const mxcols = mxrnum + mxpnum + 1 + 1;
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
    

    //gets the header names and generates the header row here now

    let hnames = ["elements"];
    for (let c = 0; c < 2; c++)
    {
      let porrarr = ((c === 0) ? reactants : products);
      let nmx = ((c === 0) ? mxrnum : mxpnum) + 1;
      console.log("c = " + c);

      for (let n = 1; n < nmx; n++)
      {
        let lcnm = ((c === 0) ? "r" : "p") + "_" + n;
        let mystr = "" + lcnm + " * ";
        for (let k = 0; k < porrarr.length; k++)
        {
          console.log("porrarr[" + k + "] = ", porrarr[k]);
          if (porrarr[k].num === n)
          {
            mystr += porrarr[k].element + " " + porrarr[k].base;
            //if (k + 1 < porrarr.length && n + 1 < nmx) mystr += " * ";//WRONG BUG HERE
            //else;//do nothing
          }
          //else;//do nothing
        }//end of k for loop
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
        if (myelems[k].element === myarr[n].element)
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

    console.error("NOT DONE YET WITH GENERATING THE EQUATIONS AND SHOWING THE BALANCE!");

    //generate the equations for the elements here
    //need to show that they balance OR do not balance
    //need to add an option for solving it
    
    const mybdyrws = [];
    //<tr style={{border: "1px solid black"}}>{?.map((?) =>
    //  <td key={?} style={{border: "1px solid black"}}>{?}</td>)}</tr>

    return (<table style={{border: "1px solid black"}}>
      <thead style={{border: "1px solid black"}}>{myhrw}</thead>
      <tbody style={{border: "1px solid black"}}>

      </tbody>
    </table>);
  }

  console.log("myelembasearr = ", myelembasearr);
  
  return (<div>
      <h1>Chem Equation Balancer APP</h1>
      <div>{genControlButtons(myelembasearr, true)}{genControlButtons(myelembasearr, false)}</div>
      <div id="equ" style={{display: "inline-block"}}>
        {genReactantsOrProductsDivs(myelembasearr, true)}
          <span key={"arrow"} style={{display: "inline-block", fontSize: "40px"}}>{" -> "}</span>
        {genReactantsOrProductsDivs(myelembasearr, false)}
      </div>
      {genBalanceTable(myelembasearr)}
    </div>);
}

export default App;
