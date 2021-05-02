function GraphThreadDef()
{
    function Send(MType, MObj)
    {
        postMessage({Msg:MType, Obj:MObj});
    }

    this.onmessage = function(M)
    {
        var MObj = M.data.Obj;
        switch (M.data.Msg)
        {
            case "conf":
            {
                SegmentLink = MObj["SegmentLink"];
                GraphSize = MObj["GraphSize"];
                GraphRoundFactor = MObj["GraphRoundFactor"];
                GraphVerticeDepthOffset = MObj["GraphVerticeDepthOffset"];
                LabelColor1 = MObj["LabelColor1"];
                LabelColor2 = MObj["LabelColor2"];
                EdgeSegments = MObj["EdgeSegments"];
                CanvasW = MObj["CanvasW"];
                CanvasH = MObj["CanvasH"];
                CanvasD = MObj["CanvasD"];
                SizeV = MObj["SizeV"];
                SizeE1 = MObj["SizeE1"];
                SizeE2 = MObj["SizeE2"];
                SizeL = MObj["SizeL"];
                SizeM = MObj["SizeM"];
                GraphForceTimeout = MObj["GraphForceTimeout"];
                GraphForceFactor = MObj["GraphForceFactor"];
                GraphForceIter = MObj["GraphForceIter"];
                GraphBoundXMin = (0 - GraphSize);
                GraphBoundXMax = (GraphSize);
                GraphBoundYMin = (0 - GraphSize);
                GraphBoundYMax = (GraphSize);
                GraphBoundZMin = (0 - GraphSize);
                GraphBoundZMax = (GraphSize);
            }
            return;
            case "canvas":
            {
                OffsetX = MObj["OffsetX"];
                OffsetY = MObj["OffsetY"];
                ZoomX = MObj["ZoomX"];
                ZoomY = MObj["ZoomY"];
                ZoomZ = MObj["ZoomZ"];
                SetEdgeSegments();
            }
            return;
            case "import":
            {
                StructImport(MObj);
            }
            return;
            case "text":
            {
                TextVMode = MObj[2];
                TextEMode = MObj[3];
                SetText(MObj[0], MObj[1]);
            }
            return;
            case "clear":
            {
                GraphClear();
            }
            return;
            case "paint":
            {
                Repaint();
            }
            return;
            case "export":
            {
                Send("export", StructExport());
            }
            return;
            case "init":
            {
                Init();
            }
            return;
            case "layout":
            {
                Layout();
            }
            return;
            case "calcgraphfactors":
            {
                CalcGraphFactors(MObj[0]);
            }
            return;
            case "button":
            {
                if (MObj[0] == 0)
                {
                    SetMoveMode(MObj[1], MObj[2]);
                }
                if (MObj[0] == 1)
                {
                    Rearrange(MObj[1], MObj[2]);
                }
            }
            return;
            case "option":
            {
                if (MObj[0] == 0)
                {
                    MouseState = MObj[1];
                }
            }
            return;
            case "mouse":
            {
                if (MObj[0] == 0)
                {
                    MouseDown(MObj[1], MObj[2]);
                }
                if (MObj[0] == 1)
                {
                    MouseMove(MObj[1], MObj[2]);
                }
                if (MObj[0] == 2)
                {
                    MouseUp(MObj[1], MObj[2]);
                }
            }
            return;
            case "value":
            {
                CurrentVForceN = MObj[0];
                CurrentVForceD = MObj[1];
                CurrentEForceN = MObj[2];
                CurrentEForceD = MObj[3];
                CurrentEWeightN = MObj[4];
                CurrentEWeightD = MObj[5];
                Send("value", [FractionTxt(CurrentVForceN, CurrentVForceD), FractionTxt(CurrentEForceN, CurrentEForceD), FractionTxt(CurrentEWeightN, CurrentEWeightD)]);
            }
            return;
            case "prompt":
            {
                PromptCallback(MObj[0], MObj[1]);
            }
            return;
            case "algorithm":
            {
                AlgorithmStart(MObj);
            }
            return;
        }
    }

    function Prompt(Type, Message, Value, Dialog)
    {
        Send("prompt", [Type, Message, Value, Dialog]);
    }
    
    function PromptCallback(Type, Value)
    {
        switch (Type)
        {
            case 1: // Remove edge
            {
                if (Value === null)
                {
                    Value = -1;
                }
                else
                {
                    Value = parseInt(Value);
                }
                if (Value >= 0)
                {
                    GraphEdgeRem(MouseVSelectedI0, MouseVSelectedI, Value);
                }
                Repaint();
            }
            return;
            case 2: // Vertice label
            {
                if (Value === null)
                {
                }
                else
                {
                    MouseVSelected.Label = Value;
                }
                SetText(true, false);
            }
            return;
            case 3: // Edge label - number
            {
                var Num = GraphEdgeCount(MouseVSelectedI0, MouseVSelectedI);
                if (Value === null)
                {
                    Value = -10;
                }
                else
                {
                    Value = parseInt(Value);
                }
                Temp[1] = Num;
                Temp[2] = Value;
                var EObj = GraphE_[Temp[0]];
                if ((Value >= 0) && (Value < Num))
                {
                    Prompt(4, "Edge label", EObj.Label[Value], true);
                }
                if (Value == Num)
                {
                    if (Num == 1)
                    {
                        Prompt(4, "Edge label", EObj.Label[0], true);
                    }
                    else
                    {
                        Prompt(4, "Edge label", "", true);
                    }
                }
                if (Value == -1)
                {
                    if (EObj.V1 != EObj.V2)
                    {
                        GraphEdgeRevObj(EObj);
                    }
                }
            }
            return;
            case 4: // Edge label - text
            {
                if (Value !== null)
                {
                    var EObj = GraphE_[Temp[0]];
                    if (Temp[1] == Temp[2])
                    {
                        for (var II = 0; II < Temp[2]; II++)
                        {
                            EObj.Label[II] = Value;
                        }
                    }
                    else
                    {
                        EObj.Label[Temp[2]] = Value;
                    }
                    SetText(false, true);
                }
            }
            return;
        }
    }
    
    var Temp;

///////////////////////////////////////////////////////// graphconf.js
var SegmentLink;
var GraphSize;
var GraphRoundFactor;
var GraphVerticeDepthOffset;
var LabelColor1;
var LabelColor2;


var EdgeSegments;
var CanvasW;
var CanvasH;
var CanvasD;
var SizeV;
var SizeE1;
var SizeE2;
var SizeL;
var SizeM;
var GraphForceTimeout;
var GraphForceFactor;
var GraphForceIter;



////////////////////////////////////////////////////// struct.js

// Graph vertice
function GraphV(X_, Y_, Z_, ForceN_, ForceD_)
{
    this.X = X_;
    this.Y = Y_;
    this.Z = Z_;
    this.FX = 0;
    this.FY = 0;
    this.FZ = 0;
    this.Label = "";
    this.Rot = 0;
    this.ForceN = ForceN_;
    this.ForceD = ForceD_;
    this.Text = "";
    
    // Forward
    this.NeiF = [];
    
    // Backward
    this.NeiB = [];
    
    // Forward and reverse
    this.NeiA = [];
    
    // Forward or reverse
    this.NeiO = [];
    
    // Loop
    this.NeiL = [];
}

// Graph edge
function GraphE(V1_, V2_, Dir_, WeightN_, WeightD_, ForceN_, ForceD_)
{
    this.Dir = [Dir_];
    this.V1 = V1_;
    this.V2 = V2_;
    this.Num = 1;
    this.ForceN = ForceN_;
    this.ForceD = ForceD_;
    this.WeightN = [WeightN_];
    this.WeightD = [WeightD_];
    this.Label = [""];
    this.Text = [""];
}

// Graph drawing object
function GraphD(Type_, Obj_, Edge_)
{
    this.Type = Type_;
    this.Edge = Edge_;
    this.EdgeN = Edge_.length;
    this.Depth = 0;
    this.Obj = Obj_;
    this.X1 = 0;
    this.Y1 = 0;
    this.Z1 = 0;
    this.X2 = 0;
    this.Y2 = 0;
    this.Z2 = 0;
    this.Text = [""];
}


var GraphV_ = [];
var GraphE_ = [];
var GraphD_ = [];


var GraphVCount = 0;
var GraphECount = 0;
var GraphDCount = 0;





function GraphClear()
{
    SelectClear();
    GraphV_ = [];
    GraphE_ = [];
    GraphD_ = [];
    GraphVCount = 0;
    GraphECount = 0;
    GraphDCount = 0;
}


// Rebuild drawing array
function GraphDrawRebuild()
{
    GraphD_ = [];
    for (var I = 0; I < GraphVCount; I++)
    {
        GraphD_.push(new GraphD(-1, GraphV_[I], []));
    }
    GraphDCount = GraphVCount;
    for (var I = 0; I < GraphECount; I++)
    {
        if (GraphE_[I].V1 == GraphE_[I].V2)
        {
            GraphD_.push(new GraphD(-2, GraphE_[I].V1, [EdgeSegments]));
            GraphD_[GraphDCount].Y2 = GraphE_[I];
            GraphDCount += 1;
        }
        else
        {
            for (var II = 0; II < EdgeSegments; II++)
            {
                var Edge_ = [];
                for (var III = 0; III < GraphE_[I].Num; III++)
                {
                    if (GraphE_[I].Dir[III] > 0)
                    {
                        Edge_.push(II);
                    }
                    if (GraphE_[I].Dir[III] < 0)
                    {
                        Edge_.push(EdgeSegments - 1 - II);
                    }
                    if (GraphE_[I].Dir[III] == 0)
                    {
                        Edge_.push(EdgeSegments);
                    }
                }
                GraphD_.push(new GraphD(II, GraphE_[I], Edge_));
            }
            GraphDCount += EdgeSegments;
        }
    }
    GraphDrawSort();
}


// Sort drawing array using QuickSort
function GraphDrawSortQ(l, r)
{
    var i = l;
    var j = r;
    var x = GraphD_[Math.floor((l + r) >> 1)].Depth;
    do
    {
        while (GraphD_[i].Depth < x) i++;
        while (GraphD_[j].Depth > x) j--;
        if (i <= j)
        {
            var XX = GraphD_[i];
            GraphD_[i] = GraphD_[j];
            GraphD_[j] = XX;
            i++;
            j--;
        }
    }
    while (i < j);
    if (l < j) GraphDrawSortQ(l, j);
    if (r > i) GraphDrawSortQ(i, r);
}



// Prepare depth and sort drawing array
function GraphDrawSort()
{
    var X, Y, Z, X1, Y1, Z1, X2, Y2, Z2;
    for (var I = 0; I < GraphDCount; I++)
    {
        if (GraphD_[I].Type < 0)
        {
            GraphD_[I].X1 = GraphD_[I].Obj.X;
            GraphD_[I].Y1 = GraphD_[I].Obj.Y;
            GraphD_[I].Z1 = GraphD_[I].Obj.Z;
            GraphD_[I].Z2 = GraphD_[I].Obj.Rot;
            if (GraphD_[I].Type == (-1))
            {
                GraphD_[I].Depth = GraphD_[I].Z1 * 2 + GraphVerticeDepthOffset;
                GraphD_[I].Text = GraphD_[I].Obj.Text;
            }
            else
            {
                GraphD_[I].Depth = GraphD_[I].Z1 * 2;
                GraphD_[I].Text = GraphD_[I].Y2.Text;
            }
        }
        else
        {
            X1 = GraphD_[I].Obj.V1.X;
            Y1 = GraphD_[I].Obj.V1.Y;
            Z1 = GraphD_[I].Obj.V1.Z;
            X2 = GraphD_[I].Obj.V2.X;
            Y2 = GraphD_[I].Obj.V2.Y;
            Z2 = GraphD_[I].Obj.V2.Z;

            X = X2 - X1;
            Y = Y2 - Y1;
            Z = Z2 - Z1;

            X1 = X1 + ((X * GraphD_[I].Type) / EdgeSegments);
            Y1 = Y1 + ((Y * GraphD_[I].Type) / EdgeSegments);
            Z1 = Z1 + ((Z * GraphD_[I].Type) / EdgeSegments);
            X2 = X2 + ((X * (GraphD_[I].Type - EdgeSegments + 1)) / EdgeSegments);
            Y2 = Y2 + ((Y * (GraphD_[I].Type - EdgeSegments + 1)) / EdgeSegments);
            Z2 = Z2 + ((Z * (GraphD_[I].Type - EdgeSegments + 1)) / EdgeSegments);


            GraphD_[I].X1 = X1;
            GraphD_[I].Y1 = Y1;
            GraphD_[I].Z1 = Z1;
            GraphD_[I].X2 = X2;
            GraphD_[I].Y2 = Y2;
            GraphD_[I].Z2 = Z2;
            GraphD_[I].Depth = Z1 + Z2;
            
            if (GraphD_[I].Type == LabelESegment)
            {
                GraphD_[I].Text = GraphD_[I].Obj.Text;
            }
        }
    }

    if (GraphDCount > 0)
    {
        GraphDrawSortQ(0, GraphDCount - 1);
    }
}

// Calculate the average edge weight
function GraphCalcWeight(E)
{
    var Val = [E.WeightN[0], E.WeightD[0]];
    for (var I = 1; I < E.Num; I++)
    {
        Val = FractionAdd(Val[0], Val[1], E.WeightN[I], E.WeightD[I]);
    }
    Val[1] = Val[1] * E.Num;
    return Val;
}

// Build the neighbor list
function GraphBuildNeighbors(V)
{
    V.NeiF = [];
    V.NeiB = [];
    V.NeiA = [];
    V.NeiO = [];
    V.NeiL = [];

    var IsF;
    var IsB;
    for (var I = 0; I < GraphECount; I++)
    {
        var E = GraphE_[I];
        if (E.V1 != E.V2)
        {
            if (E.V1 == V)
            {
                IsF = [];
                IsB = [];
                for (var II = 0; II < E.Num; II++)
                {
                    if ((E.Dir[II] == 0) || (E.Dir[II] > 0))
                    {
                        IsF.push(II);
                    }
                    if ((E.Dir[II] == 0) || (E.Dir[II] < 0))
                    {
                        IsB.push(II);
                    }
                }
                if (IsF.length > 0)
                {
                    V.NeiF.push([E, E.V2, IsF]);
                }
                if (IsB.length > 0)
                {
                    V.NeiB.push([E, E.V2, IsB]);
                }
                if ((IsF.length > 0) && (IsB.length > 0))
                {
                    V.NeiA.push([E, E.V2, []]);
                }
                if ((IsF.length > 0) || (IsB.length > 0))
                {
                    V.NeiO.push([E, E.V2, []]);
                }
            }
            else
            {
                if (E.V2 == V)
                {
                    IsF = [];
                    IsB = [];
                    for (var II = 0; II < E.Num; II++)
                    {
                        if ((E.Dir[II] == 0) || (E.Dir[II] < 0))
                        {
                            IsF.push(II);
                        }
                        if ((E.Dir[II] == 0) || (E.Dir[II] > 0))
                        {
                            IsB.push(II);
                        }
                    }
                    if (IsF.length > 0)
                    {
                        V.NeiF.push([E, E.V1, IsF]);
                    }
                    if (IsB.length > 0)
                    {
                        V.NeiB.push([E, E.V1, IsB]);
                    }
                    if ((IsF.length > 0) && (IsB.length > 0))
                    {
                        V.NeiA.push([E, E.V1, []]);
                    }
                    if ((IsF.length > 0) || (IsB.length > 0))
                    {
                        V.NeiO.push([E, E.V1, []]);
                    }
                }
            }
        }
        else
        {
            V.NeiL.push([E, E.V1]);
        }
    }
}


// Add vertice
function GraphVerticeAdd(PosX, PosY, PosZ, ForceN, ForceD)
{
    var Obj = new GraphV(PosX, PosY, PosZ, ForceN, ForceD);
    GraphV_.push(Obj);
    GraphD_.push(new GraphD(-1, Obj, []));
    GraphVCount++;
    GraphDCount++;
}

// Remove vertice
function GraphVerticeRem(N)
{
    var TempEdge = [];
    for (var I = 0; I < GraphECount; I++)
    {
        if ((GraphE_[I].V1 == GraphV_[N]) || (GraphE_[I].V2 == GraphV_[N]))
        {
            GraphEdgeRemObj(GraphE_[I].V1, GraphE_[I].V2, -1);
            I--;
        }
    }

    for (var I = 0; I < GraphDCount; I++)
    {
        if (GraphD_[I].Obj == GraphV_[N])
        {
            GraphD_.splice(I, 1);
            GraphDCount--;
            break;
        }
    }
    GraphV_.splice(N, 1);
    GraphVCount--;
}

// Reverse edge
function GraphEdgeRevObj(E)
{
    var V1 = E.V1;
    var V2 = E.V2;
    E.V1 = V2;
    E.V2 = V1;
    for (var I = 0; I < E.Num; I++)
    {
        E.Dir[I] = 0 - E.Dir[I];
    }
    for (var I = 0; I < GraphDCount; I++)
    {
        var D = GraphD_[I];
        if (D.Obj == E)
        {
            for (var II = 0; II < D.EdgeN; II++)
            {
                if (E.Dir[II] > 0)
                {
                    D.Edge[II] = D.Type;
                }
                if (E.Dir[II] < 0)
                {
                    D.Edge[II] = EdgeSegments - 1 - D.Type;
                }
            }
        }
    }
    GraphBuildNeighbors(V1);
    GraphBuildNeighbors(V2);
}

// Add edge
function GraphEdgeAddObj(V1, V2, Directed, WeightN, WeightD, ForceN, ForceD)
{
    if ((V1 == null) || (V2 == null))
    {
        return false;
    }
    if (V1 == V2)
    {
        Directed = 0;
    }
    for (var I = 0; I < GraphECount; I++)
    {
        if (((GraphE_[I].V1 == V1) && (GraphE_[I].V2 == V2)) || ((GraphE_[I].V1 == V2) && (GraphE_[I].V2 == V1)))
        {
            var Directed_ = Directed;
            if (GraphE_[I].V1 == V2)
            {
                Directed_ = 0 - Directed_;
            }

            GraphE_[I].ForceN = ForceN;
            GraphE_[I].ForceD = ForceD;
            GraphE_[I].WeightN.push(WeightN);
            GraphE_[I].WeightD.push(WeightD);
            GraphE_[I].Dir.push(Directed_);
            GraphE_[I].Label.push("");
            GraphE_[I].Text.push("");
            GraphE_[I].Num++;

            if (V1 != V2)
            {
                for (var II = 0; II < GraphDCount; II++)
                {
                    if (GraphD_[II].Obj == GraphE_[I])
                    {
                        if (Directed_ > 0)
                        {
                            GraphD_[II].Edge.push(GraphD_[II].Type);
                        }
                        if (Directed_ < 0)
                        {
                            GraphD_[II].Edge.push(EdgeSegments - 1 - GraphD_[II].Type);
                        }
                        if (Directed_ == 0)
                        {
                            GraphD_[II].Edge.push(EdgeSegments);
                        }
                        GraphD_[II].EdgeN++;
                    }
                }
            }
            else
            {
                for (var II = 0; II < GraphDCount; II++)
                {
                    if ((GraphD_[II].Type == -2) && (GraphD_[II].Obj == V1))
                    {
                        GraphD_[II].Edge.push(EdgeSegments);
                        GraphD_[II].EdgeN++;
                    }
                }
            }

            GraphBuildNeighbors(V1);
            GraphBuildNeighbors(V2);
            return false;
        }
    }
    var Obj = new GraphE(V1, V2, Directed, WeightN, WeightD, ForceN, ForceD);
    GraphE_.push(Obj);
    GraphECount++;
    if (V1 == V2)
    {
        GraphD_.push(new GraphD(-2, V1, [EdgeSegments]));
        GraphD_[GraphDCount].Y2 = Obj;
        GraphDCount++;
    }
    else
    {
        for (var I = 0; I < EdgeSegments; I++)
        {
            if (Directed > 0)
            {
                GraphD_.push(new GraphD(I, Obj, [I]));
            }
            if (Directed < 0)
            {
                GraphD_.push(new GraphD(I, Obj, [EdgeSegments - 1 - I]));
            }
            if (Directed == 0)
            {
                GraphD_.push(new GraphD(I, Obj, [EdgeSegments]));
            }
            GraphDCount++;
        }
    }
    GraphBuildNeighbors(V1);
    GraphBuildNeighbors(V2);
    return true;
}

// Add edge by vertice numbers
function GraphEdgeAdd(V1, V2, Directed, WeightN, WeightD, ForceN, ForceD)
{
    return GraphEdgeAddObj(GraphV_[V1], GraphV_[V2], Directed, WeightN, WeightD, ForceN, ForceD);
}


// Remove edge by edge object
function GraphEdgeRemObj0(E, N)
{
    var V1 = E.V1;
    var V2 = E.V2;
    if (V1 == V2)
    {
        if ((N == 0) && (E.Num == 1))
        {
            N = 1;
        }
        if ((N == E.Num) || (N < 0))
        {
            for (var II = 0; II < GraphDCount; II++)
            {
                if ((GraphD_[II].Type == (-2)) && (GraphD_[II].Obj == V1))
                {
                    GraphD_.splice(II, 1);
                    GraphDCount--;
                    II--;
                }
            }
            var I = NumberOfE(E);
            GraphE_.splice(I, 1);
            GraphECount--;
        }
        else
        {
            if ((N >= 0) && (N < E.Num))
            {
                E.WeightN.splice(N, 1);
                E.WeightD.splice(N, 1);
                E.Dir.splice(N, 1);
                E.Label.splice(N, 1);
                E.Text.splice(N, 1);
                E.Num--;
                for (var II = 0; II < GraphDCount; II++)
                {
                    if (GraphD_[II].Obj == E)
                    {
                        GraphD_[II].Edge.splice(N, 1);
                        GraphD_[II].EdgeN--;
                    }
                }
            }
        }
        GraphBuildNeighbors(V1);
    }
    else
    {
        if ((N == 0) && (E.Num == 1))
        {
            N = 1;
        }
        if ((N == E.Num) || (N < 0))
        {
            for (var II = 0; II < GraphDCount; II++)
            {
                if (GraphD_[II].Obj == E)
                {
                    GraphD_.splice(II, 1);
                    GraphDCount--;
                    II--;
                }
            }
            var I = NumberOfE(E);
            GraphE_.splice(I, 1);
            GraphECount--;
        }
        else
        {
            if ((N >= 0) && (N < E.Num))
            {
                E.WeightN.splice(N, 1);
                E.WeightD.splice(N, 1);
                E.Dir.splice(N, 1);
                E.Label.splice(N, 1);
                E.Text.splice(N, 1);
                E.Num--;
                for (var II = 0; II < GraphDCount; II++)
                {
                    if (GraphD_[II].Obj == E)
                    {
                        GraphD_[II].Edge.splice(N, 1);
                        GraphD_[II].EdgeN--;
                    }
                }
            }
        }
        GraphBuildNeighbors(V1);
        GraphBuildNeighbors(V2);
    }
}

// Remove edge by edge number
function GraphEdgeRem0(E, N)
{
    return GraphEdgeRemObj0(GraphE_[E], N);
}

// Remove edge by vertice objects
function GraphEdgeRemObj(V1, V2, N)
{
    if ((V1 == null) || (V2 == null))
    {
        return false;
    }
    for (var I = 0; I < GraphECount; I++)
    {
        if (((GraphE_[I].V1 == V1) && (GraphE_[I].V2 == V2)) || ((GraphE_[I].V1 == V2) && (GraphE_[I].V2 == V1)))
        {
            GraphEdgeRem0(I, N);
            return true;
        }
    }
    return false;
}

// Remove edge by vertice numbers
function GraphEdgeRem(V1, V2, N)
{
    return GraphEdgeRemObj(GraphV_[V1], GraphV_[V2], N);
}


// Count edges
function GraphEdgeCountObj(V1, V2)
{
    if ((V1 == null) || (V2 == null))
    {
        return 0;
    }
    if (V1 == V2)
    {
        for (var I = 0; I < GraphECount; I++)
        {
            if ((GraphE_[I].V1 == V1) && (GraphE_[I].V2 == V1))
            {
                return GraphE_[I].Num;
            }
        }
    }
    else
    {
        for (var I = 0; I < GraphECount; I++)
        {
            if (((GraphE_[I].V1 == V1) && (GraphE_[I].V2 == V2)) || ((GraphE_[I].V1 == V2) && (GraphE_[I].V2 == V1)))
            {
                return GraphE_[I].Num;
            }
        }
    }
    return 0;
}

// Count edges by vertice numbers
function GraphEdgeCount(V1, V2)
{
    return GraphEdgeCountObj(GraphV_[V1], GraphV_[V2]);
}






///////////////////////////////////////////////////////////// impexp.js


function StructImport(RAW)
{
    GraphClear();
    for (var I = 0; I < RAW.length; I++)
    {
        RAW[I] = RAW[I].trim();
        var Idx = 0;
        var S = [];
        var SBuf = "";
        for (var II = 0; II < RAW[I].length; II++)
        {
            if ((RAW[I][II] == ' ') || (RAW[I][II] == '\t'))
            {
                if (SBuf != '')
                {
                    S[Idx] = SBuf;
                    SBuf = "";
                    Idx++;
                }
            }
            else
            {
                SBuf = SBuf + RAW[I][II];
            }
        }
        if (SBuf != '')
        {
            S[Idx] = SBuf;
        }

        if (S.length >= 1)
        {
            var ParamV = 6;
            var ParamE = 5;
            if (((S[0] == 'V') || (S[0] == 'v')) && (S.length >= ParamV))
            {
                var TempNum = FractionNum(S[4]);
                GraphVerticeAdd(parseInt(S[1]), parseInt(S[2]), parseInt(S[3]), TempNum[0], TempNum[1]);
                GraphV_[GraphVCount - 1].Rot = parseInt(S[5]);
                for (var II = ParamV; II < S.length; II++)
                {
                    if (II > ParamV)
                    {
                        GraphV_[GraphVCount - 1].Label += " ";
                    }
                    GraphV_[GraphVCount - 1].Label += S[II];
                }
            }
            if (((S[0] == 'E') || (S[0] == 'e') || (S[0] == 'A') || (S[0] == 'a') || (S[0] == 'B') || (S[0] == 'b')) && (S.length >= ParamE))
            {
                var IsArrow = 0;
                if ((S[0] == 'A') || (S[0] == 'a'))
                {
                    IsArrow = 1;
                }
                if ((S[0] == 'B') || (S[0] == 'b'))
                {
                    IsArrow = -1;
                }
                var TempNum1 = FractionNum(S[4]);
                var TempNum2 = FractionNum(S[3]);
                GraphEdgeAdd(parseInt(S[1]), parseInt(S[2]), IsArrow, TempNum1[0], TempNum1[1], TempNum2[0], TempNum2[1]);
                var EdgeLabel = "";
                for (var II = ParamE; II < S.length; II++)
                {
                    if (II > ParamE)
                    {
                        EdgeLabel += " ";
                    }
                    EdgeLabel += S[II];
                }
                GraphE_[GraphECount - 1].Label[GraphE_[GraphECount - 1].Label.length - 1] = EdgeLabel;
            }
        }
    }
}

function StructExport()
{
    var RAW = [];
    for (var I = 0; I < GraphVCount; I++)
    {
        RAW.push("V " + Math.round(GraphV_[I].X) + " " + Math.round(GraphV_[I].Y) + " " + Math.round(GraphV_[I].Z) + " " + FractionTxt(GraphV_[I].ForceN, GraphV_[I].ForceD) + " " + GraphV_[I].Rot + " " + GraphV_[I].Label);
    }
    for (var I = 0; I < GraphECount; I++)
    {
        var V1 = "?";
        var V2 = "?";
        for (var II = 0; II < GraphVCount; II++)
        {
            if (GraphV_[II] == GraphE_[I].V1)
            {
                V1 = II;
            }
            if (GraphV_[II] == GraphE_[I].V2)
            {
                V2 = II;
            }
        }
        for (var II = 0; II < GraphE_[I].Num; II++)
        {
            if (GraphE_[I].Dir[II] == 0)
            {
                RAW.push("E " + V1 + " " + V2 + " " + FractionTxt(GraphE_[I].ForceN, GraphE_[I].ForceD) + " " + FractionTxt(GraphE_[I].WeightN[II], GraphE_[I].WeightD[II]) + " " + GraphE_[I].Label[II]);
            }
            if (GraphE_[I].Dir[II] > 0)
            {
                RAW.push("A " + V1 + " " + V2 + " " + FractionTxt(GraphE_[I].ForceN, GraphE_[I].ForceD) + " " + FractionTxt(GraphE_[I].WeightN[II], GraphE_[I].WeightD[II]) + " " + GraphE_[I].Label[II]);
            }
            if (GraphE_[I].Dir[II] < 0)
            {
                RAW.push("B " + V1 + " " + V2 + " " + FractionTxt(GraphE_[I].ForceN, GraphE_[I].ForceD) + " " + FractionTxt(GraphE_[I].WeightN[II], GraphE_[I].WeightD[II]) + " " + GraphE_[I].Label[II]);
            }
        }
    }
    return RAW;
}



///////////////////////////////////////////////// calc.js
function val2db(val)
{
    return 10 * Math.log10(val);
}

function db2val(val)
{
    return Math.pow(10, (val / 10));
}

function Round(X)
{
    X = X * GraphRoundFactor;
    X = Math.round(X);
    X = X / GraphRoundFactor;
    return X;
}

function CalcGraphFactors(F)
{
    GraphForceSpringFactor = db2val(F);
    GraphForceSpringLength = GraphSize * GraphForceSpringFactor;
    GraphForceSpringLength2 = GraphForceSpringLength * GraphForceSpringLength;

    GraphForceFactor_ = GraphForceFactor / (1000 * GraphForceIter);
}

// Greatest common divisor
function GCD(Num1, Num2)
{
    while (Num2 != 0)
    {
        var Num3 = Num1 % Num2;
        Num1 = Num2;
        Num2 = Num3;
    }
    return Num1;
}

// Least common multiple
function LCM(Num1, Num2)
{
    return (Num1 * Num2) / GCD(Num1, Num2);
}

function FractionComp(Num1N, Num1D, Num2N, Num2D)
{
    var Val1 = Num1N * 1000 / Num1D;
    var Val2 = Num2N * 1000 / Num2D;
    if (Val1 > Val2)  { return  1; }
    if (Val1 == Val2) { return  0; }
    if (Val1 < Val2)  { return -1; }
}

function FractionTxt(Num1, Num2)
{
    var N = GCD(Num1, Num2);
    Num1 = Num1 / N;
    Num2 = Num2 / N;
    if (Num2 == 1)
    {
        return Num1;
    }
    else
    {
        return Num1 + "/" + Num2;
    }
}

function FractionAdd(Num1N, Num1D, Num2N, Num2D)
{
    var N = GCD(Num1N, Num1D);
    Num1N = Num1N / N;
    Num1D = Num1D / N;

    N = GCD(Num2N, Num2D);
    Num2N = Num2N / N;
    Num2D = Num2D / N;

    var NumCommonD = LCM(Num1D, Num2D);
    Num1N = Num1N * (NumCommonD / Num1D);
    Num2N = Num2N * (NumCommonD / Num2D);

    Num1N = Num1N + Num2N;
    Num1D = NumCommonD;
    
    N = GCD(Num1N, Num1D);
    Num1N = Num1N / N;
    Num1D = Num1D / N;
    
    return [Num1N, Num1D];
}

function FractionNum(Txt)
{
    Txt = "" + Txt + "";
    var Num = ["", ""];
    var Idx = 0;
    for (var I = 0; I < Txt.length; I++)
    {
        if ((Txt.charAt(I) >= '0') && (Txt.charAt(I) <= '9'))
        {
            Num[Idx] = Num[Idx] + Txt[I];
        }
        else
        {
            if (Num[Idx] != "")
            {
                Idx++;
            }
        }
    }
    if (Num[0] == "") { Num[0] = "0"; }
    if (Num[1] == "") { Num[1] = "1"; }
    var NumInt = [parseInt(Num[0]), parseInt(Num[1])];
    var N = GCD(NumInt[0], NumInt[1]);
    NumInt[0] = NumInt[0] / N;
    NumInt[1] = NumInt[1] / N;
    return NumInt;
}

function ValTxt(Val, Num)
{
    Val = Val * Num;
    Val = Math.round(Val);
    Val = Val / Num;
    Val = Val + (0.1 / Num);
    Val = "" + Val + "";
    var I = Val.indexOf('.');
    if (I > 0)
    {
        Val = Val.substr(0, I + ("" + Num + "").length);
    }
    return Val;
}

//////////////////////////////////////////////////////////////////// oper.js
var GraphBoundXMin = 0;
var GraphBoundXMax = 0;
var GraphBoundYMin = 0;
var GraphBoundYMax = 0;
var GraphBoundZMin = 0;
var GraphBoundZMax = 0;

var GraphForceSpringFactor = 1;



var GraphForceFactor_ = 1;
var GraphForceSpringLength = 1;
var GraphForceSpringLength2 = 1;
var MouseState = 0;


var CurrentEForceN = 1;
var CurrentEForceD = 1;
var CurrentEWeightN = 1;
var CurrentEWeightD = 1;
var CurrentVForceN = 1;
var CurrentVForceD = 1;

function SelectClear()
{
    MouseVSelected = null;
    MouseVSelectedI = null;
    MouseVSelected0 = null;
    MouseVSelectedI0 = null;
    MouseVXOffset = 0;
    MouseVYOffset = 0;
    MouseVZOffsetX = 0;
    MouseVZOffsetY = 0;
}

function GraphClearBtn()
{
    GraphClear();
    Repaint();
}

function CurrentSetValues()
{
    CurrentVForceN = parseInt(document.getElementById("CurrentVForceN").value);
    CurrentVForceD = parseInt(document.getElementById("CurrentVForceD").value);
    document.getElementById("CurrentVForceV").innerHTML = FractionTxt(CurrentVForceN, CurrentVForceD);
    CurrentEForceN = parseInt(document.getElementById("CurrentEForceN").value);
    CurrentEForceD = parseInt(document.getElementById("CurrentEForceD").value);
    document.getElementById("CurrentEForceV").innerHTML = FractionTxt(CurrentEForceN, CurrentEForceD);
    CurrentEWeightN = parseInt(document.getElementById("CurrentEWeightN").value);
    CurrentEWeightD = parseInt(document.getElementById("CurrentEWeightD").value);
    document.getElementById("CurrentEWeightV").innerHTML = FractionTxt(CurrentEWeightN, CurrentEWeightD);
}


function Layout()
{
    {
        var HardLimitP = 1e+15;
        var HardLimitN = 0 - HardLimitP;

        for (var I_ = 0; I_ < GraphForceIter; I_++)
        {
            var ForceX_ = 0;
            var ForceY_ = 0;
            var ForceZ_ = 0;
            var Force = 0;
            var Dist;
            var Dist2;
            for (var i = 0; i < GraphVCount; i++)
            {
                ForceX_ = 0;
                ForceY_ = 0;
                ForceZ_ = 0;
                for (var ii = 0; ii < GraphVCount; ii++)
                {
                    if (ii != i)
                    {
                        var DistX = Math.min(GraphV_[ii].X - GraphV_[i].X, HardLimitP);
                        var DistY = Math.min(GraphV_[ii].Y - GraphV_[i].Y, HardLimitP);
                        var DistZ = Math.min(GraphV_[ii].Z - GraphV_[i].Z, HardLimitP);
                        Dist = Math.sqrt((DistX * DistX) + (DistY * DistY) + (DistZ * DistZ));
                        Dist = (Dist * GraphV_[ii].ForceD * GraphV_[i].ForceD) / (GraphV_[ii].ForceN * GraphV_[i].ForceN);
                        if (Dist > 0)
                        {
                            Force = 0 - (GraphForceSpringLength2 / Dist);
                            ForceX_ = ForceX_ + ((DistX * Force) / Dist);
                            ForceY_ = ForceY_ + ((DistY * Force) / Dist);
                            ForceZ_ = ForceZ_ + ((DistZ * Force) / Dist);
                        }
                    }
                }
                GraphV_[i].FX = ForceX_;
                GraphV_[i].FY = ForceY_;
                GraphV_[i].FZ = ForceZ_;
            }

            for (var i = 0; i < GraphECount; i++)
            {
                var GraphE__ = GraphE_[i];
                var DistX = Math.min((GraphE__.V1.X - GraphE__.V2.X), HardLimitP);
                var DistY = Math.min((GraphE__.V1.Y - GraphE__.V2.Y), HardLimitP);
                var DistZ = Math.min((GraphE__.V1.Z - GraphE__.V2.Z), HardLimitP);
                Dist2 = ((DistX * DistX) + (DistY * DistY) + (DistZ * DistZ));

                if (Dist2 > 0)
                {
                    Dist2 = (Dist2 * GraphE__.ForceD * GraphE__.ForceD) / (GraphE__.ForceN * GraphE__.ForceN);
                    Force = (Dist2 / GraphForceSpringLength);
                    Dist = Math.sqrt(Dist2);

                    ForceX_ = ((DistX * Force) / Dist);
                    ForceY_ = ((DistY * Force) / Dist);
                    ForceZ_ = ((DistZ * Force) / Dist);

                    GraphE__.V1.FX -= ForceX_;
                    GraphE__.V1.FY -= ForceY_;
                    GraphE__.V1.FZ -= ForceZ_;

                    GraphE__.V2.FX += ForceX_;
                    GraphE__.V2.FY += ForceY_;
                    GraphE__.V2.FZ += ForceZ_;
                }
            }

            ForceX_ = 0;
            ForceY_ = 0;
            ForceZ_ = 0;
            if (MouseVSelected)
            {
                ForceX_ = (MouseVSelected.FX * GraphForceFactor_);
                ForceY_ = (MouseVSelected.FY * GraphForceFactor_);
                ForceZ_ = (MouseVSelected.FZ * GraphForceFactor_);
            }

            for (var i = 0; i < GraphVCount; i++)
            {
                GraphV_[i].X = Math.min(Math.max(Round(GraphV_[i].X + (GraphV_[i].FX * GraphForceFactor_) - ForceX_), HardLimitN), HardLimitP);
                GraphV_[i].Y = Math.min(Math.max(Round(GraphV_[i].Y + (GraphV_[i].FY * GraphForceFactor_) - ForceY_), HardLimitN), HardLimitP);
                GraphV_[i].Z = Math.min(Math.max(Round(GraphV_[i].Z + (GraphV_[i].FZ * GraphForceFactor_) - ForceZ_), HardLimitN), HardLimitP);
            }
        }
    }
    Repaint();
}

function GraphMove(Axis, Factor)
{
    if (Axis == 0)
    {
        for (var i = 0; i < GraphVCount; i++)
        {
            GraphV_[i].X = Round(GraphV_[i].X + Factor);
        }
    }
    if (Axis == 1)
    {
        for (var i = 0; i < GraphVCount; i++)
        {
            GraphV_[i].Y = Round(GraphV_[i].Y + Factor);
        }
    }
    if (Axis == 2)
    {
        for (var i = 0; i < GraphVCount; i++)
        {
            GraphV_[i].Z = Round(GraphV_[i].Z + Factor);
        }
    }
    Repaint();
}

function GraphRotate(Axis, Factor)
{
    var Angle;
    var Len;
    if (Axis == 0)
    {
        for (var i = 0; i < GraphVCount; i++)
        {
            Len = Math.sqrt((GraphV_[i].Z * GraphV_[i].Z) + (GraphV_[i].Y * GraphV_[i].Y));
            Angle = Math.atan2(GraphV_[i].Z, GraphV_[i].Y) + Factor;
            GraphV_[i].Y = Round(Len * Math.cos(Angle));
            GraphV_[i].Z = Round(Len * Math.sin(Angle));
        }
    }
    if (Axis == 1)
    {
        for (var i = 0; i < GraphVCount; i++)
        {
            Len = Math.sqrt((GraphV_[i].Z * GraphV_[i].Z) + (GraphV_[i].X * GraphV_[i].X));
            Angle = Math.atan2(GraphV_[i].Z, GraphV_[i].X) + Factor;
            GraphV_[i].X = Round(Len * Math.cos(Angle));
            GraphV_[i].Z = Round(Len * Math.sin(Angle));
        }
    }
    if (Axis == 2)
    {
        for (var i = 0; i < GraphVCount; i++)
        {
            Len = Math.sqrt((GraphV_[i].Y * GraphV_[i].Y) + (GraphV_[i].X * GraphV_[i].X));
            Angle = Math.atan2(GraphV_[i].Y, GraphV_[i].X) + Factor;
            GraphV_[i].X = Round(Len * Math.cos(Angle));
            GraphV_[i].Y = Round(Len * Math.sin(Angle));
        }
    }
    Repaint();
}

function GraphStretch(Axis, Factor)
{
    Factor = db2val(Factor);
    if (Axis == 0)
    {
        for (var i = 0; i < GraphVCount; i++)
        {
            GraphV_[i].X = Round(GraphV_[i].X * Factor);
        }
    }
    if (Axis == 1)
    {
        for (var i = 0; i < GraphVCount; i++)
        {
            GraphV_[i].Y = Round(GraphV_[i].Y * Factor);
        }
    }
    if (Axis == 2)
    {
        for (var i = 0; i < GraphVCount; i++)
        {
            GraphV_[i].Z = Round(GraphV_[i].Z * Factor);
        }
    }
    Repaint();
}


function Rearrange(Mode, Axis)
{
    if (GraphVCount < 1)
    {
        Repaint();
        return;
    }

    // Center
    if (Mode == 0)
    {
        if (Axis == 0)
        {
            var VMin = GraphV_[0].X;
            var VMax = GraphV_[0].X;
            for (var I = 0; I < GraphVCount; I++)
            {
                if (VMin > GraphV_[I].X)
                {
                    VMin = GraphV_[I].X;
                }
                if (VMax < GraphV_[I].X)
                {
                    VMax = GraphV_[I].X;
                }
            }
            var VOffset = Round((VMin + VMax) / 2);
            for (var I = 0; I < GraphVCount; I++)
            {
                GraphV_[I].X -= VOffset;
            }
        }
        if (Axis == 1)
        {
            var VMin = GraphV_[0].Y;
            var VMax = GraphV_[0].Y;
            for (var I = 0; I < GraphVCount; I++)
            {
                if (VMin > GraphV_[I].Y)
                {
                    VMin = GraphV_[I].Y;
                }
                if (VMax < GraphV_[I].Y)
                {
                    VMax = GraphV_[I].Y;
                }
            }
            var VOffset = Round((VMin + VMax) / 2);
            for (var I = 0; I < GraphVCount; I++)
            {
                GraphV_[I].Y -= VOffset;
            }
        }
        if (Axis == 2)
        {
            var VMin = GraphV_[0].Z;
            var VMax = GraphV_[0].Z;
            for (var I = 0; I < GraphVCount; I++)
            {
                if (VMin > GraphV_[I].Z)
                {
                    VMin = GraphV_[I].Z;
                }
                if (VMax < GraphV_[I].Z)
                {
                    VMax = GraphV_[I].Z;
                }
            }
            var VOffset = Round((VMin + VMax) / 2);
            for (var I = 0; I < GraphVCount; I++)
            {
                GraphV_[I].Z -= VOffset;
            }
        }
    }

    // Flat
    if (Mode == 1)
    {
        if (Axis == 0)
        {
            for (var I = 0; I < GraphVCount; I++)
            {
                GraphV_[I].X = 0;
            }
        }
        if (Axis == 1)
        {
            for (var I = 0; I < GraphVCount; I++)
            {
                GraphV_[I].Y = 0;
            }
        }
        if (Axis == 2)
        {
            for (var I = 0; I < GraphVCount; I++)
            {
                GraphV_[I].Z = 0;
            }
        }
    }
    
    // Bound
    if (Mode == 2)
    {
        if (Axis == 0)
        {
            for (var I = 0; I < GraphVCount; I++)
            {
                GraphV_[I].X = Math.min(Math.max(GraphV_[I].X, GraphBoundXMin), GraphBoundXMax);
            }
        }
        if (Axis == 1)
        {
            for (var I = 0; I < GraphVCount; I++)
            {
                GraphV_[I].Y = Math.min(Math.max(GraphV_[I].Y, GraphBoundYMin), GraphBoundYMax);
            }
        }
        if (Axis == 2)
        {
            for (var I = 0; I < GraphVCount; I++)
            {
                GraphV_[I].Z = Math.min(Math.max(GraphV_[I].Z, GraphBoundZMin), GraphBoundZMax);
            }
        }
    }

    Repaint();
}








function SetMouseState()
{
    MouseState = document.getElementById("MouseState").selectedIndex;
}

function SetMoveMode(MoveMode0_, MoveMode_)
{
    MoveMode0 = MoveMode0_;
    MoveMode = MoveMode_;
}

var MouseVSelected = null;
var MouseVSelectedI = null;
var MouseVSelected0 = null;
var MouseVSelectedI0 = null;
var MouseVXOffset = 0;
var MouseVYOffset = 0;
var MouseVZOffsetX = 0;
var MouseVZOffsetY = 0;

function MouseDown(X, Y)
{
    X = ((X - OffsetX) / ZoomX);
    Y = ((Y - OffsetY) / ZoomY);

    MouseVSelected0 = MouseVSelected;
    MouseVSelectedI0 = MouseVSelectedI;

    MouseVSelected = null;
    MouseVSelectedI = null;
    MouseVSelectedZ = null;
    var Dist;
    var DistX;
    var DistY;
    for (var i = 0; i < GraphVCount; i++)
    {
        DistX = (X - (GraphV_[i].X)) * ZoomX;
        DistY = (Y - (GraphV_[i].Y)) * ZoomY;
        Dist = (DistX * DistX) + (DistY * DistY);
        if (Dist < (SizeV * SizeV))
        {
            if ((!MouseVSelectedZ) || (MouseVSelectedZ < GraphV_[i].Z))
            {
                MouseVSelectedZ = GraphV_[i].Z;
                MouseVSelectedI = i;
                MouseVSelected = GraphV_[i];
                MouseVXOffset = GraphV_[i].X - X;
                MouseVYOffset = GraphV_[i].Y - Y;
                MouseVZOffsetX = GraphV_[i].Z - X;
                MouseVZOffsetY = GraphV_[i].Z - Y;
            }
        }
    }

    switch (MouseState)
    {
        case 0: // Move vertice
            break;
        case 1: // Add vertice
            if (MouseVSelected)
            {
                MouseVSelected.Rot += 45;
                if (MouseVSelected.Rot >= 360)
                {
                    MouseVSelected.Rot = 0;
                }
                MouseVSelected.ForceN = CurrentVForceN;
                MouseVSelected.ForceD = CurrentVForceD;
            }
            else
            {
                MouseVXOffset = 0;
                MouseVYOffset = 0;
                MouseVZOffsetX = 0 - X;
                MouseVZOffsetY = 0 - Y;
        
                GraphVerticeAdd(X, Y, 0, CurrentVForceN, CurrentVForceD);
                MouseVSelected = GraphV_[GraphVCount - 1];
                MouseVSelectedI = GraphVCount - 1;
            }
            SetText(true, false);
            break;
        case 2: // Remove vertice
            if (MouseVSelected)
            {
                GraphVerticeRem(MouseVSelectedI, CurrentEWeightN, CurrentEWeightD, CurrentEForceN, CurrentEForceD);
                MouseVSelected0 = null;
                MouseVSelectedI0 = null;
                MouseVSelected = null;
                MouseVSelectedI = null;
            }
            break;
        case 3: // Add undirected edge
            GraphEdgeAdd(MouseVSelectedI0, MouseVSelectedI, 0, CurrentEWeightN, CurrentEWeightD, CurrentEForceN, CurrentEForceD);
            SetText(false, true);
            break;
        case 4: // Add directed edge
            GraphEdgeAdd(MouseVSelectedI0, MouseVSelectedI, 1, CurrentEWeightN, CurrentEWeightD, CurrentEForceN, CurrentEForceD);
            SetText(false, true);
            break;
        case 5: // Remove edge
            Dist = GraphEdgeCount(MouseVSelectedI0, MouseVSelectedI);
            if (Dist > 1)
            {
                Prompt(1, "Edge number 0-" + (Dist - 1) + ", type " + Dist + " for remove all edges", Dist, true);
            }
            else
            {
                Prompt(1, "Edge number 0-" + (Dist - 1) + ", type " + Dist + " for remove all edges", Dist, false);
            }
            return;
        case 6: // Set vertice label
            if (MouseVSelected)
            {
                Prompt(2, "Vertice label", MouseVSelected.Label, true);
            }
            else
            {
                SetText(true, false);
            }
            break;
        case 7: // Set edge label
            if ((MouseVSelectedI0 != null) && (MouseVSelectedI != null))
            {
                var V1 = GraphV_[MouseVSelectedI0];
                var V2 = GraphV_[MouseVSelectedI];
                for (var I = 0; I < GraphECount; I++)
                {
                    if (((GraphE_[I].V1 == V1) && (GraphE_[I].V2 == V2)) || ((GraphE_[I].V1 == V2) && (GraphE_[I].V2 == V1)))
                    {
                        Temp = [I, 0, 0];
                        Dist = GraphEdgeCount(MouseVSelectedI0, MouseVSelectedI);
                        if (Dist > 1)
                        {
                            Prompt(3, "Edge number 0-" + (Dist - 1) + ", type " + Dist + " for set the same label for all edges, type -1 to reverse edge order", Dist, true);
                        }
                        else
                        {
                            Prompt(3, "Edge number 0-" + (Dist - 1) + ", type " + Dist + " for set the same label for all edges, type -1 to reverse edge order", Dist, false);
                        }
                        return;
                    }
                }
            }
            break;
    }

    if (!MouseVSelected)
    {
        MouseVXOffset = X;
        MouseVYOffset = Y;
    }

    Repaint();
}



// 0 - Vertice
// 1 - Move
// 2 - Rotate
// 3 - Stretch
var MoveMode0 = 1;


// VERTICE       MOVE/ROT
// 0 - X+Y       XY
// 1 - X+Y (V)   XY
// 2 - X+Y (H)   XY
// 3 - X+Z       X Z
// 4 - Z+Y        YZ
var MoveMode = 0;
var MoveX;
var MoveY;
var MoveZ;

function MouseMove(X, Y)
{
    X = ((X - OffsetX) / ZoomX);
    Y = ((Y - OffsetY) / ZoomY);
    if (MouseVSelected)
    {
        if ((MoveMode == 0) || (MoveMode == 1) || (MoveMode == 2))
        {
            MouseVSelected.X = X + MouseVXOffset;
            MouseVSelected.Y = Y + MouseVYOffset;
        }
        if (MoveMode == 3)
        {
            MouseVSelected.X = X + MouseVXOffset;
            MouseVSelected.Z = Y + MouseVZOffsetY;
        }
        if (MoveMode == 4)
        {
            MouseVSelected.Z = X + MouseVZOffsetX;
            MouseVSelected.Y = Y + MouseVYOffset;
        }
    }
    else
    {

        // Move
        if (MoveMode0 == 1)
        {
            switch (MoveMode)
            {
                case 0:
                case 1:
                case 2:
                    {
                        GraphMove(0, X - MouseVXOffset);
                        GraphMove(1, Y - MouseVYOffset);
                    }
                    break;
                case 3:
                    {
                        GraphMove(0, X - MouseVXOffset);
                        GraphMove(2, Y - MouseVYOffset);
                    }
                    break;
                case 4:
                    {
                        GraphMove(2, X - MouseVXOffset);
                        GraphMove(1, Y - MouseVYOffset);
                    }
                    break;
            }
            MouseVXOffset = X;
            MouseVYOffset = Y;
        }


        // Rotate
        if (MoveMode0 == 2)
        {
            switch (MoveMode)
            {
                case 0:
                case 1:
                case 2:
                    {
                        GraphRotate(1, (MouseVXOffset - X) * Math.PI / GraphSize);
                        GraphRotate(0, (MouseVYOffset - Y) * Math.PI / GraphSize);
                    }
                    break;
                case 3:
                    {
                        GraphRotate(2, (MouseVXOffset - X) * Math.PI / GraphSize);
                        GraphRotate(0, (MouseVYOffset - Y) * Math.PI / GraphSize);
                    }
                    break;
                case 4:
                    {
                        GraphRotate(1, (MouseVXOffset - X) * Math.PI / GraphSize);
                        GraphRotate(2, (MouseVYOffset - Y) * Math.PI / GraphSize);
                    }
                    break;
            }
            MouseVXOffset = X;
            MouseVYOffset = Y;
        }


        // Stretch
        if (MoveMode0 == 3)
        {
            switch (MoveMode)
            {
                case 0:
                case 1:
                case 2:
                    {
                        GraphStretch(0, (X - MouseVXOffset) / 100);
                        GraphStretch(1, (Y - MouseVYOffset) / 100);
                    }
                    break;
                case 3:
                    {
                        GraphStretch(0, (X - MouseVXOffset) / 100);
                        GraphStretch(2, (Y - MouseVYOffset) / 100);
                    }
                    break;
                case 4:
                    {
                        GraphStretch(2, (X - MouseVXOffset) / 100);
                        GraphStretch(1, (Y - MouseVYOffset) / 100);
                    }
                    break;
            }
            MouseVXOffset = X;
            MouseVYOffset = Y;
        }
    }

    Repaint();
}

function MouseUp(X, Y)
{
    X = ((X - OffsetX) / ZoomX);
    Y = ((Y - OffsetY) / ZoomY);
    Repaint();
}

// Set text after changing display option
function SetTextOpt()
{
    SetText(true, true);
}

var TextVMode = 0;
var TextEMode = 0;

// Set text display for vertices or edges
function SetText(SetV, SetE)
{
    if (SetV)
    {
        switch (TextVMode)
        {
            case 0:
                {
                    for (var I = 0; I < GraphVCount; I++)
                    {
                        GraphV_[I].Text = GraphV_[I].Label;
                    }
                }
                break;
            case 1:
                {
                    for (var I = 0; I < GraphVCount; I++)
                    {
                        GraphV_[I].Text = "";
                    }
                }
                break;
            case 2:
                {
                    for (var I = 0; I < GraphVCount; I++)
                    {
                        GraphV_[I].Text = I + "";
                    }
                }
                break;
            case 3:
                {
                    for (var I = 0; I < GraphVCount; I++)
                    {
                        GraphV_[I].Text = FractionTxt(GraphV_[I].ForceN, GraphV_[I].ForceD);
                    }
                }
                break;
        }
    }

    if (SetE)
    {
        switch (TextEMode)
        {
            case 0:
                {
                    for (var I = 0; I < GraphECount; I++)
                    {
                        for (var II = 0; II < GraphE_[I].Num; II++)
                        {
                            GraphE_[I].Text[II] = GraphE_[I].Label[II];
                        }
                    }
                }
                break;
            case 1:
                {
                    for (var I = 0; I < GraphECount; I++)
                    {
                        for (var II = 0; II < GraphE_[I].Num; II++)
                        {
                            GraphE_[I].Text[II] = "";
                        }
                    }
                }
                break;
            case 2:
                {
                    for (var I = 0; I < GraphECount; I++)
                    {
                        if (GraphE_[I].Num == 1)
                        {
                            GraphE_[I].Text[0] = I + "";
                        }
                        else
                        {
                            for (var II = 0; II < GraphE_[I].Num; II++)
                            {
                                GraphE_[I].Text[II] = I + "-" + II;
                            }
                        }
                    }
                }
                break;
            case 3:
                {
                    for (var I = 0; I < GraphECount; I++)
                    {
                        for (var II = 0; II < GraphE_[I].Num; II++)
                        {
                            GraphE_[I].Text[II] = FractionTxt(GraphE_[I].ForceN, GraphE_[I].ForceD);
                        }
                    }
                }
                break;
            case 4:
                {
                    for (var I = 0; I < GraphECount; I++)
                    {
                        for (var II = 0; II < GraphE_[I].Num; II++)
                        {
                            GraphE_[I].Text[II] = FractionTxt(GraphE_[I].WeightN[II], GraphE_[I].WeightD[II]);
                        }
                    }
                }
                break;
        }
    }
    Repaint();
}


//////////////////////////////////////////////////////////////////////// draw.js

var ZoomX = 1;
var ZoomY = 1;
var ZoomZ = 1;

var SizeE = [];

var OffsetX = 0;
var OffsetY = 0;

var LabelEOdd = true;
var LabelESegment = 2;


function SetEdgeSegments()
{
    SizeE = [];
    if ((EdgeSegments % 2) != 0)
    {
        LabelEOdd = true;
        LabelESegment = (EdgeSegments - 1) / 2;
        SizeE[(EdgeSegments - 1) / 2] = (SizeE2 + SizeE1) / 2;
    }
    else
    {
        LabelEOdd = false;
        LabelESegment = EdgeSegments / 2;
    }
    for (var I = Math.floor(((EdgeSegments - 2) / 2)); I >= 0; I--)
    {
        var EdgeVal = (((SizeE2 - SizeE1) * I) / (EdgeSegments - 1));
        SizeE[I] = SizeE1 + EdgeVal;
        SizeE[EdgeSegments - 1 - I] = SizeE2 - EdgeVal;
    }
    SizeE[EdgeSegments] = (SizeE2 + SizeE1) / 2;
    GraphDrawRebuild();
}


function Repaint()
{
    GraphDrawSort();
    var X1, Y1, Z1, X2, Y2, Z2, DX, DY, DZ, X1_, Y1_, X2_, Y2_, Z1_, Z2_;
    var SegmentLinkX, SegmentLinkY, SegmentLinkL;
    var SelectedD = null;
    var Raw = [];
    var RawI;
    for(var I = 0; I < GraphDCount; I++)
    {
        if (GraphD_[I].Type < 0)
        {
            if (GraphD_[I].Type == (-1))
            {
                RawI = [0, GraphD_[I].X1 * ZoomX + OffsetX, GraphD_[I].Y1 * ZoomY + OffsetY, CalcColor(GraphD_[I].Z1 * ZoomZ), GraphD_[I].Text, LabelColor1];
                if (MouseVSelected == GraphD_[I].Obj)
                {
                    SelectedD = GraphD_[I];
                    RawI[3] = CalcColorS;
                    RawI[5] = LabelColor2
                }
                Raw.push(RawI);
            }
            else
            {
                var DeltaN = GraphD_[I].EdgeN;
                for (var II = 0; II < DeltaN; II++)
                {
                    var SizeL_ = SizeL + ((II * SizeM) / 2);
                    var SizeLX = Math.sin(GraphD_[I].Z2 * Math.PI / 180) * (SizeL_);
                    var SizeLY = Math.cos(GraphD_[I].Z2 * Math.PI / 180) * (SizeL_);
                    Raw.push([4, GraphD_[I].X1 * ZoomX + OffsetX - SizeLX, GraphD_[I].Y1 * ZoomY + OffsetY - SizeLY, SizeL_, SizeE[GraphD_[I].Edge[II]], CalcColor(GraphD_[I].Z1 * ZoomZ)]);

                    if (GraphD_[I].Text[II] != "")
                    {
                        Raw.push([3, GraphD_[I].X1 * ZoomX + OffsetX - SizeLX - SizeLX, GraphD_[I].Y1 * ZoomY + OffsetY - SizeLY - SizeLY, GraphD_[I].Text[II], LabelColor1]);
                    }
                }
            }
        }
        else
        {
            X1 = GraphD_[I].X1 * ZoomX + OffsetX;
            Y1 = GraphD_[I].Y1 * ZoomY + OffsetY;
            Z1 = GraphD_[I].Z1 * ZoomZ;
            X2 = GraphD_[I].X2 * ZoomX + OffsetX;
            Y2 = GraphD_[I].Y2 * ZoomY + OffsetY;
            Z2 = GraphD_[I].Z2 * ZoomZ;

            if (SegmentLink > 0)
            {
                DX = Math.abs(X2 - X1);
                DY = Math.abs(Y2 - Y1);
                if ((DX != 0) && (DY != 0))
                {
                    SegmentLinkL = Math.sqrt((DX * DX) + (DY * DY));
                    SegmentLinkX = SegmentLink * DX / SegmentLinkL;
                    SegmentLinkY = SegmentLink * DY / SegmentLinkL;
                    if (X1 < X2) { X1 -= SegmentLinkX; X2 += SegmentLinkX; }
                    if (X1 > X2) { X1 += SegmentLinkX; X2 -= SegmentLinkX; }
                    if (Y1 < Y2) { Y1 -= SegmentLinkY; Y2 += SegmentLinkY; }
                    if (Y1 > Y2) { Y1 += SegmentLinkY; Y2 -= SegmentLinkY; }
                }
                else
                {
                    if (DX == 0)
                    {
                        SegmentLinkY = SegmentLink;
                        if (Y1 < Y2) { Y1 -= SegmentLink; Y2 += SegmentLink; }
                        if (Y1 > Y2) { Y1 += SegmentLink; Y2 -= SegmentLink; }
                    }
                    if (DY == 0)
                    {
                        SegmentLinkX = SegmentLink;
                        if (X1 < X2) { X1 -= SegmentLink; X2 += SegmentLink; }
                        if (X1 > X2) { X1 += SegmentLink; X2 -= SegmentLink; }
                    }
                }
            }


            X1_ = X1;
            Y1_ = Y1;
            Z1_ = Z1;
            X2_ = X2;
            Y2_ = Y2;
            Z2_ = Z2;
            if (Z2_ < Z1_)
            {
                DX = X1_; X1_ = X2; X2_ = DX;
                DY = Y1_; Y1_ = Y2; Y2_ = DY;
                DZ = Z1_; Z1_ = Z2; Z2_ = DZ;
            }

            DZ = Z2_ - Z1_;
            var RawColor = [];
            
            RawColor.push([0, CalcColor(Z1_)]);
            if (DZ > 0)
            {
                if ((Z1_ < -255) && (Z2_ > -255))
                {
                    RawColor.push([(0 - Z1_ - 255) / DZ, CalcColorN]);
                }

                if ((Z1_ < 0) && (Z2_ > 0))
                {
                    RawColor.push([(0 - Z1_) / DZ, CalcColorZ]);
                }

                if ((Z1_ < 255) && (Z2_ > 255))
                {
                    RawColor.push([(DZ - Z2_ + 255) / DZ, CalcColorP]);
                }
            }
            RawColor.push([1, CalcColor(Z2_)]);
            Raw.push([2, X1_, Y1_, X2_, Y2_, RawColor]);

            var DeltaA = Math.atan2(X2 - X1, Y2 - Y1);
            var DeltaX = 0 - Math.cos(DeltaA) * SizeM;
            var DeltaY = Math.sin(DeltaA) * SizeM;
            var DeltaN = GraphD_[I].EdgeN;
            var DeltaO = (DeltaN - 1) / 2;
            for (var II = 0; II < DeltaN; II++)
            {
                Raw.push([1, X1 + DeltaX * (II - DeltaO), Y1 + DeltaY * (II - DeltaO), X2 + DeltaX * (II - DeltaO), Y2 + DeltaY * (II - DeltaO), SizeE[GraphD_[I].Edge[II]]]);
            }

            if (GraphD_[I].Type == LabelESegment)
            {
                for (var II = 0; II < DeltaN; II++)
                {
                    if (GraphD_[I].Text[II] != "")
                    {
                        if (LabelEOdd)
                        {
                            Raw.push([3, (GraphD_[I].X1 + GraphD_[I].X2) / 2 * ZoomX + OffsetX + DeltaX * (II - DeltaO), (GraphD_[I].Y1 + GraphD_[I].Y2) / 2 * ZoomY + OffsetY + DeltaY * (II - DeltaO), GraphD_[I].Text[II], LabelColor1]);
                        }
                        else
                        {
                            Raw.push([3, GraphD_[I].X1 * ZoomX + OffsetX + DeltaX * (II - DeltaO), GraphD_[I].Y1 * ZoomY + OffsetY + DeltaY * (II - DeltaO), GraphD_[I].Text[II], LabelColor1]);
                        }
                    }
                }
            }
        }
    }


    if (SelectedD)
    {
        var Draw_ = 0;
        if ((MoveMode == 1) || (MoveMode == 3))
        {
            if (SelectedD.X1 < 0)
            {
                Draw_ = CanvasW - 0 - CanvasD;
            }
            Raw.push([5, 0, Draw_, CanvasD, CanvasH]);
            Raw.push([0, Draw_ + (CanvasD / 2), SelectedD.Z1 * ZoomY + OffsetY, CalcColor(SelectedD.Z1 * ZoomZ), "", ""]);
        }
        if ((MoveMode == 2) || (MoveMode == 4))
        {
            if (SelectedD.Y1 < 0)
            {
                Draw_ = CanvasH - 0 - CanvasD;
            }
            Raw.push([5, 1, Draw_, CanvasD, CanvasW]);
            Raw.push([0, SelectedD.Z1 * ZoomY + OffsetY, Draw_ + (CanvasD / 2), CalcColor(SelectedD.Z1 * ZoomZ), "", ""]);
        }
    }


    Send("paint", Raw);
}

var CalcColorN;
var CalcColorZ;
var CalcColorP;
var CalcColorS;


function CalcColor(Z)
{
    if (Z > 255) { Z = 255; }
    if (Z < -255) { Z = -255; }
    var T1 = Math.round((255 - Math.abs(Z)) / 2);
    var T2 = Math.round((Math.abs(Z) / 2) + 127.5);
    if (Z >= 0)
    {
        return("rgb(" + T1 + "," + T2 + "," + T1 + ")");
    }
    else
    {
        return("rgb(" + T2 + "," + T1 + "," + T1 + ")");
    }
}

function Init()
{
    CalcColorN = CalcColor(-255);
    CalcColorZ = CalcColor(0);
    CalcColorP = CalcColor(255);
    CalcColorS = "rgb(255,255,0)";
}






/////////////////////////////////////// algorithm.js

function AlgorithmClearLabelsV()
{
    for (var I = 0; I < GraphVCount; I++)
    {
        GraphV_[I].Label = "";
    }
}

function AlgorithmClearLabelsE()
{
    for (var I = 0; I < GraphECount; I++)
    {
        for (var II = 0; II < GraphE_[I].Num; II++)
        {
            GraphE_[I].Label[II] = "";
        }
    }
}

function AlgorithmStart(AlgorithmOpt)
{
    AlgorithmMsgEnd();
    switch (AlgorithmOpt[0])
    {
        case 0:
        return;
        case 1: // Clear labels
        {
            if (AlgorithmOpt[1])
            {
                AlgorithmClearLabelsV();
            }
            if (AlgorithmOpt[2])
            {
                AlgorithmClearLabelsE();
            }
            SetTextOpt();
            AlgorithmMsgEnd();
        }
        return;
        case 2: // Number as labels
        {
            if (AlgorithmOpt[1])
            {
                for (var I = 0; I < GraphVCount; I++)
                {
                    GraphV_[I].Label = I + "";
                }
            }
            if (AlgorithmOpt[2])
            {
                for (var I = 0; I < GraphECount; I++)
                {
                    if (GraphE_[I].Num == 1)
                    {
                        GraphE_[I].Label[0] = I + "";
                    }
                    else
                    {
                        for (var II = 0; II < GraphE_[I].Num; II++)
                        {
                            GraphE_[I].Label[II] = I + "-" + II;
                        }
                    }
                }
            }
            SetTextOpt();
            AlgorithmMsgEnd();
        }
        return;
        case 3: // Labels from V to E
        {
            for (var I = 0; I < GraphECount; I++)
            {
                var E = GraphE_[I];
                for (II = 0; II < E.Num; II++)
                {
                    if (E.Num > 1)
                    {
                        if (E.V1.Label == E.V2.Label)
                        {
                            E.Label[II] = E.V1.Label + "-" + II;
                        }
                        else
                        {
                            if (E.Dir[II] < 0)
                            {
                                E.Label[II] = E.V2.Label + "-" + E.V1.Label + "-" + II;
                            }
                            else
                            {
                                E.Label[II] = E.V1.Label + "-" + E.V2.Label + "-" + II;
                            }
                        }
                    }
                    else
                    {
                        if (E.V1.Label == E.V2.Label)
                        {
                            E.Label[II] = E.V1.Label;
                        }
                        else
                        {
                            if (E.Dir[II] < 0)
                            {
                                E.Label[II] = E.V2.Label + "-" + E.V1.Label;
                            }
                            else
                            {
                                E.Label[II] = E.V1.Label + "-" + E.V2.Label;
                            }
                        }
                    }
                }
            }
            SetTextOpt();
            AlgorithmMsgEnd();
        }
        return;
        case 4: // Labels from E to V
        {
            var LabelSep = ",";
            var LabelSepL = LabelSep.length;
            for (var I = 0; I < GraphVCount; I++)
            {
                var V = GraphV_[I];
                V.Label = LabelSep;
            }
            for (var I = 0; I < GraphECount; I++)
            {
                var E = GraphE_[I];
                for (var II = 0; II < E.Num; II++)
                {
                    if (E.Label[II] != "")
                    {
                        if (E.V1.Label.indexOf(LabelSep + E.Label[II] + LabelSep) < 0)
                        {
                            E.V1.Label = E.V1.Label + E.Label[II] + LabelSep;
                        }
                        if (E.V2.Label.indexOf(LabelSep + E.Label[II] + LabelSep) < 0)
                        {
                            E.V2.Label = E.V2.Label + E.Label[II] + LabelSep;
                        }
                    }
                }
            }
            for (var I = 0; I < GraphVCount; I++)
            {
                var V = GraphV_[I];
                if (V.Label.length > LabelSepL)
                {
                    V.Label = V.Label.substr(LabelSepL, V.Label.length - LabelSepL - LabelSepL);
                }
                else
                {
                    V.Label = "";
                }
            }
            SetTextOpt();
            AlgorithmMsgEnd();
        }
        return;
        case 5: // Complement graph
        {
            SelectClear();
            var Loops = AlgorithmOpt[1];
            for (var I = 0; I < GraphVCount; I++)
            {
                var TempV1 = GraphV_[I];
                for (var II = I; II < GraphVCount; II++)
                {
                    var TempV2 = GraphV_[II];
                    if ((Loops) || (II != I))
                    {
                        var EdgeNotExists = true;
                        for (var III = 0; III < GraphECount; III++)
                        {
                            var TempE = GraphE_[III];
                            if (((TempE.V1 == TempV1) && (TempE.V2 == TempV2)) || ((TempE.V1 == TempV2) && (TempE.V2 == TempV1)))
                            {
                                EdgeNotExists = false;
                                for (var IIII = (TempE.Num - 1); IIII >= 0; IIII--)
                                {
                                    if (TempE.Dir[IIII] != 0)
                                    {
                                        TempDir = TempE.Dir[IIII];
                                        TempWN = TempE.WeightN[IIII];
                                        TempWD = TempE.WeightD[IIII];
                                        TempFN = TempE.ForceN;
                                        TempFD = TempE.ForceD;
                                        GraphEdgeRem(I, II, IIII);
                                        if ((TempE.V1 == TempV1) && (TempE.V2 == TempV2))
                                        {
                                            GraphEdgeAdd(I, II, 0 - TempDir, TempWN, TempWD, TempFN, TempFD);
                                        }
                                        else
                                        {
                                            GraphEdgeAdd(I, II, 0 + TempDir, TempWN, TempWD, TempFN, TempFD);
                                        }
                                    }
                                    else
                                    {
                                        GraphEdgeRem(I, II, IIII);
                                    }
                                }
                                break;
                            }
                        }
                        if (EdgeNotExists)
                        {
                            GraphEdgeAdd(I, II, 0, CurrentEWeightN, CurrentEWeightD, CurrentEForceN, CurrentEForceD);
                        }
                    }
                }
            }
            SetTextOpt();
            AlgorithmMsgEnd();
        }
        return;
        case 6: // Line graph
        {
            SelectClear();
            AlgorithmLineGraph();
            SetTextOpt();
            AlgorithmMsgEnd();
        }
        return;
        case 7: // Depth-first search
        {
            if (MouseVSelectedI === null)
            {
                SetTextOpt();
                AlgorithmMsgBox("No vertex selected");
                AlgorithmMsgEnd();
                return;
            }
            else
            {
                Send("algorithm", [5, 700]);
                return;
            }
        }
        return;
        case 700: // Depth-first search
        {
            if (MouseVSelectedI === null)
            {
                return;
            }

            // Clear labels
            AlgorithmClearLabelsV();
            AlgorithmClearLabelsE();

            var NormalOrder = AlgorithmOpt[1];
            var DirForward = AlgorithmOpt[2];
            var NodeN = 1;
            var EdgeN = 1;
            var NodeStack = [];
            NodeStack.push([MouseVSelected, null]);
            var TempV;
            var TempE;
            var IterStart;
            var IterStop;
            var IterInc;
            while (NodeStack.length > 0)
            {
                TempV = NodeStack.pop();
                TempE = TempV[1];
                TempV = TempV[0];
                if (TempV.Label == "")
                {
                    if (TempE)
                    {
                        for (var II = 0; II < TempE.Num; II++)
                        {
                            if (TempE.Label[II] == "")
                            {
                                TempE.Label[II] = "" + EdgeN;
                            }
                        }
                        EdgeN++;
                    }
                
                    TempV.Label = "" + NodeN;
                    NodeN++;
                    var Nei = DirForward ? TempV.NeiF : TempV.NeiB;
                    if (NormalOrder)
                    {
                        IterStart = 0;
                        IterStop = Nei.length;
                        IterInc = 1;
                    }
                    else
                    {
                        IterStart = (Nei.length - 1);
                        IterStop = -1;
                        IterInc = -1;
                    }
                    for (var I = IterStart; I != IterStop; I += IterInc)
                    {
                        TempV = Nei[I][1];
                        TempE = Nei[I][0];
                        NodeStack.push([TempV, TempE]);
                    }
                }
            }
            SetTextOpt();
            AlgorithmMsgEnd();
        }
        return;
        case 8: // Breadth-first search
        {
            if (MouseVSelectedI === null)
            {
                SetTextOpt();
                AlgorithmMsgBox("No vertex selected");
                AlgorithmMsgEnd();
                return;
            }
            else
            {
                Send("algorithm", [5, 800]);
                return;
            }
        }
        return;
        case 800: // Breadth-first search
        {
            if (MouseVSelectedI === null)
            {
                return;
            }

            // Clear labels
            AlgorithmClearLabelsV();
            AlgorithmClearLabelsE();

            var NormalOrder = AlgorithmOpt[1];
            var DirForward = AlgorithmOpt[2];
            var NodeN = 1;
            var EdgeN = 1;
            var NodeQueue = [];
            MouseVSelected.Label = "" + NodeN;
            NodeN++;
            NodeQueue.push(MouseVSelected);
            var TempV;
            var TempE;
            while (NodeQueue.length > 0)
            {
                TempV = NodeQueue[0];
                NodeQueue.splice(0, 1);
                var Nei = DirForward ? TempV.NeiF : TempV.NeiB;
                if (NormalOrder)
                {
                    IterStart = 0;
                    IterStop = Nei.length;
                    IterInc = 1;
                }
                else
                {
                    IterStart = (Nei.length - 1);
                    IterStop = -1;
                    IterInc = -1;
                }
                for (var I = IterStart; I != IterStop; I += IterInc)
                {
                    TempV = Nei[I][1];
                    TempE = Nei[I][0];
                    if (TempV.Label == "")
                    {
                        for (var II = 0; II < TempE.Num; II++)
                        {
                            if (TempE.Label[II] == "")
                            {
                                TempE.Label[II] = "" + EdgeN;
                            }
                        }
                        EdgeN++;
                        TempV.Label = "" + NodeN;
                        NodeN++;
                        NodeQueue.push(TempV);
                    }
                }
            }

            SetTextOpt();
            AlgorithmMsgEnd();
        }
        return;


        case 9:
        {
            AlgorithmGraphColor(false, 0);
            SetTextOpt();
            AlgorithmMsgEnd();
        }
        return;
        case 10:
        {
            AlgorithmGraphColor(false, 1);
            SetTextOpt();
            AlgorithmMsgEnd();
        }
        return;
        case 11:
        {
            AlgorithmGraphColor(false, 2);
            SetTextOpt();
            AlgorithmMsgEnd();
        }
        return;
        case 12:
        {
            AlgorithmGraphColor(false, 3);
            SetTextOpt();
            AlgorithmMsgEnd();
        }
        return;
        case 13:
        {
            AlgorithmGraphColor(true, 0);
            SetTextOpt();
            AlgorithmMsgEnd();
        }
        return;
        case 14:
        {
            AlgorithmGraphColor(true, 1);
            SetTextOpt();
            AlgorithmMsgEnd();
        }
        return;
        case 15:
        {
            AlgorithmGraphColor(true, 2);
            SetTextOpt();
            AlgorithmMsgEnd();
        }
        return;
        case 16:
        {
            AlgorithmGraphColor(true, 3);
            SetTextOpt();
            AlgorithmMsgEnd();
        }
        return;
        case 17:
        {
            if (GraphVCount >= 2)
            {
                Send("algorithm", [3, 170, "Minimum vertices from 2 to " + GraphVCount, 2, "Maximum vertices from 2 to " + GraphVCount, GraphVCount]);
            }
            else
            {
                Send("algorithm", [2, "The graph must contain at least 2 vertices"]);
            }
        }
        return;
        case 170:
        {
            AlgorithmPathV(AlgorithmOpt[1], AlgorithmOpt[2], AlgorithmOpt[3], AlgorithmOpt[4], AlgorithmOpt[5]);
            AlgorithmMsgEnd();
        }
        return;
        case 18:
        {
            var GraphECount__ = 0;
            for (var I = 0; I < GraphECount; I++)
            {
                if (GraphE_[I].V1 != GraphE_[I].V2)
                {
                    GraphECount__ = GraphECount__ + GraphE_[I].Num;
                }
            }
            if (GraphECount__ >= 1)
            {
                Send("algorithm", [3, 180, "Minimum edges from 1 to " + GraphECount__, 1, "Maximum edges from 1 to " + GraphECount__, GraphECount]);
            }
            else
            {
                Send("algorithm", [2, "The graph must contain at least 1 edge"]);
            }
        }
        return;
        case 180:
        {
            AlgorithmPathE(AlgorithmOpt[1], AlgorithmOpt[2], AlgorithmOpt[3], AlgorithmOpt[4], AlgorithmOpt[5]);
            AlgorithmMsgEnd();
        }
        return;
        case 19:
        {
            var Num = AlgorithmSeparate();
            AlgorithmMsgClr("Number of connected graphs: " + Num);
            AlgorithmMsgEnd();
        }
        return;

        case 20: // Minimum spanning tree
        {
            var NormalOrder = AlgorithmOpt[1];
            var SelectedV = false;
            if (MouseVSelectedI !== null)
            {
                SelectedV = true;
            }
                        
            NameMapSet();
            for (var I = 0; I < GraphVCount; I++)
            {
                GraphV_[I].Label = "" + I;
            }
            
            var GraphEList = [];
            var GraphEListL;
            var WeightMax = 0;
            for (var I = 0; I < GraphECount; I++)
            {
                if (GraphE_[I].V1 != GraphE_[I].V2)
                {
                    GraphE_[I].Label[0] = "";
                    var WeightVal = GraphCalcWeight(GraphE_[I]);
                    WeightVal = WeightVal[0] / WeightVal[1];
                    if (WeightMax < WeightVal)
                    {
                        WeightMax = WeightVal;
                    }
                    if (NormalOrder)
                    {
                        GraphEList.push([GraphE_[I], WeightVal]);
                    }
                    else
                    {
                        GraphEList.splice(0, 0, [GraphE_[I], WeightVal]);
                    }
                }
                else
                {
                    // Remove loop edges
                    GraphEdgeRemObj0(GraphE_[I], -1);
                    I--;
                }
            }
            
            GraphEListL = GraphEList.length;
            WeightMax = WeightMax + 1;
            
            var Work = true;
            while (Work)
            {
                var FoundI = -1;
                var FoundW = WeightMax;
                var FoundO = null;
                if (SelectedV)
                {
                    // Search for minimum-weight edge between vertex with selcected label and vertex with different label
                    for (var I = 0; I < GraphEListL; I++)
                    {
                        var E = GraphEList[I][0];
                        if (((E.V1.Label == MouseVSelected.Label) && (E.V2.Label != MouseVSelected.Label)) || ((E.V1.Label != MouseVSelected.Label) && (E.V2.Label == MouseVSelected.Label)))
                        {
                            if (FoundW > GraphEList[I][1])
                            {
                                FoundO = GraphEList[I][0];
                                FoundW = GraphEList[I][1];
                                FoundI = I;
                            }
                        }
                        else
                        {
                            // The edges, which connects vertices with the same label are not necessary
                            if ((E.V1.Label == MouseVSelected.Label) && (E.V2.Label == MouseVSelected.Label) && (E.Label[0] != "X"))
                            {
                                GraphEList.splice(I, 1);
                                I--;
                                GraphEListL--;
                                GraphEdgeRemObj0(E, -1);
                            }
                        }
                    }
                }
                else
                {
                    // Search for minimum-weight edge connecting vertices with different labels
                    for (var I = 0; I < GraphEListL; I++)
                    {
                        var E = GraphEList[I][0];
                        if (E.V1.Label != E.V2.Label)
                        {
                            if (FoundW > GraphEList[I][1])
                            {
                                FoundO = GraphEList[I][0];
                                FoundW = GraphEList[I][1];
                                FoundI = I;
                            }
                        }
                        else
                        {
                            // The edges, which connects vertices with the same label are not necessary
                            if (E.Label[0] != "X")
                            {
                                GraphEList.splice(I, 1);
                                I--;
                                GraphEListL--;
                                GraphEdgeRemObj0(E, -1);
                            }
                        }
                    }
                }
                if (FoundI >= 0)
                {
                    FoundO.Label[0] = "X";
                    var Label1 = FoundO.V1.Label;
                    var Label2 = FoundO.V2.Label;

                    // Unify the vertice labels
                    for (var I = 0; I < GraphVCount; I++)
                    {
                        if (GraphV_[I].Label == Label1)
                        {
                            GraphV_[I].Label = Label2;
                        }
                    }
                    
                    // Remove found edge from list
                    GraphEList.splice(FoundI, 1);
                    GraphEListL--;
                }
                else
                {
                    Work = false;
                }
            }

            NameMapGet();
            SetTextOpt();
            
            var TotalWeight = [0, 1];
            for (var I = 0; I < GraphECount; I++)
            {
                var WeightVal = GraphCalcWeight(GraphE_[I]);
                TotalWeight = FractionAdd(TotalWeight[0], TotalWeight[1], WeightVal[0], WeightVal[1]);
            }
            
            AlgorithmMsgClr("Spanning tree weight: " + FractionTxt(TotalWeight[0], TotalWeight[1]));
            AlgorithmMsgEnd();
        }
        return;
    }
}



var AlgorithmLineGraphUndoStruct;
var AlgorithmLineGraphUndoLabels;


// Greate line graph from graph
function AlgorithmLineGraph()
{
    AlgorithmLineGraphUndoStruct = StructExport();
    AlgorithmLineGraphUndoLabels = [];
    var Vertice0 = GraphVCount;
    var Edge0 = GraphECount;
    var I_ = 0;
    for (var I = 0; I < Edge0; I++)
    {
        var E = GraphE_[I_];
        var X = Round((E.V1.X + E.V2.X) / 2);
        var Y = Round((E.V1.Y + E.V2.Y) / 2);
        var Z = Round((E.V1.Z + E.V2.Z) / 2);

        var DeltaA = Math.atan2(E.V2.X - E.V1.X, E.V2.Y - E.V1.Y);
        var DeltaX = 0 - Math.cos(DeltaA) * SizeM / ZoomX;
        var DeltaY = Math.sin(DeltaA) * SizeM / ZoomY;
        var DeltaN = E.Num;
        var DeltaO = (DeltaN - 1) / 2;
        
        if (E.V1 == E.V2)
        {
            DeltaA = E.V1.Rot * Math.PI / 180;
            DeltaX = 0 - Math.sin(DeltaA) * SizeM / ZoomX;
            DeltaY = 0 - Math.cos(DeltaA) * SizeM / ZoomY;
            DeltaO = 0 - (SizeL * 2) / SizeM;
        }

        var VertObjList = [];
        for (II = 0; II < E.Num; II++)
        {
            GraphVerticeAdd(X + DeltaX * (II - DeltaO), Y + DeltaY * (II - DeltaO), Z, CurrentVForceN, CurrentVForceD);
            var NewObj = GraphV_[GraphVCount - 1];
            NewObj.Label = E.Label[II];
            VertObjList.push(NewObj);
            
            if (E.V1 == E.V2)
            {
                GraphEdgeAddObj(NewObj, NewObj, 0, E.WeightN[II], E.WeightD[II], E.ForceN, E.ForceD);
            }
            GraphEdgeAddObj(E.V1, NewObj, E.Dir[II], E.WeightN[II], E.WeightD[II], E.ForceN, E.ForceD);
            GraphEdgeAddObj(NewObj, E.V2, E.Dir[II], E.WeightN[II], E.WeightD[II], E.ForceN, E.ForceD);
        }
        AlgorithmLineGraphUndoLabels.push(VertObjList);

        if (GraphEdgeRemObj(E.V1, E.V2, -1))
        {
            I_--;
        }

        I_++;
    }

    Edge0 = GraphECount;
    
    var TempV;
    for (var I = 0; I < Vertice0; I++)
    {
        TempV = [];
        for (var II = 0; II < GraphECount; II++)
        {
            if (GraphE_[II].V1 == GraphV_[I])
            {
                TempV.push([GraphE_[II].V2, GraphE_[II].Dir[0]]);
            }
            else
            {
                if ((GraphE_[II].V1 != GraphE_[II].V2) && (GraphE_[II].V2 == GraphV_[I]))
                {
                    TempV.push([GraphE_[II].V1, 0 - GraphE_[II].Dir[0]]);
                }
            }
        }
        for (var II = 0; II < TempV.length; II++)
        {
            for (var III = II + 1; III < TempV.length; III++)
            {
                // -->|---  -->
                if ((TempV[III][1] == -1) && TempV[II][1] ==  0)
                {
                    GraphEdgeAddObj(TempV[III][0], TempV[II][0],  1, CurrentEWeightN, CurrentEWeightD, CurrentEForceN, CurrentEForceD);
                }

                // ---|-->  -->
                if ((TempV[III][1] ==  0) && TempV[II][1] ==  1)
                {
                    GraphEdgeAddObj(TempV[III][0], TempV[II][0],  1, CurrentEWeightN, CurrentEWeightD, CurrentEForceN, CurrentEForceD);
                }

                // -->|-->  -->
                if ((TempV[III][1] == -1) && TempV[II][1] ==  1)
                {
                    GraphEdgeAddObj(TempV[III][0], TempV[II][0],  1, CurrentEWeightN, CurrentEWeightD, CurrentEForceN, CurrentEForceD);
                }

                // <--|---  <--
                if ((TempV[III][1] ==  1) && TempV[II][1] ==  0)
                {
                    GraphEdgeAddObj(TempV[III][0], TempV[II][0], -1, CurrentEWeightN, CurrentEWeightD, CurrentEForceN, CurrentEForceD);
                }

                // ---|<--  <--
                if ((TempV[III][1] ==  0) && TempV[II][1] == -1)
                {
                    GraphEdgeAddObj(TempV[III][0], TempV[II][0], -1, CurrentEWeightN, CurrentEWeightD, CurrentEForceN, CurrentEForceD);
                }

                // <--|<--  <--
                if ((TempV[III][1] ==  1) && TempV[II][1] == -1)
                {
                    GraphEdgeAddObj(TempV[III][0], TempV[II][0], -1, CurrentEWeightN, CurrentEWeightD, CurrentEForceN, CurrentEForceD);
                }

                // ---|---  ---
                if ((TempV[III][1] ==  0) && TempV[II][1] ==  0)
                {
                    GraphEdgeAddObj(TempV[III][0], TempV[II][0],  0, CurrentEWeightN, CurrentEWeightD, CurrentEForceN, CurrentEForceD);
                }
            }
        }
    }
    for (var I = 0; I < Vertice0; I++)
    {
        GraphVerticeRem(0, CurrentEWeightN, CurrentEWeightD, CurrentEForceN, CurrentEForceD);
    }


    for (var I = 0; I < AlgorithmLineGraphUndoLabels.length; I++)
    {
        for (var II = 0; II < AlgorithmLineGraphUndoLabels[I].length; II++)
        {
            for (var III = 0; III < GraphVCount; III++)
            {
                if (AlgorithmLineGraphUndoLabels[I][II] == GraphV_[III])
                {
                    AlgorithmLineGraphUndoLabels[I][II] = III;
                }
            }
        }
    }
}

// Undo line graph based on edge-vertice array
function AlgorithmLineGraphUndo()
{
    for (var I = 0; I < AlgorithmLineGraphUndoLabels.length; I++)
    {
        for (var II = 0; II < AlgorithmLineGraphUndoLabels[I].length; II++)
        {
            AlgorithmLineGraphUndoLabels[I][II] = GraphV_[AlgorithmLineGraphUndoLabels[I][II]];
        }
    }
    StructImport(AlgorithmLineGraphUndoStruct);
    for (var I = 0; I < AlgorithmLineGraphUndoLabels.length; I++)
    {
        for (var II = 0; II < AlgorithmLineGraphUndoLabels[I].length; II++)
        {
            GraphE_[I].Label[II] = AlgorithmLineGraphUndoLabels[I][II].Label;
        }
    }
}



// Color one vertice using the minimum possible color number
function AlgorithmGraphColorSetV(V)
{
    var ColorVal = 1;
    var Nei = V.NeiA;
    var ColorAllowed = false;
    while (!ColorAllowed)
    {
        ColorAllowed = true;
        for (var I = 0; I < Nei.length; I++)
        {
            if (Nei[I][1].Label == ColorVal)
            {
                ColorAllowed = false;
                break;
            }
        }
        ColorVal++;
    }
    ColorVal--;
    V.Label = ColorVal;
}


// Coloring vertices or edges
function AlgorithmGraphColor(ColorEdges, AlgNo)
{
    if (ColorEdges)
    {
        AlgorithmClearLabelsE();
        AlgorithmLineGraph();
    }
    else
    {
        AlgorithmClearLabelsV();
    }

    AlgorithmMsgClr("Please wait");

    switch (AlgNo)
    {
        case 0: // Largest first
        {
            var V_I = [];
            var V_O = [];
            for (var I = 0; I < GraphVCount; I++)
            {
                V_I.push(GraphV_[I]);
            }
            var V_IL = V_I.length;
            
            while (V_IL > 0)
            {
                var Nei = V_I[0].NeiO;
                var MaxDegreeV = Nei.length;
                var MaxDegreeI = 0;
                for (var I = 1; I < V_IL; I++)
                {
                    Nei = V_I[I].NeiO;
                    if (MaxDegreeV < Nei.length)
                    {
                        MaxDegreeV = Nei.length;
                        MaxDegreeI = I;
                    }
                }
                
                V_O.push(V_I[MaxDegreeI]);
                V_I.splice(MaxDegreeI, 1);
                V_IL--;
            }

            for (var I = 0; I < V_O.length; I++)
            {
                AlgorithmGraphColorSetV(V_O[I]);
            }
        }
        break;
        case 1: // Smallest last
        {
            var V_I = [];
            for (var I = 0; I < GraphVCount; I++)
            {
                V_I.push([GraphV_[I], -1, I]);
            }

            var StructTemp = StructExport();
            var Ord = 0;
            var OrdI = 0;
            while (GraphVCount > 0)
            {
                var Nei = GraphV_[0].NeiO;
                var MinDegreeV = Nei.length;
                var MinDegreeI = 0;
                for (var I = 0; I < GraphVCount; I++)
                {
                    Nei = GraphV_[I].NeiO;
                    if (MinDegreeV > Nei.length)
                    {
                        MinDegreeV = Nei.length;
                        MinDegreeI = I;
                    }
                }
                OrdI = MinDegreeI;
                while (V_I[OrdI][0] != GraphV_[MinDegreeI])
                {
                    OrdI++;
                }
                V_I[OrdI][1] = Ord;
                Ord++;
                GraphVerticeRem(MinDegreeI);
            }
            StructImport(StructTemp);
            
            var V_IL = V_I.length;
            while (V_IL > 0)
            {
                var Val = V_IL - 1;
                for (var I = 0; I < V_IL; I++)
                {
                    if (V_I[I][1] == Val)
                    {
                        AlgorithmGraphColorSetV(GraphV_[V_I[I][2]]);
                        V_I.splice(I, 1);
                        V_IL--;
                        break;
                    }
                }
            }
        }
        break;
        case 2: // Saturated largest first
        {
            var V_I = [];
            for (var I = 0; I < GraphVCount; I++)
            {
                V_I.push([GraphV_[I], 0, 0]);
            }
            
            var V_IL = V_I.length;
            while (V_IL > 0)
            {
                var SaturateMax = 0;

                // Calc degree and saturation for each vertice
                for (var I = 0; I < V_IL; I++)
                {
                    Nei = V_I[I][0].NeiO;
                    V_I[I][1] = Nei.length;
                    var TempColors = [];
                    for (var II = 0; II < Nei.length; II++)
                    {
                        if (Nei[II][1].Label != "")
                        {
                            if (!TempColors.includes(Nei[II][1].Label))
                            {
                                TempColors.push(Nei[II][1].Label);
                            }
                        }
                    }
                    V_I[I][2] = TempColors.length;
                    if (SaturateMax < TempColors.length)
                    {
                        SaturateMax = TempColors.length;
                    }
                }
                
                // Search the largest degree vertice of largest saturation
                var DegreeMaxV = -1;
                var DegreeMaxI = -1;
                for (var I = 0; I < V_IL; I++)
                {
                    if (V_I[I][2] == SaturateMax)
                    {
                        if (DegreeMaxV < V_I[I][1])
                        {
                            DegreeMaxV = V_I[I][1];
                            DegreeMaxI = I;
                        }
                    }
                }
                
                // Colorize the found vertice
                if (DegreeMaxI >= 0)
                {
                    AlgorithmGraphColorSetV(V_I[DegreeMaxI][0]);
                    V_I.splice(DegreeMaxI, 1);
                    V_IL--;
                }
            }
        }
        break;
        case 3: // Accurate
        {
            var V_Num = [];
            for (var I = 0; I < GraphVCount; I++)
            {
                V_Num.push(1);
            }
            V_Num.push(0);

            var ToCheckL;
            var ToCheckH;
            var ColorGood = false;
            var NumMax = 2;
            var DisplayCounter = 0;
            var TimeT = 0;
            var GraphVCount1 = GraphVCount - 1;
            while (!ColorGood)
            {
                AlgorithmMsgClr("Testing for " + NumMax + " colors");
                DisplayCounter = 0;
                DisplayCounterL = 0;
                
                var Proba1 = 0;
                var Proba2 = 0;
                var Proba3 = 0;
                
                var ColorWorking = true;
                while (ColorWorking)
                {
                    // Generate next color sequence
                    ToCheckL = false;
                    ToCheckH = false;
                    V_Num[0]++;
                    var TestStr = "";
                    var NextX = false;
                    for (II = 0; II < GraphVCount; II++)
                    {
                        if (V_Num[II] > NumMax)
                        {
                            V_Num[II] = 1;
                            V_Num[II + 1]++;
                            ToCheckL = true;
                            if (II == (GraphVCount1))
                            {
                                NextX = true;
                                ColorWorking = false;
                            }
                        }
                        else
                        {
                            if (V_Num[II] == NumMax)
                            {
                                ToCheckH = true;
                                Proba2++;
                            }
                            else
                            {
                                if (V_Num[II] == 1)
                                {
                                    ToCheckL = true;
                                    Proba1++;
                                }
                            }
                        }
                    }

                    // Check if coloring is good
                    if (ToCheckH && ToCheckL)
                    {
                        DisplayCounter++;
                        if (DisplayCounter >= DisplayCounterL)
                        {
                            if (TimeT < performance.now())
                            {
                                Progress_ = GraphVCount1;
                                var ProgressI = 0;
                                var ProgressL = 1;
                                while ((Progress_ >= 0) && (ProgressL < (999999999999999 / NumMax)))
                                {
                                    ProgressI = ProgressI * NumMax;
                                    ProgressL = ProgressL * NumMax;
                                    
                                    ProgressI = ProgressI + V_Num[Progress_] - 1;

                                    Progress_--;
                                }
                                TimeT = performance.now() + 1000;
                                if (DisplayCounterL < DisplayCounter)
                                {
                                    DisplayCounterL = DisplayCounter;
                                }
                                AlgorithmMsgClr("Testing for " + NumMax + " colors: " + ProgressI + "/" + ProgressL + " (" + ValTxt((ProgressI) * 100 / ProgressL, 1000) + ")%");
                                DisplayCounter = 0;
                            }
                        }

                        for (II = 0; II < GraphVCount; II++)
                        {
                            GraphV_[II].Label = V_Num[II];
                        }
                        for (II = 0; II < GraphECount; II++)
                        {
                            if (GraphE_[II].V1.Label == GraphE_[II].V2.Label)
                            {
                                ToCheckH = false;
                                break;
                            }
                        }

                        if (ToCheckH)
                        {
                            ColorWorking = false;
                            ColorGood = true;
                        }
                    }
                }
                NumMax++;
            }

            // Convert color labels to strings
            for (II = 0; II < GraphVCount; II++)
            {
                GraphV_[II].Label = "" + GraphV_[II].Label;
            }
            
        }
        break;
    }

    var UsedColors = 0;
    for (var I = 0; I < GraphVCount; I++)
    {
        if (UsedColors < GraphV_[I].Label)
        {
            UsedColors = GraphV_[I].Label;
        }
        GraphV_[I].Label = "" + GraphV_[I].Label;
    }
    AlgorithmMsgClr("Number of used colors: " + UsedColors);
        
    if (ColorEdges)
    {
        AlgorithmLineGraphUndo();
    }
}

function NumberOfV(V)
{
    for (var I = 0; I < GraphVCount; I++)
    {
        if (GraphV_[I] == V)
        {
            return I;
        }
    }
    return -1;
}

function NumberOfE(E)
{
    for (var I = 0; I < GraphECount; I++)
    {
        if (GraphE_[I] == E)
        {
            return I;
        }
    }
    return -1;
}

var NameMapV = [];
var NameMapE = [];

function NameMapSet()
{
    NameMapV = [];
    NameMapE = [];
    
    for (var I = 0; I < GraphVCount; I++)
    {
        if (GraphV_[I].Label != "")
        {
            NameMapV.push([GraphV_[I].Label, true]);
        }
        else
        {
            NameMapV.push(["" + I, false]);
        }
    }

    for (var I = 0; I < GraphECount; I++)
    {
        var Temp = [];
        for (var II = 0; II < GraphE_[I].Num; II++)
        {
            if (GraphE_[I].Label[II] != "")
            {
                Temp.push([GraphE_[I].Label[II], true]);
            }
            else
            {
                if (GraphE_[I].Num == 1)
                {
                    Temp.push(["" + I, false]);
                }
                else
                {
                    Temp.push(["" + I + "-" + II, false]);
                }
            }
        }
        NameMapE.push(Temp);
    }
}

function NameMapGet()
{
    for (var I = 0; I < GraphVCount; I++)
    {
        if (NameMapV[I][1])
        {
            GraphV_[I].Label = NameMapV[I][0];
        }
        else
        {
            GraphV_[I].Label = "";
        }
    }

    for (var I = 0; I < GraphECount; I++)
    {
        for (var II = 0; II < GraphE_[I].Num; II++)
        {
            if (NameMapE[I][II][1])
            {
                GraphE_[I].Label[II] = NameMapE[I][II][0];
            }
            else
            {
                GraphE_[I].Label[II] = "";
            }
        }
    }
}

function NameOfV(V)
{
    return "" + NumberOfV(V);
}

function NameOfE(E, N)
{
    if ((N >= 0) && (E.Num != 1))
    {
        return NumberOfE(E) + "-" + N;
    }
    else
    {
        return "" + NumberOfE(E);
    }
}

function AlgorithmPathMessage(VerticeList, DirForward)
{
    var VerticeListL = VerticeList.length - 1;
    var PathWeightMin = [0, 1];
    var PathWeightMax = [0, 1];
    var Msg = "(" + NameOfV(VerticeList[0]) + ")";
    for (var II = 1; II <= VerticeListL; II++)
    {
        var ListObj = VerticeList[II];
        
        if (II % 2 == 0)
        {
            if (DirForward)
            {
                Msg = Msg + "(" + NameOfV(ListObj) + ")";
            }
            else
            {
                Msg = "(" + NameOfV(ListObj) + ")" + Msg;
            }
        }
        else
        {
            var WeightMin = null;
            var WeightMax = null;
            var EdgeN = ListObj[1];
            if (ListObj[1] >= 0)
            {
                WeightMin = [ListObj[0].WeightN[ListObj[1]], ListObj[0].WeightD[ListObj[1]]];
                WeightMax = [ListObj[0].WeightN[ListObj[1]], ListObj[0].WeightD[ListObj[1]]];
            }
            else
            {
                EdgeN = -1;
                var TempE = ListObj[0];
                for (var III = 0; III < TempE.Num; III++)
                {
                    var GoodDir = false;
                    if (TempE.Dir[III] == 0)
                    {
                        GoodDir = true;
                    }
                    if (DirForward)
                    {
                        if ((TempE.Dir[III] ==  1) && (TempE.V1 == VerticeList[II - 1]) && (TempE.V2 == VerticeList[II + 1]))
                        {
                            GoodDir = true;
                        }
                        if ((TempE.Dir[III] == -1) && (TempE.V1 == VerticeList[II + 1]) && (TempE.V2 == VerticeList[II - 1]))
                        {
                            GoodDir = true;
                        }
                    }
                    else
                    {
                        if ((TempE.Dir[III] == -1) && (TempE.V1 == VerticeList[II - 1]) && (TempE.V2 == VerticeList[II + 1]))
                        {
                            GoodDir = true;
                        }
                        if ((TempE.Dir[III] ==  1) && (TempE.V1 == VerticeList[II + 1]) && (TempE.V2 == VerticeList[II - 1]))
                        {
                            GoodDir = true;
                        }
                    }
                    if (GoodDir)
                    {
                        if (WeightMin)
                        {
                            if (FractionComp(WeightMin[0], WeightMin[1], TempE.WeightN[III], TempE.WeightD[III]) > 0)
                            {
                                WeightMin = [TempE.WeightN[III], TempE.WeightD[III]];
                            }
                            if (FractionComp(WeightMax[0], WeightMax[1], TempE.WeightN[III], TempE.WeightD[III]) < 0)
                            {
                                WeightMax = [TempE.WeightN[III], TempE.WeightD[III]];
                            }
                        }
                        else
                        {
                            WeightMin = [TempE.WeightN[III], TempE.WeightD[III]];
                            WeightMax = [TempE.WeightN[III], TempE.WeightD[III]];
                        }
                    }
                }
            }
            if (DirForward)
            {
                Msg = Msg + ", [" + NameOfE(ListObj[0], EdgeN) + "], ";
            }
            else
            {
                Msg = ", [" + NameOfE(ListObj[0], EdgeN) + "], " + Msg;
            }
            PathWeightMin = FractionAdd(PathWeightMin[0], PathWeightMin[1], WeightMin[0], WeightMin[1]);
            PathWeightMax = FractionAdd(PathWeightMax[0], PathWeightMax[1], WeightMax[0], WeightMax[1]);
        }
    }
    
    // Generate weight value
    PathWeightMin = FractionTxt(PathWeightMin[0], PathWeightMin[1]);
    PathWeightMax = FractionTxt(PathWeightMax[0], PathWeightMax[1]);
    if (PathWeightMin != PathWeightMax)
    {
        PathWeightMin = "(" + PathWeightMin + " - " + PathWeightMax + ")";
    }
    
    // Print the message about cycle or path
    if (VerticeList[0] == VerticeList[VerticeListL])
    {
        Msg = "Cycle L=" + ((VerticeListL / 2)) + ", W=" + PathWeightMin + ": " + Msg;
    }
    else
    {
        Msg = "Path L=" + ((VerticeListL / 2)) + ", W=" + PathWeightMin + ": " + Msg;
    }
    return Msg;
}

function AlgorithmPathV(DispPath, DispCycle, NumMin, NumMax, DirForward)
{
    NumMin = parseInt(NumMin);
    NumMax = parseInt(NumMax);
    NameMapSet();
    if (((NumMin < 2) || (NumMax < 2)) || (NumMax < NumMin))
    {
        AlgorithmMsgBox("The number of vertices are incorrect");
        NameMapGet();
        SetText(true, true);
        return;
    }
    
    if (NumMin == NumMax)
    {
        AlgorithmMsgClr("Searching for paths and cycles consisting of " + NumMin + " vertices");
    }
    else
    {
        AlgorithmMsgClr("Searching for paths and cycles consisting of " + NumMin + "-" + NumMax + " vertices");
    }

    var Iterate1 = 0;
    var Iterate2 = GraphVCount;
    if (MouseVSelectedI !== null)
    {
        Iterate1 = MouseVSelectedI;
        Iterate2 = MouseVSelectedI + 1;
    }

    NumMin = NumMin - 1;
    NumMax = NumMax - 1;
    var CountP_ = 0;
    var CountC_ = 0;
    for (var I = Iterate1; I < Iterate2; I++)
    {
        var CountP = 0;
        var CountC = 0;
        if (DirForward)
        {
            AlgorithmMsgApp("Searching for paths and cycles from vertex " + I + ":");
        }
        else
        {
            AlgorithmMsgApp("Searching for paths and cycles to vertex " + I + ":");
        }
        AlgorithmClearLabelsV();
        var PathStack = [];
        var PathStackL = -1;

        if (DirForward)
        {
            PathStack.push([GraphV_[I], -1, GraphV_[I].NeiF.length]);
        }
        else
        {
            PathStack.push([GraphV_[I], -1, GraphV_[I].NeiB.length]);
        }
        GraphV_[I].Label = "X";
        PathStackL++;
        
        var TempObj;
        var TempObjX;
        if (DirForward)
        {
            while (PathStackL >= 0)
            {
                TempObj = PathStack[PathStackL];
                TempObj[1] = TempObj[1] + 1;
                
                if (TempObj[1] < TempObj[2])
                {
                    TempObjX = TempObj[0].NeiF[TempObj[1]][1];
                    if (TempObjX.Label == "")
                    {
                        PathStack.push([TempObjX, -1, TempObjX.NeiF.length]);
                        TempObjX.Label = "X";
                        PathStackL++;
                        
                        // Test if stack contains vertices from NumMin to NumMax
                        if ((PathStackL >= NumMin) && (PathStackL <= NumMax))
                        {
                            // Test if there exists edge from last vertice to first vertice
                            var VertF = PathStack[0][0];
                            var VertL = PathStack[PathStackL][0];
                            var CycleExists = false;
                            if (PathStackL >= 2)
                            {
                                for (var II = 0; II < VertL.NeiF.length; II++)
                                {
                                    if (VertL.NeiF[II][1] == VertF)
                                    {
                                        CycleExists = true;
                                        break;
                                    }
                                }
                            }
                            
                            // Create path list
                            var VerticeList = [];
                            for (var II = 0; II <= PathStackL; II++)
                            {
                                if (II > 0)
                                {
                                    var TempNei = PathStack[II][0].NeiB;
                                    for (var III = 0; III < TempNei.length; III++)
                                    {
                                        if (TempNei[III][1] == PathStack[II - 1][0])
                                        {
                                            VerticeList.push([TempNei[III][0], -1]);
                                        }
                                    }
                                }
                                VerticeList.push(PathStack[II][0]);
                            }
                            if (CycleExists)
                            {
                                var TempNei = PathStack[0][0].NeiB;
                                for (var III = 0; III < TempNei.length; III++)
                                {
                                    if (TempNei[III][1] == PathStack[PathStackL][0])
                                    {
                                        VerticeList.push([TempNei[III][0], -1]);
                                    }
                                }
                                VerticeList.push(PathStack[0][0]);
                                CountC++;
                                if (DispCycle)
                                {
                                    AlgorithmMsgApp(AlgorithmPathMessage(VerticeList, true));
                                }
                            }
                            else
                            {
                                CountP++;
                                if (DispPath)
                                {
                                    AlgorithmMsgApp(AlgorithmPathMessage(VerticeList, true));
                                }
                            }
                        }
                    }
                }

                if (TempObj[1] == TempObj[2])
                {
                    TempObj[0].Label = "";
                    PathStack.pop();
                    PathStackL--;
                }
            }
        }
        else
        {
            while (PathStackL >= 0)
            {
                TempObj = PathStack[PathStackL];
                TempObj[1] = TempObj[1] + 1;
                
                if (TempObj[1] < TempObj[2])
                {
                    TempObjX = TempObj[0].NeiB[TempObj[1]][1];
                    if (TempObjX.Label == "")
                    {
                        PathStack.push([TempObjX, -1, TempObjX.NeiB.length]);
                        TempObjX.Label = "X";
                        PathStackL++;
                        
                        // Test if stack contains vertices from NumMin to NumMax
                        if ((PathStackL >= NumMin) && (PathStackL <= NumMax))
                        {
                            // Test if there exists edge from last vertice to first vertice
                            var VertF = PathStack[0][0];
                            var VertL = PathStack[PathStackL][0];
                            var CycleExists = false;
                            if (PathStackL >= 2)
                            {
                                for (var II = 0; II < VertL.NeiB.length; II++)
                                {
                                    if (VertL.NeiB[II][1] == VertF)
                                    {
                                        CycleExists = true;
                                        break;
                                    }
                                }
                            }
                            
                            // Create path list
                            var VerticeList = [];
                            for (var II = 0; II <= PathStackL; II++)
                            {
                                if (II > 0)
                                {
                                    var TempNei = PathStack[II][0].NeiF;
                                    for (var III = 0; III < TempNei.length; III++)
                                    {
                                        if (TempNei[III][1] == PathStack[II - 1][0])
                                        {
                                            VerticeList.push([TempNei[III][0], -1]);
                                        }
                                    }
                                }
                                VerticeList.push(PathStack[II][0]);
                            }
                            if (CycleExists)
                            {
                                var TempNei = PathStack[0][0].NeiF;
                                for (var III = 0; III < TempNei.length; III++)
                                {
                                    if (TempNei[III][1] == PathStack[PathStackL][0])
                                    {
                                        VerticeList.push([TempNei[III][0], -1]);
                                    }
                                }
                                VerticeList.push(PathStack[0][0]);
                                CountC++;
                                if (DispCycle)
                                {
                                    AlgorithmMsgApp(AlgorithmPathMessage(VerticeList, false));
                                }
                            }
                            else
                            {
                                CountP++;
                                if (DispPath)
                                {
                                    AlgorithmMsgApp(AlgorithmPathMessage(VerticeList, false));
                                }
                            }
                        }
                    }
                }

                if (TempObj[1] == TempObj[2])
                {
                    TempObj[0].Label = "";
                    PathStack.pop();
                    PathStackL--;
                }
            }
        }
        if (DirForward)
        {
            AlgorithmMsgApp("Cycles from vertex " + I + ": " + CountC);
            AlgorithmMsgApp("Paths from vertex " + I + ": " + CountP);
        }
        else
        {
            AlgorithmMsgApp("Cycles to vertex " + I + ": " + CountC);
            AlgorithmMsgApp("Paths to vertex " + I + ": " + CountP);
        }
        CountP_ = CountP_ + CountP;
        CountC_ = CountC_ + CountC;
    }
    AlgorithmMsgApp("Searching finished");
    AlgorithmMsgApp("Total cycles: " + CountC_);
    AlgorithmMsgApp("Total paths: " + CountP_);

    NameMapGet();
    SetText(true, true);
}

function AlgorithmPathE(DispPath, DispCycle, NumMin, NumMax, DirForward)
{
    NumMin = parseInt(NumMin);
    NumMax = parseInt(NumMax);
    NameMapSet();
    if (((NumMin < 1) || (NumMax < 1)) || (NumMax < NumMin))
    {
        AlgorithmMsgBox("The number of edges are incorrect");
        NameMapGet();
        SetText(true, true);
        return;
    }
    
    if (NumMin == NumMax)
    {
        AlgorithmMsgClr("Searching for paths and cycles consisting of " + NumMin + " edges");
    }
    else
    {
        AlgorithmMsgClr("Searching for paths and cycles consisting of " + NumMin + "-" + NumMax + " edges");
    }
    
    var Iterate1 = 0;
    var Iterate2 = GraphVCount;
    if (MouseVSelectedI !== null)
    {
        Iterate1 = MouseVSelectedI;
        Iterate2 = MouseVSelectedI + 1;
    }

    var CountP_ = 0;
    var CountC_ = 0;
    for (var I = Iterate1; I < Iterate2; I++)
    {
        var CountP = 0;
        var CountC = 0;
        if (DirForward)
        {
            AlgorithmMsgApp("Searching for paths and cycles from vertex " + I + ":");
        }
        else
        {
            AlgorithmMsgApp("Searching for paths and cycles to vertex " + I + ":");
        }
        AlgorithmClearLabelsE();
        var PathStack = [];
        var PathStackL = -1;

        if (DirForward)
        {
            PathStack.push([GraphV_[I], 0, GraphV_[I].NeiF.length, null, -1]);
        }
        else
        {
            PathStack.push([GraphV_[I], 0, GraphV_[I].NeiB.length, null, -1]);
        }
        PathStackL++;
        
        var TempObj;
        var TempObjX;
        var TempObjX_;
        
        if (DirForward)
        {
            while (PathStackL >= 0)
            {
                TempObj = PathStack[PathStackL];
                
                if (TempObj[0].NeiF.length > 0)
                {
                    TempObjX_ = TempObj[0].NeiF[TempObj[1]][0]; 
                    TempObj[4]++;
                    
                    if (TempObj[4] == TempObjX_.Num)
                    {
                        TempObj[4] = 0;
                        TempObj[1] = TempObj[1] + 1;
                        if ((TempObj[1] < TempObj[2]) && (true))
                        {
                            TempObjX_ = TempObj[0].NeiF[TempObj[1]][0];
                        }
                    }
                }
                
                if (TempObj[1] < TempObj[2])
                {
                    TempObjX = TempObj[0].NeiF[TempObj[1]][1];
                    if (TempObjX_.Label[TempObj[4]] == "")
                    {
                        TempObjX_.Label[TempObj[4]] = "X";
                        PathStack.push([TempObjX, 0, TempObjX.NeiF.length, [TempObjX_, TempObj[4]], -1]);
                        PathStackL++;
                        
                        // Test if stack contains edges from NumMin to NumMax
                        if ((PathStackL >= NumMin) && (PathStackL <= NumMax))
                        {
                            // Test if there last vertice and first vertice are the same vertice
                            var CycleExists = false;
                            if (PathStack[0][0] == PathStack[PathStackL][0])
                            {
                                CycleExists = true;
                            }
                            
                            // Create path list
                            var VerticeList = [];
                            for (var II = 0; II <= PathStackL; II++)
                            {
                                if (II > 0)
                                {
                                    VerticeList.push(PathStack[II][3]);
                                }
                                VerticeList.push(PathStack[II][0]);
                            }
                            if (CycleExists)
                            {
                                CountC++;
                                if (DispCycle)
                                {
                                    AlgorithmMsgApp(AlgorithmPathMessage(VerticeList, true));
                                }
                            }
                            else
                            {
                                CountP++;
                                if (DispPath)
                                {
                                    AlgorithmMsgApp(AlgorithmPathMessage(VerticeList, true));
                                }
                            }
                        }
                    }
                }

                if (TempObj[1] == TempObj[2])
                {
                    if (PathStack[PathStackL][3])
                    {
                        PathStack[PathStackL][3][0].Label[PathStack[PathStackL][3][1]] = "";
                    }
                
                    PathStack.pop();
                    PathStackL--;
                }
            }
        }
        else
        {
            while (PathStackL >= 0)
            {
                TempObj = PathStack[PathStackL];
                
                if (TempObj[0].NeiB.length > 0)
                {
                    TempObjX_ = TempObj[0].NeiB[TempObj[1]][0]; 
                    TempObj[4]++;
                    
                    if (TempObj[4] == TempObjX_.Num)
                    {
                        TempObj[4] = 0;
                        TempObj[1] = TempObj[1] + 1;
                        if ((TempObj[1] < TempObj[2]) && (true))
                        {
                            TempObjX_ = TempObj[0].NeiB[TempObj[1]][0];
                        }
                    }
                }
                
                if (TempObj[1] < TempObj[2])
                {
                    TempObjX = TempObj[0].NeiB[TempObj[1]][1];
                    if (TempObjX_.Label[TempObj[4]] == "")
                    {
                        TempObjX_.Label[TempObj[4]] = "X";
                        PathStack.push([TempObjX, 0, TempObjX.NeiB.length, [TempObjX_, TempObj[4]], -1]);
                        PathStackL++;
                        
                        // Test if stack contains edges from NumMin to NumMax
                        if ((PathStackL >= NumMin) && (PathStackL <= NumMax))
                        {
                            // Test if there last vertice and first vertice are the same vertice
                            var CycleExists = false;
                            if (PathStack[0][0] == PathStack[PathStackL][0])
                            {
                                CycleExists = true;
                            }
                            
                            // Create path list
                            var VerticeList = [];
                            for (var II = 0; II <= PathStackL; II++)
                            {
                                if (II > 0)
                                {
                                    VerticeList.push(PathStack[II][3]);
                                }
                                VerticeList.push(PathStack[II][0]);
                            }
                            if (CycleExists)
                            {
                                CountC++;
                                if (DispCycle)
                                {
                                    AlgorithmMsgApp(AlgorithmPathMessage(VerticeList, false));
                                }
                            }
                            else
                            {
                                CountP++;
                                if (DispPath)
                                {
                                    AlgorithmMsgApp(AlgorithmPathMessage(VerticeList, false));
                                }
                            }
                        }
                    }
                }

                if (TempObj[1] == TempObj[2])
                {
                    if (PathStack[PathStackL][3])
                    {
                        PathStack[PathStackL][3][0].Label[PathStack[PathStackL][3][1]] = "";
                    }
                
                    PathStack.pop();
                    PathStackL--;
                }
            }
        }
        if (DirForward)
        {
            AlgorithmMsgApp("Cycles from vertex " + I + ": " + CountC);
            AlgorithmMsgApp("Paths from vertex " + I + ": " + CountP);
        }
        else
        {
            AlgorithmMsgApp("Cycles to vertex " + I + ": " + CountC);
            AlgorithmMsgApp("Paths to vertex " + I + ": " + CountP);
        }
        CountP_ = CountP_ + CountP;
        CountC_ = CountC_ + CountC;
    }
    AlgorithmMsgApp("Searching finished");
    AlgorithmMsgApp("Total cycles: " + CountC_);
    AlgorithmMsgApp("Total paths: " + CountP_);
    
    NameMapGet();
    SetText(true, true);
}

function AlgorithmCalcConnected()
{
    var ConnectNum = 0;


    // Clear labels
    AlgorithmClearLabelsV();
    AlgorithmClearLabelsE();
    
    
    
    var EdgeList = [];
    var EdgeListI;
    for (var I = 0; I < GraphECount; I++)
    {
        EdgeList.push(GraphE_[I]);
    }
    
    while (EdgeList.length > 0)
    {
        ConnectNum++;
        var ConnectNumS = "" + ConnectNum;
        var SelectedV = EdgeList[0].V1;
        
        var NodeStack = [];
        NodeStack.push([SelectedV, null]);
        var TempV;
        var TempE;
        var IterStart;
        var IterStop;
        var IterInc;
        while (NodeStack.length > 0)
        {
            TempV = NodeStack.pop();
            TempE = TempV[1];
            TempV = TempV[0];
            if (TempV.Label == "")
            {
                if (TempE)
                {
                    EdgeListI = 0;
                    for (EdgeListI = 0; EdgeListI < EdgeList.length; EdgeListI++)
                    {
                        if (EdgeList[EdgeListI] == TempE)
                        {
                            EdgeList.splice(EdgeListI, 1);
                            break;
                        }
                    }
                    for (var II = 0; II < TempE.Num; II++)
                    {
                        if (TempE.Label[II] == "")
                        {
                            TempE.Label[II] = ConnectNumS;
                        }
                    }
                }
            
                TempV.Label = "" + ConnectNum;
                var Nei = TempV.NeiO;
                IterStart = 0;
                IterStop = Nei.length;
                IterInc = 1;

                for (var I = IterStart; I != IterStop; I += IterInc)
                {
                    TempV = Nei[I][1];
                    TempE = Nei[I][0];
                    NodeStack.push([TempV, TempE]);
                }
            }
        }
        for (EdgeListI = 0; EdgeListI < EdgeList.length; EdgeListI++)
        {
            TempE = EdgeList[EdgeListI];
            if ((TempE.V1.Label == ConnectNumS) && (TempE.V2.Label == ConnectNumS))
            {
                for (var II = 0; II < TempE.Num; II++)
                {
                    if (TempE.Label[II] == "")
                    {
                        TempE.Label[II] = ConnectNumS;
                    }
                }
                EdgeList.splice(EdgeListI, 1);
                EdgeListI--;
            }
        }
    }


    for (var I = 0; I < GraphVCount; I++)
    {
        if (GraphV_[I].Label == "")
        {
            ConnectNum++;
            var ConnectNumS = "" + ConnectNum;
            GraphV_[I].Label = ConnectNumS;
        }
    }

    return ConnectNum;
}

function AlgorithmSeparate()
{
    var BaseConnect = AlgorithmCalcConnected();
    var StructTemp = StructExport();
    var ConnV = [];
    var ConnE = [];

    for (var I = 0; I < GraphVCount; I++)
    {
        GraphVerticeRem(I);
        if (BaseConnect != AlgorithmCalcConnected())
        {
            ConnV.push(I);
        }

        StructImport(StructTemp);
    }
    
    for (var I = 0; I < GraphECount; I++)
    {
        GraphEdgeRem0(I, -1);
        
        if (BaseConnect != AlgorithmCalcConnected())
        {
            ConnE.push(I);
        }

        StructImport(StructTemp);
    }

    for (var I = 0; I < ConnV.length; I++)
    {
        GraphV_[ConnV[I]].Label = "[" + GraphV_[ConnV[I]].Label + "]";
    }

    for (var I = 0; I < ConnE.length; I++)
    {
        var TempE = GraphE_[ConnE[I]];
        
        for (var II = 0; II < TempE.Num; II++)
        {
            TempE.Label[II] = "[" + TempE.Label[II] + "]";
        }
    }

    SetTextOpt();
    return BaseConnect;
}

function AlgorithmMsgClr(Txt)
{
    Send("algorithm", [0, Txt]);
}

function AlgorithmMsgApp(Txt)
{
    Send("algorithm", [1, Txt]);
}

function AlgorithmMsgEnd()
{
    Send("algorithm", [4]);
}

function AlgorithmMsgBox(Txt)
{
    Send("algorithm", [2, Txt]);
}


}

