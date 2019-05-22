
var Th={tmpNum:"",tmpNUmf:"", DataList:[{Data:[],f:[]}],index:0,IndexList:[0],topSymbol:"",p:null};

function CreateSs(){
    return {Data:[],f:[]};
}

function MyMath(str) {
    this.sz = str;
}

MyMath.prototype.NumberList = function () {

}

var StructType = { Number: 1, Symbol: 2 }

function FactoryStruct() {
    return { back: null, next: null, type: StructType.Number, Body: null };
}

function CreateData(num, datatype,f) 
{
    return { DataType: datatype, Data: num,f:f };
}

function CreateSymol(f, datatype, priority) {
    return { DataType: datatype, Symbol: f, priority: priority }
}
var isFirst=true;
var dynamicX=1;
function ClickEvent(f, isNum, datatype,priority)
{
    if(isNum==="1")
    {
        Th.tmpNum+=f;
        Th.topSymbol="";
        isFirst=false;
    }else{

        if(Th.p===null)
        {
            Th.p=Th.DataList[Th.IndexList[Th.index]];
        }

        if(f==="(")
        {
            var Data= CreateData(parseFloat( Th.DataList.length),0,'+');
            Th.p.Data.push(Data);
            Th.tmpNum="";
            Th.tmpNUmf="";
            Th.topSymbol="";
            Th.index++;
            Th.IndexList[Th.index]=Th.DataList.length;
            var tmp=  CreateSs();
            Th.DataList.push(tmp);
            Th.p = tmp;
            isFirst=true;
            return;
        }

        if(f===")")
        {
            Th.index--;
            Th.topSymbol="";
            var Data= CreateData(parseFloat( Th.tmpNum),1,Th.tmpNUmf);
            Th.p.Data.push(Data);
            Th.p=Th.DataList[Th.IndexList[Th.index]];
            Th.tmpNum="";
            return;
        }
        if(Th.topSymbol!==""||isFirst)
        {
            Th.tmpNUmf=f;
            Th.topSymbol="";
            isFirst=false;
        }else{
            Th.topSymbol=f;
            if(Th.tmpNum!=="")
            {
                if(Th.tmpNum==="x"){
                    var Data= CreateData("x",1,Th.tmpNUmf);
                    Th.p.Data.push(Data);
                }else{
                    var Data= CreateData(parseFloat( Th.tmpNum),1,Th.tmpNUmf);
                    Th.p.Data.push(Data);
                }

            }
            if(f!=="EOF")
                Th.p.f.push(CreateSymol(f,getDataType(f),priority));

                
            Th.tmpNum="";
            Th.tmpNUmf="";
        }
    }

}


function Result(list)
{
    var result=null;
    for(var priorityIndex=4;priorityIndex>=0;priorityIndex--)
    for(var i=0;i<list.f.length;i++)
    {
        var f= list.f[i];
        if(parseInt(f.priority)!==priorityIndex)continue;
        if(result===null)
        {
            result=list.Data[i];
        }
        result=Js(list.Data[i],list.Data[i+1],list.f[i]);
        var dt= CreateData(result,1,"");
        list.Data[i]=dt;
        list.Data[i+1]=dt;
    }
    return result;
}

function GetNum(datas)
{
    console.log(datas);
    if(Object.prototype.toString.call(datas) !== '[object Object]')return data;
    var data=datas.Data;
	if(datas.DataType===1&&data==="x")return  dynamicX;
    if(datas.DataType===0)data=Result(Th.DataList[data]);
    switch( datas.f)
    {
        case "+":return parseFloat(data);
        case "-":return parseFloat(data)*-1;
        case "*":return parseFloat(data);
        case "/":return parseFloat(data);
        case "sin":return Math.sin(parseFloat(data));
        case "cos":return Math.cos(parseFloat(data));
        case "tan":return Math.tan(parseFloat(data));
        case "√":return Math.sqrt(data);
        case "ln":return Math.log(data);
        default:return parseFloat(data);
    }
}

function Js(num1,num2,f)
{
    var num1s= GetNum(num1);
    var num2s=GetNum(num2);
    return FAO(num1s,num2s,f.Symbol);
}

     /**
      * 四则运算
      */
     function FAO(n1,n2,f)
     {
        switch(f)
        {
          case '+':return n1+n2;
          case '-':return n1-n2;
          case '*':return n1*n2;
          case '/':return n1/n2;
          case '^':return Math.pow(n1,n2);
        }
     }
function AddNumBer(num)
{
    var tmp = FactoryStruct();

    if (ComputerGloblData.Th !== null)
    {
        ComputerGloblData.Th.next = tmp;
        tmp.back = ComputerGloblData.Th;
    }
    ComputerGloblData.Th = tmp;
    ComputerGloblData.Th.Body = CreateData(parseFloat(ComputerGloblData.NumTmp), 1);
    //ComputerGloblData.List.push(ComputerGloblData.Th);
}
function AddSymol(text,datatype,priority)
{
    var tmp = FactoryStruct();
    if(ComputerGloblData.Th!==null){
        ComputerGloblData.Th.next=tmp;
        tmp.back = ComputerGloblData.Th;
    }
    ComputerGloblData.Th=tmp;
    ComputerGloblData.Th.Body=CreateSymol(text, datatype, priority);
}

function getDataType(f)
{
    switch(f){
        case '+':
        case '-':
        case '*':
        case '/':
        case '^':return 2;
        case 'sin':
        case 'cos':
        case 'tan':return 1;
        case 'log':return 3;
    }
}