function StructImportBtn()
{
    ThreadSend("import", document.getElementById("raw").value.split('\n'));
    SetText(true, true);
    Repaint();
}

function StructExportBtn()
{
    ThreadSend("export");
}

function StructExportBtnCallback(Raw)
{
    document.getElementById("raw").value = Raw.join("\n");
}

function MemoSave(N)
{
    var Txt = document.getElementById("raw").value;
    if (Txt != "")
    {
        DataSet("GraphVis_Slot" + N, Txt);
    }
    else
    {
        DataDelete("GraphVis_Slot" + N);
    }
}

function MemoLoad(N)
{
    var Txt = DataGetDefault("GraphVis_Slot" + N, "");
    document.getElementById("raw").value = Txt;
}

