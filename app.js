const metrics=[
  {icon:'▶',type:'purple',label:'Total views',value:'1.28M',growth:'+18.2%'},
  {icon:'♧',type:'green',label:'Subscribers',value:'84,291',growth:'+7.8%'},
  {icon:'$',type:'yellow',label:'Est. revenue',value:'$4,860',growth:'+12.4%'},
  {icon:'◷',type:'pink',label:'Watch time',value:'52.4K h',growth:'+9.1%'}
];
const tasks=[
  ['Final edit and B-roll pass','7 Systems That Make Creators Faster','HIGH'],
  ['Review thumbnail concepts','August productivity series','MEDIUM'],
  ['Optimize metadata','Shorts: Creator workflow','LOW']
];
const stages=[['Ideas',8,68,'#aa92ff'],['Script',3,42,'#6196ff'],['Editing',4,58,'#efb257'],['Review',2,34,'#e96eae'],['Scheduled',3,46,'#3ab99c']];
const activities=[['JM','Jordan uploaded a new edit','The Creator Economy in 2026','12m ago'],['SK','Sam completed a task','Thumbnail design: Summer series','48m ago'],['MP','Maya left a comment','7 Systems That Make Creators Faster','2h ago']];

function render(){
 document.querySelector('#metrics').innerHTML=metrics.map(m=>`<article class="metric-card"><span class="metric-icon ${m.type}">${m.icon}</span><div class="metric-line"><span>${m.label}</span><em>${m.growth}</em></div><strong>${m.value}</strong><small>vs. previous 30 days</small></article>`).join('');
 document.querySelector('#taskList').innerHTML=tasks.map((t,i)=>`<div class="task"><button class="check" aria-label="Complete ${t[0]}" data-task="${i}"></button><div><strong>${t[0]}</strong><small>${t[1]}</small></div><span class="priority ${t[2].toLowerCase()}">${t[2]}</span></div>`).join('');
 document.querySelector('#pipeline').innerHTML=stages.map(s=>`<div class="stage"><i style="background:${s[3]}"></i><b>${s[0]}</b><div class="progress"><span style="width:${s[2]}%;background:${s[3]}"></span></div><strong>${s[1]}</strong></div>`).join('');
 document.querySelector('#activity').innerHTML=activities.map(a=>`<div class="activity"><span class="activity-avatar">${a[0]}</span><div><strong>${a[1]}</strong><small>${a[2]} · ${a[3]}</small></div></div>`).join('');
 drawChart();
}
function drawChart(){
 const values=[18,27,23,41,52,61], el=document.querySelector('#chart');
 const points=values.map((v,i)=>`${i*20},${88-v}`).join(' ');
 const area=`0,100 ${points} 100,100`;
 el.innerHTML=`<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8064ff" stop-opacity=".27"/><stop offset="1" stop-color="#8064ff" stop-opacity="0"/></linearGradient></defs><line x1="0" y1="20" x2="100" y2="20"/><line x1="0" y1="50" x2="100" y2="50"/><line x1="0" y1="80" x2="100" y2="80"/><polygon points="${area}" fill="url(#fill)"/><polyline points="${points}" fill="none" stroke="#8064ff" stroke-width="1.1" vector-effect="non-scaling-stroke"/><circle cx="100" cy="27" r="1.7" fill="#8064ff"/></svg>`;
}
function toast(message){const e=document.querySelector('#toast');e.textContent=message;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2600)}
render();
document.addEventListener('click',e=>{
 const task=e.target.closest('[data-task]'); if(task){task.classList.toggle('done');task.closest('.task').classList.toggle('completed');toast(task.classList.contains('done')?'Task completed!':'Task reopened');}
 const nav=e.target.closest('.nav-link');if(nav){document.querySelectorAll('.nav-link').forEach(x=>x.classList.remove('active'));nav.classList.add('active')}
 const choice=e.target.closest('[data-create]');if(choice){document.querySelector('#modalBackdrop').hidden=true;toast(`${choice.dataset.create} creation started`) }
});
const modal=document.querySelector('#modalBackdrop');document.querySelector('#createButton').onclick=()=>modal.hidden=false;document.querySelector('#closeModal').onclick=()=>modal.hidden=true;modal.onclick=e=>{if(e.target===modal)modal.hidden=true};
document.querySelector('#notifyButton').onclick=()=>toast('You have 3 unread notifications');
document.querySelector('#menuButton').onclick=()=>document.querySelector('#sidebar').classList.toggle('open');
document.querySelector('#globalSearch').addEventListener('keydown',e=>{if(e.key==='Enter')toast(`Searching for “${e.target.value}”`)});
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();document.querySelector('#globalSearch').focus()}});
