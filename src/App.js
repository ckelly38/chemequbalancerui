import React, { useState } from "react";
import EquBalancer from "./EquBalancer";

function App()
{
    let [numbals, setNumBals] = useState(1);
    let mybalancers = [];
    for (let n = 0; n < numbals; n++) mybalancers.push(<EquBalancer equnum={n + 1} key={n} />);
    
    function addbal(mbals)
    {
        console.log("mbals = ", mbals);
        mybalancers = mybalancers.push(<EquBalancer equnum={mbals.length + 1} key={mbals.length} />);
        setNumBals(mbals.length);
    }

    function rembal(mbals)
    {
        console.log("mbals = ", mbals);
        mybalancers = mbals.filter((val, mindx) => !(mindx + 1 === mbals.length));
        setNumBals(mybalancers.length);
    }
    console.log("numbals = " + numbals);
    console.log("mybalancers = ", mybalancers);

    return (<div>
        <h1>My Chemical Equations Balancer App</h1>
        <p>{"There are " + numbals + " balancers:"}</p>
        {mybalancers}
        <button onClick={(event) => addbal(mybalancers)}>Add Balancer</button>
        <button onClick={(event) => rembal(mybalancers)}>Remove Balancer</button>
    </div>)
}

export default App;
