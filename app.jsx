const { useState, useEffect, useRef } = React;

const LOGO = "data:image/jpeg;base64,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";

const C = {
  pri:"#0A7E8C",priD:"#065A64",priL:"#E8F5F3",acc:"#E8734A",bg:"#F4F7F8",
  card:"#fff",txt:"#1A2B3B",txtL:"#6B7D8E",ok:"#2EAC6A",okL:"#E8F5F1",
  warn:"#E5A832",warnL:"#FFF3E8",err:"#D33",errL:"#FEE8E8",brd:"#E2E8ED"
};

const ADMINS = {admin:"admin123", ziad:"ziad123"};
const PAYMENT_INFO = [
  {method:"🏦 بنك", number:"0599406182"},
  {method:"💜 بال باي", number:"0598165437"},
  {method:"📱 جوال باي", number:"0599406182"}
];

// ─── Helpers ───
const Btn = ({children,onClick,v="pri",full,small,disabled,s}) =>
  React.createElement("button",{onClick,disabled,style:{border:"none",borderRadius:10,fontSize:small?12:14,fontWeight:600,cursor:disabled?"default":"pointer",padding:small?"7px 14px":"11px 18px",display:"inline-flex",alignItems:"center",justifyContent:"center",gap:6,fontFamily:"inherit",opacity:disabled?.5:1,...(full?{width:"100%"}:{}),
  ...(v==="pri"?{background:`linear-gradient(135deg,${C.pri},${C.priD})`,color:"#fff"}:v==="ok"?{background:C.ok,color:"#fff"}:v==="out"?{background:"transparent",color:C.txt,border:`1.5px solid ${C.brd}`}:v==="err"?{background:C.errL,color:C.err}:v==="ghost"?{background:"transparent",color:C.txtL}:{}),...s}},children);

const Inp = ({label,value,onChange,type="text",placeholder,textarea}) =>
  React.createElement("div",{style:{marginBottom:12}},
    label && React.createElement("label",{style:{fontSize:12,color:C.txtL,marginBottom:4,display:"block"}},label),
    textarea ? React.createElement("textarea",{value,onChange:e=>onChange(e.target.value),placeholder,style:{width:"100%",padding:"10px 12px",borderRadius:10,border:`1.5px solid ${C.brd}`,fontSize:13,outline:"none",boxSizing:"border-box",direction:"rtl",resize:"vertical",minHeight:60,fontFamily:"inherit"}})
    : React.createElement("input",{type,value,onChange:e=>onChange(e.target.value),placeholder,style:{width:"100%",padding:"10px 12px",borderRadius:10,border:`1.5px solid ${C.brd}`,fontSize:13,outline:"none",boxSizing:"border-box",direction:"rtl",fontFamily:"inherit"}})
  );

const Card = ({children,style:s,onClick}) =>
  React.createElement("div",{onClick,style:{background:C.card,borderRadius:14,padding:"14px 16px",marginBottom:10,border:`1px solid ${C.brd}`,cursor:onClick?"pointer":"default",...s}},children);

const Badge = ({text,color="ok"}) => {
  const colors = {ok:{bg:C.okL,c:C.ok},warn:{bg:C.warnL,c:C.warn},err:{bg:C.errL,c:C.err},pri:{bg:C.priL,c:C.pri}};
  const cl = colors[color]||colors.ok;
  return React.createElement("span",{style:{fontSize:10,background:cl.bg,color:cl.c,padding:"2px 8px",borderRadius:6,fontWeight:600}},text);
};

const Modal = ({title,onClose,children}) =>
  React.createElement("div",{onClick:onClose,style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:100,display:"flex",alignItems:"flex-end",justifyContent:"center"}},
    React.createElement("div",{onClick:e=>e.stopPropagation(),style:{background:"#fff",borderRadius:"20px 20px 0 0",width:"100%",maxWidth:430,maxHeight:"85vh",overflow:"auto",padding:"20px 18px 28px",direction:"rtl"}},
      React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}},
        React.createElement("h3",{style:{margin:0,fontSize:16,color:C.txt}},title),
        React.createElement("button",{onClick:onClose,style:{background:C.bg,border:"none",width:30,height:30,borderRadius:8,fontSize:16,cursor:"pointer",color:C.txtL}},"✕")
      ),
      children
    )
  );

// ─── Firebase DB helpers ───
function fbAdd(collection, data) { return db.collection(collection).add({...data, createdAt: Date.now()}); }
function fbUpdate(collection, id, data) { return db.collection(collection).doc(id).update(data); }
function fbDelete(collection, id) { return db.collection(collection).doc(id).delete(); }
function useFBCollection(collection, query) {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let ref = db.collection(collection);
    if (query) { ref = query(ref); }
    const unsub = ref.onSnapshot(snap => {
      setDocs(snap.docs.map(d => ({id: d.id, ...d.data()})));
      setLoading(false);
    });
    return unsub;
  }, [collection]);
  return [docs, loading];
}

// ─── LOGIN ───
function LoginScreen({onLogin}) {
  const [user,setUser] = useState("");
  const [pass,setPass] = useState("");
  const [err,setErr] = useState("");
  const [loading,setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // Check admin
    if (ADMINS[user] === pass) { setLoading(false); onLogin("admin",null); return; }
    // Check patient
    const snap = await db.collection("patients").where("user","==",user).where("pass","==",pass).get();
    setLoading(false);
    if (!snap.empty) {
      const doc = snap.docs[0];
      onLogin("patient", {id: doc.id, ...doc.data()});
    } else {
      setErr("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  return React.createElement("div",{style:{minHeight:"100vh",background:`linear-gradient(160deg,${C.priD} 0%,${C.pri} 50%,#12939E 100%)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,direction:"rtl"}},
    React.createElement("img",{src:LOGO,alt:"",style:{width:120,height:"auto",margin:"0 auto 12px",display:"block",borderRadius:14}}),
    React.createElement("h1",{style:{color:"#fff",fontSize:20,fontWeight:700,margin:0,textAlign:"center"}},"عيادة د. أسامة لبد"),
    React.createElement("p",{style:{color:"rgba(255,255,255,0.7)",fontSize:12,margin:"4px 0 24px",textAlign:"center"}},"التغذية وعلاج مشاكل النمو"),
    React.createElement("div",{style:{background:"#fff",borderRadius:20,padding:24,width:"100%",maxWidth:340}},
      React.createElement("h2",{style:{fontSize:17,color:C.txt,margin:"0 0 18px",textAlign:"center"}},"تسجيل الدخول"),
      React.createElement(Inp,{label:"اسم المستخدم",value:user,onChange:v=>{setUser(v);setErr("")},placeholder:"أدخل اسم المستخدم"}),
      React.createElement(Inp,{label:"كلمة المرور",type:"password",value:pass,onChange:v=>{setPass(v);setErr("")},placeholder:"أدخل كلمة المرور"}),
      err && React.createElement("p",{style:{color:C.err,fontSize:12,margin:"0 0 8px"}},err),
      React.createElement(Btn,{full:true,onClick:handleLogin,disabled:loading},loading?"جاري التحقق...":"دخول")
    ),
    React.createElement("p",{style:{color:"rgba(255,255,255,0.3)",fontSize:9,marginTop:20,textAlign:"center"}},"إدارة: admin / admin123")
  );
}

// ─── ADMIN APP ───
function AdminApp({onLogout}) {
  const [tab,setTab] = useState("dash");
  const [selPt,setSelPt] = useState(null);
  const [modal,setModal] = useState(null);
  const [subTab,setSubTab] = useState("info");
  const [search,setSearch] = useState("");

  const [patients] = useFBCollection("patients");
  const [allMeds] = useFBCollection("meds");
  const [allAppts] = useFBCollection("appts");
  const [allPayments] = useFBCollection("payments");
  const [allNotes] = useFBCollection("notes");
  const [allMessages] = useFBCollection("messages");

  const pt = selPt ? patients.find(p=>p.id===selPt) : null;
  const ptMeds = pt ? allMeds.filter(m=>m.patientId===pt.id) : [];
  const ptAppts = pt ? allAppts.filter(a=>a.patientId===pt.id) : [];
  const ptPayments = pt ? allPayments.filter(p=>p.patientId===pt.id) : [];
  const ptNotes = pt ? allNotes.filter(n=>n.patientId===pt.id) : [];
  const ptMessages = pt ? allMessages.filter(m=>m.patientId===pt.id).sort((a,b)=>a.createdAt-b.createdAt) : [];

  const filtered = patients.filter(p => (p.name||"").includes(search) || (p.phone||"").includes(search));
  const totalOwed = allPayments.filter(p=>!p.paid).reduce((s,p)=>s+(p.amount||0),0);
  const totalPaid = allPayments.filter(p=>p.paid).reduce((s,p)=>s+(p.amount||0),0);
  const upcoming = allAppts.filter(a=>a.status==="قادم").map(a=>{const p=patients.find(x=>x.id===a.patientId);return{...a,ptName:p?p.name:""}}).slice(0,5);
  const unpaid = pt ? ptPayments.filter(x=>!x.paid).reduce((s,x)=>s+(x.amount||0),0) : 0;

  // Add patient modal
  const PatientForm = ({patient,onClose}) => {
    const [f,setF] = useState(patient||{name:"",age:"",gender:"ذكر",height:"",weight:"",phone:"",status:"جديد",user:"",pass:""});
    const u=(k,v)=>setF(p=>({...p,[k]:v}));
    return React.createElement(Modal,{title:patient?"تعديل بيانات المريض":"إضافة مريض جديد",onClose},
      React.createElement(Inp,{label:"الاسم الكامل",value:f.name,onChange:v=>u("name",v)}),
      React.createElement("div",{style:{display:"flex",gap:10}},
        React.createElement("div",{style:{flex:1}},React.createElement(Inp,{label:"العمر",value:f.age,onChange:v=>u("age",v)})),
        React.createElement("div",{style:{flex:1}},React.createElement(Inp,{label:"الجنس",value:f.gender,onChange:v=>u("gender",v)}))
      ),
      React.createElement("div",{style:{display:"flex",gap:10}},
        React.createElement("div",{style:{flex:1}},React.createElement(Inp,{label:"الطول (سم)",value:f.height,onChange:v=>u("height",v)})),
        React.createElement("div",{style:{flex:1}},React.createElement(Inp,{label:"الوزن (كغ)",value:f.weight,onChange:v=>u("weight",v)}))
      ),
      React.createElement(Inp,{label:"رقم الهاتف",value:f.phone,onChange:v=>u("phone",v)}),
      React.createElement("div",{style:{display:"flex",gap:10}},
        React.createElement("div",{style:{flex:1}},React.createElement(Inp,{label:"اسم المستخدم",value:f.user,onChange:v=>u("user",v)})),
        React.createElement("div",{style:{flex:1}},React.createElement(Inp,{label:"كلمة المرور",value:f.pass,onChange:v=>u("pass",v)}))
      ),
      React.createElement(Inp,{label:"الحالة",value:f.status,onChange:v=>u("status",v)}),
      React.createElement(Btn,{full:true,onClick:async()=>{
        if(!f.name||!f.user||!f.pass)return;
        if(patient){await fbUpdate("patients",patient.id,f);}
        else{await fbAdd("patients",f);}
        onClose();
      }},"💾 حفظ")
    );
  };

  // Add Med/Appt/Pay/Note modals
  const MedForm = ({onClose}) => {
    const [f,setF]=useState({name:"",dose:"",time:"",active:true});
    return React.createElement(Modal,{title:"إضافة دواء",onClose},
      React.createElement(Inp,{label:"اسم الدواء",value:f.name,onChange:v=>setF(p=>({...p,name:v}))}),
      React.createElement(Inp,{label:"الجرعة",value:f.dose,onChange:v=>setF(p=>({...p,dose:v}))}),
      React.createElement(Inp,{label:"وقت الأخذ",value:f.time,onChange:v=>setF(p=>({...p,time:v}))}),
      React.createElement(Btn,{full:true,onClick:async()=>{if(!f.name)return;await fbAdd("meds",{...f,patientId:selPt});onClose();}},"💊 إضافة")
    );
  };
  const ApptForm = ({onClose}) => {
    const [f,setF]=useState({date:"",time:"",type:"",status:"قادم"});
    return React.createElement(Modal,{title:"إضافة موعد",onClose},
      React.createElement(Inp,{label:"التاريخ",type:"date",value:f.date,onChange:v=>setF(p=>({...p,date:v}))}),
      React.createElement(Inp,{label:"الوقت",value:f.time,onChange:v=>setF(p=>({...p,time:v}))}),
      React.createElement(Inp,{label:"نوع الزيارة",value:f.type,onChange:v=>setF(p=>({...p,type:v}))}),
      React.createElement(Btn,{full:true,onClick:async()=>{if(!f.date||!f.type)return;await fbAdd("appts",{...f,patientId:selPt});onClose();}},"📅 إضافة")
    );
  };
  const PayForm = ({onClose}) => {
    const [f,setF]=useState({date:new Date().toISOString().slice(0,10),desc:"",amount:"",paid:false});
    return React.createElement(Modal,{title:"إضافة دفعة",onClose},
      React.createElement(Inp,{label:"التاريخ",type:"date",value:f.date,onChange:v=>setF(p=>({...p,date:v}))}),
      React.createElement(Inp,{label:"الوصف",value:f.desc,onChange:v=>setF(p=>({...p,desc:v}))}),
      React.createElement(Inp,{label:"المبلغ (₪)",value:f.amount,onChange:v=>setF(p=>({...p,amount:v}))}),
      React.createElement("label",{style:{display:"flex",alignItems:"center",gap:8,fontSize:13,color:C.txt,margin:"0 0 12px",cursor:"pointer"}},
        React.createElement("input",{type:"checkbox",checked:f.paid,onChange:e=>setF(p=>({...p,paid:e.target.checked}))})," تم الدفع"),
      React.createElement(Btn,{full:true,v:"ok",onClick:async()=>{if(!f.amount)return;await fbAdd("payments",{...f,amount:Number(f.amount),patientId:selPt});onClose();}},"💰 إضافة")
    );
  };
  const NoteForm = ({onClose}) => {
    const [text,setText]=useState("");
    return React.createElement(Modal,{title:"إضافة ملاحظة طبية",onClose},
      React.createElement(Inp,{label:"الملاحظة",value:text,onChange:setText,textarea:true}),
      React.createElement(Btn,{full:true,onClick:async()=>{if(!text)return;await fbAdd("notes",{text,patientId:selPt,date:new Date().toLocaleDateString("ar"),by:"د. أسامة"});onClose();}},"📝 حفظ")
    );
  };

  // Send message
  const sendMsg = async(text) => {
    await fbAdd("messages",{text,from:"admin",patientId:selPt,time:new Date().toLocaleTimeString("ar",{hour:"2-digit",minute:"2-digit"})});
  };

  // ── Dashboard
  const Dash = () => React.createElement("div",null,
    React.createElement("div",{style:{background:`linear-gradient(135deg,${C.pri},${C.priD})`,borderRadius:18,padding:18,color:"#fff",marginBottom:14}},
      React.createElement("div",{style:{fontSize:17,fontWeight:700}},"مرحباً، د. أسامة 👋"),
      React.createElement("div",{style:{fontSize:12,opacity:.8}},"لوحة تحكم العيادة")
    ),
    React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}},
      [{i:"👥",l:"المرضى",v:patients.length},{i:"📅",l:"مواعيد قادمة",v:upcoming.length},{i:"💰",l:"مستحقات",v:totalOwed+" ₪"},{i:"✅",l:"مدفوع",v:totalPaid+" ₪"}].map((c,i)=>
        React.createElement(Card,{key:i},
          React.createElement("div",{style:{fontSize:11,color:C.txtL}},c.i+" "+c.l),
          React.createElement("div",{style:{fontSize:18,fontWeight:700,color:C.txt,marginTop:4}},c.v)
        )
      )
    ),
    upcoming.length>0 && React.createElement("h3",{style:{fontSize:14,color:C.txt,margin:"0 0 8px"}},"المواعيد القادمة"),
    upcoming.map((a,i)=>React.createElement(Card,{key:i,style:{display:"flex",justifyContent:"space-between"}},
      React.createElement("div",null,React.createElement("div",{style:{fontSize:13,fontWeight:600,color:C.txt}},a.ptName),React.createElement("div",{style:{fontSize:11,color:C.txtL}},a.type)),
      React.createElement("div",{style:{textAlign:"left"}},React.createElement("div",{style:{fontSize:12,fontWeight:600,color:C.txt}},a.date),React.createElement("div",{style:{fontSize:11,color:C.txtL}},a.time))
    ))
  );

  // ── Patient Detail
  const PtDetail = () => {
    const [msgText,setMsgText]=useState("");
    const msgEnd=useRef();
    useEffect(()=>{msgEnd.current?.scrollIntoView({behavior:"smooth"});},[ptMessages]);
    if(!pt) return null;
    const subs=[{k:"info",l:"البيانات"},{k:"meds",l:"الأدوية"},{k:"appts",l:"المواعيد"},{k:"pay",l:"الدفع"},{k:"notes",l:"الملاحظات"},{k:"msg",l:"الرسائل"}];
    return React.createElement("div",null,
      React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:12}},
        React.createElement("button",{onClick:()=>{setTab("patients");setSelPt(null)},style:{background:C.bg,border:"none",width:32,height:32,borderRadius:8,cursor:"pointer",color:C.txtL}},"→"),
        React.createElement("h3",{style:{margin:0,fontSize:15,color:C.txt,flex:1}},pt.name),
        React.createElement(Btn,{small:true,v:"ghost",onClick:()=>setModal("editPt")},"✏️"),
        React.createElement(Btn,{small:true,v:"ghost",onClick:async()=>{if(confirm("حذف "+pt.name+"؟")){await fbDelete("patients",pt.id);setTab("patients");setSelPt(null)}},s:{color:C.err}},"🗑️")
      ),
      React.createElement("div",{style:{display:"flex",gap:6,marginBottom:12,overflowX:"auto",paddingBottom:4}},
        subs.map(t=>React.createElement("button",{key:t.k,onClick:()=>setSubTab(t.k),style:{padding:"6px 12px",borderRadius:8,border:"none",fontSize:11,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit",background:subTab===t.k?C.pri:C.bg,color:subTab===t.k?"#fff":C.txtL}},t.l))
      ),
      subTab==="info" && React.createElement(Card,null,
        [["المستخدم",pt.user],["العمر",(pt.age||"")+" سنة"],["الجنس",pt.gender],["الطول",(pt.height||"")+" سم"],["الوزن",(pt.weight||"")+" كغ"],["الهاتف",pt.phone],["الحالة",pt.status]].map(([l,v],i)=>
          React.createElement("div",{key:i,style:{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:i<6?`1px solid ${C.brd}`:"none",fontSize:12}},
            React.createElement("span",{style:{color:C.txtL}},l),React.createElement("span",{style:{fontWeight:600,color:C.txt}},v))
        )
      ),
      subTab==="meds" && React.createElement("div",null,
        React.createElement(Btn,{small:true,onClick:()=>setModal("addMed"),s:{marginBottom:10}},"+ إضافة دواء"),
        ptMeds.map(m=>React.createElement(Card,{key:m.id,style:{display:"flex",alignItems:"center",justifyContent:"space-between"}},
          React.createElement("div",null,React.createElement("div",{style:{fontSize:13,fontWeight:600,color:C.txt}},m.name),React.createElement("div",{style:{fontSize:11,color:C.txtL}},m.dose+" • "+m.time)),
          React.createElement("div",{style:{display:"flex",alignItems:"center",gap:6}},
            React.createElement("button",{onClick:()=>fbUpdate("meds",m.id,{active:!m.active}),style:{background:"none",border:"none",cursor:"pointer"}},React.createElement(Badge,{text:m.active?"فعّال":"متوقف",color:m.active?"ok":"warn"})),
            React.createElement("button",{onClick:()=>fbDelete("meds",m.id),style:{background:"none",border:"none",color:C.err,cursor:"pointer"}},"✕")
          )
        ))
      ),
      subTab==="appts" && React.createElement("div",null,
        React.createElement(Btn,{small:true,onClick:()=>setModal("addAppt"),s:{marginBottom:10}},"+ إضافة موعد"),
        ptAppts.map(a=>React.createElement(Card,{key:a.id,style:{display:"flex",alignItems:"center",justifyContent:"space-between"}},
          React.createElement("div",null,React.createElement("div",{style:{fontSize:13,fontWeight:600,color:C.txt}},a.type),React.createElement("div",{style:{fontSize:11,color:C.txtL}},a.date+" • "+a.time)),
          React.createElement("div",{style:{display:"flex",alignItems:"center",gap:6}},
            React.createElement("button",{onClick:()=>fbUpdate("appts",a.id,{status:a.status==="قادم"?"تم":a.status==="تم"?"ملغي":"قادم"}),style:{background:"none",border:"none",cursor:"pointer"}},React.createElement(Badge,{text:a.status,color:a.status==="قادم"?"warn":a.status==="تم"?"ok":"err"})),
            React.createElement("button",{onClick:()=>fbDelete("appts",a.id),style:{background:"none",border:"none",color:C.err,cursor:"pointer"}},"✕")
          )
        ))
      ),
      subTab==="pay" && React.createElement("div",null,
        React.createElement(Btn,{small:true,v:"ok",onClick:()=>setModal("addPay"),s:{marginBottom:10}},"+ إضافة دفعة"),
        React.createElement(Card,{style:{background:C.priL}},PAYMENT_INFO.map((p,i)=>React.createElement("div",{key:i,style:{display:"flex",justifyContent:"space-between",padding:"4px 0",fontSize:11}},React.createElement("span",{style:{color:C.txtL}},p.method),React.createElement("span",{style:{fontWeight:700,color:C.txt,direction:"ltr",letterSpacing:1}},p.number)))),
        unpaid>0 && React.createElement(Card,{style:{background:C.errL}},React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},React.createElement("span",{style:{fontSize:12,color:C.txtL}},"المستحق"),React.createElement("span",{style:{fontSize:20,fontWeight:700,color:C.err}},unpaid+" ₪"))),
        ptPayments.map(p2=>React.createElement(Card,{key:p2.id,style:{display:"flex",alignItems:"center",justifyContent:"space-between"}},
          React.createElement("div",null,React.createElement("div",{style:{fontSize:13,fontWeight:600,color:C.txt}},p2.desc),React.createElement("div",{style:{fontSize:11,color:C.txtL}},p2.date)),
          React.createElement("div",{style:{display:"flex",alignItems:"center",gap:6}},
            React.createElement("div",null,React.createElement("div",{style:{fontSize:14,fontWeight:700,color:C.txt}},p2.amount+" ₪"),
              React.createElement("button",{onClick:()=>fbUpdate("payments",p2.id,{paid:!p2.paid}),style:{background:"none",border:"none",cursor:"pointer",padding:0}},React.createElement(Badge,{text:p2.paid?"مدفوع ✓":"غير مدفوع",color:p2.paid?"ok":"err"}))),
            React.createElement("button",{onClick:()=>{const a=prompt("المبلغ الجديد:",p2.amount);if(a&&!isNaN(a))fbUpdate("payments",p2.id,{amount:Number(a)})},style:{background:"none",border:"none",color:C.pri,cursor:"pointer"}},"✏️"),
            React.createElement("button",{onClick:()=>fbDelete("payments",p2.id),style:{background:"none",border:"none",color:C.err,cursor:"pointer"}},"✕")
          )
        ))
      ),
      subTab==="notes" && React.createElement("div",null,
        React.createElement(Btn,{small:true,onClick:()=>setModal("note"),s:{marginBottom:10}},"+ إضافة ملاحظة"),
        ptNotes.map(n=>React.createElement(Card,{key:n.id},
          React.createElement("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:6}},React.createElement("span",{style:{fontSize:11,color:C.pri,fontWeight:600}},"🩺 "+n.by),React.createElement("span",{style:{fontSize:10,color:C.txtL}},n.date)),
          React.createElement("div",{style:{fontSize:13,color:C.txt,lineHeight:1.6}},n.text),
          React.createElement("button",{onClick:()=>fbDelete("notes",n.id),style:{background:"none",border:"none",color:C.err,cursor:"pointer",fontSize:10,marginTop:6}},"حذف")
        ))
      ),
      subTab==="msg" && React.createElement("div",null,
        React.createElement("h3",{style:{fontSize:16,color:C.txt,margin:"0 0 12px"}},"محادثة مع "+pt.name),
        React.createElement("div",{style:{background:C.bg,borderRadius:14,padding:14,height:250,overflow:"auto",marginBottom:10,border:`1px solid ${C.brd}`}},
          ptMessages.map((m,i)=>React.createElement("div",{key:i,style:{display:"flex",justifyContent:m.from==="admin"?"flex-start":"flex-end",marginBottom:8}},
            React.createElement("div",{style:{maxWidth:"75%",padding:"8px 12px",borderRadius:12,fontSize:13,background:m.from==="admin"?C.priL:C.card,color:C.txt,border:m.from==="admin"?"none":`1px solid ${C.brd}`}},
              React.createElement("div",{style:{fontSize:10,color:C.txtL,marginBottom:2}},(m.from==="admin"?"🩺 العيادة":"🙋 المريض")+" • "+m.time),m.text)
          )),
          React.createElement("div",{ref:msgEnd})
        ),
        React.createElement("div",{style:{display:"flex",gap:8}},
          React.createElement("input",{value:msgText,onChange:e=>setMsgText(e.target.value),placeholder:"اكتب رسالة...",onKeyDown:e=>{if(e.key==="Enter"&&msgText.trim()){sendMsg(msgText.trim());setMsgText("")}},style:{flex:1,padding:"10px 14px",borderRadius:10,border:`1.5px solid ${C.brd}`,fontSize:13,outline:"none",direction:"rtl",fontFamily:"inherit"}}),
          React.createElement(Btn,{small:true,onClick:()=>{if(msgText.trim()){sendMsg(msgText.trim());setMsgText("")}}},"إرسال")
        )
      ),
      modal==="editPt" && React.createElement(PatientForm,{patient:pt,onClose:()=>setModal(null)}),
      modal==="addMed" && React.createElement(MedForm,{onClose:()=>setModal(null)}),
      modal==="addAppt" && React.createElement(ApptForm,{onClose:()=>setModal(null)}),
      modal==="addPay" && React.createElement(PayForm,{onClose:()=>setModal(null)}),
      modal==="note" && React.createElement(NoteForm,{onClose:()=>setModal(null)})
    );
  };

  const navTabs=[{k:"dash",l:"الرئيسية",i:"🏠"},{k:"patients",l:"المرضى",i:"👥"},{k:"settings",l:"الإعدادات",i:"⚙️"}];

  return React.createElement("div",{style:{minHeight:"100vh",background:C.bg,direction:"rtl",maxWidth:430,margin:"0 auto",fontFamily:"'Segoe UI',Tahoma,Arial,sans-serif"}},
    React.createElement("div",{style:{background:C.card,padding:"10px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1px solid ${C.brd}`,position:"sticky",top:0,zIndex:10}},
      React.createElement("div",{style:{display:"flex",alignItems:"center",gap:6}},
        React.createElement("img",{src:LOGO,alt:"",style:{width:28,height:"auto"}}),
        React.createElement("span",{style:{fontSize:13,fontWeight:700,color:C.txt}},"لوحة التحكم"),
        React.createElement(Badge,{text:"إدارة",color:"warn"})
      ),
      React.createElement("button",{onClick:onLogout,style:{background:"none",border:"none",color:C.txtL,cursor:"pointer",fontSize:11}},"خروج")
    ),
    React.createElement("div",{style:{padding:"12px 14px 85px"}},
      tab==="dash" && React.createElement(Dash,null),
      tab==="patients" && React.createElement("div",null,
        React.createElement("div",{style:{display:"flex",gap:8,marginBottom:12}},
          React.createElement("input",{value:search,onChange:e=>setSearch(e.target.value),placeholder:"بحث...",style:{flex:1,padding:"9px 12px",borderRadius:10,border:`1.5px solid ${C.brd}`,fontSize:12,outline:"none",direction:"rtl",fontFamily:"inherit"}}),
          React.createElement(Btn,{small:true,onClick:()=>setModal("addPt")},"+ إضافة")
        ),
        filtered.map(p=>React.createElement(Card,{key:p.id,onClick:()=>{setSelPt(p.id);setTab("pt_detail");setSubTab("info")}},
          React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},
            React.createElement("div",{style:{width:38,height:38,borderRadius:12,background:C.priL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}},p.gender==="أنثى"?"👧":"👦"),
            React.createElement("div",{style:{flex:1}},React.createElement("div",{style:{fontSize:13,fontWeight:600,color:C.txt}},p.name),React.createElement("div",{style:{fontSize:11,color:C.txtL}},(p.age||"")+" سنة • "+p.status)),
            React.createElement("span",{style:{fontSize:12,color:C.txtL}},"‹")
          )
        )),
        modal==="addPt" && React.createElement(PatientForm,{onClose:()=>setModal(null)})
      ),
      tab==="pt_detail" && React.createElement(PtDetail,null),
      tab==="settings" && React.createElement("div",null,
        React.createElement("h3",{style:{fontSize:16,color:C.txt,margin:"0 0 14px"}},"⚙️ الإعدادات"),
        React.createElement(Card,null,
          [["الاسم","عيادة د. أسامة لبد"],["التخصص","التغذية وعلاج مشاكل النمو"],["الموقع","غزة"]].map(([l,v],i)=>
            React.createElement("div",{key:i,style:{display:"flex",justifyContent:"space-between",padding:"6px 0",fontSize:12,borderBottom:i<2?`1px solid ${C.brd}`:"none"}},
              React.createElement("span",{style:{color:C.txtL}},l),React.createElement("span",{style:{color:C.txt,fontWeight:600}},v))
          )
        )
      )
    ),
    React.createElement("div",{style:{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:C.card,borderTop:`1px solid ${C.brd}`,display:"flex",justifyContent:"space-around",padding:"8px 0 12px",zIndex:10}},
      navTabs.map(t=>React.createElement("button",{key:t.k,onClick:()=>{setTab(t.k);if(t.k!=="pt_detail")setSelPt(null)},style:{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"4px 6px",color:(tab===t.k||(t.k==="patients"&&tab==="pt_detail"))?C.pri:C.txtL}},
        React.createElement("span",{style:{fontSize:18}},t.i),
        React.createElement("span",{style:{fontSize:9,fontWeight:(tab===t.k||(t.k==="patients"&&tab==="pt_detail"))?600:400}},t.l)
      ))
    )
  );
}

// ─── PATIENT APP ───
function PatientApp({patient,onLogout}) {
  const [tab,setTab] = useState("home");
  const [msgText,setMsgText] = useState("");
  const msgEnd = useRef();

  // Listen for patient data changes
  const [ptDoc,setPtDoc] = useState(patient);
  useEffect(()=>{
    return db.collection("patients").doc(patient.id).onSnapshot(snap=>{if(snap.exists)setPtDoc({id:snap.id,...snap.data()})});
  },[patient.id]);

  const [meds] = useFBCollection("meds",ref=>ref.where("patientId","==",patient.id));
  const [appts] = useFBCollection("appts",ref=>ref.where("patientId","==",patient.id));
  const [payments] = useFBCollection("payments",ref=>ref.where("patientId","==",patient.id));
  const [notes] = useFBCollection("notes",ref=>ref.where("patientId","==",patient.id));
  const [messages] = useFBCollection("messages",ref=>ref.where("patientId","==",patient.id));
  const sortedMsgs = messages.sort((a,b)=>a.createdAt-b.createdAt);

  useEffect(()=>{msgEnd.current?.scrollIntoView({behavior:"smooth"});},[sortedMsgs]);

  const pt = ptDoc;
  const unpaid = payments.filter(x=>!x.paid).reduce((a,x)=>a+(x.amount||0),0);

  const sendMsg = async(text) => {
    await fbAdd("messages",{text,from:"patient",patientId:patient.id,time:new Date().toLocaleTimeString("ar",{hour:"2-digit",minute:"2-digit"})});
  };

  const tabs=[{k:"home",l:"الرئيسية",i:"🏠"},{k:"file",l:"ملفي",i:"📄"},{k:"meds",l:"الأدوية",i:"💊"},{k:"appts",l:"المواعيد",i:"📅"},{k:"pay",l:"الدفع",i:"💰"},{k:"msg",l:"الرسائل",i:"💬"}];

  return React.createElement("div",{style:{minHeight:"100vh",background:C.bg,direction:"rtl",maxWidth:430,margin:"0 auto",fontFamily:"'Segoe UI',Tahoma,Arial,sans-serif"}},
    React.createElement("div",{style:{background:C.card,padding:"10px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1px solid ${C.brd}`,position:"sticky",top:0,zIndex:10}},
      React.createElement("div",{style:{display:"flex",alignItems:"center",gap:6}},
        React.createElement("img",{src:LOGO,alt:"",style:{width:28,height:"auto"}}),
        React.createElement("span",{style:{fontSize:13,fontWeight:700,color:C.txt}},"عيادة د. أسامة لبد")
      ),
      React.createElement("button",{onClick:onLogout,style:{background:"none",border:"none",color:C.txtL,cursor:"pointer",fontSize:11}},"خروج")
    ),
    React.createElement("div",{style:{padding:"12px 14px 85px"}},
      tab==="home" && React.createElement("div",null,
        React.createElement("div",{style:{background:`linear-gradient(135deg,${C.pri},${C.priD})`,borderRadius:16,padding:16,color:"#fff",marginBottom:12}},
          React.createElement("div",{style:{fontSize:16,fontWeight:700}},"أهلاً، "+pt.name),
          React.createElement("div",{style:{fontSize:11,opacity:.8}},(pt.age||"")+" سنة • "+pt.status)
        ),
        React.createElement("div",{style:{display:"flex",gap:8,marginBottom:12}},
          [["📏","الطول",(pt.height||"")+" سم"],["⚖️","الوزن",(pt.weight||"")+" كغ"]].map(([i,l,v],idx)=>
            React.createElement(Card,{key:idx,style:{flex:1,textAlign:"center"}},React.createElement("div",{style:{fontSize:10,color:C.txtL}},l),React.createElement("div",{style:{fontSize:17,fontWeight:700,color:C.txt}},v))
          )
        ),
        unpaid>0 && React.createElement(Card,{style:{display:"flex",alignItems:"center",justifyContent:"space-between",background:C.errL}},
          React.createElement("div",null,React.createElement("div",{style:{fontSize:11,color:C.txtL}},"مستحق عليك"),React.createElement("div",{style:{fontSize:18,fontWeight:700,color:C.err}},unpaid+" ₪")),
          React.createElement("span",{style:{fontSize:12,color:C.ok}},"راجع قسم الدفع")
        )
      ),
      tab==="file" && React.createElement("div",null,
        React.createElement("h3",{style:{fontSize:16,color:C.txt,margin:"0 0 12px"}},"ملفي الطبي"),
        React.createElement(Card,null,
          [["الاسم",pt.name],["العمر",(pt.age||"")+" سنة"],["الجنس",pt.gender],["الطول",(pt.height||"")+" سم"],["الوزن",(pt.weight||"")+" كغ"],["الحالة",pt.status]].map(([l,v],i)=>
            React.createElement("div",{key:i,style:{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:i<5?`1px solid ${C.brd}`:"none",fontSize:12}},
              React.createElement("span",{style:{color:C.txtL}},l),React.createElement("span",{style:{fontWeight:600,color:C.txt}},v))
          )
        ),
        notes.length>0 && React.createElement("h4",{style:{fontSize:13,color:C.txt,margin:"12px 0 8px"}},"📝 ملاحظات الطبيب"),
        notes.map(n=>React.createElement(Card,{key:n.id},
          React.createElement("div",{style:{fontSize:10,color:C.pri,marginBottom:4}},"🩺 "+n.by+" — "+n.date),
          React.createElement("div",{style:{fontSize:12,color:C.txt,lineHeight:1.6}},n.text)
        ))
      ),
      tab==="meds" && React.createElement("div",null,
        React.createElement("h3",{style:{fontSize:16,color:C.txt,margin:"0 0 12px"}},"💊 أدويتي"),
        meds.length===0 && React.createElement("p",{style:{color:C.txtL,fontSize:12,textAlign:"center"}},"لا يوجد أدوية"),
        meds.map(m=>React.createElement(Card,{key:m.id,style:{display:"flex",alignItems:"center",gap:10,opacity:m.active?1:.5}},
          React.createElement("div",{style:{flex:1}},React.createElement("div",{style:{fontSize:13,fontWeight:600,color:C.txt}},m.name),React.createElement("div",{style:{fontSize:11,color:C.txtL}},m.dose+" • "+m.time)),
          React.createElement(Badge,{text:m.active?"فعّال":"متوقف",color:m.active?"ok":"warn"})
        ))
      ),
      tab==="appts" && React.createElement("div",null,
        React.createElement("h3",{style:{fontSize:16,color:C.txt,margin:"0 0 12px"}},"📅 مواعيدي"),
        appts.map(a=>React.createElement(Card,{key:a.id,style:{display:"flex",alignItems:"center",justifyContent:"space-between"}},
          React.createElement("div",null,React.createElement("div",{style:{fontSize:13,fontWeight:600,color:C.txt}},a.type),React.createElement("div",{style:{fontSize:11,color:C.txtL}},a.date+" • "+a.time)),
          React.createElement(Badge,{text:a.status,color:a.status==="قادم"?"warn":a.status==="تم"?"ok":"err"})
        ))
      ),
      tab==="pay" && React.createElement("div",null,
        React.createElement("h3",{style:{fontSize:16,color:C.txt,margin:"0 0 12px"}},"💰 المدفوعات"),
        React.createElement(Card,{style:{background:C.priL}},PAYMENT_INFO.map((p,i)=>React.createElement("div",{key:i,style:{display:"flex",justifyContent:"space-between",padding:"4px 0",fontSize:11}},React.createElement("span",{style:{color:C.txtL}},p.method),React.createElement("span",{style:{fontWeight:700,color:C.txt,direction:"ltr",letterSpacing:1}},p.number)))),
        unpaid>0 && React.createElement(Card,{style:{background:C.errL,textAlign:"center"}},
          React.createElement("div",{style:{fontSize:11,color:C.txtL}},"المبلغ المستحق"),
          React.createElement("div",{style:{fontSize:26,fontWeight:700,color:C.err,margin:"4px 0"}},unpaid+" ₪")
        ),
        payments.map(p2=>React.createElement(Card,{key:p2.id,style:{display:"flex",alignItems:"center",justifyContent:"space-between"}},
          React.createElement("div",null,React.createElement("div",{style:{fontSize:13,fontWeight:600,color:C.txt}},p2.desc),React.createElement("div",{style:{fontSize:11,color:C.txtL}},p2.date)),
          React.createElement("div",{style:{textAlign:"left"}},React.createElement("div",{style:{fontSize:14,fontWeight:700,color:C.txt}},p2.amount+" ₪"),React.createElement(Badge,{text:p2.paid?"مدفوع ✓":"غير مدفوع",color:p2.paid?"ok":"err"}))
        ))
      ),
      tab==="msg" && React.createElement("div",null,
        React.createElement("h3",{style:{fontSize:16,color:C.txt,margin:"0 0 12px"}},"💬 رسائل العيادة"),
        React.createElement("div",{style:{background:C.bg,borderRadius:14,padding:14,height:280,overflow:"auto",marginBottom:10,border:`1px solid ${C.brd}`}},
          sortedMsgs.length===0 && React.createElement("p",{style:{color:C.txtL,fontSize:12,textAlign:"center",marginTop:40}},"لا توجد رسائل بعد"),
          sortedMsgs.map((m,i)=>React.createElement("div",{key:i,style:{display:"flex",justifyContent:m.from==="admin"?"flex-start":"flex-end",marginBottom:8}},
            React.createElement("div",{style:{maxWidth:"75%",padding:"8px 12px",borderRadius:12,fontSize:13,background:m.from==="admin"?C.priL:C.card,color:C.txt,border:m.from==="admin"?"none":`1px solid ${C.brd}`}},
              React.createElement("div",{style:{fontSize:10,color:C.txtL,marginBottom:2}},(m.from==="admin"?"🩺 العيادة":"🙋 أنا")+" • "+m.time),m.text)
          )),
          React.createElement("div",{ref:msgEnd})
        ),
        React.createElement("div",{style:{display:"flex",gap:8}},
          React.createElement("input",{value:msgText,onChange:e=>setMsgText(e.target.value),placeholder:"اكتب رسالة...",onKeyDown:e=>{if(e.key==="Enter"&&msgText.trim()){sendMsg(msgText.trim());setMsgText("")}},style:{flex:1,padding:"10px 14px",borderRadius:10,border:`1.5px solid ${C.brd}`,fontSize:13,outline:"none",direction:"rtl",fontFamily:"inherit"}}),
          React.createElement(Btn,{small:true,onClick:()=>{if(msgText.trim()){sendMsg(msgText.trim());setMsgText("")}}},"إرسال")
        )
      )
    ),
    React.createElement("div",{style:{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:C.card,borderTop:`1px solid ${C.brd}`,display:"flex",justifyContent:"space-around",padding:"6px 0 10px",zIndex:10}},
      tabs.map(t=>React.createElement("button",{key:t.k,onClick:()=>setTab(t.k),style:{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:1,padding:"3px 4px",color:tab===t.k?C.pri:C.txtL}},
        React.createElement("span",{style:{fontSize:16}},t.i),
        React.createElement("span",{style:{fontSize:9,fontWeight:tab===t.k?600:400}},t.l)
      ))
    )
  );
}

// ─── MAIN APP ───
function App() {
  const [role,setRole] = useState(null);
  const [patient,setPatient] = useState(null);

  const handleLogin = (r,p) => { setRole(r); setPatient(p); };
  const handleLogout = () => { setRole(null); setPatient(null); };

  if (!role) return React.createElement(LoginScreen,{onLogin:handleLogin});
  if (role==="admin") return React.createElement(AdminApp,{onLogout:handleLogout});
  return React.createElement(PatientApp,{patient,onLogout:handleLogout});
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
