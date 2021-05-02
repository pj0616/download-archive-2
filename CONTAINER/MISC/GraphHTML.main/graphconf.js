var SegmentLink = 0.3;
var GraphSize = 1000;
var GraphRoundFactor = 100;
var GraphVerticeDepthOffset = 0.000001;
var LabelColor1 = "rgb(255,255,255)";
var LabelColor2 = "rgb(128,128,128)";


var EdgeSegments = DataGetIDefault("GraphVis_ConfEdgeSegments", 5);
var CanvasW = DataGetIDefault("GraphVis_ConfCanvasW", 500);
var CanvasH = DataGetIDefault("GraphVis_ConfCanvasH", 500);
var CanvasD = DataGetIDefault("GraphVis_ConfCanvasD", 30);
var SizeV = DataGetIDefault("GraphVis_ConfSizeV", 10);
var SizeE1 = DataGetIDefault("GraphVis_ConfSizeE1", 11);
var SizeE2 = DataGetIDefault("GraphVis_ConfSizeE2", 2);
var SizeL = DataGetIDefault("GraphVis_ConfSizeL", 20);
var SizeM = DataGetIDefault("GraphVis_ConfSizeM", 20);
var GraphForceTimeout = DataGetIDefault("GraphVis_ConfGraphForceTimeout", 100);
var GraphForceFactor = DataGetIDefault("GraphVis_ConfGraphForceFactor", 100);
var GraphForceIter = DataGetIDefault("GraphVis_ConfGraphForceIter", 10);

function ConfThread()
{
    var ConfArray = {};
    ConfArray["SegmentLink"] = SegmentLink;
    ConfArray["GraphSize"] = GraphSize;
    ConfArray["GraphRoundFactor"] = GraphRoundFactor;
    ConfArray["GraphVerticeDepthOffset"] = GraphVerticeDepthOffset;
    ConfArray["LabelColor1"] = LabelColor1;
    ConfArray["LabelColor2"] = LabelColor2;
    ConfArray["EdgeSegments"] = EdgeSegments;
    ConfArray["CanvasW"] = CanvasW;
    ConfArray["CanvasH"] = CanvasH;
    ConfArray["CanvasD"] = CanvasD;
    ConfArray["SizeV"] = SizeV;
    ConfArray["SizeE1"] = SizeE1;
    ConfArray["SizeE2"] = SizeE2;
    ConfArray["SizeL"] = SizeL;
    ConfArray["SizeM"] = SizeM;
    ConfArray["GraphForceTimeout"] = GraphForceTimeout;
    ConfArray["GraphForceFactor"] = GraphForceFactor;
    ConfArray["GraphForceIter"] = GraphForceIter;
    ThreadSend("conf", ConfArray);
}

function ConfGet()
{
    document.getElementById("EdgeSegments").value = EdgeSegments;
    document.getElementById("CanvasW").value = CanvasW;
    document.getElementById("CanvasH").value = CanvasH;
    document.getElementById("CanvasD").value = CanvasD;
    document.getElementById("SizeV").value = SizeV;
    document.getElementById("SizeE1").value = SizeE1;
    document.getElementById("SizeE2").value = SizeE2;
    document.getElementById("SizeL").value = SizeL;
    document.getElementById("SizeM").value = SizeM;
    document.getElementById("GraphForceTimeout").value = GraphForceTimeout;
    document.getElementById("GraphForceFactor").value = GraphForceFactor;
    document.getElementById("GraphForceIter").value = GraphForceIter;
}

function ConfSet()
{
    if (!GraphForceEnabled)
    {
        EdgeSegments = parseInt(document.getElementById("EdgeSegments").value);
        CanvasW = parseInt(document.getElementById("CanvasW").value);
        CanvasH = parseInt(document.getElementById("CanvasH").value);
        CanvasD = parseInt(document.getElementById("CanvasD").value);
        SizeV = parseInt(document.getElementById("SizeV").value);
        SizeE1 = parseInt(document.getElementById("SizeE1").value);
        SizeE2 = parseInt(document.getElementById("SizeE2").value);
        SizeM = parseInt(document.getElementById("SizeM").value);
        GraphForceTimeout = parseInt(document.getElementById("GraphForceTimeout").value);
        GraphForceFactor = parseInt(document.getElementById("GraphForceFactor").value);
        GraphForceIter = parseInt(document.getElementById("GraphForceIter").value);
        
        ConfThread();

        DataSetI("GraphVis_ConfEdgeSegments", EdgeSegments);
        DataSetI("GraphVis_ConfCanvasW", CanvasW);
        DataSetI("GraphVis_ConfCanvasH", CanvasH);
        DataSetI("GraphVis_ConfCanvasD", CanvasD);
        DataSetI("GraphVis_ConfSizeV", SizeV);
        DataSetI("GraphVis_ConfSizeE1", SizeE1);
        DataSetI("GraphVis_ConfSizeE2", SizeE2);
        DataSetI("GraphVis_ConfSizeL", SizeL);
        DataSetI("GraphVis_ConfSizeM", SizeM);
        DataSetI("GraphVis_ConfGraphForceTimeout", GraphForceTimeout);
        DataSetI("GraphVis_ConfGraphForceFactor", GraphForceFactor);
        DataSetI("GraphVis_ConfGraphForceIter", GraphForceIter);

        CalcGraphFactorsBtn(0);
        SetCanvas();
        Repaint();
    }
}

function ConfReset()
{
    DataDeleteI("GraphVis_ConfEdgeSegments");
    DataDeleteI("GraphVis_ConfCanvasW");
    DataDeleteI("GraphVis_ConfCanvasH");
    DataDeleteI("GraphVis_ConfCanvasD");
    DataDeleteI("GraphVis_ConfSizeV");
    DataDeleteI("GraphVis_ConfSizeE1");
    DataDeleteI("GraphVis_ConfSizeE2");
    DataDeleteI("GraphVis_ConfSizeL");
    DataDeleteI("GraphVis_ConfSizeM");
    DataDeleteI("GraphVis_ConfGraphForceTimeout");
    DataDeleteI("GraphVis_ConfGraphForceFactor");
    DataDeleteI("GraphVis_ConfGraphForceIter");
}

