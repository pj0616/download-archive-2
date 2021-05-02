



function ThreadSend(MType, MObj)
{
    GraphThread.postMessage({Msg:MType, Obj:MObj});
}

function ThreadCallback(MType, MObj)
{
    switch(MType)
    {
        case "export":
        {
            StructExportBtnCallback(MObj);
        }
        return;
        case "paint":
        {
            RepaintCallback(MObj);
        }
        return;
        case "value":
        {
            CurrentSetValuesCallback(MObj[0], MObj[1], MObj[2]);
        }
        return;
        case "prompt":
        {
            if (MObj[3])
            {
                MObj[2] = prompt(MObj[1], MObj[2]);
            }
            ThreadSend("prompt", [MObj[0], MObj[2]]);
        }
        return;
        case "algorithm":
        {
            AlgorithmCallback(MObj);
        }
        return;
    }
}

var GraphThread = new Worker(URL.createObjectURL(new Blob(["("+GraphThreadDef.toString()+")()"], {type: 'text/javascript'})));
GraphThread.onmessage = function(M)
{
    ThreadCallback(M.data.Msg, M.data.Obj);
}
ThreadSend("init");

