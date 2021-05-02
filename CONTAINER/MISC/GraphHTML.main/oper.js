function GraphClearBtn()
{
    ThreadSend("clear");
    Repaint();
}

function CurrentSetValues()
{
    var CurrentVForceN = parseInt(document.getElementById("CurrentVForceN").value);
    var CurrentVForceD = parseInt(document.getElementById("CurrentVForceD").value);
    var CurrentEForceN = parseInt(document.getElementById("CurrentEForceN").value);
    var CurrentEForceD = parseInt(document.getElementById("CurrentEForceD").value);
    var CurrentEWeightN = parseInt(document.getElementById("CurrentEWeightN").value);
    var CurrentEWeightD = parseInt(document.getElementById("CurrentEWeightD").value);
    ThreadSend("value", [CurrentVForceN, CurrentVForceD, CurrentEForceN, CurrentEForceD, CurrentEWeightN, CurrentEWeightD]);
}

function CurrentSetValuesCallback(VForce, EForce, EWeight)
{
    document.getElementById("CurrentVForceV").innerHTML = VForce;
    document.getElementById("CurrentEForceV").innerHTML = EForce;
    document.getElementById("CurrentEWeightV").innerHTML = EWeight;
}


var GraphForceEnabled = false;

function LayoutSet()
{
    var Idx = document.getElementById("LayoutSet").selectedIndex;
    if (Idx == 1)
    {
        if (!GraphForceEnabled)
        {
            GraphForceEnabled = true;
            Layout();
        }
    }
    else
    {
        GraphForceEnabled = false;
    }
}

function CalcGraphFactorsBtn(Delta)
{
    var V = parseInt(document.getElementById("FFactVal").innerHTML) + Delta;
    ThreadSend("calcgraphfactors", [V]);
    document.getElementById("FFactVal").innerHTML = V;
}

function Layout()
{
    if (GraphForceEnabled)
    {
        ThreadSend("layout");
    }
    if (GraphForceEnabled)
    {
        setTimeout(function(){ Layout(); }, GraphForceTimeout);
    }
}

function Rearrange(Mode, Axis)
{
    ThreadSend("button", [1, Mode, Axis]);
}

function SetMouseState()
{
    ThreadSend("option", [0, document.getElementById("MouseState").selectedIndex]);
}

function SetMoveMode(MoveMode0_, MoveMode_)
{
    ThreadSend("button", [0, MoveMode0_, MoveMode_]);
}

function MouseDown(X, Y)
{
    ThreadSend("mouse", [0, X, Y]);
}

function MouseMove(X, Y)
{
    ThreadSend("mouse", [1, X, Y]);
}

function MouseUp(X, Y)
{
    ThreadSend("mouse", [2, X, Y]);
}

// Set text after changing display option
function SetTextOpt()
{
    SetText(true, true);
    Repaint();
}

// Set text display for vertices or edges
function SetText(SetV, SetE)
{
    ThreadSend("text", [SetV, SetE, document.getElementById("TextVMode").selectedIndex, document.getElementById("TextEMode").selectedIndex]);
}


