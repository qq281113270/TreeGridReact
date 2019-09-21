TreeGridLoaded ( // JSONP header, to be possible to load from xxx_Jsonp data source
{  Cfg: { 
      id:'First', SuppressCfg:'1',        // Configuration is not saved to cookies 
      MainCol:'O',                        // Shows tree in column 'O' 
      ConstHeight:'1',                    // Grid will always fill its main tag 
      RowIndex:'Pos', RowIndexWidth:'45', // Adds row index column named 'Pos' that displays visible row position 
      ReloadChanged:'1',                  // Grid can reload and automatically discard pending changes 
      Undo:'1',                           // Undo / redo is supported, Ctrl+Z / Ctrl+Y 
      SuppressMessage:'2',                // Grid produces no informational message 
      Sort:'D', DefaultSort:'Auto',       // Grid is sorted according to column D by default 
      ResizingMain:'3',                   // User can resize grid main tag in both directions 
      SearchDefs:'Node', SearchCells:'1', SearchExpression:'"Peter Orwell" OR "Janet Scheel"', SearchAction:'Select', SearchHidden:'1', // Default Search setting 
      ExportType:'Expanded,Outline',      // Export setting, all rows will be exported expanded and will be used Excel outline 
      ChildParts:'0',                     // Rendering children on background is disabled 
      CalculateSelected:'1',              // Recalculates rows after selection changed 
      PrintVarHeight:'2',                 // Calculates height of the I column when printing
      PrintPagePrefix:"<center class:'%9' style:'width:%7px'>First example printed page %3 from %6</center>", // Sample page header for printing 
      PrintPagePostfix:"<center class:'%9' style:'width:%7px'>Page %1 horizontally from %4 , page %2 vertically from %5</center>", // Sample page footer for printing 
      LimitScroll:"23",                   // Responsive design, for small windows sets NoVScroll and NoHScroll 
      FullId:'1', NumberId:'1', IdChars:'0123456789', // Child inherits parent id as prefix, uses numbers from 1 as ids for new rows 
      Language:'EN' },                    // Presets English language and shows the Languages combo 
   Actions: { OnDragRow:"DragSelected OR DragRow" }, // Overrides default dragging action just for dragging rows 
   
   // Default rows definition 
   Def: {
      // Data rows without children 
      Data: { CalcOrder:'L,P', CDef:'Info', AcceptDef:'Info', FilterMenuName:'Products', Expanded:'0', CanSort:'0', VarHeight:'0',
         O:'Product', OSuggest:'|*RowsDef', XType:'Text', XCanEdit:'0', R:'0', S:'0', D:'', A:'1', K:"Accessory"
         },
      
      // Order rows with children 
      Node: { CDef:'Data', AcceptDef:'Data', Expanded:'0', Calculated:'1', CalcOrder:'A,L,P,OHtmlPostfix,OSortValue', CanFilter:'3', VarHeight:'0',
         X:'1', O:'Order', OIcon:'Defaults', ODefaults:'|Order|Special order|Gift|Refund', OHtmlPostfixFormula:'NumberToString(Row.id," 00000")', OSortValueFormula:'Row.OHtmlPostfix', FilterMenuName:'Orders',
         ORecalc:'19',
         PFormula:'(L-L*R/100+S)*Fix3.C',
         CCanEdit:'1', CButton:'Defaults',
         CDefaults:'{ShowCursor:0,Items:[{Name:"*RowsVisibleDef"},"-",{Name:"All",Text:"<b>All customers</b>",Menu:1,MinHeight:200,Items:"|*RowsAllDef"}]}',
         KVisible:'0', KCanEdit:'0',
         AType:'Enum', AFormula:'count()', AAlign:'Right', AEnum:'|empty|1 item ', AIntFormat:'0 "items"',
         UVisible:'0', UCanEdit:'0',
         LFormula:'sum("P")/Fix3.C',
         R:'0',
         S:'0',
         DCanEdit:'1'
         },

      Info: { Spanned:'1', ISpan:'100', IType:'Lines', CDef:'', AcceptDef:'', CanFilter:'0', O:'Additional description', XVisible:'0', PVisible:'0' },

      // Footer summary rows 
      Foot: { XVisible:'0', LVisible:'0', SVisible:'0', KVisible:'0', NoColorState:'1' },

      // Row created when grouping rows 
      Group: { Def:'Node', CanSelect:'0', AggChildren:'1', CanFilter:'2',
         XVisible:'0',
         OCanEdit:'1', OIcon:'', OHtmlPostfixFormula:'', OSortValueFormula:'',
         CVisible:'0', CCanEdit:'0', CButton:'None', 
         DVisible:'0', DCanEdit:'0',
         PFormula:'sum("X==1")',
         AFormula:'count("X==1")', AEnum:'|no order|1 order ', AIntFormat:'0 "orders"'
         }
      },

   // Column definition 
   LeftCols: [
      { Name:'X', Width:'55', Type:'Bool', CanSort:'0' }, // Used 
      { Name:'O', PrintWidth:'300', RelWidth:'100', MinWidth:'250', Width:'250', Type:'Text', ToolTip:'1', CaseSensitive:'0', CanHide:'0', SearchNames:'Product name,Product,Order name,Order' } // Product / Order name 
      ],
   Cols: [
      { Name:'I', Width:'0', Type:'Lines', CanHide:'0', CanMove:'0', CanResize:'0', CanPrint:'0', CanExport:'0' }, // Info column for the Info rows, spanned for the whole section 
      { Name:'C', Width:'120', Type:'Text', CanEdit:'0', VarHeight:'1' }, // Customer 
      { Name:'D', Width:'115', Type:'Date', Format:'d', CanEdit:'0', VarHeight:'1' }, // Date 
      { Name:'K', Width:'95', Type:'Enum', VarHeight:'1', 
         Enum:'|Accessory|Phone|Tablet|Laptop|Desktop|Hardware|Software|Console|Game|Monitor|Television|Printer|Camera|Projector',
         EnumMenu:'{Items:"|-Mobile-|Phone|Tablet|Camera|-Computer-|Laptop|Desktop|Hardware|Monitor|Printer|-Display-|Television|Projector|Console|-Accessories-|Accessory|Software|Game"}'
         }, // Kind 
      { Name:'A', Width:'80', Type:'Int', VarHeight:'1' }, // Amount 
      { Name:'U', Width:'90', Type:'Float', EditMask:'^\-?\d*[\.\,]?\d*$', Format:'0.00', CanGroup:'0', VarHeight:'1' }, // Unit Price 
      { Name:'L', Width:'90', Type:'Float', Format:',0.00', Formula:'A*U', VarHeight:'1' }, // List Price 
      { Name:'R', Width:'90', Type:'Int', Format:'0\%', VarHeight:'1' }, // Discount 
      { Name:'S', Width:'90', Type:'Float', Format:',0.00', VarHeight:'1' }, // Shipping 
      ],
   RightCols: [
      { Name:'P', Width:'110', Type:'Float', Format:'*cur*$*spn*,0.00;[red](*ncur*$*spn*,0.00)', Formula:'Row.parentNode.O=="Gift"?0:(L-L*R/100+S)*(Row.parentNode.O=="Refund"?-1:1)*Fix3.C' } // Price 
      ],
   
   // Parent of root nodes, accepts only Node rows 
   Root: { CDef:'Node', AcceptDef:'Node' },
	
   // Column captions 
   Header: {
      X:"Used", O:"Product / Order Name", OLevels:"1", I:"Information",
      C:"Customer", D:"Date", K:"Kind", A:"Amount", U:"Unit Price", L:"List Price", R:"Discount", S:"Shipping",
      PFormula:"'Price in '+Fix3.D", Calculated:"1"
      },

   Head: [
      // Filter row 
      { Kind:"Filter", id:'Filter', NoColorState:'1',
         XCanEdit:'1', XType:'Bool', XFilterDef:'Node',
         OSuggest:'|*RowsCanFilter', OEmptyValue:'Filter by product name', OFilterDefs:'Node,Data', OFilterDef:'Data',
         CButton:'Defaults', CDefaults:'{Position:{Align:"below center"},Items:[{Name:"*FilterOff"},"-",{Columns:3,Default:{Left:1},Items:"|*RowsAllCanFilter"}]}', CShowMenu:'0', CRange:'1', CFilterDef:'Node',
         DRange:'1', DShowMenu:'0', DDefaultDate:"6/1/2019", DFilterDef:"Node",
         KFilterDef:'Data', KFilterOffText:'<s>All kinds</s>',
         AFilterDefs:'Node,Data', AFilterDef:'Data',
         UFilterDefs:'?', UFilterDef:'Data',
         LFilterDefs:'Node,Data', LFilterDef:'Data',
         RFilterDefs:'Node,Data', RFilterDef:'Data', R:'20', RFilter:'3',
         SFilterDefs:'Node,Data', SFilterDef:'Data',
         PFilterDefs:'Node,Data', PFilterDef:'Data'
         }
      ],

   Solid: [
      // Top tabber 
      { Kind:"Tabber", id:"Tabber", Cells:"All,Y9,Y8,Y7,Y6,Y5,Cnt,Vis,Sel,Add,Del,Chg", Width:"40", CanFocus:"0", NoUpload:"0",
         AllButtonText:"All", Y9ButtonText:"2019", Y8ButtonText:"2018", Y7ButtonText:"2017", Y6ButtonText:"2016", Y5ButtonText:"2015",
         AllOnClick:"Grid.SetFilter('Year','');",
         Y9OnClick:"Grid.FilterDateRange('D','1/1/2019~1/1/2020','Year');", Y9:"1",
         Y8OnClick:"Grid.FilterDateRange('D','1/1/2018~1/1/2019','Year');",
         Y7OnClick:"Grid.FilterDateRange('D','1/1/2017~1/1/2018','Year');",
         Y6OnClick:"Grid.FilterDateRange('D','1/1/2016~1/1/2017','Year');",
         Y5OnClick:"Grid.FilterDateRange('D','1/1/2015~1/1/2016','Year');",
         CntRelWidth:"1", CntType:"Html", CntFormula:'"Rows:<b>"+count(7)+"</b>"', CntAlign:"Right",
         VisType:"Html", VisFormula:'var cnt=count(6);return cnt?"shown:<b>"+cnt+"</b>":""', VisWidth:'-1', VisWrap:'0',
         SelType:"Html", SelFormula:'var cnt=count(15);return cnt?"selected:<b>"+cnt+"</b>":""', SelWidth:'-1', SelWrap:'0',
         AddType:"Html", AddFormula:'var cnt=count("Row.Added==1",7);return cnt?"added:<b>"+cnt+"</b>":""', AddWidth:'-1', AddWrap:'0',
         DelType:"Html", DelFormula:'var cnt=count("Row.Deleted>0",7);return cnt?"deleted:<b>"+cnt+"</b>":""', DelWidth:'-1', DelWrap:'0',
         ChgType:"Html", ChgFormula:'var cnt=count("Row.Changed==1",7);return cnt?"changed:<b>"+cnt+"</b>":""', ChgWidth:'-1', ChgWrap:'0',
         CanPrint:'5', AllPrintHPage:'1', Y5PrintHPage:'1', Y6PrintHPage:'1', Y7PrintHPage:'1', Y8PrintHPage:'1', Y9PrintHPage:'1',
         CntPrintHPage:'2', VisPrintHPage:'2', SelPrintHPage:'2', AddPrintHPage:'2', DelPrintHPage:'2', ChgPrintHPage:'2'
         },
      
      // Group and special filter settings 
      { Kind:"Group", Space:'1', Panel:'1', id:'Group', CanFocus:'0', Cells:'List,Custom,Month,Cust,Rev,Win', NoUpload:"0",
             
         List:'|Group by <i>none</i>|Group by <i>Customer</i>|Group by <i>Date</i>|Group by <i>Customer -> Date</i>|Group by <i>Date -> Customer</i>',
         ListCustom:'<em>Custom grouping</em>',
         ListWidth:'150',
         Cols:'||C|D|C,D|D,C' ,
         Custom:'1',

         Month:'<b>May</b>;<b>June</b>', MonthLabel:'Filter orders from', MonthType:'Select', MonthRange:'1', MonthWidth:'65', MonthEmptyValue:'all months',
         MonthDefaults:'|*All|<b>January</b>|<b>February</b>|<b>March</b>|<b>April</b>|<b>May</b>|<b>June</b>|<b>July</b>|<b>August</b>|<b>September</b>|<b>October</b>|<b>November</b>|<b>December</b>',
         MonthOnChange:"var idx=Grid.GetDefaultsIndex(Row,Col,null,-1); if(idx.length==12) { Row.Month = ''; Grid.RefreshCell(Row,'Month'); } Grid.SetFilter('Month',idx.length==12||idx.length==0?'':'{'+idx.join(':1,')+':1}[(new Date(D)).getMonth()+1]','D');",
         
         CustLeft:'5', CustWidth:'85',
         CustType:'Select',
         CustDefaults:'|all customers|<b>personal cust.</b>|<b>limited cust.</b>|<b>corporate cust.</b>',
         CustOnChange:"var idx=Grid.GetDefaultsIndex(Row,Col); Grid.SetFilter('Cust',idx==0?'':'Row.C.search('+['',/(Inc\.)|(Ltd\.)/,/Ltd\./,/Inc\./][idx]+(idx==1?')<0':')>=0'),'D');",
         Cust:'all customers',

         RevLeft:'5', RevType:"Bool", RevLabelRight:"Reversed tree", RevCanEdit:"1", RevFormula:"Grid.ReversedTree?1:0", RevOnChange:"Grid.SetReversedTree(Value);", RevTip:"Show child rows above parents, like in MS Excel",

         WinType:"Bool", WinLabelRight:"Window scroll", WinCanEdit:"1", WinFormula:"Grid.NoVScroll?1:0", WinTip:"Disable grid scrollbars and use page scrollbars",
         WinOnChange:"Grid.NoVScroll = Value; Grid.NoHScroll = Value; if(!Value) { Grid.MainTag.style.width=''; Grid.MainTag.style.height='660px'; } Grid.Update();",
         
         CanPrint:'5',  ListPrintHPage:'1', CustomPrintHPage:'1', MonthPrintHPage:'2', CustPrintHPage:'2'
         },
      
      // Search settings 
      { Kind:"Search", Space:'1', Panel:'1', id:'Search', CanFocus:'0', NoUpload:"0",
         Cells:'Defs,Case,Type,Expression,Sep1,Filter,Select,Mark,Find,Clear,Help,Sep2',
         ExpressionAction:'Last', ExpressionNoColor:'0', ExpressionCanFocus:'1', ExpressionLeft:'5', ExpressionMinWidth:'50',
         ExpressionEmptyValue :'<s>Enter keywords to search for</s>',
         DefsDefaults:'|orders|products|orders with product',
         DefsDefs:'|Node|Data|',
         DefsLabel:'Search in', DefsWidth:'50',
         CaseLeft:"5", CaseLabelRight:"case sensitive",
         TypeLeft:"5", TypeLabelRight:"individual cells", TypeTip:"If set: The found cell must fulfill the whole searched expression<br>If not set: The cells in found row must fulfill together the whole searched expression",
         Sep1Width:"5", Sep1Type:"Html",
         Sep2Width:"5", Sep2Type:"Html",
         CanPrint:'5', DefsPrintHPage:'1', CasePrintHPage:'1', TypePrintHPage:'1',
         ExpressionPrintHPage:'2', Sep1PrintHPage:'2', FilterPrintHPage:'2', SelectPrintHPage:'2', MarkPrintHPage:'2', FindPrintHPage:'2', ClearCanPrint:'0', HelpCanPrint:'0', Sep2PrintHPage:'2'
         }

      ],
   
   // Summary footer rows 
   Foot: [
      { Def:'Foot', id:'Fix1', CanDelete:'0', CanEdit:'0', Calculated:'1', MenuName:'Total income', CalcOrder:'A,U,P,D,C',
         O:"Total income",
         CFormula:"CountUnique(Grid,GetChildren(),Col)", CType:"Enum", CEnum:'|no customer|1 customer', CIntFormat:'0 "customers"',
         DFormula:'min("X==1")+"~"+max("X==1")', DRange:'1', DFormat:'MMM yy',
         AFormula:'count("X==1")', AType:'Enum', AAlign:'Right', AEnum:'|no order|1 order', AIntFormat:'0 "orders"',
         UFormula:'sum("A","X==1")', UType:'Enum', UAlign:'Right', UEnum:'|no item|1 item', UIntFormat:'0 "items"',
         RVisible:'0',
         PFormula:'sum("X==1")'
         },
      { Def:'Foot', id:'Fix2', CanDelete:'0', CanEdit:'0', Calculated:'1', MenuName:'Taxes', CalcOrder:'A,P',
         O:"Taxes",
         AVisible:'0', UVisible:'0',
         R:"22", RCanEdit:'1',
         PFormula:'-Get(Fix1,"P")*R/100'
         },
      { Def:'Foot', id:'Fix3', CanDelete:'0', CanEdit:'0', Calculated:'1', MenuName:'Profit', CalcOrder:'P', DebugCheckIgnore:'1',
         O:"Profit",
         PFormula:'Get(Fix1,"P")+Get(Fix2,"P")', PHtmlPrefix:"<b>", PHtmlPostfix:"</b>",
         AVisible:'0', UVisible:'0',
         RVisible:'0',
         C:'1', CType:'Float', CVisible:'1', CCanEdit:'1', CRecalc:'256', CTip:'Exchange rate for 1 USD. In this example is fixed on day 1/1/2019.',
         D:'USD', DType:'Enum', DCanEdit:'1', DHtmlPostfix:'<span style:"color:#AAA;"> / USD</span>', DTip:'Select currency to display the prices in, converted by exchange rate',
         DOnChange:'Grid.Lang.Format.Currency = Get(Row,Row.D); Grid.SetValue(Row,"C",Get(Row,Get(Row,"D")+"Rate"),1); for(var r=Grid.GetFirst();r;r=Grid.GetNext(r)) if(!r.P) Grid.RefreshCell(r,"P");',
         DEnum:'|AED|ARS|AUD|BGN|BRL|CAD|CHF|CLP|CNY|CZK|DKK|EUR|GBP|HKD|HRK|HUF|IDR|ILS|INR|IRR|ISK|JPY|KRW|KWD|MYR|MXN|NOK|NZD|OMR|PHP|PLN|PKR|QAR|RON|RUB|SAR|SEK|SGD|THB|TWD|TRY|USD|ZAR',
         DEnumMenu:{AutoColumns:3,Items:[
            {Name:"USD",Text:"USD - US Dollar"},{Name:"EUR",Text:"EUR - Euro"},
            {Name:"-Europe-"},
            {Name:"BGN",Text:"BGN - Bulgarian Lev"},{Name:"CHF",Text:"CHF - Swiss Franc"},{Name:"CZK",Text:"CZK - Czech Koruna"},{Name:"DKK",Text:"DKK - Danish Krone"},{Name:"EUR",Text:"EUR - Euro"},
            {Name:"GBP",Text:"GBP - British Pound"},{Name:"HRK",Text:"HRK - Croatian Kuna"},{Name:"HUF",Text:"HUF - Hungarian Forint"},{Name:"ISK",Text:"ISK - Icelandic Krona"},{Name:"NOK",Text:"NOK - Norwegian Krone"},
            {Name:"PLN",Text:"PLN - Polish Zloty"},{Name:"RON",Text:"RON - Romanian New Leu"},{Name:"RUB",Text:"RUB - Russian Ruble"},{Name:"SEK",Text:"SEK - Swedish Krona"},
            {Name:"-America-"},
            {Name:"ARS",Text:"ARS - Argentine Peso"},{Name:"BRL",Text:"BRL - Brazilian Real"},{Name:"CAD",Text:"CAD - Canadian Dollar"},{Name:"CLP",Text:"CLP - Chilean Peso"},
            {Name:"MXN",Text:"MXN - Mexican Peso"},{Name:"USD",Text:"USD - US Dollar"},
            {Name:"-Asia-"},
            {Name:"AED",Text:"AED - Emirati Dirham"},{Name:"CNY",Text:"CNY - Chinese Yuan"},{Name:"HKD",Text:"HKD - Hong Kong Dollar"},{Name:"IDR",Text:"IDR - Indonesian Rupiah"},
            {Name:"ILS",Text:"ILS - Israeli Shekel"},{Name:"INR",Text:"INR - Indian Rupee"},{Name:"IRR",Text:"IRR - Iranian Rial"},{Name:"JPY",Text:"JPY - Japanese Yen"},
            {Name:"KRW",Text:"KRW - Korean Won"},{Name:"KWD",Text:"KWD - Kuwaiti Dinar"},{Name:"MYR",Text:"MYR - Malaysian Ringgit"},{Name:"OMR",Text:"OMR - Omani Rial"},{Name:"PHP",Text:"PHP - Philippine Peso"},
            {Name:"PKR",Text:"PKR - Pakistani Rupee"},{Name:"QAR",Text:"QAR - Qatari Riyal"},{Name:"SAR",Text:"SAR - Saudi Arabian Riyal"},{Name:"SGD",Text:"SGD - Singapore Dollar"},
            {Name:"THB",Text:"THB - Thai Baht"},{Name:"TRY",Text:"TRY - Turkish Lira"},{Name:"TWD",Text:"TWD - Taiwan New Dollar"},
            {Name:"-Oceania-"},
            {Name:"AUD",Text:"AUD - Australian Dollar"},{Name:"NZD",Text:"NZD - New Zealand Dollar"},
            {Name:"-Africa-"},
            {Name:"ZAR",Text:"ZAR - South African Rand"}
            ]},
         AEDRate:'3.673', AED:' &#x62f;&#x2e;&#x625; ', ARSRate:'37.35', ARS:'$', AUDRate:'1.407', AUD:'$', BGNRate:'1.719', BGN:' &#1083;&#1074; ', BRLRate:'3.715', BRL:' R$ ', CADRate:'1.34', CAD:'$',
         CHFRate:'0.986', CHF:' fr. ', CLPRate:'681.6', CLP:'$', CZKRate:'22.4', CZK:' K&#x010D; ', CNYRate:'6.87', CNY:'&#165;', DKKRate:'6.55', DKK:' kr ', EURRate:'0.876', EUR:' &#x20AC; ',
         GBP:'&#xA3;', GBPRate:'0.785', HUFRate:'282.1', HUF:' Ft ', HKDRate:'7.834', HKD:'$', HRKRate:'6.53', HRK:' kn ', IDRRate:'14288', IDR:' Rp ', ILSRate:'3.711', ILS:'&#8362;', IRR:'&#65020;', IRRRate:'41982',
         INR:'&#8377;', INRRate:'69.625', ISKRate:'117.7', ISK:' kr ', JPYRate:'108.3', JPY:'&#165;', KRWRate:'1117', KRW:'&#8361;', KWDRate:'0.304', KWD:'&#x62f;&#x2e;&#x643;', MYRRate:'4.12', MYR:' RM ',
         MXNRate:'19.45', MXN:'$', NOKRate:'8.61', NOK:' kr ', NZDRate:'1.485', NZD:'$', OMRRate:'0.385', OMR:'&#65020;', PLNRate:'3.767', PLN:' z&#322; ', PHPRate:'52.44', PHP:'&#8369;',
         PKRRate:'138.9', PKR:' &#8360; ', QARRate:'3.64', QAR:'&#65020;', RONRate:'4.09', RON:' lei ', RUBRate:'67.46', RUB:' &#1088;&#1091;&#1073; ', SARRate:'3.75', SAR:'&#65020;',
         SEKRate:'8.97', SEK:' kr ', SGDRate:'1.359', SGD:'$', THBRate:'32', THB:'&#3647;', TWDRate:'30.81', TWD:' NT$ ', TRYRate:'5.337', TRY:' TL ', USDRate:'1', USD:'$', ZARRate:'13.98', ZAR:' R '
         }
      ],
   
   // Bottom toolbar formula 
   Toolbar: { Formula:'count("X==1")+" / "+count(1)+" orders"', Indent:'0', Outdent:'0' },

   Lang: {

      // Changes filter off text for Customer filter 
      Text: { DefaultsFilterOff:'<s>All customers</s>' },

      // Defines the currency formats 
      Format: { cur:'<span style:"color:#AA4;">', ncur:'<span style:"color:#C66;">', spn:'</span>' }
      },

   // Splits the high menu 
   MenuPrint: { Columns:'3' },
   
   // Column widths change for Turq style for bigger header 
   Media: [
      { Style:'TT',
         Cols: [
            { Name:'Pos', Width:'65' },   // Index 
            { Name:'X', Width:'65' },     // Used 
            { Name:'O', MinWidth:'270' }, // Product / Order Name 
            { Name:'K', Width:'75' },     // Kind 
            { Name:'A', Width:'105' },    // Amount 
            { Name:'U', Width:'115' },    // Unit Price 
            { Name:'L', Width:'115' },    // List Price 
            { Name:'R', Width:'110' },    // Discount 
            { Name:'S', Width:'110' },    // Shipping 
            { Name:'P', Width:'110' }     // Price 
            ]
         }
      ],
   }
);