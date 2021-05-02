
var CanvasObject;
var CanvasContext;

function SetCanvas()
{
    CanvasObject.width = CanvasW;
    CanvasObject.height = CanvasH;

    CanvasContext.font = "20px Arial";
    CanvasContext.textBaseline = "middle";
    CanvasContext.textAlign = "center";

    var ConfArray = {};
    ConfArray["OffsetX"] = CanvasW / 2;
    ConfArray["OffsetY"] = CanvasH / 2;
    ConfArray["ZoomX"] = ConfArray["OffsetX"] / GraphSize;
    ConfArray["ZoomY"] = ConfArray["OffsetY"] / GraphSize;
    ConfArray["ZoomZ"] = 255 / GraphSize;
    ThreadSend("canvas", ConfArray);
}



function DrawInit()
{
    SetCanvas();
    CalcGraphFactorsBtn(0);
}


function RepaintCallback(Raw)
{
    CanvasContext.fillStyle = "black";
    CanvasContext.fillRect(0, 0, CanvasW, CanvasH);
    var L = Raw.length;
    for (var I = 0; I < L; I++)
    {
        var RawI = Raw[I];
        if (RawI[0] == 0)
        {
            CanvasContext.beginPath();
            CanvasContext.arc(RawI[1], RawI[2], SizeV, 0, 2 * Math.PI);
            CanvasContext.fillStyle = RawI[3];
            CanvasContext.fill();
            if (RawI[4] != "")
            {
                CanvasContext.fillStyle = RawI[5];
                CanvasContext.fillText(RawI[4], RawI[1], RawI[2]);
            }
        }
        else
        {
            if (RawI[0] == 1)
            {
                CanvasContext.beginPath();
                CanvasContext.lineWidth = RawI[5];
                CanvasContext.moveTo(RawI[1], RawI[2]);
                CanvasContext.lineTo(RawI[3], RawI[4]);
                CanvasContext.stroke();
            }
            else
            {
                if (RawI[0] == 2)
                {
                    var grd = CanvasContext.createLinearGradient(RawI[1], RawI[2], RawI[3], RawI[4]);
                    for (var II = 0; II < RawI[5].length; II++)
                    {
                        grd.addColorStop(RawI[5][II][0], RawI[5][II][1]);
                    }
                    CanvasContext.strokeStyle = grd;
                }
                else
                {
                    if (RawI[0] == 3)
                    {
                        CanvasContext.fillStyle = RawI[4];
                        CanvasContext.fillText(RawI[3], RawI[1], RawI[2]);
                    }
                    else
                    {
                        if (RawI[0] == 4)
                        {
                            CanvasContext.beginPath();
                            CanvasContext.lineWidth = RawI[4];
                            CanvasContext.arc(RawI[1], RawI[2], RawI[3], 0, 2 * Math.PI);
                            CanvasContext.strokeStyle = RawI[5];
                            CanvasContext.stroke();
                        }
                        else
                        {
                            if (RawI[0] == 5)
                            {
                                if (RawI[1] == 0)
                                {
                                    CanvasContext.fillStyle = "white";
                                    CanvasContext.fillRect(RawI[2] - 2, 0, RawI[3] + 4, RawI[4]);
                                    CanvasContext.fillStyle = "black";
                                    CanvasContext.fillRect(RawI[2], 0, RawI[3], RawI[4]);
                                }
                                if (RawI[1] == 1)
                                {
                                    CanvasContext.fillStyle = "white";
                                    CanvasContext.fillRect(0, RawI[2] - 2, RawI[4], RawI[3] + 4);
                                    CanvasContext.fillStyle = "black";
                                    CanvasContext.fillRect(0, RawI[2], RawI[4], RawI[3]);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function Repaint()
{
    ThreadSend("paint");
}

function Init()
{
    CanvasObject = document.getElementById("GraphScreen");
    CanvasContext = CanvasObject.getContext('2d');

    ConfGet();
    ConfThread();


    DrawInit();
    Repaint();

    CanvasObjectMouse = false;

    CanvasObject.onmousedown = function(e)
    {
        if (!CanvasObjectMouse)
        {
            MouseDown(MouseX(e), MouseY(e));
            CanvasObjectMouse = true;
        }
    }

    CanvasObject.onmousemove = function(e)
    {
        if (CanvasObjectMouse)
        {
            MouseMove(MouseX(e), MouseY(e));
        }
    }

    CanvasObject.onmouseup = function(e)
    {
        if (CanvasObjectMouse)
        {
            MouseUp(MouseX(e), MouseY(e));
            CanvasObjectMouse = false;
        }
    }
}


function MouseX(e)
{
    //return e.pageX;
    //return e.clientX + window.scrollX;// + document.body.scrollLeft;
    return e.clientX + window.scrollX;
}

function MouseY(e)
{
    //return e.pageY;
    //return e.clientY + window.scrollY;// + document.body.scrollTop;
    return e.clientY + window.scrollY;
}

function SetDrawMode(DrawMode_)
{
    DrawMode = DrawMode_;
    Repaint();
}

