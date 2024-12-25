import React from "react";

function ElemBaseComp({midstr, showbtns, canremthis, getitem, setitem, addtothis, remfromthis})
{
    const mynumstr = midstr.substring(1, midstr.indexOf("_"));
    const usereactants = (midstr.charAt(0) === 'r' || midstr.charAt(0) === 'R');
    const mitem = getitem(midstr);

    function myOnChange(event, cobj, usebase=false)
    {
        let nitem = {...cobj};
        if (usebase) nitem.base = Number(event.target.value);
        else nitem.element = event.target.value;
        setitem(nitem);
    }

    return (<div id={midstr} style={{display: "inline-block"}}>
        <input style={{maxWidth: "65px", fontSize: "40px"}}
            name="element" type="text" placeholder="elm" value={mitem.element}
            onChange={(event) => myOnChange(event, mitem, false)} />
        <input name="base" style={{width: "45px", resize: true}}
            type="number" min="1" max="1000" value={mitem.base}
            onChange={(event) => myOnChange(event, mitem, true)} />
        {showbtns ? (<><button onClick={(event) =>
            addtothis(Number(mynumstr), usereactants)} type="button">Add To This</button>
        {canremthis ? <button onClick={(event) => remfromthis(midstr)} type="button">
            Remove This</button> : null}</>) : null}
    </div>);
}

export default ElemBaseComp;
