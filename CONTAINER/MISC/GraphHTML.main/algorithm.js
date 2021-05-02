function AlgorithmStart()
{
    var AlgorithmNo = document.getElementById("Algorithm").selectedIndex;
    
    switch (AlgorithmNo)
    {
        default:
        {
            ThreadSend("algorithm", [AlgorithmNo]);
        }
        return;
        case 1:
        case 2:
        {
            var Param1 = confirm("Vertices?");
            var Param2 = confirm("Edges?");
            ThreadSend("algorithm", [AlgorithmNo, Param1, Param2]);
        }
        return;
        case 5:
        {
            var Param1 = confirm("Include loops?");
            ThreadSend("algorithm", [AlgorithmNo, Param1]);
        }
        return;
        case 20:
        {
            var Param1 = confirm("Ascending order?");
            ThreadSend("algorithm", [AlgorithmNo, Param1]);
        }
        return;
    }
    
}

var AlgorithmMsgTime = -1;
var AlgorithmMsgBuf = "";
var AlgorithmMsgChanged = false;

function AlgorithmCallback(Data)
{
    switch(Data[0])
    {
        case 0:
        {
            AlgorithmMsgBuf = Data[1] + "\n";
            if (AlgorithmMsgTime < performance.now())
            {
                AlgorithmMsgTime = performance.now() + 500;
                AlgorithmMsgChanged = false;
                document.getElementById("raw").value = AlgorithmMsgBuf;
            }
            else
            {
                AlgorithmMsgChanged = true;
            }
        }
        return;
        case 1:
        {
            AlgorithmMsgBuf = AlgorithmMsgBuf + Data[1] + "\n";
            if (AlgorithmMsgTime < performance.now())
            {
                AlgorithmMsgTime = performance.now() + 500;
                AlgorithmMsgChanged = false;
                document.getElementById("raw").value = AlgorithmMsgBuf;
            }
            else
            {
                AlgorithmMsgChanged = true;
            }
        }
        return;
        case 2:
        {
            alert(Data[1]);
        }
        return;
        case 3:
        {
            var Param1 = prompt(Data[2], Data[3]);
            var Param2 = prompt(Data[4], Data[5]);
            var Param5 = confirm("Search from vertex?");
            var Param3 = confirm("Print paths?");
            var Param4 = confirm("Print cycles?");
            
            Param1 = parseInt(Param1);
            Param2 = parseInt(Param2);
            
            if (isNaN(Param1))
            {
                Param1 = -1;
            }
            if (isNaN(Param2))
            {
                Param2 = -1;
            }
            
            ThreadSend("algorithm", [Data[1], Param3, Param4, Param1, Param2, Param5]);
        }
        return;
        case 4:
        {
            if (AlgorithmMsgChanged)
            {
                document.getElementById("raw").value = AlgorithmMsgBuf;
            }
            AlgorithmMsgChanged = false;
            AlgorithmMsgTime = -1;
        }
        return;
        case 5:
        {
            var Param1 = confirm("Ascending order?");
            var Param2 = confirm("Forward direction?");
            ThreadSend("algorithm", [Data[1], Param1, Param2]);
        }
    }
}

